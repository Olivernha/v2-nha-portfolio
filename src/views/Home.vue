<script>
import feather from 'feather-icons';
import projects from '../data/projects';
import ScrambleText from '../components/ScrambleText.vue';
import { revealAll } from '../composables/useScrollReveal.js';
import certificates from '../data/certificates.js';
import HorizontalJourney from '../components/HorizontalJourney.vue';
import SkillsSection from '../components/SkillsSection.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
	name: 'Home',
	components: { 
		ScrambleText,
		HorizontalJourney,
		SkillsSection
	},
	props: ['showModal'],
	data: () => ({
		projects,
		heroVisible: false,
		scrollY: 0,
		theme: localStorage.getItem('theme') || 'dark',
		activeProjectIndex: 0,
		certificates: certificates,
		scrollTriggers: []
	}),
	mounted() {
		feather.replace();
		setTimeout(() => { this.heroVisible = true; }, 80);
		window.addEventListener('scroll', this.onScroll, { passive: true });
		this.$nextTick(() => {
			revealAll(this.$el);
			this.setupProjectObserver();
			this.initGSAPReveals();
		});
	},
	beforeUnmount() {
		window.removeEventListener('scroll', this.onScroll);
		if (this.projectObserver) {
			this.projectObserver.disconnect();
		}
		this.scrollTriggers.forEach(t => t.kill());
	},
	updated() { feather.replace(); },
	methods: {
		onScroll() {
			this.scrollY = window.scrollY;
		},
		formatIndex(index) {
			return String(index + 1).padStart(2, '0');
		},
		setupProjectObserver() {
			const options = {
				root: null,
				rootMargin: '-30% 0px -40% 0px',
				threshold: 0.1
			};
			this.projectObserver = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const index = parseInt(entry.target.getAttribute('data-project-index'), 10);
						this.activeProjectIndex = index;
					}
				});
			}, options);

			const cards = this.$el.querySelectorAll('.project-card-observe');
			cards.forEach(card => this.projectObserver.observe(card));
		},
		initGSAPReveals() {
			const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			if (prefersReducedMotion) return;

			// Global section reveals (fade + translate + scale reveal)
			const reveals = this.$el.querySelectorAll('.gsap-reveal');
			reveals.forEach((el) => {
				const anim = gsap.fromTo(el,
					{ opacity: 0, y: 50, scale: 0.98 },
					{
						opacity: 1,
						y: 0,
						scale: 1,
						duration: 0.8,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: el,
							start: 'top 85%',
							toggleActions: 'play none none reverse'
						}
					}
				);
				this.scrollTriggers.push(anim.scrollTrigger);
			});
		},
		handleMouseMove(e) {
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
			const card = e.currentTarget;
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			
			const rotateX = -(y - centerY) / 15;
			const rotateY = (x - centerX) / 15;
			
			gsap.to(card, {
				rotateX: rotateX,
				rotateY: rotateY,
				scale: 1.01,
				duration: 0.3,
				ease: 'power2.out',
				transformPerspective: 1000
			});
		},
		handleMouseLeave(e) {
			const card = e.currentTarget;
			gsap.to(card, {
				rotateX: 0,
				rotateY: 0,
				scale: 1,
				duration: 0.5,
				ease: 'power2.out'
			});
		}
	},
};
</script>

