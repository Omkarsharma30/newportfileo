// =============================
// Utility Helpers
// =============================
const qs = (sel, ctx=document) => ctx.querySelector(sel);
const qsa = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// =============================
// Theme Toggle
// =============================
const root = document.documentElement;
const themeToggleBtn = qs('#themeToggle');
const THEME_KEY = 'preferred-theme';

function setTheme(mode){
	if(!['light','dark'].includes(mode)) return;
	root.setAttribute('data-theme', mode);
	localStorage.setItem(THEME_KEY, mode);
	if(themeToggleBtn){
		const iconSpan = themeToggleBtn.querySelector('.icon');
		if(iconSpan) iconSpan.textContent = mode === 'dark' ? '🌙' : '☀️';
	}
}

function initTheme(){
	const stored = localStorage.getItem(THEME_KEY);
	if(stored){ setTheme(stored); return; }
	// Always default to dark theme regardless of browser preference
	setTheme('dark');
}

themeToggleBtn?.addEventListener('click', ()=> {
	const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
	setTheme(current === 'dark' ? 'light' : 'dark');
});

// =============================
// Reveal on Scroll
// =============================
function initReveal(){
	const revealEls = qsa('[data-reveal]');
	if(!('IntersectionObserver' in window)){ // fallback
		revealEls.forEach(el => el.classList.add('revealed'));
		return;
	}
	const obs = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if(entry.isIntersecting){
				entry.target.classList.add('revealed');
				obs.unobserve(entry.target);
			}
		});
	}, { threshold: 0.2 });
	revealEls.forEach(el => obs.observe(el));
}

// =============================
// Floating Navbar with Auto-Hide
// =============================
function initFloatingNavbar(){
	const nav = qs('.navbar');
	if(!nav) return;
	
	let lastScrollY = window.scrollY;
	let isNavVisible = true;
	
	// Add floating class initially
	nav.classList.add('navbar-floating');
	
	function handleScroll() {
		const currentScrollY = window.scrollY;
		const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
		const scrollThreshold = 100;
		
		// Apply background blur when scrolled
		if(currentScrollY > 24){ 
			nav.classList.add('navbar-scrolled'); 
		} else { 
			nav.classList.remove('navbar-scrolled'); 
		}
		
		// Auto-hide navigation when scrolling down, show when scrolling up
		if (currentScrollY > scrollThreshold) {
			if (scrollDirection === 'down' && isNavVisible) {
				nav.classList.add('navbar-hidden');
				isNavVisible = false;
			} else if (scrollDirection === 'up' && !isNavVisible) {
				nav.classList.remove('navbar-hidden');
				isNavVisible = true;
			}
		} else {
			// Always show navbar when near top
			nav.classList.remove('navbar-hidden');
			isNavVisible = true;
		}
		
		lastScrollY = currentScrollY;
	}
	
	// Throttle scroll events for better performance
	let ticking = false;
	function requestTick() {
		if (!ticking) {
			requestAnimationFrame(() => {
				handleScroll();
				ticking = false;
			});
			ticking = true;
		}
	}
	
	window.addEventListener('scroll', requestTick, { passive: true });
	
	// Show navbar on mouse movement near top
	document.addEventListener('mousemove', (e) => {
		if (e.clientY <= 80 && !isNavVisible && window.scrollY > 100) {
			nav.classList.remove('navbar-hidden');
			isNavVisible = true;
		}
	});
}

// =============================
// Active Navigation
// =============================
function initActiveNav() {
	const sections = qsa('section[id]');
	const navLinks = qsa('.navbar-nav .nav-link');
	
	if (!sections.length || !navLinks.length) return;
	
	function updateActiveNav() {
		const scrollPosition = window.scrollY + window.innerHeight / 4;
		
		// Find the current section
		sections.forEach(section => {
			const sectionTop = section.offsetTop - 100; // Offset to trigger earlier
			const sectionBottom = sectionTop + section.offsetHeight;
			const sectionId = section.getAttribute('id');
			
			if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
				// Remove active class from all links
				navLinks.forEach(link => link.classList.remove('active'));
				
				// Add active class to corresponding nav link
				const activeLink = qs(`.navbar-nav .nav-link[href="#${sectionId}"]`);
				if (activeLink) activeLink.classList.add('active');
			}
		});
	}
	
	// Initial check
	updateActiveNav();
	
	// Update on scroll
	window.addEventListener('scroll', updateActiveNav, { passive: true });
}

