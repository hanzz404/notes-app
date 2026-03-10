import { deleteNote, archiveNote, unarchiveNote } from "../api/notes-api.js";

class NoteItem extends HTMLElement {
  set note(value) {
    this._note = value;
    this.render();
  }

  render() {
    const date = new Date(this._note.createdAt).toLocaleString();
    const isArchived = this._note.archived;

    this.innerHTML = `
      <div class="note-card">
        <h3>${this._note.title}</h3>
        <p>${this._note.body}</p>

        <div class="date">${date}</div>

        <div class="actions">
          <button class="archive-btn">
            ${isArchived ? "Unarchive" : "Archive"}
          </button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    `;

    this.querySelector(".delete-btn").addEventListener("click", async () => {
      await deleteNote(this._note.id);

      this.dispatchEvent(new CustomEvent("note-deleted", { bubbles: true }));
    });

    this.querySelector(".archive-btn").addEventListener("click", async () => {
      if (this._note.archived) {
        await unarchiveNote(this._note.id);
      } else {
        await archiveNote(this._note.id);
      }

      this.dispatchEvent(new CustomEvent("note-archived", { bubbles: true }));
    });
  }
}

if (!customElements.get("note-item")) {
  customElements.define("note-item", NoteItem);
}
