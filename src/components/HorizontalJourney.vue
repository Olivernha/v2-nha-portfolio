<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
	name: 'HorizontalJourney',
	data: () => ({
		activeMilestones: [],
		milestones: [
			{
				id: 1,
				year: '2017 – 2020',
				type: 'Education',
				title: 'Bachelor of Computer Engineering',
				subtitle: 'Yangon Technological University',
				details: 'Undergraduate engineering studies covering computer networks, electronic circuitry, mathematics, and systems architecture. Stepped away before completion due to political issues in Myanmar, turning focus to coding.',
				skills: ['C++', 'Digital Systems', 'Engineering Math'],
				x: 750,
				y: 80,
				cardPosition: 'below'
			},
			{
				id: 2,
				year: '2023',
				type: 'Work Experience',
				title: 'Service Crew',
				subtitle: 'Rise Restaurant, Marina Bay Sands',
				details: 'Part-time food and beverage service role at Singapore\'s premiere dining location. Gained fast-paced teamwork, adaptability, and high-standard service qualities.',
				skills: ['Customer Care', 'High-pressure Teamwork', 'Adaptability'],
				x: 1500,
				y: 520,
				cardPosition: 'above'
			},
			{
				id: 3,
				year: '2023 – 2026',
				type: 'Diploma',
				title: 'Diploma in Information Technology',
				subtitle: 'Singapore Polytechnic',
				details: 'Pursuing software development, database architecture, network security, and full-stack web solutions. Consistently building web apps and preparing for a modern tech career.',
				skills: ['Java', 'SQL', 'Networking', 'Software Dev'],
				x: 2250,
				y: 80,
				cardPosition: 'below'
			},
			{
				id: 4,
				year: '2024 – 2026',
				type: 'Part-Time Role',
				title: 'Banquet Server',
				subtitle: 'Fullerton Hotel, Singapore',
				details: 'Provided banquet and hospitality services at corporate galas and weddings, handling client needs under strict schedules and protocols.',
				skills: ['Hospitality Management', 'Discipline', 'Coordination'],
				x: 3000,
				y: 520,
				cardPosition: 'above'
			},
			{
				id: 5,
				year: 'Apr 2025 – Feb 2026',
				type: 'Internship',
				title: 'Web Developer Intern',
				subtitle: 'Tuas Power Generation Pte Ltd',
				details: 'Supported daily operations and full-stack modifications for corporate internal web systems, debugging interfaces, and refining databases using Vue.js and FastAPI.',
				skills: ['Vue.js', 'FastAPI', 'REST APIs', 'PostgreSQL'],
				x: 3750,
				y: 80,
				cardPosition: 'below'
			}
		],
		scrollTriggers: [],
		mainTimeline: null
	}),
	mounted() {
		// Small delay to ensure styles and elements are fully rendered
		setTimeout(() => {
			this.initAnimations();
		}, 100);
	},
	beforeUnmount() {
		this.killAnimations();
	},
	methods: {
		initAnimations() {
			this.killAnimations();

			const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			if (prefersReducedMotion) {
				this.milestones.forEach((_, idx) => this.activeMilestones.push(idx));
				return;
			}

			// Screen size check - desktop/tablet (>= 1024px) triggers horizontal scroll pin
			if (window.innerWidth >= 1024) {
				this.initHorizontalScroll();
			} else {
				this.initVerticalScroll();
			}
		},
		initHorizontalScroll() {
			const pinSec = this.$refs.journeyPinSection;
			const track = this.$refs.journeyTrack;
			const path = this.$refs.svgPathDesktop;

			if (!pinSec || !track) return;

			const totalScrollDistance = track.scrollWidth - window.innerWidth;
			if (totalScrollDistance <= 0) return;

			// Horizontal slide of the track
			const horizAnim = gsap.to(track, {
				x: -totalScrollDistance,
				ease: 'none',
				scrollTrigger: {
					trigger: pinSec,
					pin: true,
					scrub: 0.5,
					start: 'top top',
					end: () => `+=${totalScrollDistance + 300}`, // added extra scroll distance for spacing
					invalidateOnRefresh: true
				}
			});
			this.scrollTriggers.push(horizAnim.scrollTrigger);

			// SVG Path progressive drawing
			if (path) {
				const length = path.getTotalLength();
				path.style.strokeDasharray = length;
				path.style.strokeDashoffset = length;

				const pathAnim = gsap.to(path, {
					strokeDashoffset: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: pinSec,
						scrub: 0.5,
						start: 'top top',
						end: () => `+=${totalScrollDistance + 300}`,
						invalidateOnRefresh: true
					}
				});
				this.scrollTriggers.push(pathAnim.scrollTrigger);
			}

			// Container animation triggers for milestones dot/card active states
			this.milestones.forEach((_, index) => {
				const dotEl = this.$el.querySelector(`#journey-dot-desktop-${index}`);
				const cardEl = this.$el.querySelector(`#journey-card-desktop-${index}`);

				if (dotEl && cardEl) {
					// Card fade up animation when it scrolls into center horizontal view
					gsap.fromTo(cardEl,
						{ opacity: 0, y: 30, scale: 0.95 },
						{
							opacity: 1,
							y: 0,
							scale: 1,
							duration: 0.6,
							ease: 'power2.out',
							scrollTrigger: {
								trigger: dotEl,
								containerAnimation: horizAnim,
								start: 'left 80%',
								toggleActions: 'play none none reverse'
							}
						}
					);

					// Dot glow toggle
					const dotTrigger = ScrollTrigger.create({
						trigger: dotEl,
						containerAnimation: horizAnim,
						start: 'left 55%',
						onEnter: () => {
							if (!this.activeMilestones.includes(index)) {
								this.activeMilestones.push(index);
							}
						},
						onLeaveBack: () => {
							this.activeMilestones = this.activeMilestones.filter(i => i !== index);
						}
					});
					this.scrollTriggers.push(dotTrigger);
				}
			});
		},
		initVerticalScroll() {
			const path = this.$refs.svgPathMobile;

			// Path progressive drawing
			if (path) {
				const length = path.getTotalLength();
				path.style.strokeDasharray = length;
				path.style.strokeDashoffset = length;

				const pathAnim = gsap.to(path, {
					strokeDashoffset: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: this.$refs.journeyPinSection,
						start: 'top 80%',
						end: 'bottom 70%',
						scrub: 0.5
					}
				});
				this.scrollTriggers.push(pathAnim.scrollTrigger);
			}

			// Animate cards & milestones vertical scroll
			this.milestones.forEach((_, index) => {
				const cardEl = this.$el.querySelector(`#journey-card-mobile-${index}`);
				const dotEl = this.$el.querySelector(`#journey-dot-mobile-${index}`);

				if (cardEl && dotEl) {
					gsap.fromTo(cardEl,
						{ opacity: 0, x: -30, y: 20 },
						{
							opacity: 1,
							x: 0,
							y: 0,
							duration: 0.7,
							ease: 'power2.out',
							scrollTrigger: {
								trigger: dotEl,
								start: 'top 75%',
								toggleActions: 'play none none reverse'
							}
						}
					);

					const dotTrigger = ScrollTrigger.create({
						trigger: dotEl,
						start: 'top 70%',
						onEnter: () => {
							if (!this.activeMilestones.includes(index)) {
								this.activeMilestones.push(index);
							}
						},
						onLeaveBack: () => {
							this.activeMilestones = this.activeMilestones.filter(i => i !== index);
						}
					});
					this.scrollTriggers.push(dotTrigger);
				}
			});
		},
		killAnimations() {
			this.scrollTriggers.forEach(t => t.kill());
			this.scrollTriggers = [];
			ScrollTrigger.getAll().forEach(t => {
				if (t.vars.trigger === this.$refs.journeyPinSection) {
					t.kill();
				}
			});
			this.activeMilestones = [];
		},
		isActive(index) {
			return this.activeMilestones.includes(index);
		}
	},
	computed: {
		desktopPathD() {
			return 'M 0 550 C 300 550, 500 80, 750 80 C 1050 80, 1200 520, 1500 520 C 1800 520, 2000 80, 2250 80 C 2500 80, 2700 520, 3000 520 C 3200 520, 3350 480, 3350 380 C 3350 280, 3100 240, 3100 340 C 3100 440, 3450 80, 3750 80 C 4050 80, 4250 480, 4500 480 C 4750 480, 4950 450, 5100 460';
		}
	}
};
</script>

