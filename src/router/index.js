import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: { title: 'Nay Htet Aung — Full-Stack Developer' },
	},
	// Redirect legacy routes back to home
	{ path: '/about',    redirect: '/' },
	{ path: '/projects', redirect: '/' },
	{ path: '/contact',  redirect: '/' },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) return savedPosition;
		return { top: 0 };
	},
});

router.beforeEach((to, from, next) => {
	if (to.meta && to.meta.title) {
		document.title = to.meta.title;
	}
	next();
});

export default router;
