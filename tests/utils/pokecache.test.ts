import { Cache } from "../../src/utils/pokecache.js";
import { test, expect, describe } from "vitest";

describe("Cache", () => {
  test.concurrent.each([
    {
      key: "https://example.com",
      val: "testdata",
      interval: 500, // 1/2 second
    },
    {
      key: "https://example.com/path",
      val: "moretestdata",
      interval: 1000, // 1 second
    },
  ])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);

    await new Promise((resolve) => setTimeout(resolve, interval + 100));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);

    cache.stopReapLoop();
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
    test("returns cached value before interval expires", async () => {
      const interval = 500;
      const cache = new Cache(interval);

      cache.add("key", "cached-value");

      // Check multiple times before interval expires
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(cache.get("key")).toBe("cached-value");

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(cache.get("key")).toBe("cached-value");

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(cache.get("key")).toBe("cached-value");

      // Still within interval (300ms elapsed, interval is 500ms)
      expect(cache.get("key")).toBe("cached-value");

      cache.stopReapLoop();
    });

    test("returns undefined after interval expires and reap runs", async () => {
      const interval = 300;
      const cache = new Cache(interval);

      cache.add("key", "will-expire");

      // Immediately after adding, value should exist
      expect(cache.get("key")).toBe("will-expire");

      // Wait for interval + buffer to ensure reap has run
      await new Promise((resolve) => setTimeout(resolve, interval + 150));

      // After reap, value should be cleared
      expect(cache.get("key")).toBe(undefined);

      cache.stopReapLoop();
    });

    test("simulates fetch pattern: cache hit before expiry, cache miss after", async () => {
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

      // First fetch - cache miss, fetches new data
      const result1 = fetchData("api/endpoint");
      expect(result1).toBe("data-fetch-1");
      expect(fetchCount).toBe(1);

      // Second fetch before interval - cache hit
      await new Promise((resolve) => setTimeout(resolve, 100));
      const result2 = fetchData("api/endpoint");
      expect(result2).toBe("data-fetch-1"); // Same cached value
      expect(fetchCount).toBe(1); // No new fetch

      // Third fetch still before interval - cache hit
      await new Promise((resolve) => setTimeout(resolve, 100));
      const result3 = fetchData("api/endpoint");
      expect(result3).toBe("data-fetch-1");
      expect(fetchCount).toBe(1);

      // Wait for cache to expire
      await new Promise((resolve) => setTimeout(resolve, interval + 150));

      // Fourth fetch after interval - cache miss, fetches new data
      const result4 = fetchData("api/endpoint");
      expect(result4).toBe("data-fetch-2"); // New fetched value
      expect(fetchCount).toBe(2); // New fetch occurred

      cache.stopReapLoop();
    });
  });
});