<template>
	<div>

		<!-- ═══════════════════════════════════════════
		SECTION 1 — HERO
		═══════════════════════════════════════════ -->
		<section id="hero" class="hero-section relative overflow-hidden">

			<!-- Subtle dot grid -->
			<div class="absolute inset-0 pointer-events-none dot-grid"></div>

			<!-- Top meta row -->
			<div class="max-w-7xl mx-auto px-6 w-full flex items-center justify-between pt-8 relative z-10">
				<span class="hero-label section-label">Full-Stack Developer · Singapore</span>
				<div class="hero-label flex items-center gap-2" style="animation-delay:0.3s;">
					<span class="avail-dot"></span>
					<span class="font-general-medium text-xs tracking-widest uppercase" style="color:var(--c-dim);">Open to work</span>
				</div>
			</div>

			<!-- Giant editorial headline -->
			<div class="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center py-8 relative z-10"
				:style="{ transform: `translateY(${scrollY * 0.08}px)` }">

				<!-- Line 1: WRITING -->
				<div class="hero-line-wrap">
					<span
						class="hero-word font-general-bold uppercase"
						:style="{
							opacity: heroVisible ? 1 : 0,
							transform: heroVisible ? 'translateY(0)' : 'translateY(80px)',
							transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
						}"
					>TRANSFORM</span>
					<!-- Floating inline image -->
					<span
						class="hero-inline-img"
						:style="{
							opacity: heroVisible ? 1 : 0,
							transition: 'opacity 0.6s ease 0.5s',
						}"
					>
						<img src="@/assets/images/developer.svg" alt="" class="hero-float-img img-tilt-1" />
					</span>
				</div>

				<!-- Line 2: CODES + spinning circle -->
				<div class="hero-line-wrap">
					<span
						class="hero-word font-general-bold uppercase"
						:style="{
							opacity: heroVisible ? 1 : 0,
							transform: heroVisible ? 'translateY(0)' : 'translateY(80px)',
							transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s',
						}"
					>IDEAS</span>
					<!-- Spinning circle badge -->
					<span
						class="hero-spin-wrap"
						:style="{
							opacity: heroVisible ? 1 : 0,
							transition: 'opacity 0.6s ease 0.6s',
						}"
					>
						<svg class="spin-slow" viewBox="0 0 120 120" width="100" height="100" aria-hidden="true">
							<defs>
								<path id="circle-path" d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
							</defs>
							<text class="spin-text font-general-medium">
								<textPath href="#circle-path" startOffset="0%">
									FULL STACK DEV · SINGAPORE · OPEN TO WORK ·
								</textPath>
							</text>
							<circle cx="60" cy="60" r="6" fill="var(--c-lime)" />
						</svg>
					</span>
				</div>

				<!-- Line 3: THAT I'M + profile image -->
				<div class="hero-line-wrap">
					<span
						class="hero-word font-general-bold uppercase"
						:style="{
							opacity: heroVisible ? 1 : 0,
							transform: heroVisible ? 'translateY(0)' : 'translateY(80px)',
							transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s',
						}"
					>INTO REALITY</span>
					<span
						class="hero-inline-img hero-profile-wrap"
						:style="{
							opacity: heroVisible ? 1 : 0,
							transition: 'opacity 0.6s ease 0.7s',
						}"
					>
						<img src="@/assets/images/profile.jpg" alt="Nay Htet Aung" class="hero-profile-img img-tilt-2" />
					</span>
				</div>

				<!-- Line 4: PROUD OF (outline) -->
				<div class="hero-line-wrap">
					<span
						class="hero-word hero-word-outline font-general-bold uppercase"
						:style="{
							opacity: heroVisible ? 1 : 0,
							transform: heroVisible ? 'translateY(0)' : 'translateY(80px)',
							transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s',
						}"
					>THROUGH CODE</span>
				</div>

				<!-- Sub row -->
				<div class="mt-10 flex flex-col sm:flex-row sm:items-center gap-5"
					:style="{
						opacity: heroVisible ? 1 : 0,
						transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
						transition: 'opacity 0.8s ease 0.9s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.9s',
					}">
					<p class="font-general-regular text-base max-w-sm leading-relaxed" style="color:var(--c-dim);">
						Building fast, accessible, and beautiful web experiences from Singapore.
					</p>
					<div class="flex gap-3 flex-wrap">
						<a download="Oliver-Resume.pdf" href="/files/Oliver-Resume.pdf" class="btn-primary">
							<i data-feather="download" class="w-4 h-4"></i>
							Download CV
						</a>
						<a href="#work" class="btn-ghost">
							View Work
							<i data-feather="arrow-down" class="w-4 h-4"></i>
						</a>
					</div>
				</div>
			</div>

			<!-- Scroll indicator -->
			<div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
				:style="{ opacity: heroVisible ? 1 : 0, transition: 'opacity 0.6s ease 1.4s' }">
				<span class="font-general-medium text-xs tracking-widest uppercase" style="color:var(--c-muted);">Scroll</span>
				<div class="scroll-line"></div>
			</div>
		</section>

		<!-- Marquee ticker -->
		<div class="w-full overflow-hidden py-4 relative z-10" style="border-top:1px solid var(--c-border); border-bottom:1px solid var(--c-border);">
			<div class="marquee-track">
				<span v-for="(t, i) in ['Vue.js','React','Node.js','JavaScript','Laravel','HTML & CSS','UI/UX','REST APIs','Vue.js','React','Node.js','JavaScript','Laravel','HTML & CSS','UI/UX','REST APIs']" :key="i"
					class="inline-flex items-center gap-4 px-6 font-general-medium text-sm whitespace-nowrap"
					style="color:var(--c-muted);">
					{{ t }}
					<span style="color:var(--c-lime); font-size:1rem;">✦</span>
				</span>
			</div>
		</div>

		<!-- ═══════════════════════════════════════════
		SECTION 2 — SUMMARY
		═══════════════════════════════════════════ -->
		<section id="summary" class="max-w-7xl mx-auto px-6 py-28 gsap-reveal">
			<div class="flex flex-col md:flex-row gap-12 md:gap-20">
				<div class="md:w-1/4">
					<p class="section-label" data-sr data-sr-delay="0">Summary</p>
				</div>
				<div class="md:w-3/4">
					<p class="font-general-regular leading-relaxed" style="font-size:clamp(1.1rem,2vw,1.4rem); color:var(--c-text);" data-sr data-sr-type="blur" data-sr-delay="100">
						<ScrambleText
							text="Fresh graduate (Class of 2026) from Singapore Polytechnic with a Diploma in IT. Self-taught full-stack developer passionate about building clean, performant web applications with strong user experience. Skilled in JavaScript, Vue.js, React, Node.js, and Laravel, with a strong focus on code quality and practical problem-solving. Open to work opportunities."
							:duration="1800"
							:delay="200"
							tag="span"
						/>
					</p>
					<div class="mt-8 flex flex-wrap gap-3" data-sr data-sr-delay="300">
						<span v-for="skill in ['JavaScript','Vue.js','React','Node.js','Laravel','HTML & CSS']" :key="skill" class="pill">{{ skill }}</span>
					</div>
				</div>
			</div>
		</section>

		<!-- Divider -->
		<div style="height:1px; background:var(--c-border); max-width:100%;"></div>

		<!-- Decorative Bezier SVG Connector -->
		<div class="w-full relative h-24 overflow-hidden pointer-events-none z-10">
			<svg class="w-full h-full text-zinc-900" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none">
				<path d="M 0 0 C 360 100, 720 0, 1080 100 C 1260 150, 1440 50, 1440 50" stroke="var(--c-border)" stroke-width="1.5" stroke-dasharray="10 5" class="section-connector-path"/>
			</svg>
		</div>

		<!-- Horizontal Journey Section -->
		<HorizontalJourney />

		<!-- Divider -->
		<div style="height:1px; background:var(--c-border);"></div>

		<!-- ═══════════════════════════════════════════
		SECTION 4 — SELECTED WORKS
		═══════════════════════════════════════════ -->
		<section id="work" class="max-w-7xl mx-auto px-6 py-28 gsap-reveal">
			<div class="mb-12">
				<p class="section-label mb-4" data-sr data-sr-delay="0">Portfolio</p>
				<h2 class="font-general-bold leading-tight" data-sr data-sr-type="blur" data-sr-delay="80"
					style="font-size:clamp(2.2rem,5vw,4rem); letter-spacing:-0.03em; color:var(--c-text);">
					Projects
				</h2>
			</div>

			<!-- Split Layout: Sticky Number on Left (Desktop), Vertical List on Right -->
			<div class="relative grid grid-cols-12 gap-8 md:gap-12 mt-12 project-tilt-container">
				<!-- Left side: sticky active number -->
				<div class="sticky hidden lg:flex top-0 h-screen col-span-4 flex-col justify-center select-none z-10">
					<div class="font-general-bold text-lime font-light" style="font-size: 14vw; line-height: 1; letter-spacing: -0.05em;">
						<transition name="digit-slide" mode="out-in">
							<span :key="activeProjectIndex" class="inline-block">{{ formatIndex(activeProjectIndex) }}.</span>
						</transition>
					</div>
				</div>

				<!-- Right side: vertical stack of project cards with SVG connecting line -->
				<div class="col-span-12 lg:col-span-8 flex flex-col gap-24 md:gap-32 w-full relative pl-6 md:pl-12">
					<!-- SVG line connecting featured projects -->
					<div class="absolute left-0 top-4 bottom-4 w-0.5 pointer-events-none animate-pulse" style="z-index: 1;">
						<svg class="w-full h-full" preserveAspectRatio="none">
							<line x1="1" y1="0" x2="1" y2="100%" stroke="var(--c-border)" stroke-width="1.5" stroke-dasharray="8 4" />
						</svg>
					</div>

					<a
						v-for="(p, i) in projects"
						:key="p.id"
						:href="p.link"
						target="_blank"
						rel="noopener noreferrer"
						class="project-card project-card-observe project-tilt-card group w-full"
						:data-project-index="i"
						@mousemove="handleMouseMove"
						@mouseleave="handleMouseLeave"
					>
						<!-- Media (image or video) -->
						<div class="project-card-img-wrap w-full rounded-xl overflow-hidden aspect-video">
							<template v-if="p.video">
								<video :src="p.video" :aria-label="p.title" class="project-card-img w-full h-full object-cover" autoplay muted loop playsinline preload="metadata"></video>
							</template>
							<template v-else>
								<img :src="p.img" :alt="p.title" class="project-card-img w-full h-full object-cover" />
							</template>
							<div class="project-card-overlay">
								<i data-feather="arrow-up-right" class="w-8 h-8 text-white"></i>
							</div>
						</div>
						<!-- Info -->
						<div class="project-card-body pt-6 px-2">
							<div class="flex items-start justify-between gap-4">
								<div>
									<span class="font-general-medium text-sm tracking-wide text-lime uppercase">{{ p.category }}</span>
									<h3 class="font-general-bold text-2xl mt-1 group-hover:text-lime" style="color: var(--c-text);">{{ p.title }}</h3>
								</div>
								<i data-feather="arrow-up-right" class="w-6 h-6 flex-shrink-0 project-card-arrow mt-2" style="color:var(--c-muted);"></i>
							</div>
						</div>
					</a>
				</div>
			</div>
		</section>

		<!-- Divider -->
		<div style="height:1px; background:var(--c-border);"></div>

		<!-- ═══════════════════════════════════════════
		SECTION 4.5 — CERTIFICATES
		═══════════════════════════════════════════ -->
		<section id="certificates" class="max-w-7xl mx-auto px-6 py-28 gsap-reveal">
			<div class="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
				<!-- Left side: title -->
				<div class="md:w-1/3 md:sticky md:top-28">
					<p class="section-label mb-4" data-sr data-sr-delay="0">Certifications</p>
					<h2 class="font-general-bold leading-tight" data-sr data-sr-type="blur" data-sr-delay="80"
						style="font-size:clamp(2.2rem,4vw,3.5rem); letter-spacing:-0.03em; color:var(--c-text);">
						Professional Credentials
					</h2>
					<p class="font-general-regular mt-4 leading-relaxed" style="color:var(--c-dim); font-size:1rem; max-width:320px;">
						Always exploring technologies and adding to my skill set through industry-recognized certifications.
					</p>
				</div>

				<!-- Right side: 3D tilting cards grid -->
				<div class="md:w-2/3 w-full certificates-grid">
					<div
						v-for="(c, i) in certificates"
						:key="c.id"
						class="certificate-card-perspective group"
						data-sr
						:data-sr-delay="i * 120"
					>
						<a :href="c.url" target="_blank" rel="noopener noreferrer" class="block h-full">
							<div class="certificate-card-3d h-full flex flex-col">
								<!-- Image wrap -->
								<div class="certificate-image-wrap">
									<img :src="c.img" :alt="c.name" class="certificate-img" />
								</div>
								<!-- Details -->
								<div class="certificate-details flex-grow flex flex-col justify-between">
									<div>
										<span class="font-general-medium text-xs text-lime uppercase tracking-wider">{{ c.issuer }}</span>
										<h4 class="font-general-bold text-lg mt-1 text-white leading-snug group-hover:text-lime transition-colors duration-200">
											{{ c.name }}
										</h4>
									</div>
									<div class="flex items-center gap-1 mt-4 text-xs font-general-medium text-lime group-hover:underline">
										Verify Certificate
										<i data-feather="external-link" class="w-3.5 h-3.5"></i>
									</div>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- Divider -->
		<div style="height:1px; background:var(--c-border);"></div>

		<!-- Decorative Bezier SVG Connector -->
		<div class="w-full relative h-24 overflow-hidden pointer-events-none z-10">
			<svg class="w-full h-full text-zinc-900" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none">
				<path d="M 0 50 C 360 0, 720 100, 1080 0 C 1260 0, 1440 50, 1440 50" stroke="var(--c-border)" stroke-width="1.5" stroke-dasharray="10 5" class="section-connector-path"/>
			</svg>
		</div>

		<!-- Skills Section -->
		<div class="gsap-reveal">
			<SkillsSection />
		</div>

		<!-- Divider -->
		<div style="height:1px; background:var(--c-border);"></div>

		<!-- ═══════════════════════════════════════════
		SECTION 5 — ABOUT
		═══════════════════════════════════════════ -->
		<section id="about" class="max-w-7xl mx-auto px-6 py-28 gsap-reveal">
			<div class="mb-12">
				<p class="section-label mb-4" data-sr data-sr-delay="0">About</p>
				<h2 class="font-general-bold leading-tight" data-sr data-sr-type="blur" data-sr-delay="80"
					style="font-size:clamp(2.5rem,6vw,5rem); letter-spacing:-0.04em; color:var(--c-text);">
					DEVELOPER,
					<span class="about-title-outline">CREATOR</span>
				</h2>
			</div>

			<div class="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
				<!-- Left: photo -->
				<div class="md:w-2/5" data-sr data-sr-type="left" data-sr-delay="100">
					<div class="about-photo-wrap">
						<img src="@/assets/images/profile.jpg" alt="Nay Htet Aung" class="about-photo" />
					</div>
				</div>

				<!-- Right: bio + skills + socials -->
				<div class="md:w-3/5 flex flex-col gap-8">
					<div data-sr data-sr-type="right" data-sr-delay="150">
						<p class="font-general-regular leading-relaxed" style="font-size:1.05rem; color:var(--c-dim);">
							<ScrambleText
								text="Hi, I'm Nay Htet Aung — also known as Oliver. I'm a fresh graduate at Singapore Polytechnic pursuing a Diploma in IT, and a self-taught full-stack developer passionate about building things that live on the internet."
								:duration="1600"
								:delay="300"
								tag="span"
							/>
						</p>
						<p class="font-general-regular leading-relaxed mt-4" style="font-size:1.05rem; color:var(--c-dim);">
							I enjoy working across the full stack — from crafting pixel-perfect UIs with Vue.js and React, to building robust backends with Node.js and Laravel. When I'm not coding, I'm exploring new technologies and improving my craft.
						</p>
					</div>

					<!-- Skills -->
					<div data-sr data-sr-delay="250">
						<p class="font-general-medium text-xs tracking-widest uppercase mb-4" style="color:var(--c-muted);">Skills</p>
						<div class="flex flex-wrap gap-2">
							<span v-for="skill in ['JavaScript','Vue.js','React','Node.js','Laravel','HTML & CSS','Tailwind CSS','REST APIs','Git','UI/UX Design']" :key="skill" class="pill">{{ skill }}</span>
						</div>
					</div>

					<!-- Social links -->
					<div class="flex items-center gap-4" data-sr data-sr-delay="350">
						<a href="https://github.com/olivernha" target="_blank" rel="noopener" class="social-icon" aria-label="GitHub">
							<i data-feather="github" class="w-5 h-5"></i>
						</a>
						<a href="https://twitter.com/oliver_nha" target="_blank" rel="noopener" class="social-icon" aria-label="Twitter">
							<i data-feather="twitter" class="w-5 h-5"></i>
						</a>
						<a href="https://www.instagram.com/oliver_nha/" target="_blank" rel="noopener" class="social-icon" aria-label="Instagram">
							<i data-feather="instagram" class="w-5 h-5"></i>
						</a>
						<a href="https://www.facebook.com/profile.php?id=100009412815085" target="_blank" rel="noopener" class="social-icon" aria-label="Facebook">
							<i data-feather="facebook" class="w-5 h-5"></i>
						</a>
						<a href="mailto:nayhtetaung201733@gmail.com" class="social-icon" aria-label="Email">
							<i data-feather="mail" class="w-5 h-5"></i>
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- Divider -->
		<div style="height:1px; background:var(--c-border);"></div>

		<!-- ═══════════════════════════════════════════
		SECTION 6 — CONTACT / FOOTER
		═══════════════════════════════════════════ -->
		<section id="contact" class="w-full relative py-28 overflow-hidden gsap-reveal">
			<!-- Dotted Grid Background -->
			<div class="contact-grid-bg"></div>

			<div class="max-w-7xl mx-auto px-6 text-center relative z-10">
				<p class="section-label justify-center mb-6" data-sr data-sr-delay="0">Get In Touch</p>
				<h2 class="font-general-bold leading-tight mx-auto" data-sr data-sr-type="blur" data-sr-delay="80"
					style="font-size:clamp(1.8rem,4vw,3rem); letter-spacing:-0.03em; color:var(--c-text); max-width:700px;">
					Let's create something we can be proud of together!
				</h2>

				<!-- Giant email CTA -->
				<div class="mt-12" data-sr data-sr-delay="200">
					<a href="mailto:nayhtetaung201733@gmail.com" class="email-cta">
						nayhtetaung201733@gmail.com
					</a>
				</div>

				<!-- Social row -->
				<div class="flex items-center justify-center gap-5 mt-12" data-sr data-sr-delay="300">
					<a href="https://github.com/olivernha" target="_blank" rel="noopener" class="social-icon" aria-label="GitHub">
						<i data-feather="github" class="w-5 h-5"></i>
					</a>
					<a href="https://twitter.com/oliver_nha" target="_blank" rel="noopener" class="social-icon" aria-label="Twitter">
						<i data-feather="twitter" class="w-5 h-5"></i>
					</a>
					<a href="https://www.instagram.com/oliver_nha/" target="_blank" rel="noopener" class="social-icon" aria-label="Instagram">
						<i data-feather="instagram" class="w-5 h-5"></i>
					</a>
					<a href="https://www.facebook.com/profile.php?id=100009412815085" target="_blank" rel="noopener" class="social-icon" aria-label="Facebook">
						<i data-feather="facebook" class="w-5 h-5"></i>
					</a>
					<a href="tel:+6589350559" class="social-icon" aria-label="Phone">
						<i data-feather="phone" class="w-5 h-5"></i>
					</a>
				</div>
			</div>
		</section>

		<!-- Footer bar -->
		<footer style="border-top:1px solid var(--c-border);">
			<div class="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
				<p class="font-general-regular text-sm" style="color:var(--c-muted);">
					© 2024 Nay Htet Aung (Oliver). All rights reserved.
				</p>
				<p class="font-general-regular text-sm" style="color:var(--c-muted);">
					Built with Vue.js &amp; Tailwind CSS
				</p>
			</div>
		</footer>

	</div>
