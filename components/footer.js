class CosmicFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-top: 4rem;
                }
                
                footer {
                    background: rgba(11, 13, 23, 0.9);
                    border-top: 1px solid rgba(99, 102, 241, 0.2);
                    padding: 3rem 1rem;
                }
                
                .container {
                    max-width: 80rem;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                }
                
                .brand {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .logo {
                    font-size: 1.25rem;
                    font-weight: bold;
                    background: linear-gradient(135deg, #818CF8, #FCD34D);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    text-decoration: none;
                }
                
                .tagline {
                    color: #6B7280;
                    font-size: 0.875rem;
                    line-height: 1.5;
                }
                
                .links h3 {
                    color: #FCD34D;
                    font-size: 0.875rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 1rem;
                }
                
                .links a {
                    display: block;
                    color: #9CA3AF;
                    text-decoration: none;
                    padding: 0.25rem 0;
                    transition: color 0.3s;
                    font-size: 0.875rem;
                }
                
                .links a:hover {
                    color: #818CF8;
                }
                
                .bottom {
                    max-width: 80rem;
                    margin: 2rem auto 0;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(99, 102, 241, 0.1);
                    text-align: center;
                    color: #6B7280;
                    font-size: 0.875rem;
                }
                
                .social {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .social a {
                    color: #9CA3AF;
                    transition: color 0.3s;
                }
                
                .social a:hover {
                    color: #FCD34D;
                }
            </style>
            
            <footer>
                <div class="container">
                    <div class="brand">
                        <a href="index.html" class="logo">
                            <span>🌌</span>
                            <span>The Unasked Cosmos</span>
                        </a>
                        <p class="tagline">
                            A sanctuary for questions that have never been asked. 
                            Exploring the infinite void of human curiosity since 2024.
                        </p>
                        <div class="social">
                            <a href="#" title="Twitter"><i data-feather="twitter" style="width: 20px; height: 20px;"></i></a>
                            <a href="#" title="GitHub"><i data-feather="github" style="width: 20px; height: 20px;"></i></a>
                            <a href="#" title="Share"><i data-feather="share-2" style="width: 20px; height: 20px;"></i></a>
                        </div>
                    </div>
                    
                    <div class="links">
                        <h3>Explore</h3>
                        <a href="#generator">Question Generator</a>
                        <a href="#submit">Submit Question</a>
                        <a href="#gallery">Browse Collection</a>
                        <a href="#">Random Question</a>
                    </div>
                    
                    <div class="links">
                        <h3>Categories</h3>
                        <a href="#" onclick="filterQuestions('cosmic')">Cosmic & Existential</a>
                        <a href="#" onclick="filterQuestions('abstract')">Abstract & Philosophical</a>
                        <a href="#" onclick="filterQuestions('nature')">Nature & Organic</a>
                        <a href="#" onclick="filterQuestions('emotion')">Emotions & Feelings</a>
                    </div>
                    
                    <div class="links">
                        <h3>About</h3>
                        <a href="#">Our Mission</a>
                        <a href="#">The Algorithm</a>
                        <a href="#">Contribute</a>
                        <a href="#">Privacy</a>
                    </div>
                </div>
                
                <div class="bottom">
                    <p>Made with 🌌 for the curious minds of Earth and beyond.</p>
                    <p style="margin-top: 0.5rem; font-size: 0.75rem;">
                        No cookies. No tracking. Just questions.
                    </p>
                </div>
            </footer>
        `;
        
        if (window.feather) {
            feather.replace({}, this.shadowRoot);
        }
    }
}

customElements.define('cosmic-footer', CosmicFooter);
