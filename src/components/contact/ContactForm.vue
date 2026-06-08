<script>
import emailjs from '@emailjs/browser';
export default {
	data() {
		return {
			sending: false,
			sent: false,
		};
	},
	methods: {
		sendEmail() {
			this.sending = true;
			emailjs
				.sendForm(
					process.env.VUE_APP_SERVICE_ID,
					process.env.VUE_APP_TEMPLATE_ID,
					this.$refs.form,
					process.env.VUE_APP_PUBLIC_KEY
				)
				.then(
					(result) => {
						console.log('SUCCESS!', result.text);
						this.sending = false;
						this.sent = true;
						setTimeout(() => { this.sent = false; }, 4000);
					},
					(error) => {
						console.log('FAILED...', error.text);
						this.sending = false;
					}
				);
		},
	},
};
</script>

<template>
	<div class="w-full lg:w-3/5">
		<div class="glass-card rounded-2xl p-8">
			<h2 class="font-general-semibold text-2xl mb-6" style="color: #F1F5F9;">Send a Message</h2>

			<!-- Success message -->
			<div v-if="sent" class="mb-6 p-4 rounded-xl flex items-center gap-3"
				style="background: rgba(6,182,212,0.1); border: 1px solid rgba(6,182,212,0.3);">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0" style="color: #22D3EE;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				<p class="font-general-medium text-sm" style="color: #22D3EE;">Message sent successfully!</p>
			</div>

			<form ref="form" @submit.prevent="sendEmail" class="space-y-5">
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
					<div>
						<label class="block font-general-medium text-sm mb-2" style="color: #94A3B8;" for="name">Full Name</label>
						<input
							class="w-full px-4 py-3 rounded-xl font-general-regular text-sm input-glow transition-all"
							style="background: rgba(8,11,20,0.6); border: 1px solid rgba(124,58,237,0.2); color: #F1F5F9;"
							id="name" name="user_name" type="text" required placeholder="Your name"
						/>
					</div>
					<div>
						<label class="block font-general-medium text-sm mb-2" style="color: #94A3B8;" for="email">Email</label>
						<input
							class="w-full px-4 py-3 rounded-xl font-general-regular text-sm input-glow transition-all"
							style="background: rgba(8,11,20,0.6); border: 1px solid rgba(124,58,237,0.2); color: #F1F5F9;"
							id="email" name="email" type="email" required placeholder="your@email.com"
						/>
					</div>
				</div>

				<div>
					<label class="block font-general-medium text-sm mb-2" style="color: #94A3B8;" for="subject">Subject</label>
					<input
						class="w-full px-4 py-3 rounded-xl font-general-regular text-sm input-glow transition-all"
						style="background: rgba(8,11,20,0.6); border: 1px solid rgba(124,58,237,0.2); color: #F1F5F9;"
						id="subject" name="subject" type="text" required placeholder="What's this about?"
					/>
				</div>

				<div>
					<label class="block font-general-medium text-sm mb-2" style="color: #94A3B8;" for="message">Message</label>
					<textarea
						class="w-full px-4 py-3 rounded-xl font-general-regular text-sm input-glow transition-all resize-none"
						style="background: rgba(8,11,20,0.6); border: 1px solid rgba(124,58,237,0.2); color: #F1F5F9;"
						id="message" name="message" rows="5" placeholder="Tell me about your project..."
					></textarea>
				</div>

				<button
					type="submit"
					:disabled="sending"
					class="btn-glow w-full py-3.5 rounded-xl font-general-medium text-sm text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
				>
					<svg v-if="sending" class="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
					</svg>
					<svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
					</svg>
					{{ sending ? 'Sending...' : 'Send Message' }}
				</button>
			</form>
		</div>
	</div>
</template>

<style scoped>
input::placeholder, textarea::placeholder {
	color: #475569;
}
</style>
