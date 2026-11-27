export class SlidingWindowRateLimiter {
  private readonly store = new Map<string, number[]>();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(options: { windowMs?: number; maxRequests?: number } = {}) {
    this.windowMs = options.windowMs ?? 60_000;
    this.maxRequests = options.maxRequests ?? 5;
  }

  isLimited(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    if (this.store.size > 500) {
      for (const [entryKey, timestamps] of this.store.entries()) {
        const active = timestamps.filter((ts) => ts > windowStart);
        if (active.length === 0) {
          this.store.delete(entryKey);
        } else {
          this.store.set(entryKey, active);
        }
      }
    }

    const history = (this.store.get(key) ?? []).filter((ts) => ts > windowStart);
    if (history.length >= this.maxRequests) {
      this.store.set(key, history);
      return true;
    }

    this.store.set(key, [...history, now]);
    return false;
  }
}
