<script lang="ts">
import { reactive, ref } from "vue";
import { useUsersStore } from "@/stores/users";
import router from "@/router";

export default {
   setup() {
      const useStore = useUsersStore();
      const loading = ref(false);
      const email = ref("admin@admin.com");
      const password = ref("password");
      const error = reactive({
         msgError: "",
         status: 0,
         active: false,
      });

      const handleAuth = () => {
         loading.value = true;
         useStore
            .auth(email.value, password.value)
            .then(() => router.push({ name: "admin.home" }))
            .catch((err) => {
               (error.msgError = "Falha ao autenticar"),
                  (error.status = err.response.status),
                  (error.active = true);

               if (error.status === 422) error.msgError = "Datos Inválidos";
               if (error.status === 404)
                  error.msgError = "Usuario no encontrado";
            })
            .finally(() => (loading.value = false));
      };

      return {
         email,
         password,
         loading,
         handleAuth,
         error,
      };
   },
};
</script>

<template>
   <div>
      <h1>Login</h1>

      <div v-if="error.active">
         <p>{{ error.status }} : {{ error.msgError }}</p>
      </div>
      <form action="#" method="post" @submit.prevent="handleAuth">
         <input
            v-model="email"
            type="email"
            name="email"
            placeholder="E-mail"
         />
         <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Password"
         />

         <button :disabled="loading" type="submit">
            <span v-if="loading">Enviando...</span>
            <span v-else>Acceder</span>
         </button>
      </form>

      <a href="/forgot-password">Olvide mi contrasenia</a>
   </div>
</template>
