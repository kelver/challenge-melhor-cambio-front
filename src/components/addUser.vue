<template>
    <div class="btnFabWrap">
        <div class="btn-fab bg-pink d-flex justify-content-center align-items-center">
            <div class="wrap">
                <div class="icon">
                    <font-awesome-icon class="text-white" icon="fa-solid fa-plus" size="2x" />
                </div>
            </div>
        </div>
        <div class="btnFab popup-ani p-3">
            <header>
                <h1>Adicione um novo usuário</h1>
            </header>
            <input name="login" placeholder="@githubLogin" type="text" v-model="this.login"
                   @keyup.enter="this.fetchUser"><br>
            <button class="btnSend bg-pink" name="submit" type="button" @click="this.fetchUser">Enviar</button>
        </div>
    </div>
</template>

<script>
import {mapActions} from "pinia";
import { useMainStore } from "../store/main.js";

export default {
    name: "addUser",
    data() {
        return {
            login: ''
        }
    },
    setup() {
        const { fetchNewUser } = useMainStore();
        return {
            fetchNewUser
        }
    },
    mounted() {
        let elFabWrap = document.querySelector('.btn-fab');

        elFabWrap.addEventListener("click", ()=>{
            let elBtnFab = document.querySelector('.btn-fab .wrap');
            let elFab = document.querySelector('.btnFab');
            let btn = document.querySelector('.icon');

            elBtnFab.classList.toggle('active');
            elFab.classList.toggle('open');
            btn.classList.toggle('close');
        });
    },
    methods: {
        fetchUser() {
            if(this.login !== '') {
                this.fetchNewUser(this.login);
                this.login = '';
            }
        },

        ...mapActions('main', ['fetchNewUser']),
    }
}
</script>