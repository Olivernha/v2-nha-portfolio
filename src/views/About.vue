<script>
import feather from 'feather-icons';
import WaveDivider from '../components/WaveDivider.vue';
import { revealAll } from '../composables/useScrollReveal.js';

export default {
	name: 'About',
	components: { WaveDivider },
	data: () => ({
		skills: [
			{ name: 'HTML & CSS',  pct: 90 },
			{ name: 'JavaScript',  pct: 85 },
			{ name: 'Vue.js',      pct: 80 },
			{ name: 'React',       pct: 72 },
			{ name: 'Node.js',     pct: 70 },
			{ name: 'Laravel',     pct: 60 },
		],
		certs: [
			{ name: 'LinkedIn Learning Certificate', url: 'https://www.linkedin.com/learning/certificates/2a242d93ce6e8ee0a40310925871c36f8d19ec96581bd886128296ae4d2f390f?u=2122804' },
			{ name: 'JS Data Structures & Algorithms — freeCodeCamp', url: 'https://www.freecodecamp.org/certification/fcc7cbffdb1-b4f5-46ff-956b-0763930c3b0d/javascript-algorithms-and-data-structures' },
		],
		skillsVisible: false,
	}),
	mounted() {
		feather.replace();
		this.$nextTick(() => {
			revealAll(this.$el);
			// Animate skill bars on scroll
			const barsSection = this.$el.querySelector('.skills-section');
			if (barsSection) {
				const obs = new IntersectionObserver(([e]) => {
					if (e.isIntersecting) {
						this.skillsVisible = true;
						obs.disconnect();
					}
				}, { threshold: 0.2 });
				obs.observe(barsSection);
			}
		});
	},
	updated() { feather.replace(); },
};
</script>

