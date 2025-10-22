// Sort bookmarks in reverse chronological order
export function sortBookmarks(bookmarks) {
  if (!Array.isArray(bookmarks)) return [];
  return [...bookmarks].sort(
    (a, b) => new Date(b.created) - new Date(a.created)
  );
}

// Create a new bookmark with the current date
export function createBookmarkObject(url, title, description) {
  return {
    url: url.trim(),
    title: title.trim(),
    description: description.trim(),
    created: new Date().toISOString().split("T")[0],
  };
}

// Extract and sort bookmarks from stored data.
export function getDisplayBookmarks(data) {
  if (!data || !Array.isArray(data.bookmarks)) return [];
  return sortBookmarks(data.bookmarks);
}
