//@---vue
import { createRouter, createWebHistory } from "vue-router"; //! Importa las funciones createRouter y createWebHistory de Vue Router para configurar el enrutador de la aplicación.

//@---routes
import routes from './routes.map'; //! Importa la definición de rutas desde el archivo routes.map.

// =========================================================================

//* Crea una instancia del enrutador (router) de Vue utilizando la función createRouter.
const router = createRouter({
   //& Configura el historial de navegación utilizando createWebHistory.
   //& Utiliza la URL base de la aplicación definida en las variables de entorno de Vite (import.meta.env.BASE_URL).
   history: createWebHistory(import.meta.env.BASE_URL),
   
   //& Define las rutas de la aplicación utilizando el array de rutas importado.
   routes
});

//* Exporta la instancia del enrutador para que pueda ser utilizada en la configuración principal de Vue.
export default router;
