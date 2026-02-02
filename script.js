// Starfield generation
function createStarfield() {
    const container = document.getElementById('starfield');
    const starCount = window.innerWidth < 640 ? 20 : 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const opacity = Math.random() * 0.7 + 0.3;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.setProperty('--opacity', opacity);
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(star);
    }
}

// Question Generator Logic
const subjects = [
    'shadows', 'clouds', 'memories', 'silence', 'dreams', 'stars', 'echoes', 'mirrors',
    'raindrops', 'whispers', 'fossils', 'rainbows', 'thunder', 'snowflakes', 'embers',
    'tides', 'constellations', 'dust', 'photographs', 'melodies', 'ruins', 'seeds',
    'volcanoes', 'icicles', 'butterflies', 'neurons', 'galaxies', 'quarks', 'echoes',
    'reflections', 'afterimages', 'reverberations', 'crystals', 'magma', 'auroras'
];

const verbs = [
    'dream of', 'remember', 'forget', 'yearn for', 'fear', 'love', 'hate', 'envy',
    'mourn', 'celebrate', 'doubt', 'believe in', 'whisper to', 'scream at', 'dance with',
    'cry for', 'laugh at', 'question', 'accept', 'reject', 'transform into', 'dissolve into',
    'emerge from', 'return to', 'escape from', 'chase', 'avoid', 'embrace', 'resist',
    'become', 'unbecome', 'remember being', 'anticipate', 'regret', 'hope for'
];

const objects = [
    'being light', 'their past selves', 'the future', 'nothingness', 'infinity',
    'human touch', 'digital souls', 'ancient winds', 'unborn children', 'forgotten languages',
    'parallel universes', 'the color of sound', 'the weight of time', 'invisible boundaries',
    'quantum entanglement', 'poetic justice', 'mathematical beauty', 'chaotic order',
    'silent symphonies', 'frozen flames', 'liquid thoughts', 'solid air', 'eternal moments',
    'temporary eternities', 'conscious stones', 'sleeping giants', 'awake dreams',
    'the spaces between', 'the edges of circles', 'the centers of peripheries'
];

const prefixes = [
    'If', 'Do', 'Can', 'Would', 'Might', 'Should', 'How do', 'Why do', 'When do',
    'Where do', 'What if', 'Imagine if', 'Suppose', 'Consider: do', 'Wonder if'
];

function generateQuestion() {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const object = objects[Math.floor(Math.random() * objects.length)];
    
    const question = `${prefix} ${subject} ${verb} ${object}?`;
    
    const display = document.getElementById('generated-question');
    display.style.opacity = '0';
    
    setTimeout(() => {
        display.textContent = `"${question}"`;
        display.style.opacity = '1';
    }, 300);
    
    return question;
}

function saveGeneratedQuestion() {
    const questionText = document.getElementById('generated-question').textContent.replace(/"/g, '');
    if (questionText && !questionText.includes('Click the button')) {
        addQuestion(questionText, 'The Void', 'abstract');
        showNotification('Question saved to the collective!');
    }
}

// Local Storage Management
function getQuestions() {
    const stored = localStorage.getItem('cosmicQuestions');
    return stored ? JSON.parse(stored) : [];
}

function saveQuestions(questions) {
    localStorage.setItem('cosmicQuestions', JSON.stringify(questions));
    updateCounts();
}

function addQuestion(text, author, category) {
    const questions = getQuestions();
    const newQuestion = {
        id: Date.now(),
        text: text,
        author: author || 'Anonymous Wanderer',
        category: category || 'other',
        timestamp: new Date().toISOString(),
        likes: 0
    };
    
    questions.unshift(newQuestion);
    saveQuestions(questions);
    renderQuestions();
}

function likeQuestion(id) {
    const questions = getQuestions();
    const question = questions.find(q => q.id === id);
    if (question) {
        question.likes++;
        saveQuestions(questions);
        renderQuestions();
    }
}

function deleteQuestion(id) {
    const questions = getQuestions();
    const filtered = questions.filter(q => q.id !== id);
    saveQuestions(filtered);
    renderQuestions();
}

// Rendering
function renderQuestions(filter = 'all') {
    const grid = document.getElementById('questions-grid');
    const emptyState = document.getElementById('empty-state');
    const questions = getQuestions();
    
    const filtered = filter === 'all' ? questions : questions.filter(q => q.category === filter);
    
    if (filtered.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    grid.innerHTML = filtered.map(q => `
        <cosmic-question-card 
            id="${q.id}"
            text="${q.text.replace(/"/g, '&quot;')}"
            author="${q.author}"
            category="${q.category}"
            likes="${q.likes}"
            timestamp="${q.timestamp}"
        ></cosmic-question-card>
    `).join('');
    
    feather.replace();
}

function filterQuestions(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-nebula-600', 'text-white');
        btn.classList.add('bg-cosmic-700', 'text-gray-300');
    });
    
    event.target.classList.remove('bg-cosmic-700', 'text-gray-300');
    event.target.classList.add('bg-nebula-600', 'text-white');
    
    renderQuestions(category);
}

// Form Handling
document.addEventListener('DOMContentLoaded', () => {
    createStarfield();
    renderQuestions();
    updateCounts();
    
    // Form submission
    const form = document.getElementById('question-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const text = document.getElementById('question-input').value.trim();
        const author = document.getElementById('name-input').value.trim();
        const category = document.getElementById('category-input').value;
        
        if (!text) return;
        
        addQuestion(text, author, category);
        
        // Reset form
        form.reset();
        showNotification('Your question has been released into the cosmos!');
        
        // Scroll to gallery
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Generate initial question
    setTimeout(generateQuestion, 1000);
});

// Utility Functions
function scrollToGenerator() {
    document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
}

function scrollToSubmit() {
    document.getElementById('submit').scrollIntoView({ behavior: 'smooth' });
}

function updateCounts() {
    const questions = getQuestions();
    document.getElementById('question-count').textContent = questions.length;
    
    // Simulate visitor count based on questions + random base
    const baseVisitors = 1337;
    document.getElementById('visitor-count').textContent = baseVisitors + questions.length * 3;
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'fixed bottom-8 right-8 bg-nebula-600 text-white px-6 py-4 rounded-lg shadow-2xl z-50 transform translate-y-20 opacity-0 transition-all duration-300 flex items-center gap-3';
    notif.innerHTML = `<i data-feather="check-circle" class="w-5 h-5"></i><span>${message}</span>`;
    
    document.body.appendChild(notif);
    feather.replace();
    
    setTimeout(() => {
        notif.classList.remove('translate-y-20', 'opacity-0');
    }, 100);
    
    setTimeout(() => {
        notif.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Parallax effect for starfield
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const stars = document.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        const speed = (index % 5 + 1) * 0.2;
        star.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
