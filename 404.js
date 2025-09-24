// =============================
// 404 Page Interactive Features
// =============================

// Funny construction jokes and messages
const constructionJokes = [
	"🔨 This page is still under construction... literally!",
	"🏗️ Oops! Looks like our blueprint was upside down!",
	"🚧 Page not found! Our excavator must have dug too deep.",
	"⚠️ Error 404: Page ran away to the construction site!",
	"🧱 This URL seems to have fallen through the scaffolding!",
	"🎯 We hit everything except the right page target!",
	"🔧 Even our best engineers couldn't find this page!",
	"📐 The measurements were perfect, but the page disappeared!",
	"🏠 This page is probably still in the planning phase!",
	"⛑️ Safety first! This page wore a hard hat and vanished!"
];

const funnyReasons = [
	"The page went for a coffee break and never came back",
	"Our intern accidentally used it as blueprint paper",
	"It got buried under virtual concrete",
	"The page is on a site inspection tour",
	"It's probably stuck in traffic at a construction zone",
	"The page got promoted and moved to a different server",
	"It's hiding behind a safety cone somewhere",
	"The page is attending a mandatory safety meeting"
];

// =============================
// Theme Management
// =============================
function initTheme() {
	const themeToggle = document.getElementById('themeToggle');
	const html = document.documentElement;
	
	// Check for saved theme preference or default to 'dark'
	const currentTheme = localStorage.getItem('theme') || 'dark';
	html.setAttribute('data-theme', currentTheme);
	updateThemeIcon(currentTheme);
	
	themeToggle?.addEventListener('click', () => {
		const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
		html.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
		updateThemeIcon(newTheme);
		
		// Add theme switch sound effect
		playSound('switch');
	});
}

function updateThemeIcon(theme) {
	const icon = document.querySelector('#themeToggle .icon');
	if (icon) {
		icon.textContent = theme === 'dark' ? '☀️' : '🌙';
	}
}

// =============================
// Funny Interactive Elements
// =============================
function initFunnyElements() {
	// Random joke on page load
	displayRandomJoke();
	
	// Funny reason generator
	setupReasonGenerator();
	
	// Interactive construction sounds
	setupConstructionSounds();
	
	// Bouncing construction worker
	createBouncingWorker();
	
	// Floating tools animation
	createFloatingTools();
	
	// Clickable Easter eggs
	setupEasterEggs();
	
	// Progress bar joke
	setupFakeProgressBar();
}

function displayRandomJoke() {
	const jokeElement = document.getElementById('construction-joke');
	if (jokeElement) {
		const randomJoke = constructionJokes[Math.floor(Math.random() * constructionJokes.length)];
		jokeElement.innerHTML = randomJoke;
		
		// Add typing animation
		typeWriter(jokeElement, randomJoke, 50);
	}
}

function setupReasonGenerator() {
	const reasonButton = document.getElementById('reason-generator');
	const reasonText = document.getElementById('funny-reason');
	
	if (reasonButton && reasonText) {
		reasonButton.addEventListener('click', () => {
			const randomReason = funnyReasons[Math.floor(Math.random() * funnyReasons.length)];
			reasonText.innerHTML = `<i class="bi bi-lightbulb"></i> ${randomReason}`;
			
			// Add shake animation to button
			reasonButton.classList.add('shake-animation');
			setTimeout(() => reasonButton.classList.remove('shake-animation'), 500);
			
			playSound('click');
		});
	}
}

function setupConstructionSounds() {
	const soundButtons = document.querySelectorAll('[data-sound]');
	
	soundButtons.forEach(button => {
		button.addEventListener('click', () => {
			const sound = button.dataset.sound;
			playSound(sound);
			
			// Add visual feedback
			button.style.transform = 'scale(0.95)';
			setTimeout(() => button.style.transform = 'scale(1)', 150);
		});
	});
}