// =============================
// Contact Form with Web3Forms
// =============================
function initContactForm(){
	const form = qs('#contactForm');
	const result = qs('#result');
	const submitBtn = qs('#submitBtn');
	
	if(!form) return;
	
	// Add live validation on input blur
	qsa('input, textarea, select', form).forEach(field => {
		field.addEventListener('blur', function() {
			validateField(this);
		});
	});
	
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		
		// Validate form
		let valid = validateForm();
		
		if(!valid) {
			showFormAlert('Please fix the highlighted fields before submitting.', 'danger');
			return;
		}
		
		// Show loading state
		submitBtn.disabled = true;
		submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
		showFormAlert('Sending your message...', 'info');
		
		// Prepare form data
		const formData = new FormData(form);
		const object = Object.fromEntries(formData);
		
		// Add current page URL to help identify which site the form was submitted from
		object.pageURL = window.location.href;
		
		// Add captcha protection timestamp
		object.timestamp = new Date().toISOString();
		
		const json = JSON.stringify(object);
		
		// Submit to Web3Forms
		fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: json
		})
		.then(async (response) => {
			let json = await response.json();
			if (response.status == 200) {
				showFormAlert('✅ Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
				form.reset();
				// Remove validation classes after successful submission
				qsa('.is-invalid, .is-valid', form).forEach(inp => {
					inp.classList.remove('is-invalid', 'is-valid');
				});
				
				// Track successful submission (if you have analytics)
				if (typeof gtag === 'function') {
					gtag('event', 'form_submission', {
						'event_category': 'Contact',
						'event_label': 'Contact Form'
					});
				}
			} else {
				console.log(response);
				showFormAlert('❌ ' + (json.message || 'Something went wrong. Please try again.'), 'danger');
			}
		})
		.catch(error => {
			console.log(error);
			showFormAlert('❌ Network error. Please check your connection and try again.', 'danger');
		})
		.finally(() => {
			// Reset button state
			submitBtn.disabled = false;
			submitBtn.innerHTML = '<i class="bi bi-send me-2"></i>Send Message';
			
			// Scroll to form result if not visible
			if (result && !result.classList.contains('d-none')) {
				const resultRect = result.getBoundingClientRect();
				const isVisible = (
					resultRect.top >= 0 &&
					resultRect.bottom <= window.innerHeight
				);
				
				if (!isVisible) {
					result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
				}
			}
			
			// Auto-hide success message after 8 seconds
			setTimeout(() => {
				if(result && !result.classList.contains('d-none') && result.classList.contains('alert-success')) {
					result.classList.add('d-none');
				}
			}, 8000);
		});
	});
	
	// Validate a single field
	function validateField(field) {
		if (!field.hasAttribute('required')) return true;
		
		// Remove existing validation states
		field.classList.remove('is-invalid', 'is-valid');
		
		let valid = true;
		
		// Empty check
		if (!field.value.trim()) {
			field.classList.add('is-invalid');
			valid = false;
		} 
		// Email validation
		else if (field.type === 'email') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(field.value.trim())) {
				field.classList.add('is-invalid');
				valid = false;
			}
		}
		// Phone validation (optional)
		else if (field.type === 'tel' && field.value.trim()) {
			const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
			if (!phoneRegex.test(field.value.trim())) {
				field.classList.add('is-invalid');
				valid = false;
			}
		}
		
		// Add valid class if it passed validation
		if (valid && field.value.trim()) {
			field.classList.add('is-valid');
		}
		
		return valid;
	}
	
	// Validate all form fields
	function validateForm() {
		let formValid = true;
		
		// Validate each required field
		qsa('[required]', form).forEach(field => {
			if (!validateField(field)) {
				formValid = false;
			}
		});
		
		return formValid;
	}

	function showFormAlert(msg, type = 'info') {
		if(!result) return;
		result.className = `form-alert alert alert-${type} mt-3`;
		result.innerHTML = msg;
		result.classList.remove('d-none');
		
		// Auto-hide error messages after 6 seconds
		if(type === 'danger' || type === 'warning') {
			setTimeout(() => {
				result.classList.add('d-none');
			}, 6000);
		}
	}
}

// =============================
// Dynamic Year
// =============================
function setYear(){
	const y = qs('#year');
	if(y) y.textContent = new Date().getFullYear();
}

// =============================
// Back to Top Button
// =============================
function initBackToTop() {
	const backToTopBtn = qs('#backToTop');
	if (!backToTopBtn) return;

	// Show button when scrolling down beyond 300px
	function toggleBackToTopButton() {
		if (window.scrollY > 300) {
			backToTopBtn.classList.add('visible');
		} else {
			backToTopBtn.classList.remove('visible');
		}
	}

	// Scroll to top when clicked
	backToTopBtn.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	// Initial check and add scroll listener
	toggleBackToTopButton();
	window.addEventListener('scroll', toggleBackToTopButton, { passive: true });
}

