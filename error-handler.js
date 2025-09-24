// =============================
// 404 Error Handler for Main Site
// =============================

// Function to check if a resource exists
async function checkResourceExists(url) {
	try {
		const response = await fetch(url, { method: 'HEAD' });
		return response.ok;
	} catch (error) {
		return false;
	}
}

// Function to redirect to 404 page with context
function redirectTo404(reason = 'not-found', originalUrl = '') {
	const params = new URLSearchParams();
	params.set('reason', reason);
	if (originalUrl) params.set('url', originalUrl);
	
	window.location.href = `404.html?${params.toString()}`;
}

// Enhanced link checker for the main site
function initLinkChecker() {
	// Check all internal links on page load
	document.addEventListener('DOMContentLoaded', () => {
		const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
		
		internalLinks.forEach(link => {
			link.addEventListener('click', async (e) => {
				const href = link.getAttribute('href');
				
				// Skip if it's an anchor link
				if (href.startsWith('#')) return;
				
				// Skip if it's an external link
				if (href.startsWith('http') && !href.includes(window.location.hostname)) return;
				
				// Check if the link exists (for static files)
				if (href.endsWith('.html') || href.endsWith('.pdf') || href.includes('.')) {
					const exists = await checkResourceExists(href);
					if (!exists) {
						e.preventDefault();
						redirectTo404('broken-link', href);
					}
				}
			});
		});
	});
}

// Function to handle AJAX 404 errors
function handleAjax404(xhr, originalUrl) {
	if (xhr.status === 404) {
		redirectTo404('ajax-error', originalUrl);
	}
}

// Function to handle image loading errors
function initImageErrorHandler() {
	document.addEventListener('DOMContentLoaded', () => {
		const images = document.querySelectorAll('img');
		
		images.forEach(img => {
			img.addEventListener('error', () => {
				console.warn(`Image not found: ${img.src}`);
				// Optionally redirect to 404 for critical images
				if (img.classList.contains('critical-image')) {
					redirectTo404('image-not-found', img.src);
				}
			});
		});
	});
}

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
	window.ErrorHandler = {
		checkResourceExists,
		redirectTo404,
		handleAjax404,
		initLinkChecker,
		initImageErrorHandler
	};
}