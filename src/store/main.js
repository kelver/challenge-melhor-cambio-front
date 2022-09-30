import { defineStore} from "pinia";
import axios from "axios";
import moment from 'moment'

export const useMainStore = defineStore("main", {
	// TODO: criar métodos para remover usuários e atualizar informações.
	state: () => ({
	    users: [],
	}),
	actions: {
		async fetchNewUser(login) {
			// TODO: verificar se usuário já está na lista.
			let repos = [];
			await axios.get(`https://api.github.com/users/${login}`)
				.then(async (response) => {
					await axios.get(`https://api.github.com/users/${login}/repos`).then((res) => {
						Object.entries(res.data).forEach((entry) => {
							repos.push({
								name: entry[1].name,
								url: entry[1].html_url,
							})
						})
					})
					
					this.users.push({
						'id': response.data.id,
						'username': response.data.login,
						'name': response.data.name,
						'about': response.data.bio || 'Sem bio',
						'avatar': response.data.avatar_url,
						'user_created_at': moment(String(response.data.created_at)).format('MM/DD/YYYY'),
						'repos_count': response.data.public_repos,
						'repos': repos
					})
				});
		},
		async loadUsers() {
			this.users = [];
			await axios.get(`http://localhost/melhorCambioApi/public/api/users/all`)
				.then((response) => {
					response.data.data.forEach((user) => {
						this.users.push(user);
					})
				});
		}
	}
})