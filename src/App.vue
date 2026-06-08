<script>
import feather from 'feather-icons';
import AppHeader from './components/shared/AppHeader.vue';
import HireMeModal from './components/HireMeModal.vue';
import CursorFollower from './components/CursorFollower.vue';

export default {
	name: 'App',
	components: { AppHeader, HireMeModal, CursorFollower },
	data() {
		return {
			modal: false,
			theme: localStorage.getItem('theme') || 'dark',
			categories: [
				{ id: 1, value: 'web',   name: 'Web Application' },
				{ id: 2, value: 'ui-ux', name: 'UI/UX Design' },
			],
		};
	},
	mounted() {
		document.documentElement.setAttribute('data-theme', this.theme);
		feather.replace();
	},
	updated() { feather.replace(); },
	methods: {
		showModal() {
			this.modal = !this.modal;
			document.documentElement.classList.toggle('overflow-hidden', this.modal);
		},
		toggleTheme() {
			this.theme = this.theme === 'dark' ? 'light' : 'dark';
			localStorage.setItem('theme', this.theme);
			document.documentElement.setAttribute('data-theme', this.theme);
			feather.replace();
		},
	},
};
</script>

<template>
	<div :data-theme="theme" style="min-height:100vh;">
		<CursorFollower />

		<AppHeader :showModal="showModal" :theme="theme" :toggleTheme="toggleTheme" />

		<transition name="page" mode="out-in">
			<router-view :showModal="showModal" :theme="theme" :toggleTheme="toggleTheme" />
		</transition>

		<HireMeModal :showModal="showModal" :modal="modal" :categories="categories" />

		<back-to-top visibleoffset="400" right="24px" bottom="24px">
			<i data-feather="arrow-up" class="w-4 h-4" style="color:#AAAAAA;"></i>
		</back-to-top>
	</div>
</template>

<style>
#app {
	font-family: 'GeneralSans-Regular', 'Helvetica Neue', Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	cursor: none;
	background-color: var(--c-bg);
	color: var(--c-text);
}
a, button { cursor: none; }
</style>
