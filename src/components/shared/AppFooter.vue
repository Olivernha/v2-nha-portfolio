<script>
import feather from 'feather-icons';
export default {
	mounted() { feather.replace(); },
	updated() { feather.replace(); },
};
</script>

<template>
	<footer style="border-top:1px solid #1A1A1A;">
		<div class="max-w-7xl mx-auto px-6 py-10">
			<div class="flex flex-col sm:flex-row items-center justify-between gap-6">

				<!-- Logo + copyright -->
				<div class="flex items-center gap-3">
					<div class="w-7 h-7 rounded flex items-center justify-center font-general-bold text-xs"
						style="background:#E8FF47; color:#0A0A0A;">N</div>
					<p class="font-general-regular text-xs" style="color:#333;">
						© {{ new Date().getFullYear() }} Nay Htet Aung
					</p>
				</div>

				<!-- Nav -->
				<nav class="flex items-center gap-6">
					<router-link to="/"         class="font-general-regular text-xs transition-colors" style="color:#333;" onmouseover="this.style.color='#E8FF47'" onmouseout="this.style.color='#333'">Home</router-link>
					<router-link to="/about"    class="font-general-regular text-xs transition-colors" style="color:#333;" onmouseover="this.style.color='#E8FF47'" onmouseout="this.style.color='#333'">About</router-link>
					<router-link to="/projects" class="font-general-regular text-xs transition-colors" style="color:#333;" onmouseover="this.style.color='#E8FF47'" onmouseout="this.style.color='#333'">Projects</router-link>
					<router-link to="/contact"  class="font-general-regular text-xs transition-colors" style="color:#333;" onmouseover="this.style.color='#E8FF47'" onmouseout="this.style.color='#333'">Contact</router-link>
				</nav>

				<!-- Socials -->
				<div class="flex items-center gap-4">
					<a href="https://github.com/olivernha" target="_blank" aria-label="GitHub"
						class="transition-colors" style="color:#333;"
						onmouseover="this.style.color='#E8FF47'" onmouseout="this.style.color='#333'">
						<i data-feather="github" class="w-4 h-4"></i>
					</a>
					<a href="https://twitter.com/oliver_nha" target="_blank" aria-label="Twitter"
						class="transition-colors" style="color:#333;"
						onmouseover="this.style.color='#E8FF47'" onmouseout="this.style.color='#333'">
						<i data-feather="twitter" class="w-4 h-4"></i>
					</a>
					<a href="https://www.instagram.com/oliver_nha/" target="_blank" aria-label="Instagram"
						class="transition-colors" style="color:#333;"
						onmouseover="this.style.color='#E8FF47'" onmouseout="this.style.color='#333'">
						<i data-feather="instagram" class="w-4 h-4"></i>
					</a>
				</div>
			</div>
		</div>
	</footer>
</template>

<style scoped></style>
