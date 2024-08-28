<script setup lang="ts">
//@---vue
import { onMounted } from "vue";

//@---stores
import { useUsersStore } from "@/stores/users";

const useStore = useUsersStore();

onMounted(() => {
   useStore.getMe();
});
</script>

<template>
   <p>Hola {{ useStore.me?.name }}</p>
   <div>Home Admin</div>
</template>
