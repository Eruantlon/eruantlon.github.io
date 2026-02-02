class CosmicQuestionCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['text', 'author', 'category', 'likes', 'timestamp', 'id'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    getCategoryColor(category) {
        const colors = {
            cosmic: 'badge-cosmic',
            abstract: 'badge-abstract',
            nature: 'badge-nature',
            emotion: 'badge-emotion',
            time: 'badge-time',
            other: 'badge-other'
        };
        return colors[category] || colors.other;
    }

    getCategoryLabel(category) {
        const labels = {
            cosmic: 'Cosmic',
            abstract: 'Abstract',
            nature: 'Nature',
            emotion: 'Emotion',
            time: 'Time',
            other: 'Uncharted'
        };
        return labels[category] || 'Uncharted';
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
        return date.toLocaleDateString();
    }

    render() {
        const text = this.getAttribute('text') || '';
        const author = this.getAttribute('author') || 'Anonymous';
        const category = this.getAttribute('category') || 'other';
        const likes = parseInt(this.getAttribute('likes')) || 0;
        const timestamp = this.getAttribute('timestamp') || new Date().toISOString();
        const id = this.getAttribute('id');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                .card {
                    background: rgba(30, 37, 71, 0.6);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(99, 102, 241, 0.2);
                    border-radius: 1rem;
                    padding: 1.5rem;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                
                .card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent);
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.3);
                    border-color: rgba(99, 102, 241, 0.4);
                }
                
                .card:hover::before {
                    opacity: 1;
                }
                
                .question-text {
                    font-size: 1.125rem;
                    line-height: 1.6;
                    color: #E5E7EB;
                    font-style: italic;
                    margin-bottom: 1rem;
                    position: relative;
                    padding-left: 1rem;
                    border-left: 3px solid rgba(252, 211, 77, 0.5);
                }
                
                .meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: auto;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(99, 102, 241, 0.1);
                }
                
                .author {
                    font-size: 0.875rem;
                    color: #9CA3AF;
                }
                
                .category-badge {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                .badge-cosmic { background: rgba(99, 102, 241, 0.2); color: #818CF8; border: 1px solid rgba(99, 102, 241, 0.3); }
                .badge-abstract { background: rgba(251, 191, 36, 0.2); color: #FBBF24; border: 1px solid rgba(251, 191, 36, 0.3); }
                .badge-nature { background: rgba(52, 211, 153, 0.2); color: #34D399; border: 1px solid rgba(52, 211, 153, 0.3); }
                .badge-emotion { background: rgba(244, 114, 182, 0.2); color: #F472B6; border: 1px solid rgba(244, 114, 182, 0.3); }
                .badge-time { background: rgba(167, 139, 250, 0.2); color: #A78BFA; border: 1px solid rgba(167, 139, 250, 0.3); }
                .badge-other { background: rgba(156, 163, 175, 0.2); color: #9CA3AF; border: 1px solid rgba(156, 163, 175, 0.3); }
                
                .actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 0.75rem;
                }
                
                .btn-icon {
                    background: transparent;
                    border: 1px solid rgba(99, 102, 241, 0.3);
                    color: #9CA3AF;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    font-size: 0.875rem;
                }
                
                .btn-icon:hover {
                    background: rgba(99, 102, 241, 0.1);
                    color: #FCD34D;
                    border-color: rgba(252, 211, 77, 0.5);
                }
                
                .btn-icon.liked {
                    color: #F472B6;
                    border-color: rgba(244, 114, 182, 0.5);
                }
                
                .time {
                    font-size: 0.75rem;
                    color: #6B7280;
                    margin-top: 0.5rem;
                }
            </style>
            
            <div class="card">
                <div>
                    <div class="question-text">"${text}"</div>
                    <div class="category-badge ${this.getCategoryColor(category)}">
                        ${this.getCategoryLabel(category)}
                    </div>
                </div>
                
                <div>
                    <div class="time">${this.formatDate(timestamp)}</div>
                    <div class="meta">
                        <span class="author">— ${author}</span>
                        <div class="actions">
                            <button class="btn-icon ${likes > 0 ? 'liked' : ''}" onclick="likeQuestion(${id})">
                                <i data-feather="heart" style="width: 16px; height: 16px;"></i>
                                <span>${likes}</span>
                            </button>
                            <button class="btn-icon" onclick="deleteQuestion(${id})" title="Remove from cosmos">
                                <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        if (window.feather) {
            feather.replace({}, this.shadowRoot);
        }
    }
}

customElements.define('cosmic-question-card', CosmicQuestionCard);