<template>
	<div ref="journeyPinSection" id="journey" class="w-full relative bg-transparent overflow-hidden">
		<!-- Dynamic background accent glow -->
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full filter blur-3xl opacity-15 pointer-events-none" style="background: radial-gradient(circle, var(--c-lime) 0%, transparent 70%);"></div>

		<!-- ═══════════════════════════════════════════
		DESKTOP VIEW — HORIZONTAL SCROLL PINNED TIMELINE
		═══════════════════════════════════════════ -->
		<div class="hidden lg:block w-full min-h-screen">
			<div ref="journeyTrack" class="journey-track-horiz h-screen flex items-center justify-start relative px-[10vw]">
				
				<!-- Intro Slide Panel -->
				<div class="journey-intro-slide flex-shrink-0 w-[450px] flex flex-col justify-center pr-16 select-none relative z-10">
					<p class="section-label mb-4">Milestones</p>
					<h2 class="font-general-bold leading-tight mb-4 text-white" style="font-size: clamp(2.5rem, 4vw, 4.5rem); letter-spacing:-0.03em;">
						My Journey
					</h2>
					<p class="font-general-regular text-sm leading-relaxed text-zinc-400">
						Scroll down to travel through my timeline. Track my progress through education, part-time service achievements, and engineering projects.
					</p>
				</div>

				<!-- SVG Curved Connector Line (Yin Lynn Htun inspired loop wave) -->
				<div class="absolute left-[650px] top-1/2 -translate-y-1/2 h-[600px] pointer-events-none z-0">
					<svg class="h-full" style="width: 5200px;" viewBox="0 0 5200 600" preserveAspectRatio="none">
						<!-- Background curve path -->
						<path
							:d="desktopPathD"
							fill="none"
							stroke="var(--c-border)"
							stroke-width="3"
						/>
						<!-- Active drawn curve path -->
						<path
							ref="svgPathDesktop"
							:d="desktopPathD"
							fill="none"
							stroke="var(--c-lime)"
							stroke-width="3.5"
							stroke-linecap="round"
						/>
					</svg>
				</div>

				<!-- Milestones Container inside Horizontal Track (Expanded width for 750px spacing) -->
				<div class="flex items-center gap-[50px] relative z-10 pl-[50px] h-full" style="width: 5800px;">
					<div
						v-for="(item, index) in milestones"
						:key="item.id"
						class="absolute h-[600px] top-1/2 -translate-y-1/2"
						:style="{ left: `${item.x + 450}px`, width: '400px' }"
					>
						<!-- Active Milestone Card (Dynamic Vertical Placement Based on Path Wave) -->
						<div
							:id="'journey-card-desktop-' + index"
							class="absolute journey-panel-card p-6 rounded-2xl border transition-all duration-500 w-[380px] left-1/2 -translate-x-1/2"
							:style="item.cardPosition === 'above' ? { bottom: `${600 - item.y + 40}px` } : { top: `${item.y + 40}px` }"
							:class="isActive(index) ? 'card-active' : 'card-inactive'"
						>
							<div class="flex items-center justify-between mb-3 gap-2">
								<span class="timeline-badge">{{ item.year }}</span>
								<span class="text-xs uppercase tracking-wider text-zinc-500 font-general-semibold">{{ item.type }}</span>
							</div>

							<h3 class="font-general-bold text-lg text-white mb-0.5 leading-snug">
								{{ item.title }}
							</h3>
							<h4 class="font-general-semibold text-xs text-lime mb-3">
								{{ item.subtitle }}
							</h4>
							<p class="font-general-regular text-xs leading-relaxed text-zinc-400 mb-4">
								{{ item.details }}
							</p>

							<div class="flex flex-wrap gap-1">
								<span
									v-for="s in item.skills"
									:key="s"
									class="px-2 py-0.5 rounded-full text-[10px] bg-zinc-950/60 border border-zinc-900 text-zinc-500 hover:border-lime hover:text-lime transition-all duration-200"
								>
									{{ s }}
								</span>
							</div>
						</div>

						<!-- Center Milestone Node on Path (Dynamic Vertical Placement matching SVG Wave) -->
						<div
							:id="'journey-dot-desktop-' + index"
							class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
							:style="{ top: `${item.y}px` }"
						>
							<div
								class="timeline-dot-inner w-5 h-5 rounded-full border-2 transition-all duration-500"
								:class="isActive(index) ? 'dot-active' : 'dot-inactive'"
							>
								<div class="w-2.5 h-2.5 rounded-full bg-lime m-auto transition-transform duration-300" :class="isActive(index) ? 'scale-100' : 'scale-0'"></div>
							</div>
						</div>
					</div>

					<!-- Final "And More..." Future Card (At track position x = 4950px, matches SVG x = 4500px) -->
					<div
						class="absolute h-[600px] top-1/2 -translate-y-1/2"
						style="left: 4950px; width: 300px;"
					>
						<!-- And More Content card (Sits above the valley dot at y = 480px) -->
						<div
							class="absolute flex flex-col items-center justify-center select-none text-center w-[260px] left-1/2 -translate-x-1/2 p-6 rounded-2xl border border-zinc-800 bg-zinc-950/30 backdrop-blur-sm"
							style="bottom: 160px;"
						>
							<span class="text-[10px] text-zinc-500 font-general-medium tracking-widest uppercase mb-1">Future</span>
							<h3 class="font-general-bold text-2xl text-lime animate-pulse">And More...</h3>
						</div>

						<!-- Center Dot on Path -->
						<div
							class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
							style="top: 480px;"
						>
							<div
								class="timeline-dot-inner w-5 h-5 rounded-full border-2 border-lime dot-active flex items-center justify-center bg-zinc-950 shadow-[0_0_15px_var(--c-lime-glow)]"
							>
								<div class="w-2.5 h-2.5 rounded-full bg-lime"></div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>

		<!-- ═══════════════════════════════════════════
		MOBILE & TABLET VIEW — VERTICAL SCROLL TIMELINE
		═══════════════════════════════════════════ -->
		<div class="lg:hidden max-w-7xl mx-auto px-6 py-24">
			<div class="mb-16">
				<p class="section-label mb-4">Milestones</p>
				<h2 class="font-general-bold leading-tight text-white" style="font-size:clamp(2rem,4vw,3rem); letter-spacing:-0.03em;">
					My Journey
				</h2>
				<p class="font-general-regular mt-4 leading-relaxed text-zinc-400" style="max-width:480px; font-size:0.95rem;">
					A record of my education, roles, and accomplishments along my career timeline.
				</p>
			</div>

			<!-- Mobile vertical timeline layout -->
			<div class="relative w-full py-5">
				<!-- SVG path drawn vertically on scroll -->
				<div class="absolute left-8 top-0 bottom-0 w-8 pointer-events-none z-0">
					<svg class="w-full h-full" viewBox="0 0 40 800" preserveAspectRatio="none">
						<path
							d="M 20 0 L 20 800"
							fill="none"
							stroke="var(--c-border)"
							stroke-width="2"
						/>
						<path
							ref="svgPathMobile"
							d="M 20 0 L 20 800"
							fill="none"
							stroke="var(--c-lime)"
							stroke-width="2.5"
							stroke-linecap="round"
						/>
					</svg>
				</div>

				<!-- Milestones listing -->
				<div class="space-y-12 relative z-10">
					<div
						v-for="(item, index) in milestones"
						:key="'mobile-' + item.id"
						class="flex items-start gap-6 relative"
					>
						<!-- Dot left -->
						<div
							:id="'journey-dot-mobile-' + index"
							class="w-8 flex justify-center items-center flex-shrink-0 pt-2"
						>
							<div
								class="timeline-dot-inner w-4 h-4 rounded-full border-2 transition-all duration-500"
								:class="isActive(index) ? 'dot-active' : 'dot-inactive'"
							>
								<div class="w-2 h-2 rounded-full bg-lime m-auto transition-transform duration-300" :class="isActive(index) ? 'scale-100' : 'scale-0'"></div>
							</div>
						</div>

						<!-- Card right -->
						<div class="flex-grow">
							<div
								:id="'journey-card-mobile-' + index"
								class="journey-panel-card p-6 rounded-xl border transition-all duration-300 w-full"
								:class="isActive(index) ? 'card-active' : 'card-inactive'"
							>
								<div class="flex items-center justify-between mb-3 gap-2 flex-wrap">
									<span class="timeline-badge">{{ item.year }}</span>
									<span class="text-[10px] uppercase tracking-wider text-zinc-500 font-general-semibold">{{ item.type }}</span>
								</div>

								<h3 class="font-general-bold text-lg text-white mb-0.5 leading-snug">
									{{ item.title }}
								</h3>
								<h4 class="font-general-semibold text-xs text-lime mb-3">
									{{ item.subtitle }}
								</h4>
								<p class="font-general-regular text-xs leading-relaxed text-zinc-400 mb-4">
									{{ item.details }}
								</p>

								<div class="flex flex-wrap gap-1">
									<span
										v-for="s in item.skills"
										:key="s"
										class="px-2.5 py-0.5 rounded-full text-[10px] bg-zinc-950/60 border border-zinc-800 text-zinc-500"
									>
										{{ s }}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.journey-track-horiz {
	will-change: transform;
}

