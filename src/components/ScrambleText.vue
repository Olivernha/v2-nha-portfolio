<script>
export default {
	name: 'ScrambleText',
	props: {
		text: { type: String, required: true },
		duration: { type: Number, default: 1500 },
		delay: { type: Number, default: 0 },
		tag: { type: String, default: 'span' },
	},
	data: () => ({
		displayed: '',
		observer: null,
		started: false,
	}),
	mounted() {
		this.displayed = this.text;
		this.observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !this.started) {
					this.started = true;
					setTimeout(() => this.scramble(), this.delay);
					this.observer.disconnect();
				}
			},
			{ threshold: 0.2 }
		);
		this.observer.observe(this.$el);
	},
	beforeUnmount() {
		if (this.observer) this.observer.disconnect();
	},
	methods: {
		scramble() {
			const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
			const target = this.text;
			const totalFrames = Math.floor(this.duration / 30);
			let frame = 0;

			const tick = () => {
				const progress = frame / totalFrames;
				const revealedCount = Math.floor(progress * target.length);

				let result = '';
				for (let i = 0; i < target.length; i++) {
					if (target[i] === ' ') {
						result += ' ';
					} else if (i < revealedCount) {
						result += target[i];
					} else {
						result += chars[Math.floor(Math.random() * chars.length)];
					}
				}
				this.displayed = result;
				frame++;

				if (frame <= totalFrames) {
					requestAnimationFrame(tick);
				} else {
					this.displayed = target;
				}
			};

			requestAnimationFrame(tick);
		},
	},
};
</script>

<template>
	<component :is="tag">{{ displayed }}</component>
</template>
