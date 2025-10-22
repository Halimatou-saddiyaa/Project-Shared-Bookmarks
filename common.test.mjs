import test from "node:test";
import assert from "node:assert";
import { getDisplayBookmarks, createBookmarkObject } from "./common.mjs";

test("getDisplayBookmarks returns sorted bookmarks", () => {
  const data = {
    bookmarks: [
      { title: "Old", created: "2023-01-01" },
      { title: "New", created: "2024-01-01" },
    ],
  };
  const sorted = getDisplayBookmarks(data).map((b) => b.title);
  assert.deepStrictEqual(sorted, ["New", "Old"]);
});

test("getDisplayBookmarks returns empty array for null data", () => {
  assert.deepStrictEqual(getDisplayBookmarks(null), []);
});
