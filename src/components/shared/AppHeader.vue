<script>
import feather from 'feather-icons';

export default {
	name: 'AppHeader',
	props: ['showModal', 'theme', 'toggleTheme'],
	data() {
		return {
			menuOpen: false,
			scrolled: false,
		};
	},
	mounted() {
		feather.replace();
		window.addEventListener('scroll', this.onScroll);
	},
	beforeUnmount() {
		window.removeEventListener('scroll', this.onScroll);
	},
	updated() { feather.replace(); },
	methods: {
		onScroll() { this.scrolled = window.scrollY > 40; },
		close() { this.menuOpen = false; },
		scrollTo(id) {
			this.close();
			const el = document.getElementById(id);
			if (el) el.scrollIntoView({ behavior: 'smooth' });
		},
	},
};
</script>

<template>
	<header
		:class="scrolled ? 'py-3 header-scrolled' : 'py-5'"
		class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
		style="backdrop-filter: blur(16px);"
	>
		<div class="max-w-7xl mx-auto px-6 flex items-center justify-between">

			<!-- Logo -->
			<a href="#hero" @click.prevent="scrollTo('hero')" class="flex items-center gap-3 group" aria-label="Home">
				<div class="w-8 h-8 rounded flex items-center justify-center font-general-bold text-sm"
					style="background:var(--c-lime); color:var(--c-bg);">N</div>
				<span class="font-general-semibold text-base" style="color:var(--c-text); letter-spacing:-0.01em;">
					NHA
				</span>
			</a>

			<!-- Desktop nav -->
			<nav class="hidden md:flex items-center gap-8">
				<a href="#about"   @click.prevent="scrollTo('about')"   class="nav-item">About</a>
				<a href="#work"    @click.prevent="scrollTo('work')"    class="nav-item">Work</a>
				<a href="#contact" @click.prevent="scrollTo('contact')" class="nav-item">Contact</a>
			</nav>

			<!-- Right actions -->
			<div class="flex items-center gap-3">
				<!-- Theme toggle -->
				<button
					@click="toggleTheme"
					class="w-9 h-9 flex items-center justify-center rounded transition-colors"
					style="border:1px solid var(--c-border); color:var(--c-muted);"
					:aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
				>
					<i v-if="theme === 'dark'" data-feather="sun" class="w-4 h-4"></i>
					<i v-else data-feather="moon" class="w-4 h-4"></i>
				</button>

				<button
					@click="showModal()"
					type="button"
					class="hidden md:inline-flex btn-primary text-sm py-2.5 px-5"
					aria-label="Hire Me"
				>Hire Me</button>

				<!-- Hamburger -->
				<button
					@click="menuOpen = !menuOpen"
					class="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
					aria-label="Menu"
				>
					<span class="block w-5 h-px transition-all duration-300"
						:style="menuOpen ? 'background:var(--c-lime); transform:translateY(4px) rotate(45deg)' : 'background:var(--c-muted);'"></span>
					<span class="block w-5 h-px transition-all duration-300"
						:style="menuOpen ? 'opacity:0' : 'background:var(--c-muted);'"></span>
					<span class="block w-5 h-px transition-all duration-300"
						:style="menuOpen ? 'background:var(--c-lime); transform:translateY(-4px) rotate(-45deg)' : 'background:var(--c-muted);'"></span>
				</button>
			</div>
		</div>

		<!-- Mobile menu -->
		<transition name="menu">
			<div v-if="menuOpen"
				class="md:hidden px-6 pb-6 pt-4 flex flex-col gap-1"
				style="border-top: 1px solid var(--c-border);"
			>
				<a href="#about"   @click.prevent="scrollTo('about')"   class="py-3 font-general-medium text-sm border-b" style="color:var(--c-muted); border-color:var(--c-border);">About</a>
				<a href="#work"    @click.prevent="scrollTo('work')"    class="py-3 font-general-medium text-sm border-b" style="color:var(--c-muted); border-color:var(--c-border);">Work</a>
				<a href="#contact" @click.prevent="scrollTo('contact')" class="py-3 font-general-medium text-sm border-b" style="color:var(--c-muted); border-color:var(--c-border);">Contact</a>
				<button @click="showModal(); close()" class="btn-primary mt-4 justify-center">Hire Me</button>
			</div>
		</transition>
	</header>
</template>

<style scoped>
header {
	background: var(--c-header-bg);
	border-bottom: 1px solid transparent;
}
.header-scrolled {
	border-bottom-color: var(--c-border) !important;
}
.menu-enter-active, .menu-leave-active { transition: all 0.25s ease; }
.menu-enter-from, .menu-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
