class NoteList extends HTMLElement {
  set notes(notes) {
    this._notes = notes;
    this.render();
  }

  render() {
    this.innerHTML = "";

    if (!this._notes || this._notes.length === 0) {
      this.innerHTML = "<p>No notes available</p>";
      return;
    }

    const container = document.createElement("div");
    container.classList.add("notes-container");

    this._notes.forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.note = note;
      this.appendChild(noteItem); 
    });

    this.appendChild(container);
  }
}

if (!customElements.get("note-list")) {
  customElements.define("note-list", NoteList);
}
