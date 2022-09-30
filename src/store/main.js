import { defineStore} from "pinia";
import axios from "axios";

export const useMainStore = defineStore("main", {
	state: () => ({
	    users: [],
	}),
	actions: {
		async fetchNewUser(login) {
			console.log("fetchNewUser");
			await axios.get(`https://api.github.com/users/diego3g`)
				.then((response) => {
					this.users.push({
						'id': response.data.id,
						'username': response.data.login,
						'name' : response.data.name,
						'avatar' : response.data.avatar_url,
						'register' : response.data.created_at,
						'repos' : response.data.public_repos,
					})
				});
		}
	}
})