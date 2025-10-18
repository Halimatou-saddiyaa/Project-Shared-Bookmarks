// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData } from "./storage.js";

/*window.onload = function () {
  const users = getUserIds();
  document.querySelector("body").innerText = `There are ${users.length} users`;
}; */

const userSelect = document.getElementById("userSelect");
const container = document.getElementById("bookmarksContainer");

// --- Populate dropdown ---
const userIds = getUserIds();
userIds.forEach((id) => {
  const option = document.createElement("option");
  option.value = id;
  option.textContent = `User ${id}`;
  userSelect.appendChild(option);
});

// --- When user changes selection ---
userSelect.addEventListener("change", () => {
  const userId = userSelect.value;

  // If nothing is selected, clear the container
  if (!userId) {
    container.innerHTML = "<p>Please select a user.</p>";
    return;
  }

  const data = getData(userId);

  // If no data stored, show message
  if (!data || !data.bookmarks || data.bookmarks.length === 0) {
    container.innerHTML = "<p>This user has no bookmarks yet.</p>";
    return;
  }

  // Display the bookmarks
  container.innerHTML = sorted
    .map(
      (b) => `
        <div class="bookmark">
          <h3><a href="${b.url}" target="_blank">${b.title}</a></h3>
          <p>${b.description}</p>
          <small>Added on ${b.created}</small>
        </div>
      `
    )
    .join("");
});