function createBouncingWorker() {
	const workerContainer = document.getElementById('bouncing-worker');
	if (workerContainer) {
		workerContainer.innerHTML = `
			<div class="construction-worker">
				<i class="bi bi-person-hard-hat"></i>
			</div>
		`;
		
		// Add click interaction
		const worker = workerContainer.querySelector('.construction-worker');
		worker.addEventListener('click', () => {
			worker.style.animation = 'none';
			setTimeout(() => {
				worker.style.animation = 'bounce 1s ease-in-out infinite';
			}, 10);
			
			// Show speech bubble
			showSpeechBubble(worker, "I'm looking for that page too! 🔍");
			playSound('bounce');
		});
	}
}

function createFloatingTools() {
	const toolsContainer = document.getElementById('floating-tools');
	if (toolsContainer) {
		const tools = ['🔨', '🔧', '⚒️', '🪚', '📐', '📏'];
		
		tools.forEach((tool, index) => {
			const toolElement = document.createElement('div');
			toolElement.className = 'floating-tool';
			toolElement.innerHTML = tool;
			toolElement.style.animationDelay = `${index * 0.5}s`;
			toolsContainer.appendChild(toolElement);
			
			// Make tools clickable
			toolElement.addEventListener('click', () => {
				toolElement.style.transform = 'scale(1.5) rotate(360deg)';
				setTimeout(() => {
					toolElement.style.transform = 'scale(1) rotate(0deg)';
				}, 300);
				playSound('tool');
			});
		});
	}
}

function setupEasterEggs() {
	// Secret konami code
	let konamiCode = [];
	const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
	
	document.addEventListener('keydown', (e) => {
		konamiCode.push(e.keyCode);
		if (konamiCode.length > konamiSequence.length) {
			konamiCode.shift();
		}
		
		if (konamiCode.toString() === konamiSequence.toString()) {
			activateSecretMode();
		}
	});
	
	// Click counter easter egg
	let clickCount = 0;
	const errorNumber = document.querySelector('.error-number');
	if (errorNumber) {
		errorNumber.addEventListener('click', () => {
			clickCount++;
			if (clickCount === 10) {
				showConfetti();
				playSound('celebration');
				showSpeechBubble(errorNumber, "🎉 You found the secret! You're persistent like a good engineer!");
			}
		});
	}
}

function setupFakeProgressBar() {
	const progressContainer = document.getElementById('fake-progress');
	if (progressContainer) {
		progressContainer.innerHTML = `
			<div class="mb-2">
				<small class="text-secondary">
					<i class="bi bi-search"></i> Searching for your page...
				</small>
			</div>
			<div class="progress" style="height: 10px; border-radius: 5px;">
				<div class="progress-bar progress-bar-striped progress-bar-animated" 
					 role="progressbar" style="width: 0%; background: var(--gradient-text);" id="search-progress"></div>
			</div>
			<div class="mt-2">
				<small class="text-secondary" id="progress-text">
					<i class="bi bi-gear-wide-connected"></i> Initializing excavation equipment...
				</small>
			</div>
		`;
		
		startFakeProgress();
	}
}

function startFakeProgress() {
	const progressBar = document.getElementById('search-progress');
	const progressText = document.getElementById('progress-text');
	
	const stages = [
		{ progress: 10, text: "Checking blueprint archives..." },
		{ progress: 25, text: "Consulting site supervisor..." },
		{ progress: 40, text: "Digging through server foundations..." },
		{ progress: 60, text: "Asking the construction crew..." },
		{ progress: 80, text: "Looking behind the safety cones..." },
		{ progress: 95, text: "Checking the porta-potty... 🚽" },
		{ progress: 100, text: "Nope! Definitely not found! 😅" }
	];
	
	let currentStage = 0;
	
	const interval = setInterval(() => {
		if (currentStage < stages.length) {
			const stage = stages[currentStage];
			progressBar.style.width = `${stage.progress}%`;
			progressText.innerHTML = stage.text;
			
			if (stage.progress === 100) {
				setTimeout(() => {
					progressBar.classList.add('bg-danger');
					playSound('error');
				}, 500);
			}
			
			currentStage++;
		} else {
			clearInterval(interval);
		}
	}, 1000);
}

