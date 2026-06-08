<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
	name: 'SkillsSection',
	data: () => ({
		skills: [
			{ name: 'JavaScript', percent: 90, level: 'Advanced', icon: '⚡' },
			{ name: 'Vue.js / Nuxt', percent: 88, level: 'Advanced', icon: '💚' },
			{ name: 'React.js / Next.js', percent: 80, level: 'Intermediate', icon: '⚛️' },
			{ name: 'Node.js / Express', percent: 82, level: 'Intermediate', icon: '🟢' },
			{ name: 'Laravel / PHP', percent: 75, level: 'Intermediate', icon: '🔴' },
			{ name: 'HTML & CSS / Tailwind', percent: 92, level: 'Advanced', icon: '🎨' },
			{ name: 'REST APIs & Databases', percent: 85, level: 'Advanced', icon: '💾' },
			{ name: 'UI/UX Design', percent: 78, level: 'Intermediate', icon: '📐' }
		],
		currentPercents: [],
		canvasCtx: null,
		animationFrameId: null,
		particles: [],
		scrollTriggers: []
	}),
	created() {
		// Initialize the percentage values in data array to 0
		this.currentPercents = this.skills.map(() => 0);
	},
	mounted() {
		this.initParticles();
		this.initScrollAnimations();
	},
	beforeUnmount() {
		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId);
		}
		this.scrollTriggers.forEach(t => t.kill());
	},
	methods: {
		initScrollAnimations() {
			const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			if (prefersReducedMotion) {
				this.currentPercents = this.skills.map(s => s.percent);
				return;
			}

			// ScrollTrigger to animate progression bars and numeric count-ups
			this.skills.forEach((skill, index) => {
				const fillEl = this.$el.querySelector(`#skill-fill-${index}`);
				const textObj = { val: 0 };

				if (fillEl) {
					// Animate progress bar width
					const barAnim = gsap.fromTo(fillEl,
						{ width: '0%' },
						{
							width: `${skill.percent}%`,
							duration: 1.5,
							ease: 'power2.out',
							scrollTrigger: {
								trigger: fillEl,
								start: 'top 90%',
								toggleActions: 'play none none reverse'
							}
						}
					);
					this.scrollTriggers.push(barAnim.scrollTrigger);

					// Counter ticker
					const counterAnim = gsap.to(textObj, {
						val: skill.percent,
						duration: 1.5,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: fillEl,
							start: 'top 90%',
							toggleActions: 'play none none reverse'
						},
						onUpdate: () => {
							this.currentPercents[index] = Math.round(textObj.val);
						}
					});
					this.scrollTriggers.push(counterAnim.scrollTrigger);
				}
			});
		},
		initParticles() {
			const canvas = this.$refs.particlesCanvas;
			if (!canvas) return;

			this.canvasCtx = canvas.getContext('2d');
			this.resizeCanvas();
			window.addEventListener('resize', this.resizeCanvas);

			// Populate particles
			const particleCount = 40;
			this.particles = [];
			for (let i = 0; i < particleCount; i++) {
				this.particles.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					radius: Math.random() * 2 + 0.5,
					dx: (Math.random() - 0.5) * 0.4,
					dy: (Math.random() - 0.5) * 0.4,
					opacity: Math.random() * 0.5 + 0.1
				});
			}

			this.animateParticles();
		},
		resizeCanvas() {
			const canvas = this.$refs.particlesCanvas;
			const parent = canvas.parentElement;
			canvas.width = parent.clientWidth;
			canvas.height = parent.clientHeight;
		},
		animateParticles() {
			const canvas = this.$refs.particlesCanvas;
			const ctx = this.canvasCtx;
			if (!canvas || !ctx) return;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Get current theme color for particles
			const theme = document.documentElement.getAttribute('data-theme') || 'dark';
			const color = theme === 'dark' ? '232, 255, 71' : '17, 17, 17';

			this.particles.forEach(p => {
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
				ctx.fill();

				// Move particles
				p.x += p.dx;
				p.y += p.dy;

				// Bounce off walls
				if (p.x < 0 || p.x > canvas.width) p.dx = -p.dx;
				if (p.y < 0 || p.y > canvas.height) p.dy = -p.dy;
			});

			this.animationFrameId = requestAnimationFrame(this.animateParticles);
		}
	}
};
</script>

<template>
	<section id="skills" class="w-full py-28 relative overflow-hidden bg-transparent">
		<!-- Particles Canvas Background -->
		<canvas ref="particlesCanvas" class="absolute inset-0 pointer-events-none" style="z-index: 1; opacity:0.65;"></canvas>

		<!-- Subtle border indicators -->
		<div style="height:1px; background:var(--c-border); width: 100%;" class="absolute top-0 left-0"></div>

		<div class="max-w-7xl mx-auto px-6 relative z-10">
			<div class="flex flex-col lg:flex-row gap-16">
				<!-- Left description side -->
				<div class="w-full lg:w-1/3">
					<p class="section-label mb-4">Expertise</p>
					<h2 class="font-general-bold leading-tight mb-6" style="font-size:clamp(2.2rem,5vw,4rem); letter-spacing:-0.03em; color:var(--c-text);">
						Skills &amp; Tech Stack
					</h2>
					<p class="font-general-regular leading-relaxed text-zinc-400 mb-8" style="font-size:1.05rem;">
						Proficiencies in modern web languages, frameworks, and developer tools. I focus on writing robust codebase architectures that scale.
					</p>

					<!-- Stagger stats or small floating card -->
					<div class="border border-zinc-800 bg-zinc-950/40 backdrop-blur-md p-6 rounded-2xl">
						<div class="flex items-center gap-4 mb-4">
							<span class="w-2.5 h-2.5 rounded-full bg-lime animate-pulse"></span>
							<span class="text-xs font-general-medium tracking-widest uppercase text-zinc-400">Status</span>
						</div>
						<p class="font-general-regular text-sm text-zinc-400 leading-relaxed">
							Obsessed with code performance and micro-interactions. Actively optimizing workflows with AI tooling and automating tasks.
						</p>
					</div>
				</div>

				<!-- Right progression bars side -->
				<div class="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
					<div
						v-for="(skill, index) in skills"
						:key="skill.name"
						class="flex flex-col justify-between"
					>
						<div class="flex items-center justify-between mb-2">
							<div class="flex items-center gap-2">
								<span class="text-lg">{{ skill.icon }}</span>
								<span class="font-general-semibold text-base text-zinc-100">{{ skill.name }}</span>
							</div>
							<div class="flex items-center gap-2">
								<span class="text-xs text-zinc-500 font-general-medium uppercase tracking-wider">{{ skill.level }}</span>
								<span class="font-general-bold text-base text-lime">{{ currentPercents[index] }}%</span>
							</div>
						</div>

						<!-- Horizontal Skill Bar -->
						<div class="skill-bar-container w-full h-1.5 rounded-full overflow-hidden bg-zinc-900 border border-zinc-800">
							<div
								:id="'skill-fill-' + index"
								class="skill-bar-progress h-full bg-lime rounded-full"
								style="width: 0%;"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.skill-bar-container {
	position: relative;
}
.skill-bar-progress {
	background-color: var(--c-lime);
	box-shadow: 0 0 10px rgba(232, 255, 71, 0.3);
}
</style>
