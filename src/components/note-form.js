class NoteForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this._setupEventListener();
  }

  render() {
    this.innerHTML = `
      <form id="noteForm">
        <div class="form-group">
          <label for="title">Judul</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Masukkan judul catatan"
            required
          />
          <small class="error" id="titleError"></small>
        </div>

        <div class="form-group">
          <label for="body">Isi Catatan</label>
          <textarea
            id="body"
            name="body"
            rows="4"
            placeholder="Tuliskan isi catatan..."
            required
          ></textarea>
          <small class="error" id="bodyError"></small>
        </div>

        <button type="submit" disabled>Tambah Catatan</button>
      </form>
    `;
  }

  _setupEventListener() {
    const form = this.querySelector("#noteForm");
    const titleInput = this.querySelector("#title");
    const bodyInput = this.querySelector("#body");
    const submitButton = this.querySelector("button");

    const validateForm = () => {
      let isValid = true;

      if (titleInput.value.trim() === "") {
        this._showError("titleError", "Judul tidak boleh kosong");
        isValid = false;
      } else {
        this._showError("titleError", "");
      }

      if (bodyInput.value.trim().length < 5) {
        this._showError("bodyError", "Isi catatan minimal 5 karakter");
        isValid = false;
      } else {
        this._showError("bodyError", "");
      }

      submitButton.disabled = !isValid;
    };

    titleInput.addEventListener("input", validateForm);
    bodyInput.addEventListener("input", validateForm);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = titleInput.value;
      const body = bodyInput.value;

      try {
        submitButton.disabled = true;

        await fetch("https://notes-api.dicoding.dev/v2/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            body: body,
          }),
        });

        this.dispatchEvent(
          new CustomEvent("note-added", {
            bubbles: true,
          })
        );

        form.reset();
      } catch (error) {
        console.error("Gagal menambahkan catatan:", error);
      }
    });
  }

  _showError(elementId, message) {
    const errorElement = this.querySelector(`#${elementId}`);
    errorElement.textContent = message;
  }
}

if (!customElements.get("note-form")) {
  customElements.define("note-form", NoteForm);
}
