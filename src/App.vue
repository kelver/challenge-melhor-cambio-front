<script setup>
import cardUsers from "./components/cardUsers.vue";
import addUser from "./components/addUser.vue";
</script>

<script>
export default {
    name: 'App',
}
</script>

<template>
    <div>
        <div class="header w-100 text-center my-5">
            <h1>Github Users</h1>
            <hr>
        </div>
        <div class="container">
            <cardUsers />
        </div>
        <addUser />
    </div>
</template>

<style scoped>
$dark: #f0f;
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