// =============================
// Animation and Effects
// =============================
function initReveal() {
	const reveals = document.querySelectorAll('[data-reveal]');
	
	const revealObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.animation = 'revealUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
				revealObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.1 });
	
	reveals.forEach(el => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(30px)';
		revealObserver.observe(el);
	});
}

function typeWriter(element, text, speed = 100) {
	let i = 0;
	element.innerHTML = '';
	
	function type() {
		if (i < text.length) {
			element.innerHTML += text.charAt(i);
			i++;
			setTimeout(type, speed);
		}
	}
	
	type();
}

function showSpeechBubble(element, message) {
	const bubble = document.createElement('div');
	bubble.className = 'speech-bubble';
	bubble.innerHTML = message;
	
	element.appendChild(bubble);
	
	setTimeout(() => {
		bubble.remove();
	}, 3000);
}

function showConfetti() {
	// Simple confetti effect
	for (let i = 0; i < 50; i++) {
		createConfettiPiece();
	}
}

function createConfettiPiece() {
	const confetti = document.createElement('div');
	confetti.className = 'confetti-piece';
	confetti.innerHTML = ['🎉', '🎊', '✨', '🌟'][Math.floor(Math.random() * 4)];
	confetti.style.left = Math.random() * 100 + 'vw';
	confetti.style.animationDelay = Math.random() * 3 + 's';
	
	document.body.appendChild(confetti);
	
	setTimeout(() => {
		confetti.remove();
	}, 3000);
}

function activateSecretMode() {
	document.body.classList.add('secret-mode');
	const message = document.createElement('div');
	message.className = 'secret-message';
	message.innerHTML = `
		<h3>🎉 SECRET ENGINEER MODE ACTIVATED! 🎉</h3>
		<p>You've unlocked the legendary patience of a civil engineer!</p>
	`;
	document.body.appendChild(message);
	
	setTimeout(() => {
		message.remove();
		document.body.classList.remove('secret-mode');
	}, 5000);
}

// =============================
// Sound Effects (Web Audio API)
// =============================
function playSound(type) {
	// Create audio context for sound effects
	const audioContext = new (window.AudioContext || window.webkitAudioContext)();
	
	const sounds = {
		click: { frequency: 800, duration: 100 },
		switch: { frequency: 600, duration: 150 },
		bounce: { frequency: 400, duration: 200 },
		tool: { frequency: 1000, duration: 100 },
		error: { frequency: 200, duration: 300 },
		celebration: { frequency: 800, duration: 500 }
	};
	
	const sound = sounds[type];
	if (!sound) return;
	
	const oscillator = audioContext.createOscillator();
	const gainNode = audioContext.createGain();
	
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);
	
	oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime);
	oscillator.type = 'sine';
	
	gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
	gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration / 1000);
	
	oscillator.start(audioContext.currentTime);
	oscillator.stop(audioContext.currentTime + sound.duration / 1000);
}

// =============================
// Utility Functions
// =============================
function setYear() {
	const yearElement = document.getElementById('year');
	if (yearElement) {
		yearElement.textContent = new Date().getFullYear();
	}
}

function getRandomColor() {
	const colors = ['#4aa3ff', '#8f67ff', '#ffb347', '#ff6b6b', '#4ecdc4', '#45b7d1'];
	return colors[Math.floor(Math.random() * colors.length)];
}

// =============================
// Page Not Found Detection
// =============================
function detectPageNotFound() {
	// Check if we're on the 404 page due to an actual 404 error
	const urlParams = new URLSearchParams(window.location.search);
	const referrer = document.referrer;
	const currentPath = window.location.pathname;
	
	// Log the 404 occurrence for analytics
	if (typeof gtag === 'function') {
		gtag('event', 'page_not_found', {
			'event_category': '404_Error',
			'event_label': currentPath,
			'custom_parameter_1': referrer
		});
	}
	
	// Show different messages based on how user got here
	if (referrer && referrer.includes(window.location.hostname)) {
		updateErrorMessage('internal');
	} else if (referrer) {
		updateErrorMessage('external');
	} else {
		updateErrorMessage('direct');
	}
}