</template>

<style scoped>
/* ── Hero section ── */
.hero-section {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	padding-top: 80px;
	padding-bottom: 80px;
}

.dot-grid {
	background-image: radial-gradient(circle, var(--c-border) 1px, transparent 1px);
	background-size: 40px 40px;
	opacity: 0.5;
}

.hero-line-wrap {
	display: flex;
	align-items: center;
	gap: 20px;
	flex-wrap: wrap;
	line-height: 1;
	margin-bottom: 4px;
}

.hero-word {
	font-size: clamp(3.5rem, 10vw, 9rem);
	letter-spacing: -0.04em;
	color: var(--c-text);
	line-height: 0.95;
	display: block;
}

.hero-word-outline {
	color: transparent;
	-webkit-text-stroke: 2px var(--c-text);
}

/* Inline floating images */
.hero-inline-img {
	display: inline-flex;
	align-items: center;
	flex-shrink: 0;
}

.hero-float-img {
	width: clamp(60px, 8vw, 120px);
	height: clamp(60px, 8vw, 120px);
	object-fit: contain;
	animation: float 6s ease-in-out infinite;
	border-radius: 12px;
}

.hero-profile-wrap {
	display: inline-flex;
}

.hero-profile-img {
	width: clamp(60px, 7vw, 110px);
	height: clamp(60px, 7vw, 110px);
	object-fit: cover;
	border-radius: 50%;
	border: 2px solid var(--c-lime);
	animation: float 6s ease-in-out infinite;
	animation-delay: 1s;
}

