import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { LruCache } from "./main.ts";

describe("the lru cache", () => {
  describe("maintains correct length", () => {
    const cache = LruCache(3);
    cache.put("name", "fox");
    cache.put("last name", "mulder");
    cache.put(
      "believes in",
      "the truth being out there",
    );

    it("when the number of items is at capacity", () => {
      expect(cache.getLength()).toBe(3);
      expect(cache.peek("queue")).toEqual([
        "name",
        "last name",
        "believes in",
      ]);
    });

    it("when adding values over capacity", () => {
      cache.put("partner", "dana scully");
      expect(cache.getLength()).toBe(3);
      expect(cache.peek("queue")).toEqual([
        "last name",
        "believes in",
        "partner",
      ]);
    });
  });

  describe("correctly reorders recently accessed items", () => {
    const cache = LruCache(3);
    cache.put("name", "fox");
    cache.put("last name", "mulder");
    cache.put(
      "believes in",
      "the truth being out there",
    );

    cache.get("name");
    expect(cache.peek("queue")).toEqual(["last name", "believes in", "name"]);

    cache.get("last name");
    expect(cache.peek("queue")).toEqual(["believes in", "name", "last name"]);

    cache.get("name");
    expect(cache.peek("queue")).toEqual(["believes in", "last name", "name"]);
  });
});
