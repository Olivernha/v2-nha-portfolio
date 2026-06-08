<script>
import feather from 'feather-icons';
import emailjs from '@emailjs/browser';

export default {
	props: ['showModal', 'modal', 'categories'],
	data: () => ({ sending: false }),
	mounted() { feather.replace(); },
	updated() { feather.replace(); },
	methods: {
		send() {
			this.sending = true;
			emailjs.sendForm(
				process.env.VUE_APP_SERVICE_ID,
				process.env.VUE_APP_TEMPLATE_ID,
				this.$refs.form,
				process.env.VUE_APP_PUBLIC_KEY
			).then(() => {
				this.sending = false;
				this.showModal();
			}).catch(() => { this.sending = false; });
		},
	},
};
</script>

<template>
	<transition name="modal">
		<div v-if="modal" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
			<!-- Backdrop -->
			<div class="absolute inset-0 cursor-pointer" style="background:rgba(0,0,0,0.85);" @click="showModal"></div>

			<!-- Panel -->
			<div class="modal-panel relative w-full max-w-lg rounded-lg overflow-hidden">

				<!-- Header -->
				<div class="modal-header flex items-center justify-between px-6 py-5">
					<div>
						<h2 class="font-general-semibold text-base modal-title">Let's Work Together</h2>
						<p class="font-general-regular text-xs mt-0.5 modal-subtitle">Tell me about your project</p>
					</div>
					<button @click="showModal" class="modal-close w-8 h-8 flex items-center justify-center rounded transition-colors"
						aria-label="Close">
						<i data-feather="x" class="w-4 h-4"></i>
					</button>
				</div>

				<!-- Form -->
				<form ref="form" @submit.prevent="send" class="px-6 py-6 flex flex-col gap-4">
					<input name="user_name"   type="text"   required class="modal-field" placeholder="Your name" />
					<input name="user_email"  type="email"  required class="modal-field" placeholder="your@email.com" />
					<select name="subject" required class="modal-field modal-select">
						<option value="" disabled selected>Select project type</option>
						<option v-for="c in categories" :key="c.id" :value="c.value">{{ c.name }}</option>
					</select>
					<textarea name="message" rows="4" class="modal-field resize-none" placeholder="Describe your project…"></textarea>

					<div class="flex items-center gap-3 pt-1">
						<button type="submit" :disabled="sending" class="btn-primary flex-1 justify-center disabled:opacity-50">
							<svg v-if="sending" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
							</svg>
							{{ sending ? 'Sending…' : 'Send Request' }}
						</button>
						<button type="button" @click="showModal" class="btn-ghost py-3">Cancel</button>
					</div>
				</form>
			</div>
		</div>
	</transition>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: translateY(20px); }

.modal-panel {
	background: var(--c-bg-2);
	border: 1px solid var(--c-border-2);
}

.modal-header {
	border-bottom: 1px solid var(--c-border);
}

.modal-title {
	color: var(--c-text);
}

.modal-subtitle {
	color: var(--c-muted);
}

.modal-close {
	color: var(--c-dim);
	transition: color 0.2s;
}
.modal-close:hover {
	color: var(--c-text);
}

.modal-field {
	width: 100%;
	background: var(--c-bg);
	border: 1px solid var(--c-border-2);
	color: var(--c-text);
	padding: 12px 16px;
	border-radius: 6px;
	font-family: 'GeneralSans-Regular';
	font-size: 0.9rem;
	transition: border-color 0.2s, background 0.4s, color 0.4s;
	outline: none;
}
.modal-field::placeholder {
	color: var(--c-muted);
}
.modal-field:focus {
	border-color: var(--c-lime);
}
.modal-select {
	cursor: pointer;
}
</style>
