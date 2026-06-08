<script>
import feather from 'feather-icons';
import emailjs from '@emailjs/browser';
import WaveDivider from '../components/WaveDivider.vue';
import { revealAll } from '../composables/useScrollReveal.js';

export default {
	name: 'Contact',
	components: { WaveDivider },
	data: () => ({
		form: { name: '', email: '', subject: '', message: '' },
		sending: false,
		sent: false,
		error: false,
		headerVisible: false,
	}),
	mounted() {
		feather.replace();
		setTimeout(() => { this.headerVisible = true; }, 80);
		this.$nextTick(() => revealAll(this.$el));
	},
	updated() { feather.replace(); },
	methods: {
		async send() {
			this.sending = true;
			this.error = false;
			try {
				await emailjs.sendForm(
					process.env.VUE_APP_SERVICE_ID,
					process.env.VUE_APP_TEMPLATE_ID,
					this.$refs.form,
					process.env.VUE_APP_PUBLIC_KEY
				);
				this.sent = true;
				this.form = { name: '', email: '', subject: '', message: '' };
				setTimeout(() => { this.sent = false; }, 5000);
			} catch {
				this.error = true;
			} finally {
				this.sending = false;
			}
		},
	},
};
</script>

<template>
	<div class="min-h-screen pt-28">

		<!-- Header -->
		<section class="max-w-7xl mx-auto px-6 pt-12 pb-16 relative overflow-hidden">
			<!-- Watermark -->
			<div class="absolute right-0 top-0 font-general-bold select-none pointer-events-none"
				style="font-size:clamp(6rem,14vw,14rem); color:#111111; letter-spacing:-0.06em; line-height:1; z-index:0;">
				HI
			</div>

			<div class="relative z-10">
				<p class="section-label mb-6"
					:style="{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(-12px)', transition: 'all 0.5s ease 0.1s' }">
					Get In Touch
				</p>

				<div class="overflow-hidden mb-1">
					<h1 class="font-general-bold leading-none"
						:style="{
							fontSize: 'clamp(3rem,7vw,6rem)',
							letterSpacing: '-0.04em',
							color: '#E8E8E8',
							opacity: headerVisible ? 1 : 0,
							transform: headerVisible ? 'translateY(0)' : 'translateY(60px)',
							transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s'
						}">
						Let's work
					</h1>
				</div>
				<div class="overflow-hidden">
					<h1 class="font-general-bold leading-none"
						:style="{
							fontSize: 'clamp(3rem,7vw,6rem)',
							letterSpacing: '-0.04em',
							WebkitTextStroke: '1.5px #E8E8E8',
							color: 'transparent',
							opacity: headerVisible ? 1 : 0,
							transform: headerVisible ? 'translateY(0)' : 'translateY(60px)',
							transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s'
						}">
						together.
					</h1>
				</div>

				<!-- Lime line draw -->
				<div :style="{
					height: '2px',
					background: '#E8FF47',
					width: '80px',
					marginTop: '24px',
					transform: headerVisible ? 'scaleX(1)' : 'scaleX(0)',
					transformOrigin: 'left',
					transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s'
				}"></div>
			</div>
		</section>

		<!-- Wave -->
		<WaveDivider color="#111111" :height="60" />

		<!-- Two-column -->
		<section style="background:#111111;">
			<div class="max-w-7xl mx-auto px-6 py-20">
				<div class="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

					<!-- Left: contact info -->
					<div class="lg:col-span-2 flex flex-col gap-10">
						<div>
							<p class="section-label mb-6" data-sr data-sr-delay="0">Contact Info</p>
							<div class="flex flex-col gap-5">
								<div class="flex items-start gap-4" data-sr data-sr-type="left" data-sr-delay="80">
									<div class="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
										style="background:#1A1A1A; border:1px solid #2A2A2A;">
										<i data-feather="mail" class="w-4 h-4" style="color:#E8FF47;"></i>
									</div>
									<div>
										<p class="font-general-medium text-xs mb-1" style="color:#444;">Email</p>
										<a href="mailto:nayhtetaung201733@gmail.com"
											class="font-general-regular text-sm transition-colors"
											style="color:#888;"
											onmouseover="this.style.color='#E8FF47'"
											onmouseout="this.style.color='#888'"
										>nayhtetaung201733@gmail.com</a>
									</div>
								</div>
								<div class="flex items-start gap-4" data-sr data-sr-type="left" data-sr-delay="160">
									<div class="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
										style="background:#1A1A1A; border:1px solid #2A2A2A;">
										<i data-feather="phone" class="w-4 h-4" style="color:#E8FF47;"></i>
									</div>
									<div>
										<p class="font-general-medium text-xs mb-1" style="color:#444;">Phone</p>
										<a href="tel:+6589350559"
											class="font-general-regular text-sm transition-colors"
											style="color:#888;"
											onmouseover="this.style.color='#E8FF47'"
											onmouseout="this.style.color='#888'"
										>+65 8935 0559</a>
									</div>
								</div>
								<div class="flex items-start gap-4" data-sr data-sr-type="left" data-sr-delay="240">
									<div class="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
										style="background:#1A1A1A; border:1px solid #2A2A2A;">
										<i data-feather="map-pin" class="w-4 h-4" style="color:#E8FF47;"></i>
									</div>
									<div>
										<p class="font-general-medium text-xs mb-1" style="color:#444;">Location</p>
										<p class="font-general-regular text-sm" style="color:#888;">Singapore</p>
									</div>
								</div>
							</div>
						</div>

						<!-- Socials -->
						<div data-sr data-sr-delay="320">
							<p class="section-label mb-4">Socials</p>
							<div class="flex flex-col gap-0">
								<a href="https://github.com/olivernha" target="_blank"
									class="flex items-center gap-3 py-3 transition-colors group"
									style="color:#555; border-bottom:1px solid #1A1A1A;"
									onmouseover="this.style.color='#E8FF47'; this.style.paddingLeft='8px'"
									onmouseout="this.style.color='#555'; this.style.paddingLeft='0'"
								>
									<i data-feather="github" class="w-4 h-4"></i>
									<span class="font-general-medium text-sm">GitHub</span>
									<i data-feather="arrow-up-right" class="w-3 h-3 ml-auto"></i>
								</a>
								<a href="https://twitter.com/oliver_nha" target="_blank"
									class="flex items-center gap-3 py-3 transition-all"
									style="color:#555; border-bottom:1px solid #1A1A1A;"
									onmouseover="this.style.color='#E8FF47'; this.style.paddingLeft='8px'"
									onmouseout="this.style.color='#555'; this.style.paddingLeft='0'"
								>
									<i data-feather="twitter" class="w-4 h-4"></i>
									<span class="font-general-medium text-sm">Twitter</span>
									<i data-feather="arrow-up-right" class="w-3 h-3 ml-auto"></i>
								</a>
								<a href="https://www.instagram.com/oliver_nha/" target="_blank"
									class="flex items-center gap-3 py-3 transition-all"
									style="color:#555; border-bottom:1px solid #1A1A1A;"
									onmouseover="this.style.color='#E8FF47'; this.style.paddingLeft='8px'"
									onmouseout="this.style.color='#555'; this.style.paddingLeft='0'"
								>
									<i data-feather="instagram" class="w-4 h-4"></i>
									<span class="font-general-medium text-sm">Instagram</span>
									<i data-feather="arrow-up-right" class="w-3 h-3 ml-auto"></i>
								</a>
							</div>
						</div>
					</div>

					<!-- Right: form with cascading field animations -->
					<div class="lg:col-span-3">
						<p class="section-label mb-6" data-sr data-sr-delay="0">Send a Message</p>

						<div v-if="sent" class="mb-6 p-4 rounded flex items-center gap-3"
							style="background:#1A1A1A; border:1px solid #E8FF47;"
							data-sr data-sr-delay="0">
							<i data-feather="check-circle" class="w-4 h-4 flex-shrink-0" style="color:#E8FF47;"></i>
							<p class="font-general-medium text-sm" style="color:#E8FF47;">Message sent! I'll get back to you soon.</p>
						</div>

						<div v-if="error" class="mb-6 p-4 rounded flex items-center gap-3"
							style="background:#1A1A1A; border:1px solid #FF5C35;">
							<i data-feather="alert-circle" class="w-4 h-4 flex-shrink-0" style="color:#FF5C35;"></i>
							<p class="font-general-medium text-sm" style="color:#FF5C35;">Something went wrong. Please try again.</p>
						</div>

						<form ref="form" @submit.prevent="send" class="flex flex-col gap-5">
							<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
								<div data-sr data-sr-delay="80">
									<label class="block font-general-medium text-xs mb-2" style="color:#444;">Full Name</label>
									<input v-model="form.name" name="user_name" type="text" required class="field" placeholder="Your name" />
								</div>
								<div data-sr data-sr-delay="160">
									<label class="block font-general-medium text-xs mb-2" style="color:#444;">Email</label>
									<input v-model="form.email" name="email" type="email" required class="field" placeholder="your@email.com" />
								</div>
							</div>
							<div data-sr data-sr-delay="240">
								<label class="block font-general-medium text-xs mb-2" style="color:#444;">Subject</label>
								<input v-model="form.subject" name="subject" type="text" required class="field" placeholder="What's this about?" />
							</div>
							<div data-sr data-sr-delay="320">
								<label class="block font-general-medium text-xs mb-2" style="color:#444;">Message</label>
								<textarea v-model="form.message" name="message" rows="6" required
									class="field resize-none" placeholder="Tell me about your project..."></textarea>
							</div>
							<div class="pt-2" data-sr data-sr-delay="400">
								<button type="submit" :disabled="sending" class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
									<svg v-if="sending" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
									</svg>
									<i v-else data-feather="send" class="w-4 h-4"></i>
									{{ sending ? 'Sending…' : 'Send Message' }}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>

		<!-- Wave out -->
		<WaveDivider color="#111111" :flip="true" :height="60" />

		<div class="pb-24"></div>
	</div>
</template>

<style scoped></style>
