class XShowcase extends HTMLElement {
    async connectedCallback() {
        const title = this.getAttribute('title') || 'Component Name';
        const description = this.getAttribute('description') || 'Description goes here.';
        const gif = this.getAttribute('gif') || '';
        const sourceFile = this.getAttribute('source'); // e.g. "code/button-code.txt"
        const lineStart = parseInt(this.getAttribute('line-start')) || 0;
        const lineEnd = parseInt(this.getAttribute('line-end')) || 100;

        this.innerHTML = `
        <style>
            .v-showcase-card {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                overflow: hidden;
                font-family: 'Inter', sans-serif;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                margin-bottom: 2rem;
            }
            .v-preview-area {
                background: #f8fafc;
                padding: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid #e2e8f0;
            }
            .v-preview-area img { max-width: 100%; border-radius: 8px; }
            
            .v-content { padding: 24px; }
            .v-content h3 { margin: 0 0 8px 0; color: #1e293b; font-size: 1.5rem; }
            .v-content p { color: #64748b; margin-bottom: 20px; line-height: 1.6; }

            .v-code-btn {
                background: #2563eb;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                transition: background 0.2s;
            }
            .v-code-btn:hover { background: #1d4ed8; }

            .v-code-display {
                display: none;
                background: #1e293b;
                color: #e2e8f0;
                padding: 15px;
                margin-top: 15px;
                border-radius: 6px;
                font-family: 'Fira Code', monospace;
                font-size: 13px;
                overflow-x: auto;
                white-space: pre;
            }
        </style>

        <div class="v-showcase-card">
            <div class="v-preview-area">
                ${gif ? `<img src="${gif}" alt="${title} Preview">` : 'No Preview Available'}
            </div>
            <div class="v-content">
                <h3>${title}</h3>
                <p>${description}</p>
                <button class="v-code-btn">View Code Snippet</button>
                <div class="v-code-display">Loading code...</div>
            </div>
        </div>
        `;

        const btn = this.querySelector('.v-code-btn');
        const display = this.querySelector('.v-code-display');

        btn.addEventListener('click', async () => {
            if (display.style.display === 'block') {
                display.style.display = 'none';
                return;
            }

            display.style.display = 'block';
            
            try {
                const response = await fetch(sourceFile);
                const text = await response.text();
                const lines = text.split('\n');
                // Extract only the specific lines (Adjusting for 0-based index)
                const snippet = lines.slice(lineStart - 1, lineEnd).join('\n');
                display.textContent = snippet;
            } catch (err) {
                display.textContent = "Error loading code file.";
            }
        });
    }
}

customElements.define('x-showcase', XShowcase);