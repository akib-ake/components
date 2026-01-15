class MainHeader extends HTMLElement {
    connectedCallback() {
        // GitHub Pages Path Logic
        const path = window.location.pathname.split('/')[1];
        const isGitHub = window.location.hostname.includes('github.io');
        const base = isGitHub ? `/${path}` : '';

        // Attributes
        const logoText = this.getAttribute('logo-text') || 'VELOX UI';
        
        this.innerHTML = `
        <style>
            :host { display: block; }
            .v-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 5%;
                background-color: #1e293b; /* Slate 900 */
                color: #f8fafc;
                font-family: 'Inter', system-ui, sans-serif;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                position: sticky;
                top: 0;
                z-index: 1000;
            }
            .v-logo {
                font-size: 1.5rem;
                font-weight: 800;
                letter-spacing: -0.025em;
                color: #f8fafc;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .v-logo span { color: #3b82f6; /* Royal Blue */ }
            
            .v-nav { display: flex; gap: 1.5rem; align-items: center; }
            
            .v-nav ::slotted(a) {
                color: #cbd5e1;
                text-decoration: none;
                font-size: 0.95rem;
                font-weight: 500;
                transition: color 0.2s;
            }
            .v-nav ::slotted(a:hover) { color: #ffffff; }

            /* Professional Button inside Nav */
            .v-nav ::slotted(a.v-cta) {
                background: #2563eb;
                color: white;
                padding: 8px 16px;
                border-radius: 6px;
            }

            @media (max-width: 768px) {
                .v-nav { display: none; } /* Basic hidden menu for mobile */
            }
        </style>
        
        <header class="v-header">
            <a href="${base}/index.html" class="v-logo">
                <span>⚡</span> ${logoText}
            </a>
            <nav class="v-nav">
                <slot></slot> </nav>
        </header>
        `;
    }
}

customElements.define('main-header', VeloxHeader);