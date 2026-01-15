class XGrid extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
            .v-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 30px;
                padding: 20px;
            }
        </style>
        <div class="v-grid">
            <slot></slot>
        </div>
        `;
    }
}
customElements.define('x-grid', XGrid);