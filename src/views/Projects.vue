<script>
import feather from 'feather-icons';
import projects from '../data/projects';
import { revealAll } from '../composables/useScrollReveal.js';

export default {
	name: 'Projects',
	data: () => ({
		projects,
		active: '',
		search: '',
		categories: ['All', 'React', 'NodeJs', 'UI/UX Design', 'Laravel', 'VueJs'],
		headerVisible: false,
	}),
	computed: {
		filtered() {
			let list = this.projects;
			if (this.active && this.active !== 'All') {
				list = list.filter(p => p.category === this.active);
			}
			if (this.search.trim()) {
				const re = new RegExp(this.search.trim(), 'i');
				list = list.filter(p => p.title.match(re));
			}
			return list;
		},
	},
	mounted() {
		feather.replace();
		setTimeout(() => { this.headerVisible = true; }, 80);
		this.$nextTick(() => revealAll(this.$el));
	},
	updated() {
		feather.replace();
		this.$nextTick(() => revealAll(this.$el));
	},
};
</script>

<template>
	<div class="min-h-screen pt-28">

		<!-- Page header -->
		<div class="max-w-7xl mx-auto px-6 pt-12 pb-10 relative overflow-hidden">
			<!-- Watermark -->
			<div class="absolute right-0 bottom-0 font-general-bold select-none pointer-events-none"
				style="font-size:clamp(6rem,14vw,14rem); color:#111111; letter-spacing:-0.06em; line-height:1; z-index:0;">
				WORK
			</div>

			<div class="relative z-10">
				<p class="section-label mb-6"
					:style="{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(-12px)', transition: 'all 0.5s ease 0.1s' }">
					My Work
				</p>
				<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
					<div class="overflow-hidden">
						<h1 class="font-general-bold leading-none"
							:style="{
								fontSize: 'clamp(3rem,7vw,6rem)',
								letterSpacing: '-0.04em',
								color: '#E8E8E8',
								opacity: headerVisible ? 1 : 0,
								transform: headerVisible ? 'translateY(0)' : 'translateY(60px)',
								transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s'
							}">
							Projects
						</h1>
					</div>
					<!-- Search -->
					<div class="relative sm:w-64"
						:style="{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.4s' }">
						<i data-feather="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style="color:#444;"></i>
						<input v-model="search" class="field pl-10 py-2.5 text-sm" placeholder="Search projects..." />
					</div>
				</div>
			</div>
		</div>

		<!-- Category filter -->
		<div class="max-w-7xl mx-auto px-6 pb-6 flex flex-wrap gap-2" data-sr data-sr-delay="300">
			<button
				v-for="cat in categories"
				:key="cat"
				@click="active = cat === 'All' ? '' : cat"
				:class="['pill', (cat === 'All' && !active) || active === cat ? 'active' : '']"
			>{{ cat }}</button>
		</div>

		<div class="max-w-7xl mx-auto px-6">
			<!-- Lime line draw -->
			<div data-sr data-sr-type="line" data-sr-delay="350"
				style="height:1px; background:#E8FF47; margin-bottom:0;"></div>
		</div>

		<!-- Project list -->
		<div class="max-w-7xl mx-auto px-6">
			<transition-group name="list" tag="div">
				<a
					v-for="(p, i) in filtered"
					:key="p.id"
					:href="p.link"
					target="_blank"
					class="project-row flex items-center gap-4 sm:gap-8 py-5 sm:py-7 group"
					data-sr data-sr-type="left"
					:data-sr-delay="i * 60 + 400"
				>
					<span class="project-num">{{ String(i + 1).padStart(2, '0') }}</span>

					<div class="w-16 h-11 sm:w-24 sm:h-16 rounded overflow-hidden flex-shrink-0"
						style="border:1px solid #1A1A1A;">
						<img :src="p.img" :alt="p.title"
							class="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
					</div>

					<div class="flex-1 min-w-0">
						<p class="font-general-semibold text-base sm:text-xl truncate"
							style="color:#E8E8E8; letter-spacing:-0.02em;">{{ p.title }}</p>
						<p class="font-general-regular text-xs mt-0.5 sm:hidden" style="color:#444;">{{ p.category }}</p>
					</div>

					<span class="hidden sm:block pill">{{ p.category }}</span>
					<span class="hidden md:block font-general-light text-xs" style="color:#2A2A2A; min-width:3rem; text-align:right;">2023</span>

					<div class="project-arrow flex-shrink-0">
						<i data-feather="arrow-up-right" class="w-5 h-5"></i>
					</div>
				</a>
			</transition-group>

			<div v-if="filtered.length === 0" class="py-24 text-center" data-sr>
				<p class="font-general-medium text-sm" style="color:#333;">No projects found.</p>
			</div>

			<!-- Lime line at bottom -->
			<div data-sr data-sr-type="line" data-sr-delay="0"
				style="height:1px; background:#E8FF47;"></div>
		</div>

		<div class="pb-24"></div>
	</div>
</template>

<style scoped>
.list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(-16px); }
</style>
