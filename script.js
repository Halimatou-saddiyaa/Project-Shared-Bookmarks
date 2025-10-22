import { getUserIds, getData, setData } from "./storage.js";
import {
  sortBookmarks,
  createBookmarkObject,
  getDisplayBookmarks,
} from "./common.mjs";

window.onload = function () {
  // --- Basic setup for readability only ---
  document.body.style.fontFamily = "sans-serif";
  document.body.style.margin = "20px";

  // --- Get references to DOM elements ---
  const userSelect = document.getElementById("userSelect");
  const container = document.getElementById("bookmarksContainer");
  const form = document.getElementById("bookmarkForm");
  const urlInput = document.getElementById("urlInput");
  const titleInput = document.getElementById("titleInput");
  const descInput = document.getElementById("descInput");

  // Create a message element under the dropdown
  const userMessage = document.createElement("p");
  userMessage.style.color = "darkred";
  userSelect.insertAdjacentElement("afterend", userMessage);

  // --- Populate dropdown with user IDs ---
  const userIds = getUserIds();
  userIds.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    userSelect.appendChild(option);
  });

  // --- Display bookmarks for selected user ---
  function displayBookmarks(userId) {
    container.textContent = ""; // clear old bookmarks

    const data = getData(userId);

    // If no data stored, show message
    const sortedBookmarks = getDisplayBookmarks(data);

    if (sortedBookmarks.length === 0) {
      const msg = document.createElement("p");
      msg.textContent = "This user has no bookmarks yet.";
      container.appendChild(msg);
      return;
    }

    // Create DOM nodes for each bookmark
    sortedBookmarks.forEach((b) => {
      const div = document.createElement("div");
      div.style.border = "1px solid #ccc";
      div.style.padding = "10px";
      div.style.marginTop = "10px";

      const title = document.createElement("h3");
      const link = document.createElement("a");
      link.href = b.url;
      link.target = "_blank";
      link.textContent = b.title;
      title.appendChild(link);

      const desc = document.createElement("p");
      desc.textContent = b.description;

      const date = document.createElement("small");
      date.textContent = `Added on ${b.created}`;

      div.append(title, desc, date);
      container.appendChild(div);
    });
  }

  // --- When user changes selection ---
  userSelect.addEventListener("change", () => {
    const userId = userSelect.value;

    // If nothing is selected, clear the container
    if (!userId) {
      userMessage.textContent = "Please select a user.";
      container.textContent = "";
    } else {
      userMessage.textContent = "";
      displayBookmarks(userId);
    }
  });

  // --- Handle form submission ---
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // stop page reload
    const userId = userSelect.value;

    // If no user selected, show message
    if (!userId) {
      userMessage.textContent = "Please select a user.";
      return;
    }

    // Get data from form fields
    const newBookmark = createBookmarkObject(
      urlInput.value,
      titleInput.value,
      descInput.value
    );

    // Get existing data or create a new object
    const data = getData(userId) || { bookmarks: [] };
    data.bookmarks.push(newBookmark);

    // Save it back
    setData(userId, data);

    // Reset form
    form.reset();

    // Refresh list
    displayBookmarks(userId);
  });
};