.journey-panel-card {
	background: var(--c-bg-2);
	border-color: var(--c-border);
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.journey-panel-card.card-active {
	border-color: var(--c-lime);
	box-shadow: 0 20px 40px rgba(232, 255, 71, 0.04), 0 0 1px 1px var(--c-lime-glow);
}

.journey-panel-card.card-inactive {
	opacity: 0.35;
	transform: scale(0.95);
}

/* Dots states */
.timeline-dot-inner {
	background: var(--c-bg);
	border-color: var(--c-border-2);
	display: flex;
}

.timeline-dot-inner.dot-active {
	border-color: var(--c-lime);
	box-shadow: 0 0 15px var(--c-lime-glow), 0 0 0 4px rgba(232, 255, 71, 0.15);
	animation: pulse-glow 2s infinite;
}

.timeline-dot-inner.dot-inactive {
	transform: scale(0.9);
}

@keyframes pulse-glow {
	0% {
		box-shadow: 0 0 15px var(--c-lime-glow), 0 0 0 4px rgba(232, 255, 71, 0.15);
	}
	50% {
		box-shadow: 0 0 25px var(--c-lime-glow), 0 0 0 8px rgba(232, 255, 71, 0.25);
	}
	100% {
		box-shadow: 0 0 15px var(--c-lime-glow), 0 0 0 4px rgba(232, 255, 71, 0.15);
	}
}
</style>
