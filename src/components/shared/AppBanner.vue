<script>
import feather from 'feather-icons';

export default {
	name: 'AppBanner',
	mounted() {
		feather.replace();
	},
	updated() {
		feather.replace();
	},
};
</script>

<template>
	<section class="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
		<!-- Decorative grid -->
		<div class="absolute inset-0 pointer-events-none" style="background-image: linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px); background-size: 60px 60px;"></div>

		<div class="relative z-10 w-full max-w-6xl mx-auto px-6">
			<div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

				<!-- Left content -->
				<div class="w-full lg:w-1/2 text-center lg:text-left">
					<!-- Badge -->
					<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 font-general-medium text-sm"
						style="background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.3); color: #A78BFA;">
						<span class="w-2 h-2 rounded-full bg-accent-violet-light animate-pulse-slow"></span>
						Available for opportunities
					</div>

					<!-- Name -->
					<h1 class="font-general-bold text-4xl sm:text-5xl xl:text-6xl leading-tight mb-4" style="color: #F1F5F9;">
						Hi, I'm
						<span class="gradient-text block sm:inline"> Nay Htet Aung</span>
					</h1>

					<!-- Title -->
					<p class="font-general-medium text-xl sm:text-2xl mb-6" style="color: #94A3B8;">
						Full-Stack Developer
						<span class="gradient-text-pink"> & Creative Coder</span>
					</p>

					<!-- Bio snippet -->
					<p class="font-general-regular text-base leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0" style="color: #64748B;">
						Building modern web experiences with Vue.js, Node.js, and a passion for clean, performant code.
					</p>

					<!-- CTA buttons -->
					<div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
						<a
							download="Oliver-Resume.pdf"
							href="/files/Oliver-Resume.pdf"
							class="btn-glow inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-general-medium text-white text-sm"
							aria-label="Download Resume"
						>
							<i data-feather="download" class="w-4 h-4"></i>
							Download CV
						</a>
						<router-link
							to="/projects"
							class="btn-outline-glow inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-general-medium text-sm"
							aria-label="View Projects"
						>
							View Projects
							<i data-feather="arrow-right" class="w-4 h-4"></i>
						</router-link>
					</div>

					<!-- Tech stack pills -->
					<div class="mt-10 flex flex-wrap gap-2 justify-center lg:justify-start">
						<span v-for="tech in ['Vue.js', 'Node.js', 'React', 'JavaScript', 'Laravel']" :key="tech"
							class="skill-tag px-3 py-1 rounded-full text-xs font-general-medium">
							{{ tech }}
						</span>
					</div>
				</div>

				<!-- Right illustration -->
				<div class="w-full lg:w-1/2 flex justify-center lg:justify-end">
					<div class="relative">
						<!-- Glow behind image -->
						<div class="absolute inset-0 rounded-full" style="background: radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%); transform: scale(1.2);"></div>
						<img
							src="@/assets/images/developer-dark.svg"
							alt="Developer Illustration"
							class="relative z-10 w-full max-w-md lg:max-w-lg"
							style="animation: float 6s ease-in-out infinite; filter: drop-shadow(0 0 40px rgba(124,58,237,0.3));"
						/>
					</div>
				</div>
			</div>

			<!-- Scroll indicator -->
			<div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
				<span class="font-general-regular text-xs" style="color: #64748B;">Scroll down</span>
				<div class="w-px h-8 bg-gradient-to-b from-violet-500 to-transparent"></div>
			</div>
		</div>
	</section>
</template>

<style scoped></style>