function updateErrorMessage(source) {
	const messageMap = {
		'internal': {
			title: 'Oops! Internal Link Issue',
			subtitle: 'Looks like one of our internal links needs repair!'
		},
		'external': {
			title: 'Welcome! Page Moved',
			subtitle: 'The page you\'re looking for might have been relocated.'
		},
		'direct': {
			title: 'Page Under Construction',
			subtitle: 'This page is currently being built or doesn\'t exist yet.'
		}
	};
	
	const message = messageMap[source] || messageMap['direct'];
	const titleElement = document.querySelector('.error-card h1');
	const subtitleElement = document.querySelector('.error-card .lead');
	
	if (titleElement) {
		titleElement.innerHTML = `<span class="text-gradient">${message.title}</span>`;
	}
	
	if (subtitleElement) {
		subtitleElement.textContent = message.subtitle;
	}
}

// =============================
// Enhanced Navigation
// =============================
function setupSmartNavigation() {
	// Add breadcrumb-like navigation hints
	const currentPath = window.location.pathname;
	const pathSegments = currentPath.split('/').filter(segment => segment);
	
	if (pathSegments.length > 0) {
		createNavigationHints(pathSegments);
	}
	
	// Add back button functionality
	if (history.length > 1) {
		addBackButton();
	}
}

function createNavigationHints(segments) {
	const hintsContainer = document.createElement('div');
	hintsContainer.className = 'navigation-hints mt-3 mb-4';
	hintsContainer.innerHTML = `
		<div class="small text-secondary mb-2">
			<i class="bi bi-signpost-2"></i> You were looking for:
		</div>
		<div class="path-segments d-flex flex-wrap justify-content-center gap-2">
			${segments.map(segment => `
				<span class="badge bg-secondary-subtle text-secondary">
					${segment.replace(/[-_]/g, ' ')}
				</span>
			`).join('')}
		</div>
	`;
	
	const errorCard = document.querySelector('.error-card');
	const leadParagraph = errorCard.querySelector('.lead');
	if (leadParagraph) {
		leadParagraph.after(hintsContainer);
	}
}

function addBackButton() {
	const backBtn = document.createElement('button');
	backBtn.className = 'btn btn-outline-secondary btn-sm me-2';
	backBtn.innerHTML = '<i class="bi bi-arrow-left me-1"></i>Go Back';
	backBtn.onclick = () => history.back();
	
	const buttonContainer = document.querySelector('.d-flex.flex-column.flex-sm-row');
	if (buttonContainer) {
		buttonContainer.insertBefore(backBtn, buttonContainer.firstChild);
	}
}

// =============================
// Page Initialization
// =============================
document.addEventListener('DOMContentLoaded', () => {
	initTheme();
	initReveal();
	initFunnyElements();
	setYear();
	detectPageNotFound();
	setupSmartNavigation();
	
	// Add some delayed animations
	setTimeout(() => {
		const tools = document.querySelectorAll('.floating-tool');
		tools.forEach((tool, index) => {
			setTimeout(() => {
				tool.style.opacity = '1';
				tool.style.transform = 'translateY(0)';
			}, index * 200);
		});
	}, 1000);
	
	// Add loading state removal
	document.body.classList.add('loaded');
});

// =============================
// Error Handling
// =============================
window.addEventListener('error', (e) => {
	console.log('Even our 404 page has a sense of humor about errors! 😄');
});

// Add keyboard shortcuts for fun
document.addEventListener('keydown', (e) => {
	if (e.ctrlKey && e.key === 'h') {
		e.preventDefault();
		window.location.href = 'index.html';
	}
	
	if (e.key === 'Escape') {
		// Clear all animations and reset page
		document.querySelectorAll('.floating-tool').forEach(tool => {
			tool.style.animation = 'none';
		});
	}
});