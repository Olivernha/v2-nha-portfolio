<script>
export default {
	setup() {
		return {
			bios: [
				{
					id: 1,
					bio: "I am currently a second year student at Singapore Poly pursuing my Diploma in Information Technology. I'm a self-taught Full Stack Web Developer, diving deeper into backend development and security coding. I believe that to be successful, one needs to be obsessive with their dreams and keep working towards them.",
				},
				{
					id: 2,
					bio: "I enjoy dabbling in various parts of frontend and backend development and love learning about new technologies. Currently looking for internships to gain industry experience and work on meaningful projects that sharpen my skills.",
				},
			],
			skills: [
				{ id: 1, skill: 'JavaScript', icon: '⚡' },
				{ id: 2, skill: 'Vue.js', icon: '💚' },
				{ id: 3, skill: 'Node.js', icon: '🟢' },
				{ id: 4, skill: 'React', icon: '⚛️' },
				{ id: 5, skill: 'HTML & CSS', icon: '🎨' },
				{ id: 6, skill: 'Laravel', icon: '🔴' },
			],
			certifications: [
				{ id: 1, certification: 'LinkedIn Learning Certificate', link: 'https://www.linkedin.com/learning/certificates/2a242d93ce6e8ee0a40310925871c36f8d19ec96581bd886128296ae4d2f390f?u=2122804' },
				{ id: 2, certification: 'JavaScript Data Structures & Algorithms', link: 'https://www.freecodecamp.org/certification/fcc7cbffdb1-b4f5-46ff-956b-0763930c3b0d/javascript-algorithms-and-data-structures' },
			],
			education: [
				{ id: 1, degree: 'Diploma in Information Technology', institution: 'Singapore Polytechnic', year: '2022 – Present' },
			],
			experience: [
				{ id: 1, role: 'Service Crew', company: 'Rise Restaurant at Marina Bay Sands', duration: 'Current' },
			],
		};
	},
};
</script>

<template>
	<div class="flex flex-col lg:flex-row gap-12 lg:gap-16">
		<!-- Profile image -->
		<div class="w-full lg:w-1/3 flex justify-center lg:justify-start">
			<div class="relative">
				<!-- Glow ring -->
				<div class="absolute -inset-1 rounded-2xl opacity-50" style="background: linear-gradient(135deg, #7C3AED, #06B6D4); filter: blur(8px);"></div>
				<img
					src="@/assets/images/profile.jpg"
					class="relative rounded-2xl w-72 lg:w-full object-cover"
					alt="Profile Image"
					style="border: 1px solid rgba(124,58,237,0.3);"
				/>
				<!-- Floating badge -->
				<div class="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl font-general-medium text-sm text-white"
					style="background: linear-gradient(135deg, #7C3AED, #06B6D4); box-shadow: 0 4px 20px rgba(124,58,237,0.4);">
					Full-Stack Dev
				</div>
			</div>
		</div>

		<!-- Details -->
		<div class="w-full lg:w-2/3">
			<!-- Bio -->
			<div class="mb-8">
				<p v-for="bio in bios" :key="bio.id"
					class="font-general-regular text-base leading-relaxed mb-4"
					style="color: #94A3B8;">
					{{ bio.bio }}
				</p>
			</div>

			<!-- Skills -->
			<div class="mb-8">
				<h3 class="font-general-semibold text-lg mb-4 gradient-text">Skills</h3>
				<div class="flex flex-wrap gap-2">
					<span v-for="skill in skills" :key="skill.id"
						class="skill-tag px-4 py-2 rounded-xl text-sm font-general-medium flex items-center gap-2">
						<span>{{ skill.icon }}</span>
						{{ skill.skill }}
					</span>
				</div>
			</div>

			<!-- Certifications -->
			<div class="mb-8">
				<h3 class="font-general-semibold text-lg mb-4 gradient-text">Certifications</h3>
				<ul class="space-y-2">
					<li v-for="cert in certifications" :key="cert.id">
						<a :href="cert.link" target="_blank"
							class="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group"
							style="background: rgba(19,25,41,0.6); border: 1px solid rgba(124,58,237,0.1);"
							onmouseover="this.style.borderColor='rgba(124,58,237,0.4)'"
							onmouseout="this.style.borderColor='rgba(124,58,237,0.1)'"
						>
							<div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
								style="background: rgba(124,58,237,0.15); color: #A78BFA;">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
								</svg>
							</div>
							<span class="font-general-medium text-sm group-hover:text-violet-400 transition-colors" style="color: #94A3B8;">
								{{ cert.certification }}
							</span>
							<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style="color: #8B5CF6;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						</a>
					</li>
				</ul>
			</div>

			<!-- Education & Experience in 2 columns -->
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<!-- Education -->
				<div>
					<h3 class="font-general-semibold text-lg mb-4 gradient-text">Education</h3>
					<div v-for="edu in education" :key="edu.id"
						class="p-4 rounded-xl"
						style="background: rgba(19,25,41,0.6); border: 1px solid rgba(124,58,237,0.1);">
						<p class="font-general-semibold text-sm mb-1" style="color: #F1F5F9;">{{ edu.degree }}</p>
						<p class="font-general-regular text-xs mb-1" style="color: #94A3B8;">{{ edu.institution }}</p>
						<span class="skill-tag px-2 py-0.5 rounded-full text-xs font-general-medium inline-block">{{ edu.year }}</span>
					</div>
				</div>

				<!-- Experience -->
				<div>
					<h3 class="font-general-semibold text-lg mb-4 gradient-text">Experience</h3>
					<div v-for="exp in experience" :key="exp.id"
						class="p-4 rounded-xl"
						style="background: rgba(19,25,41,0.6); border: 1px solid rgba(124,58,237,0.1);">
						<p class="font-general-semibold text-sm mb-1" style="color: #F1F5F9;">{{ exp.role }}</p>
						<p class="font-general-regular text-xs mb-1" style="color: #94A3B8;">{{ exp.company }}</p>
						<span class="skill-tag px-2 py-0.5 rounded-full text-xs font-general-medium inline-block">{{ exp.duration }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