<template>
	<div class="min-h-screen pt-28">

		<!-- Hero statement -->
		<section class="max-w-7xl mx-auto px-6 pt-12 pb-20 relative overflow-hidden">
			<!-- Background text watermark -->
			<div class="absolute right-0 top-0 font-general-bold select-none pointer-events-none"
				style="font-size:clamp(8rem,18vw,18rem); color:#111111; letter-spacing:-0.06em; line-height:1; z-index:0; user-select:none;">
				NHA
			</div>

			<div class="relative z-10">
				<p class="section-label mb-8" data-sr data-sr-delay="0">Who I Am</p>

				<div class="overflow-hidden mb-1">
					<h1 class="font-general-bold leading-none"
						data-sr data-sr-delay="80"
						style="font-size:clamp(2.8rem,7vw,6.5rem); letter-spacing:-0.04em; color:#E8E8E8;">
						Developer.
					</h1>
				</div>
				<div class="overflow-hidden mb-1">
					<h1 class="font-general-bold leading-none"
						data-sr data-sr-delay="180"
						style="font-size:clamp(2.8rem,7vw,6.5rem); letter-spacing:-0.04em; -webkit-text-stroke:1.5px #E8E8E8; color:transparent;">
						Student.
					</h1>
				</div>
				<div class="overflow-hidden">
					<h1 class="font-general-bold leading-none"
						data-sr data-sr-delay="280"
						style="font-size:clamp(2.8rem,7vw,6.5rem); letter-spacing:-0.04em; color:#E8FF47;">
						Builder.
					</h1>
				</div>
			</div>
		</section>

		<!-- Wave into content -->
		<WaveDivider color="#111111" :height="60" />

		<!-- Two-column content -->
		<section style="background:#111111;">
			<div class="max-w-7xl mx-auto px-6 py-20">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

					<!-- Left: profile + bio -->
					<div>
						<!-- Profile image with animated corner -->
						<div class="relative mb-10 inline-block" data-sr data-sr-type="scale" data-sr-delay="0">
							<img
								src="@/assets/images/profile.jpg"
								alt="Nay Htet Aung"
								class="w-full max-w-sm rounded"
								style="border:1px solid #2A2A2A; filter:grayscale(15%);"
							/>
							<!-- Animated lime corner -->
							<div data-sr data-sr-type="scale" data-sr-delay="300"
								class="absolute -bottom-3 -right-3 w-16 h-16 rounded"
								style="background:#E8FF47; z-index:-1;"></div>
							<!-- Floating label -->
							<div data-sr data-sr-type="right" data-sr-delay="400"
								class="absolute -top-4 -right-4 px-3 py-1.5 rounded font-general-medium text-xs"
								style="background:#E8FF47; color:#0A0A0A;">
								Full-Stack Dev
							</div>
						</div>

						<h2 class="font-general-semibold text-xl mb-4" data-sr data-sr-delay="100" style="color:#E8E8E8;">Nay Htet Aung</h2>
						<p class="font-general-regular text-sm leading-relaxed mb-4" data-sr data-sr-delay="160" style="color:#666;">
							Second-year student at Singapore Polytechnic pursuing a Diploma in Information Technology. Self-taught full-stack developer diving deeper into backend development and security coding.
						</p>
						<p class="font-general-regular text-sm leading-relaxed" data-sr data-sr-delay="220" style="color:#666;">
							I enjoy building things for the web — from polished UIs to robust APIs. Currently looking for internship opportunities to grow in the industry.
						</p>

						<!-- Social links -->
						<div class="flex gap-3 mt-8">
							<a href="https://github.com/olivernha" target="_blank" class="btn-ghost py-2 px-3 text-xs" data-sr data-sr-delay="300">
								<i data-feather="github" class="w-4 h-4"></i> GitHub
							</a>
							<a href="https://twitter.com/oliver_nha" target="_blank" class="btn-ghost py-2 px-3 text-xs" data-sr data-sr-delay="360">
								<i data-feather="twitter" class="w-4 h-4"></i> Twitter
							</a>
							<a href="https://www.instagram.com/oliver_nha/" target="_blank" class="btn-ghost py-2 px-3 text-xs" data-sr data-sr-delay="420">
								<i data-feather="instagram" class="w-4 h-4"></i> Instagram
							</a>
						</div>
					</div>

					<!-- Right: skills + info -->
					<div class="flex flex-col gap-12">

						<!-- Skills with animated bars -->
						<div class="skills-section">
							<p class="section-label mb-6" data-sr data-sr-delay="0">Skills</p>
							<div class="flex flex-col gap-6">
								<div v-for="(s, i) in skills" :key="s.name" data-sr :data-sr-delay="i * 70 + 80">
									<div class="flex justify-between mb-2">
										<span class="font-general-medium text-sm" style="color:#E8E8E8;">{{ s.name }}</span>
										<span class="font-general-light text-xs" style="color:#444;">{{ s.pct }}%</span>
									</div>
									<div class="skill-bar-track">
										<div class="skill-bar-fill"
											:style="{ width: skillsVisible ? s.pct + '%' : '0%', transitionDelay: (i * 100) + 'ms' }">
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Education -->
						<div>
							<p class="section-label mb-6" data-sr data-sr-delay="0">Education</p>
							<div class="flex gap-4 items-start" data-sr data-sr-type="left" data-sr-delay="100">
								<div class="w-9 h-9 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
									style="background:#1A1A1A; border:1px solid #2A2A2A;">
									<i data-feather="book-open" class="w-4 h-4" style="color:#E8FF47;"></i>
								</div>
								<div>
									<p class="font-general-semibold text-sm" style="color:#E8E8E8;">Diploma in Information Technology</p>
									<p class="font-general-regular text-xs mt-1" style="color:#555;">Singapore Polytechnic · 2022 – Present</p>
								</div>
							</div>
						</div>

						<!-- Experience -->
						<div>
							<p class="section-label mb-6" data-sr data-sr-delay="0">Experience</p>
							<div class="flex gap-4 items-start" data-sr data-sr-type="left" data-sr-delay="100">
								<div class="w-9 h-9 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
									style="background:#1A1A1A; border:1px solid #2A2A2A;">
									<i data-feather="briefcase" class="w-4 h-4" style="color:#E8FF47;"></i>
								</div>
								<div>
									<p class="font-general-semibold text-sm" style="color:#E8E8E8;">Service Crew</p>
									<p class="font-general-regular text-xs mt-1" style="color:#555;">Rise Restaurant at Marina Bay Sands · Current</p>
								</div>
							</div>
						</div>

						<!-- Certifications -->
						<div>
							<p class="section-label mb-6" data-sr data-sr-delay="0">Certifications</p>
							<div class="flex flex-col gap-3">
								<a
									v-for="(c, i) in certs"
									:key="c.name"
									:href="c.url"
									target="_blank"
									class="flex items-center justify-between gap-4 p-4 rounded group transition-all duration-200"
									style="border:1px solid #2A2A2A;"
									data-sr :data-sr-delay="i * 80 + 80"
									onmouseover="this.style.borderColor='#E8FF47'; this.style.background='rgba(232,255,71,0.03)'"
									onmouseout="this.style.borderColor='#2A2A2A'; this.style.background='transparent'"
								>
									<span class="font-general-medium text-sm" style="color:#888;">{{ c.name }}</span>
									<i data-feather="external-link" class="w-4 h-4 flex-shrink-0" style="color:#333;"></i>
								</a>
							</div>
						</div>

						<a download="Oliver-Resume.pdf" href="/files/Oliver-Resume.pdf"
							class="btn-primary self-start" data-sr data-sr-delay="200">
							<i data-feather="download" class="w-4 h-4"></i>
							Download CV
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- Wave out -->
		<WaveDivider color="#111111" :flip="true" :height="60" />

		<!-- Stats -->
		<section>
			<div class="max-w-7xl mx-auto px-6 py-20">
				<p class="section-label mb-10" data-sr data-sr-delay="0">By the numbers</p>
				<div class="grid grid-cols-3 gap-px" style="background:#1A1A1A;">
					<div class="stat-card rounded-none" data-sr data-sr-type="scale" data-sr-delay="0" style="background:#0A0A0A;">
						<p class="font-general-bold text-4xl sm:text-5xl mb-1 stat-num" style="color:#E8FF47; letter-spacing:-0.04em;">8+</p>
						<p class="font-general-regular text-xs" style="color:#444;">Projects</p>
					</div>
					<div class="stat-card rounded-none" data-sr data-sr-type="scale" data-sr-delay="120" style="background:#0A0A0A;">
						<p class="font-general-bold text-4xl sm:text-5xl mb-1 stat-num" style="color:#E8FF47; letter-spacing:-0.04em;">92%</p>
						<p class="font-general-regular text-xs" style="color:#444;">Satisfaction</p>
					</div>
					<div class="stat-card rounded-none" data-sr data-sr-type="scale" data-sr-delay="240" style="background:#0A0A0A;">
						<p class="font-general-bold text-4xl sm:text-5xl mb-1 stat-num" style="color:#E8FF47; letter-spacing:-0.04em;">1+</p>
						<p class="font-general-regular text-xs" style="color:#444;">Years exp.</p>
					</div>
				</div>
			</div>
		</section>

		<div class="pb-24"></div>
	</div>
</template>

<style scoped></style>
