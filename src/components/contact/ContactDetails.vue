<script>
export default {
	props: ['contacts'],
};
</script>

<template>
	<div class="w-full lg:w-2/5">
		<div class="mb-8">
			<h2 class="font-general-bold text-3xl sm:text-4xl mb-3" style="color: #F1F5F9;">
				Let's <span class="gradient-text">Connect</span>
			</h2>
			<p class="font-general-regular text-base leading-relaxed" style="color: #64748B;">
				Have a project in mind or just want to say hi? My inbox is always open.
			</p>
		</div>

		<!-- Contact items -->
		<div class="space-y-4 mb-10">
			<a
				v-for="contact in contacts"
				:key="contact.id"
				href="#"
				class="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group block"
				style="background: rgba(19,25,41,0.6); border: 1px solid rgba(124,58,237,0.1);"
				onmouseover="this.style.borderColor='rgba(124,58,237,0.4)'"
				onmouseout="this.style.borderColor='rgba(124,58,237,0.1)'"
			>
				<div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
					style="background: rgba(124,58,237,0.15); color: #A78BFA;">
					<i :data-feather="contact.icon" class="w-5 h-5"></i>
				</div>
				<span class="font-general-regular text-sm group-hover:text-violet-400 transition-colors" style="color: #94A3B8;">
					{{ contact.name }}
				</span>
			</a>
		</div>

		<!-- Social links -->
		<div>
			<p class="font-general-medium text-sm mb-4" style="color: #475569;">Find me on</p>
			<div class="flex gap-3">
				<a href="https://github.com/olivernha" target="_blank"
					class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
					style="background: rgba(19,25,41,0.8); border: 1px solid rgba(124,58,237,0.2); color: #94A3B8;"
					onmouseover="this.style.borderColor='rgba(124,58,237,0.5)'; this.style.color='#A78BFA';"
					onmouseout="this.style.borderColor='rgba(124,58,237,0.2)'; this.style.color='#94A3B8';"
					aria-label="GitHub">
					<i data-feather="github" class="w-4 h-4"></i>
				</a>
				<a href="https://twitter.com/oliver_nha" target="_blank"
					class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
					style="background: rgba(19,25,41,0.8); border: 1px solid rgba(124,58,237,0.2); color: #94A3B8;"
					onmouseover="this.style.borderColor='rgba(124,58,237,0.5)'; this.style.color='#A78BFA';"
					onmouseout="this.style.borderColor='rgba(124,58,237,0.2)'; this.style.color='#94A3B8';"
					aria-label="Twitter">
					<i data-feather="twitter" class="w-4 h-4"></i>
				</a>
				<a href="https://www.instagram.com/oliver_nha/" target="_blank"
					class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
					style="background: rgba(19,25,41,0.8); border: 1px solid rgba(124,58,237,0.2); color: #94A3B8;"
					onmouseover="this.style.borderColor='rgba(124,58,237,0.5)'; this.style.color='#A78BFA';"
					onmouseout="this.style.borderColor='rgba(124,58,237,0.2)'; this.style.color='#94A3B8';"
					aria-label="Instagram">
					<i data-feather="instagram" class="w-4 h-4"></i>
				</a>
				<a href="https://www.facebook.com/profile.php?id=100009412815085" target="_blank"
					class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
					style="background: rgba(19,25,41,0.8); border: 1px solid rgba(124,58,237,0.2); color: #94A3B8;"
					onmouseover="this.style.borderColor='rgba(124,58,237,0.5)'; this.style.color='#A78BFA';"
					onmouseout="this.style.borderColor='rgba(124,58,237,0.2)'; this.style.color='#94A3B8';"
					aria-label="Facebook">
					<i data-feather="facebook" class="w-4 h-4"></i>
				</a>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