// =============================
// Resume PDF Viewer
// =============================
function initResumePDFViewer() {
	// Create PDF modal if it doesn't exist
	if (!qs('#resumeModal')) {
		const modalHTML = `
			<div class="modal fade resume-modal" id="resumeModal" tabindex="-1" aria-labelledby="resumeModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-xl">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="resumeModalLabel">
								<i class="bi bi-file-earmark-person me-2"></i>Resume - Omkar Kumar Sharma
							</h5>
							<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body position-relative">
							<div class="pdf-controls d-none d-md-flex">
								<a href="documents/Omkar_Kumar_Sharma_Resume.pdf" target="_blank" class="btn btn-sm" title="Open in new tab">
									<i class="bi bi-box-arrow-up-right"></i>
								</a>
								<a href="documents/Omkar_Kumar_Sharma_Resume.pdf" download="Omkar_Kumar_Sharma_Resume.pdf" class="btn btn-sm" title="Download PDF">
									<i class="bi bi-download"></i>
								</a>
							</div>
							<div class="pdf-loading" id="pdfLoading">
								<div class="spinner-border" role="status">
									<span class="visually-hidden">Loading...</span>
								</div>
								<p>Loading Resume...</p>
							</div>
							<iframe id="pdfViewer" class="pdf-viewer" style="display: none;" 
									src="documents/Omkar_Kumar_Sharma_Resume.pdf#toolbar=1&navpanes=0&scrollbar=1&page=1&view=FitH"
									title="Omkar Kumar Sharma Resume">
							</iframe>
						</div>
					</div>
				</div>
			</div>
		`;
		document.body.insertAdjacentHTML('beforeend', modalHTML);
	}
	
	// Handle PDF loading
	const pdfViewer = qs('#pdfViewer');
	const pdfLoading = qs('#pdfLoading');
	
	if (pdfViewer && pdfLoading) {
		pdfViewer.addEventListener('load', () => {
			pdfLoading.style.display = 'none';
			pdfViewer.style.display = 'block';
		});
		
		// Reset when modal is closed
		const modal = qs('#resumeModal');
		if (modal) {
			modal.addEventListener('hidden.bs.modal', () => {
				pdfLoading.style.display = 'flex';
				pdfViewer.style.display = 'none';
				// Reset iframe src to reload when reopened
				const currentSrc = pdfViewer.src;
				pdfViewer.src = '';
				setTimeout(() => pdfViewer.src = currentSrc, 100);
			});
		}
	}
	
	// Handle resume link clicks
	document.addEventListener('click', (e) => {
		const resumeLink = e.target.closest('[href="#resume"], [href="index.html#resume"]');
		if (resumeLink && (resumeLink.textContent.toLowerCase().includes('resume') || resumeLink.textContent.toLowerCase().includes('view resume'))) {
			e.preventDefault();
			const modal = new bootstrap.Modal(qs('#resumeModal'));
			modal.show();
		}
	});
}

// =============================
// Time Display
// =============================
function initTimeDisplay() {
	const timeEl = qs('#currentTime');
	if(!timeEl) return;
	
	function updateTime() {
		const now = new Date();
		const hours = now.getHours().toString().padStart(2, '0');
		const minutes = now.getMinutes().toString().padStart(2, '0');
		const seconds = now.getSeconds().toString().padStart(2, '0');
		timeEl.innerHTML = `<span class="time-hour-min">${hours}:${minutes}</span><span class="time-seconds">:${seconds}</span>`;
	}
	
	// Update time immediately and then every second for real-time display
	updateTime();
	setInterval(updateTime, 1000);
}

// =============================
// Init
// =============================
window.addEventListener('DOMContentLoaded', () => {
	initTheme();
	initReveal();
	initFloatingNavbar();
	initActiveNav();
	initContactForm();
	initBackToTop();
	initTimeDisplay();
	initResumePDFViewer();
	setYear();
	
	// Generate CSRF token for Web3Forms (extra security)
	const csrfToken = document.querySelector('input[name="csrf_token"]');
	if (csrfToken) {
		csrfToken.value = generateCSRFToken();
	}
});

// Generate a random CSRF token
function generateCSRFToken() {
	return Array(32).fill(0).map(() => 
		Math.random().toString(36).charAt(2)
	).join('');
}

// Accessibility: remove invalid class on input
document.addEventListener('input', e => {
	if(e.target.matches('.is-invalid')) e.target.classList.remove('is-invalid');
});

