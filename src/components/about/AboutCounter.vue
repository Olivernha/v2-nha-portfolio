<script>
import counter from 'vue3-autocounter';
export default {
	components: { counter },
	data: () => {
		return {
			stats: [
				{ id: 1, endAmount: 1, suffix: '+', label: 'Years of Experience', icon: '🚀' },
				{ id: 2, endAmount: 92, suffix: '%', label: 'Positive Feedback', icon: '⭐' },
				{ id: 3, endAmount: 8, suffix: '+', label: 'Projects Completed', icon: '💼' },
			],
		};
	},
};
</script>

<template>
	<div class="py-16 my-16 relative overflow-hidden">
		<!-- Background -->
		<div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(124,58,237,0.05) 0%, rgba(6,182,212,0.05) 100%); border-top: 1px solid rgba(124,58,237,0.1); border-bottom: 1px solid rgba(124,58,237,0.1);"></div>

		<div class="relative z-10 max-w-6xl mx-auto px-6">
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
				<div
					v-for="stat in stats"
					:key="stat.id"
					class="text-center group"
				>
					<div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 text-2xl"
						style="background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.2);">
						{{ stat.icon }}
					</div>
					<div class="counter-number font-general-bold text-5xl mb-2">
						<counter
							:startAmount="0"
							:endAmount="stat.endAmount"
							:suffix="stat.suffix"
							:duration="1.5"
							:autoinit="true"
						/>
					</div>
					<p class="font-general-medium text-sm" style="color: #64748B;">{{ stat.label }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
