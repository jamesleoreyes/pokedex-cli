type CacheEntry<T> = {
  val: T;
  createdAt: number;
}

class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  };

  add<T>(key: string, val: T) {
    this.#cache.set(key, { val, createdAt: Date.now() })
  };

  get<T>(key: string): T | undefined {
    const entry = this.#cache.get(key);
    if (!entry) return undefined;
    return entry.val;
  };

  #reap() {
    for (const [key, value] of this.#cache) {
      if (value.createdAt < Date.now() - this.#interval) {
        this.#cache.delete(key);
      };
    };
  };

  #startReapLoop() {
    const id = setInterval(() => {
      this.#reap();
    }, this.#interval);
    this.#reapIntervalId = id;
  };

  stopReapLoop() {
    if (this.#reapIntervalId !== undefined) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    };
  };
};

export { Cache };