.img-tilt-1 { transform: rotate(-6deg); }
.img-tilt-2 { transform: rotate(4deg); }

@keyframes float {
	0%, 100% { transform: translateY(0) rotate(-6deg); }
	50%       { transform: translateY(-14px) rotate(-6deg); }
}

/* Spinning circle SVG */
.hero-spin-wrap {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.spin-slow {
	animation: spin 12s linear infinite;
}

@keyframes spin {
	from { transform: rotate(0deg); }
	to   { transform: rotate(360deg); }
}

.spin-text {
	font-size: 10px;
	fill: var(--c-lime);
	font-family: 'GeneralSans-Medium', sans-serif;
	letter-spacing: 2px;
}

/* Scroll indicator */
.scroll-line {
	width: 1px;
	height: 48px;
	background: linear-gradient(to bottom, var(--c-lime), transparent);
	animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
	0%, 100% { opacity: 1; transform: scaleY(1); }
	50%       { opacity: 0.4; transform: scaleY(0.6); }
}

/* ── Timeline ── */
.timeline-container {
	position: relative;
	padding-left: 40px;
}

.timeline-line {
	position: absolute;
	left: 0;
	top: 8px;
	bottom: 8px;
	width: 1px;
	background: var(--c-border);
}

.timeline-item {
	position: relative;
	padding-bottom: 48px;
	padding-left: 32px;
}

.timeline-item:last-child {
	padding-bottom: 0;
}

.timeline-dot {
	position: absolute;
	left: -4px;
	top: 8px;
	width: 9px;
	height: 9px;
	border-radius: 50%;
	background: var(--c-lime);
	border: 2px solid var(--c-bg);
	box-shadow: 0 0 0 3px var(--c-lime);
}

.timeline-year {
	font-family: 'GeneralSans-Medium';
	font-size: 0.7rem;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: var(--c-lime);
	margin-bottom: 8px;
}

.timeline-content {
	background: var(--c-bg-2);
	border: 1px solid var(--c-border);
	border-radius: 8px;
	padding: 20px 24px;
	transition: border-color 0.2s;
}

.timeline-content:hover {
	border-color: var(--c-lime);
}

/* ── Project cards ── */
.project-card {
	display: block;
	border: 1px solid var(--c-border);
	border-radius: 12px;
	overflow: hidden;
	transition: border-color 0.25s, transform 0.25s;
	text-decoration: none;
}

.project-card:hover {
	border-color: var(--c-lime);
	transform: translateY(-4px);
}

.project-card-img-wrap {
	position: relative;
	overflow: hidden;
	aspect-ratio: 16/9;
	background: var(--c-bg-2);
}

.project-card-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
}

