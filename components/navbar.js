class CosmicNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: sticky;
                    top: 0;
                    z-index: 50;
                }
                
                nav {
                    background: rgba(11, 13, 23, 0.8);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(99, 102, 241, 0.2);
                    transition: all 0.3s ease;
                }
                
                .nav-link {
                    position: relative;
                    color: #9CA3AF;
                    transition: color 0.3s ease;
                    text-decoration: none;
                    font-weight: 500;
                }
                
                .nav-link:hover {
                    color: #FCD34D;
                }
                
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #6366F1, #FCD34D);
                    transition: width 0.3s ease;
                }
                
                .nav-link:hover::after {
                    width: 100%;
                }
                
                .logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                    background: linear-gradient(135deg, #818CF8, #FCD34D);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                @media (max-width: 768px) {
                    .desktop-menu {
                        display: none;
                    }
                    .mobile-menu-btn {
                        display: block;
                    }
                }
                
                @media (min-width: 769px) {
                    .mobile-menu-btn {
                        display: none;
                    }
                }
                
                .mobile-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(21, 25, 50, 0.95);
                    backdrop-filter: blur(12px);
                    border-top: 1px solid rgba(99, 102, 241, 0.2);
                    padding: 1rem;
                }
                
                .mobile-menu.active {
                    display: block;
                }
                
                .mobile-link {
                    display: block;
                    padding: 0.75rem 1rem;
                    color: #9CA3AF;
                    text-decoration: none;
                    border-radius: 0.5rem;
                    transition: all 0.3s;
                }
                
                .mobile-link:hover {
                    background: rgba(99, 102, 241, 0.1);
                    color: #FCD34D;
                }
            </style>
            
            <nav class="w-full px-4 sm:px-6 lg:px-8 py-4">
                <div class="max-w-7xl mx-auto flex justify-between items-center">
                    <a href="index.html" class="logo">
                        <span>🌌</span>
                        <span>The Unasked Cosmos</span>
                    </a>
                    
                    <div class="desktop-menu flex items-center gap-8">
                        <a href="#generator" class="nav-link">Generator</a>
                        <a href="#submit" class="nav-link">Submit</a>
                        <a href="#gallery" class="nav-link">Explore</a>
                        <a href="https://github.com/public-apis/public-apis" target="_blank" class="nav-link flex items-center gap-1">
                            API <i data-feather="external-link" style="width: 14px; height: 14px;"></i>
                        </a>
                    </div>
                    
                    <button class="mobile-menu-btn text-gray-300 hover:text-white" onclick="this.nextElementSibling.classList.toggle('active')">
                        <i data-feather="menu" style="width: 24px; height: 24px;"></i>
                    </button>
                    
                    <div class="mobile-menu">
                        <a href="#generator" class="mobile-link" onclick="this.parentElement.classList.remove('active')">Generator</a>
                        <a href="#submit" class="mobile-link" onclick="this.parentElement.classList.remove('active')">Submit</a>
                        <a href="#gallery" class="mobile-link" onclick="this.parentElement.classList.remove('active')">Explore</a>
                    </div>
                </div>
            </nav>
        `;
        
        // Initialize feather icons in shadow DOM
        if (window.feather) {
            feather.replace({ 
                width: 14, 
                height: 14,
                'stroke-width': 2
            }, this.shadowRoot);
        }
    }
}

customElements.define('cosmic-navbar', CosmicNavbar);
