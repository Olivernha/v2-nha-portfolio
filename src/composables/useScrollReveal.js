/**
 * useScrollReveal — lightweight IntersectionObserver-based scroll animation
 * No external dependencies. Uses CSS custom properties for stagger delays.
 */

let observer = null;

function getObserver() {
	if (!observer) {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('sr-visible');
						// Once visible, stop watching (one-shot)
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
		);
	}
	return observer;
}

/**
 * Call this in mounted() to register all [data-sr] elements inside a root el.
 * @param {HTMLElement|string} root - element or CSS selector
 */
export function revealAll(root) {
	const el = typeof root === 'string' ? document.querySelector(root) : root;
	if (!el) return;
	const obs = getObserver();
	el.querySelectorAll('[data-sr]').forEach((node, i) => {
		// Apply stagger delay via CSS var
		const delay = node.dataset.srDelay || i * 80;
		node.style.setProperty('--sr-delay', `${delay}ms`);
		obs.observe(node);
	});
}

/**
 * Observe a single element.
 */
export function reveal(el, delay = 0) {
	if (!el) return;
	el.style.setProperty('--sr-delay', `${delay}ms`);
	getObserver().observe(el);
}

/**
 * Split text into word spans for word-by-word reveal.
 * Returns the wrapper element.
 */
export function splitWords(el, baseDelay = 0, step = 60) {
	if (!el) return;
	const text = el.textContent;
	const words = text.split(' ');
	el.innerHTML = words
		.map(
			(w, i) =>
				`<span class="word-wrap"><span class="word" data-sr data-sr-type="word" style="--sr-delay:${baseDelay + i * step}ms">${w}</span></span>`
		)
		.join(' ');
}
