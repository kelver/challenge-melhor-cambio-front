<template>
    <div class="row gap-3">
        <div v-bind:class="'card card-' + user.id" data-state="#about" v-show="data.length > 0" v-for="user in data">
            <div class="card-header">
                <div v-show="!user.identify">
                    <button @click="saveUser(user.username, $event)"
                            class="btn btn-success bg-success text-white position-absolute end-0 text-xs d-flex
                             justify-content-center align-items-center" style="z-index: 9999"
                    >
                        Salvar
                    </button>
                </div>
                <div class="card-cover" :style="bgCard"></div>
                <img class="card-avatar" v-bind:src="user.avatar" alt="avatar" />
                <h1 class="card-fullname">{{ user.name }}</h1>
                <h2 class="card-username">{{ user.username }}</h2>
            </div>
            <div class="card-main">
                <div class="card-section about is-active overflow-auto overflow-x-hidden overflow-x-hidden"
                     v-bind:id="'about-' + user.id">
                    <div class="card-content">
                        <div class="card-subtitle">Sobre</div>
                        <p class="card-desc"><small class="small">Desde {{ user.user_created_at }}</small></p>
                        <p class="card-desc">{{ user.about }} ...</p>
                    </div>
                </div>
                <div class="card-section experience overflow-auto overflow-x-hidden overflow-x-hidden"
                     v-bind:id="'experience-' +
                user.id">
                    <div class="card-content">
                        <div class="card-subtitle">Repositórios </div>
                        <div class="d-inline-flex" v-for="repo in user.repos">
                            <a :href="repo.url" target="_blank"
                               class="badge bg-pink text-white text-decoration-none m-1 text-wrap">{{ repo.name }}</a>
                        </div>
                    </div>
                </div>
                <div class="card-buttons">
                    <button v-bind:data-section="'#about-' + user.id" class="is-active">Sobre</button>
                    <button v-bind:data-section="'#experience-' + user.id">
                        Repositórios
                        <small v-bind:data-section="'#experience-' + user.id"
                               class="position-absolute top-0 right-0 badge bg-pink m-1">{{ user.repos_count }}</small>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {storeToRefs} from "pinia";
import { useMainStore } from "../store/main.js";
import axios from "axios";

export default {
    name: "cardUsers",
    data() {
        return {
            data: {},
        }
    },
    setup() {
        const { fetchNewUser, loadUsers } = useMainStore();
        const { users } = storeToRefs(useMainStore());
        return {
            users,
            loadUsers,
            fetchNewUser
        }
    },
    computed: {
        bgCard() {
            return {
                "background-image": ' url(https://img.myloview.com.br/posters/space-universe-fantasy-scattering-of-stars-bright-blue-purple-pink-black-sky-bright-star-flash-many-stars-700-178819989.jpg)',
            };
        }
    },
    created() {
        this.loadUsers();
    },
    mounted() {
        this.data = this.users;
    },
    updated() {
        const buttons = document.querySelectorAll(".card-buttons button");

        const handleButtonClick = (e) => {
            const targetSection = e.target.getAttribute("data-section");
            const sections = document.querySelectorAll(".card-" + targetSection.split("-")[1] + " .card-section");
            const card = document.querySelector(".card.card-" + targetSection.split("-")[1]);
            const section = document.querySelector(targetSection);

            !targetSection.includes("#about")
                ? card.classList.add("is-active")
                : card.classList.remove("is-active");
            card.setAttribute("data-state", targetSection);
            sections.forEach((s) => s.classList.remove("is-active"));
            buttons.forEach((b) => b.classList.remove("is-active"));
            e.target.classList.add("is-active");
            section.classList.add("is-active");
        };

        buttons.forEach((btn) => {
            btn.addEventListener("click", handleButtonClick);
        });
    },
    methods: {
        async saveUser(login, event) {
            let data = {
                login: login,
            };
            await this.$http.post(`users/store`, data)
                .then((response) => {
                    event.target.remove();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
}
</script>