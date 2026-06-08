<script>
export default {
	name: 'CursorFollower',
	data: () => ({
		x: -100, y: -100,
		rx: -100, ry: -100,
		hover: false,
		visible: false,
	}),
	mounted() {
		// Only on non-touch devices
		if (window.matchMedia('(pointer: fine)').matches) {
			this.visible = true;
			window.addEventListener('mousemove', this.onMove);
			document.addEventListener('mouseover', this.onOver);
			document.addEventListener('mouseout', this.onOut);
			this.raf();
		}
	},
	beforeUnmount() {
		window.removeEventListener('mousemove', this.onMove);
		document.removeEventListener('mouseover', this.onOver);
		document.removeEventListener('mouseout', this.onOut);
		cancelAnimationFrame(this._raf);
	},
	methods: {
		onMove(e) {
			this.x = e.clientX;
			this.y = e.clientY;
		},
		onOver(e) {
			const t = e.target.closest('a, button, [data-cursor-hover]');
			this.hover = !!t;
		},
		onOut() {
			this.hover = false;
		},
		raf() {
			// Smooth ring follows with lerp
			this.rx += (this.x - this.rx) * 0.12;
			this.ry += (this.y - this.ry) * 0.12;
			this._raf = requestAnimationFrame(this.raf);
		},
	},
};
</script>

<template>
	<template v-if="visible">
		<!-- Dot — snaps instantly -->
		<div
			class="cursor-dot"
			:class="{ 'cursor-hover': hover }"
			:style="{ left: x + 'px', top: y + 'px' }"
		></div>
		<!-- Ring — lags behind -->
		<div
			class="cursor-ring"
			:class="{ 'cursor-hover': hover }"
			:style="{ left: rx + 'px', top: ry + 'px' }"
		></div>
	</template>
</template>
