<script setup>
import cardUsers from "./components/cardUsers.vue";
import addUser from "./components/addUser.vue";
</script>

<script>
import usernames from './data/users.json'
import axios from "axios";

export default {
    name: 'App',
    data() {
        return {
            data: [],
        }
    },
    mounted() {
        usernames.data.forEach((user) => {
            axios.get(`https://api.github.com/users/${user}`)
                .then((response) => {
                    this.data.push({
                        'id': response.data.id,
                        'username': response.data.login,
                        'name' : response.data.name,
                        'about' : (response.data.bio?.substring(0,200)) || 'No bio',
                        'avatar' : response.data.avatar_url,
                        'register' : response.data.created_at,
                        'repos' : response.data.public_repos,
                    })
                })
        })
    }
}
</script>

<template>
    <div>
        <div class="header w-100 text-center my-5">
            <h1>Github Users</h1>
            <hr>
        </div>
        <div class="container">
            <div class="row gap-3">
                <cardUsers :data="users" v-for="(users, index) in data" :key="index" />
            </div>
        </div>
        <addUser />
    </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
