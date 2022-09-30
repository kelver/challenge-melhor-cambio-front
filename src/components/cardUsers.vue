<template>
    <div v-bind:class="'card card-' + data.id" data-state="#about">
        <div class="card-header">
            <div class="card-cover" style="background-image: url('https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')"></div>
            <img class="card-avatar" v-bind:src="data.avatar" alt="avatar" />
            <h1 class="card-fullname">{{ data.name }}</h1>
            <h2 class="card-username">{{ data.username }}</h2>
        </div>
        <div class="card-main">
            <div class="card-section is-active" v-bind:id="'about-' + data.id">
                <div class="card-content">
                    <div class="card-subtitle">Sobre</div>
                    <p class="card-desc">{{ data.about }} ...</p>
                </div>
            </div>
            <div class="card-section" v-bind:id="'experience-' + data.id">
                <div class="card-content">
                    <div class="card-subtitle">Repositórios</div>
                    <div class="card-timeline">

                    </div>
                </div>
            </div>
            <div class="card-buttons">
                <button v-bind:data-section="'#about-' + data.id" class="is-active">ABOUT</button>
                <button v-bind:data-section="'#experience-' + data.id">EXPERIENCE</button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, storeToRefs} from "pinia";
import { useMainStore } from "../store/main.js";

export default {
    name: "cardUsers",
    props: {
        data: {
            type: Array
        }
    },
    setup() {
        const { fetchNewUser } = useMainStore();
        const { users } = storeToRefs(useMainStore());
        return {
            users,
            fetchNewUser
        }
    },
    mounted() {
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

    }
}
</script>

<style scoped>

</style>