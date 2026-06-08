<script>
export default {
	props: {
		select: {
			type: String,
			default: 'projects',
			required: true,
		},
		selectOptions: {
			type: Array,
			default: () => ['React', 'NodeJs', 'UI/UX Design', 'Laravel', 'VueJs'],
		},
	},
};
</script>

<template>
	<select
		@change="$emit('filter', $event.target.value)"
		:name="select"
		:id="select"
		class="px-4 py-2.5 rounded-xl font-general-medium text-sm input-glow transition-all cursor-pointer"
		style="background: rgba(19,25,41,0.8); border: 1px solid rgba(124,58,237,0.2); color: #94A3B8;"
	>
		<option value="" style="background: #0E1220;">All Categories</option>
		<option
			v-for="option in selectOptions"
			:key="option"
			:value="option"
			style="background: #0E1220;"
		>{{ option }}</option>
	</select>
</template>

<style scoped></style>