.project-card:hover .project-card-img {
	transform: scale(1.06);
}

.project-card-overlay {
	position: absolute;
	inset: 0;
	background: rgba(0,0,0,0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.25s;
}

.project-card:hover .project-card-overlay {
	opacity: 1;
}

.project-card-body {
	padding: 20px 24px;
}

.project-card-arrow {
	transition: transform 0.2s, color 0.2s;
}

.project-card:hover .project-card-arrow {
	transform: translate(3px, -3px);
	color: var(--c-lime) !important;
}

/* ── About section ── */
.about-title-outline {
	-webkit-text-stroke: 2px var(--c-text);
	color: transparent;
}

.about-photo-wrap {
	position: relative;
	display: inline-block;
}

.about-photo {
	width: 100%;
	max-width: 420px;
	aspect-ratio: 3/4;
	object-fit: cover;
	border-radius: 12px;
	border: 1px solid var(--c-border);
	transform: rotate(-2deg);
	transition: transform 0.4s ease;
}

.about-photo-wrap:hover .about-photo {
	transform: rotate(0deg);
}

/* ── Social icons ── */
.social-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border: 1px solid var(--c-border);
	border-radius: 8px;
	color: var(--c-muted);
	transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.social-icon:hover {
	border-color: var(--c-lime);
	color: var(--c-lime);
	background: rgba(232,255,71,0.06);
}

/* ── Email CTA ── */
.email-cta {
	display: inline-block;
	font-family: 'GeneralSans-Bold';
	font-size: clamp(1rem, 2.5vw, 1.8rem);
	color: var(--c-text);
	letter-spacing: -0.02em;
	text-decoration: none;
	border-bottom: 2px solid var(--c-lime);
	padding-bottom: 4px;
	transition: color 0.2s, border-color 0.2s;
	word-break: break-all;
}

.email-cta:hover {
	color: var(--c-lime);
}
</style>
