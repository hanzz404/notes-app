class AppBar extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "Notes App";

    this.innerHTML = `
      <header class="app-bar">
        <h1>${title}</h1>
      </header>
    `;
  }
}


if (!customElements.get("app-bar")) {
  customElements.define("app-bar", AppBar);
}
