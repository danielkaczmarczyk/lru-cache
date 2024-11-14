import { assertEquals } from "@std/assert";
import { LruCache } from "./main.ts";

Deno.test(function baseCase() {
  // create a cache with capacity 3
  const cache = LruCache(3);

  cache.put('name', 'fox');
  cache.put('last name', 'mulder');
  cache.put(
    'believes in',
    'the truth being out there'
  );


});
