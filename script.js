import { getUserIds, getData, setData } from "./storage.js";
import {
  sortBookmarks,
  createBookmarkObject,
  getDisplayBookmarks,
} from "./common.mjs";

window.onload = function () {
  // Basic page styling
  document.body.style.fontFamily = "sans-serif";
  document.body.style.margin = "20px";

  // DOM element references
  const userSelect = document.getElementById("userSelect");
  const container = document.getElementById("bookmarksContainer");
  const form = document.getElementById("bookmarkForm");
  const urlInput = document.getElementById("urlInput");
  const titleInput = document.getElementById("titleInput");
  const descInput = document.getElementById("descInput");

  // Message element for user
  const userMessage = document.createElement("p");
  userMessage.style.color = "darkred";
  userSelect.insertAdjacentElement("afterend", userMessage);

  // Populate dropdown with users
  const userIds = getUserIds();
  userIds.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    userSelect.appendChild(option);
  });

  // Display bookmarks for selected user
  function displayBookmarks(userId) {
    container.textContent = "";
    const data = getData(userId);
    const sortedBookmarks = getDisplayBookmarks(data);

    if (sortedBookmarks.length === 0) {
      const msg = document.createElement("p");
      msg.textContent = "This user has no bookmarks yet.";
      container.appendChild(msg);
      return;
    }

    // Create DOM elements for each bookmark
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

  // Handle user selection change
  userSelect.addEventListener("change", () => {
    const userId = userSelect.value;
    if (!userId) {
      userMessage.textContent = "Please select a user.";
      container.textContent = "";
    } else {
      userMessage.textContent = "";
      displayBookmarks(userId);
    }
  });

  // Handle form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const userId = userSelect.value;

    if (!userId) {
      userMessage.textContent = "Please select a user.";
      return;
    }

    const newBookmark = createBookmarkObject(
      urlInput.value,
      titleInput.value,
      descInput.value
    );

    const data = getData(userId) || { bookmarks: [] };
    data.bookmarks.push(newBookmark);
    setData(userId, data);

    form.reset();
    displayBookmarks(userId);
  });
};
