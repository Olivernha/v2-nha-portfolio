<script>
export default {
	props: ['project'],
};
</script>

<template>
	<a
		:href="project.link"
		target="_blank"
		class="glass-card group rounded-2xl overflow-hidden block transition-all duration-300 hover:-translate-y-1"
		aria-label="View Project"
	>
		<!-- Image -->
		<div class="relative overflow-hidden aspect-video">
			<template v-if="project.video">
				<video
					:src="project.video"
					:aria-label="project.title"
					class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					autoplay
					muted
					loop
					playsinline
					preload="metadata"
				/>
			</template>
			<template v-else>
				<img
					:src="project.img"
					:alt="project.title"
					class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
			</template>
			<!-- Overlay on hover -->
			<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				style="background: rgba(8,11,20,0.7);">
				<div class="flex items-center gap-2 px-4 py-2 rounded-full font-general-medium text-sm text-white"
					style="background: rgba(124,58,237,0.8); backdrop-filter: blur(8px);">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					</svg>
					View Project
				</div>
			</div>
		</div>

		<!-- Content -->
		<div class="p-5">
			<div class="flex items-start justify-between gap-2">
				<div>
					<h3 class="font-general-semibold text-base mb-1 group-hover:text-violet-400 transition-colors" style="color: #F1F5F9;">
						{{ project.title }}
					</h3>
					<span class="skill-tag px-2.5 py-1 rounded-full text-xs font-general-medium inline-block">
						{{ project.category }}
					</span>
				</div>
				<div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-violet-500"
					style="background: rgba(124,58,237,0.1); color: #8B5CF6;">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</div>
			</div>
		</div>
	</a>
</template>

<style scoped></style>
