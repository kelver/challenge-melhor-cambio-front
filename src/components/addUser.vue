<template>
    <div class="btnFabWrap">
        <div class="btn-fab d-flex justify-content-center align-items-center">
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
            <input name="login" placeholder="@githubLogin" type="text" value=""><br>
            <button class="btnSend" name="submit" type="button" @click="fetchNewUser">Enviar</button>
        </div>
    </div>
</template>

<script>
import {mapActions, storeToRefs} from "pinia";
import { useMainStore } from "../store/main.js";

export default {
    name: "addUser",
    setup() {
        const { fetchNewUser } = useMainStore();
        const { users } = storeToRefs(useMainStore());
        return {
            users,
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
        ...mapActions('main', ['fetchNewUser'])
    }
}
</script>