<script>
import feather from 'feather-icons';
import ProjectsFilter from './ProjectsFilter.vue';
import ProjectSingle from './ProjectSingle.vue';
import projects from '../../data/projects';

export default {
	components: { ProjectSingle, ProjectsFilter },
	data: () => {
		return {
			projects,
			projectsHeading: 'Featured Projects',
			selectedCategory: '',
			searchProject: '',
		};
	},
	computed: {
		filteredProjects() {
			if (this.selectedCategory) {
				return this.filterProjectsByCategory();
			} else if (this.searchProject) {
				return this.filterProjectsBySearch();
			}
			return this.projects;
		},
	},
	methods: {
		filterProjectsByCategory() {
			return this.projects.filter((item) => {
				let category = item.category.charAt(0).toUpperCase() + item.category.slice(1);
				return category.includes(this.selectedCategory);
			});
		},
		filterProjectsBySearch() {
			let project = new RegExp(this.searchProject, 'i');
			return this.projects.filter((el) => el.title.match(project));
		},
	},
	mounted() {
		feather.replace();
	},
	updated() {
		feather.replace();
	},
};
</script>

<template>
	<section>
		<!-- Section header -->
		<div class="text-center mb-12">
			<p class="font-general-medium text-sm mb-3" style="color: #8B5CF6; letter-spacing: 0.1em; text-transform: uppercase;">Portfolio</p>
			<h2 class="font-general-bold text-3xl sm:text-4xl mb-4" style="color: #F1F5F9;">
				{{ projectsHeading }}
			</h2>
			<p class="font-general-regular text-base max-w-md mx-auto" style="color: #64748B;">
				A collection of projects I've built across different technologies
			</p>
		</div>

		<!-- Filter and search -->
		<div class="flex flex-col sm:flex-row gap-3 mb-10">
			<!-- Search -->
			<div class="relative flex-1">
				<i data-feather="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style="color: #475569;"></i>
				<input
					v-model="searchProject"
					class="w-full pl-10 pr-4 py-2.5 rounded-xl font-general-regular text-sm input-glow transition-all"
					style="background: rgba(19,25,41,0.8); border: 1px solid rgba(124,58,237,0.2); color: #F1F5F9;"
					type="search"
					placeholder="Search projects..."
					aria-label="Search Projects"
				/>
			</div>
			<!-- Filter -->
			<ProjectsFilter @filter="selectedCategory = $event" />
		</div>

		<!-- Projects grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			<ProjectSingle
				v-for="project in filteredProjects"
				:key="project.id"
				:project="project"
			/>
		</div>

		<!-- Empty state -->
		<div v-if="filteredProjects.length === 0" class="text-center py-20">
			<i data-feather="search" class="w-12 h-12 mx-auto mb-4" style="color: #475569;"></i>
			<p class="font-general-medium" style="color: #64748B;">No projects found</p>
		</div>
	</section>
</template>

<style scoped></style>
