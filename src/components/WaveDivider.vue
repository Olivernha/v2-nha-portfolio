<script>
export default {
	name: 'WaveDivider',
	props: {
		flip: { type: Boolean, default: false },
		color: { type: String, default: '#111111' },
		height: { type: Number, default: 60 },
	},
};
</script>

<template>
	<div class="wave-divider" :style="{ transform: flip ? 'scaleY(-1)' : 'none', marginBottom: flip ? '-1px' : '0' }">
		<svg
			:viewBox="`0 0 1440 ${height}`"
			:height="height"
			preserveAspectRatio="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				:fill="color"
				:d="`M0,${height} C240,0 480,${height} 720,${Math.round(height*0.4)} C960,0 1200,${height} 1440,${Math.round(height*0.3)} L1440,${height} L0,${height} Z`"
			/>
		</svg>
	</div>
</template>
