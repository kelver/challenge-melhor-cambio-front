import { defineStore} from "pinia";
import axios from "axios";

export const useMainStore = defineStore("main", {
	// TODO: criar métodos para remover usuários e atualizar informações.
	state: () => ({
	    users: [],
	}),
	actions: {
		async fetchNewUser(login) {
			// TODO: verificar se usuário já está na lista.
			await axios.get(`https://api.github.com/users/${login}`)
				.then((response) => {
					this.users.push({
						'id': response.data.id,
						'username': response.data.login,
						'name': response.data.name,
						'about': response.data.bio || 'Sem bio',
						'avatar': response.data.avatar_url,
						'register': response.data.created_at,
						'repos': response.data.public_repos,
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