
class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="loading-overlay">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
    `;
  }
}

if (!customElements.get("loading-indicator")) {
  customElements.define("loading-indicator", LoadingIndicator);
}
