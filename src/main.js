
import "./styles/style.css";

import {
  getNotes,
  getArchivedNotes
} from "./api/notes-api.js";

import "./components/app-bar.js";
import "./components/note-form.js";
import "./components/note-list.js";
import "./components/note-item.js";
import "./components/loading-indicator.js";

document.addEventListener("DOMContentLoaded", async () => {
  const activeList = document.querySelector("#active-notes");
  const archivedList = document.querySelector("#archived-notes");

  async function loadNotes() {
    showLoading(true);

    try {
      const notes = await getNotes();
      const archived = await getArchivedNotes();

      activeList.notes = notes;
      archivedList.notes = archived;
    } catch (error) {
      console.error("Gagal mengambil catatan:", error);
    }

    showLoading(false);
  }

  await loadNotes();

  document.addEventListener("note-added", loadNotes);
  document.addEventListener("note-deleted", loadNotes);
  document.addEventListener("note-archived", loadNotes);
});

function showLoading(isLoading) {
  let loading = document.querySelector("loading-indicator");

  if (isLoading) {
    if (!loading) {
      loading = document.createElement("loading-indicator");
      document.body.appendChild(loading);
    }
  } else {
    loading?.remove();
  }
}

