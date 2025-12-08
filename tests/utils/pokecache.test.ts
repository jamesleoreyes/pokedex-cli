import { Cache } from "../../src/utils/pokecache.js";
import { test, expect, describe, vi, beforeEach, afterEach } from "vitest";

describe("Cache", () => {
  beforeEach(() => {
    // Enable fake timers with Date mocking
    vi.useFakeTimers({ shouldAdvanceTime: false });
    vi.setSystemTime(new Date(2024, 0, 1, 0, 0, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("caching with expiration", () => {
    test.each([
      {
        key: "https://example.com",
        val: "testdata",
        interval: 500,
      },
      {
        key: "https://example.com/path",
        val: "moretestdata",
        interval: 1000,
      },
    ])("caches and expires after $interval ms", ({ key, val, interval }) => {
      const cache = new Cache(interval);

      cache.add(key, val);
      expect(cache.get(key)).toBe(val);

      // Item added at T=0 with interval X:
      // - Reap at T=X checks: 0 < X - X = 0 < 0 (false, not reaped)
      // - Reap at T=2X checks: 0 < 2X - X = 0 < X (true, reaped)
      // So we need to advance past interval*2 to ensure the second reap catches it
      vi.advanceTimersByTime(interval * 2 + 1);

      expect(cache.get(key)).toBe(undefined);

      cache.stopReapLoop();
    });
  });

  test("returns undefined for non-existent key", () => {
    const cache = new Cache(5000);

    const result = cache.get("non-existent-key");
    expect(result).toBe(undefined);

    cache.stopReapLoop();
  });

  test("stores and retrieves complex objects", () => {
    const cache = new Cache(5000);
    const complexObject = {
      name: "pikachu",
      id: 25,
      types: ["electric"],
      stats: { hp: 35, attack: 55 },
    };

    cache.add("pokemon/pikachu", complexObject);
    const cached = cache.get<typeof complexObject>("pokemon/pikachu");

    expect(cached).toEqual(complexObject);
    expect(cached?.name).toBe("pikachu");
    expect(cached?.stats.hp).toBe(35);

    cache.stopReapLoop();
  });

  test("overwrites existing value when adding with same key", () => {
    const cache = new Cache(5000);

    cache.add("key", "first-value");
    expect(cache.get("key")).toBe("first-value");

    cache.add("key", "second-value");
    expect(cache.get("key")).toBe("second-value");

    cache.stopReapLoop();
  });

  describe("interval expiration", () => {
    test("returns cached value before interval expires", () => {
      const interval = 500;
      const cache = new Cache(interval);

      cache.add("key", "cached-value");

      // Check at various points before interval expires
      vi.advanceTimersByTime(100);
      expect(cache.get("key")).toBe("cached-value");

      vi.advanceTimersByTime(100);
      expect(cache.get("key")).toBe("cached-value");

      vi.advanceTimersByTime(100);
      expect(cache.get("key")).toBe("cached-value");

      // At 300ms total - still within 500ms interval, no reap has run yet
      expect(cache.get("key")).toBe("cached-value");

      cache.stopReapLoop();
    });

    test("returns cached value after first interval (reap runs but item not yet stale)", () => {
      const interval = 300;
      const cache = new Cache(interval);

      cache.add("key", "will-expire");

      // Immediately after adding, value should exist
      expect(cache.get("key")).toBe("will-expire");

      // Advance to first reap at T=300
      // Reap checks: 0 < 300 - 300 = 0 < 0 (false), item survives
      vi.advanceTimersByTime(interval);
      expect(cache.get("key")).toBe("will-expire");

      cache.stopReapLoop();
    });

    test("returns undefined after second interval (reap clears stale item)", () => {
      const interval = 300;
      const cache = new Cache(interval);

      cache.add("key", "will-expire");
      expect(cache.get("key")).toBe("will-expire");

      // Advance past second reap at T=600+
      // Reap checks: 0 < 601 - 300 = 0 < 301 (true), item reaped
      vi.advanceTimersByTime(interval * 2 + 1);
      expect(cache.get("key")).toBe(undefined);

      cache.stopReapLoop();
    });

    test("simulates fetch pattern: cache hit before expiry, cache miss after", () => {
      const interval = 400;
      const cache = new Cache(interval);
      let fetchCount = 0;

      // Simulate a fetch function that uses cache
      const fetchData = (key: string): string => {
        const cached = cache.get<string>(key);
        if (cached) return cached;

        fetchCount++;
        const freshData = `data-fetch-${fetchCount}`;
        cache.add(key, freshData);
        return freshData;
      };

      // First fetch at T=0 - cache miss, fetches new data
      const result1 = fetchData("api/endpoint");
      expect(result1).toBe("data-fetch-1");
      expect(fetchCount).toBe(1);

      // Second fetch at T=100 - cache hit
      vi.advanceTimersByTime(100);
      const result2 = fetchData("api/endpoint");
      expect(result2).toBe("data-fetch-1");
      expect(fetchCount).toBe(1);

      // Third fetch at T=200 - cache hit
      vi.advanceTimersByTime(100);
      const result3 = fetchData("api/endpoint");
      expect(result3).toBe("data-fetch-1");
      expect(fetchCount).toBe(1);

      // Advance past two full intervals to ensure reap clears the item
      // T=200 + 801 = T=1001 (past interval*2 = 800)
      vi.advanceTimersByTime(interval * 2 + 1);

      // Fourth fetch after expiry - cache miss, fetches new data
      const result4 = fetchData("api/endpoint");
      expect(result4).toBe("data-fetch-2");
      expect(fetchCount).toBe(2);

      cache.stopReapLoop();
    });

    test("multiple keys expire independently based on when they were added", () => {
      const interval = 500;
      const cache = new Cache(interval);

      // Add first key at T=0
      cache.add("key1", "value1");

      // Advance 200ms, then add second key at T=200
      vi.advanceTimersByTime(200);
      cache.add("key2", "value2");

      // At T=200, both should exist
      expect(cache.get("key1")).toBe("value1");
      expect(cache.get("key2")).toBe("value2");

      // Advance to T=1001 (past 2*interval for key1)
      // key1 added at T=0: reap at T=1000 checks 0 < 1000-500 = 0 < 500 (true, reaped)
      // key2 added at T=200: reap at T=1000 checks 200 < 1000-500 = 200 < 500 (true, also reaped!)
      // Actually both will be reaped by T=1000+
      vi.advanceTimersByTime(801);
      expect(cache.get("key1")).toBe(undefined);
      // key2 was added at T=200, at T=1001: 200 < 1001-500 = 200 < 501 (true, reaped)
      expect(cache.get("key2")).toBe(undefined);

      cache.stopReapLoop();
    });

    test("recently added key survives while older key is reaped", () => {
      const interval = 500;
      const cache = new Cache(interval);

      // Add first key at T=0
      cache.add("key1", "value1");

      // Advance to T=600, then add second key
      vi.advanceTimersByTime(600);
      cache.add("key2", "value2");

      // At T=600, both exist (reap at T=500 checked: 0 < 500-500 = 0 < 0 = false)
      expect(cache.get("key1")).toBe("value1");
      expect(cache.get("key2")).toBe("value2");

      // Advance to T=1001
      // Reap at T=1000 checks:
      // - key1: 0 < 1000-500 = 0 < 500 (true, reaped)
      // - key2: 600 < 1000-500 = 600 < 500 (false, survives!)
      vi.advanceTimersByTime(401);
      expect(cache.get("key1")).toBe(undefined);
      expect(cache.get("key2")).toBe("value2"); // Still valid!

      // Advance to T=1501
      // Reap at T=1500 checks:
      // - key2: 600 < 1500-500 = 600 < 1000 (true, reaped)
      vi.advanceTimersByTime(500);
      expect(cache.get("key2")).toBe(undefined);

      cache.stopReapLoop();
    });
  });
});
