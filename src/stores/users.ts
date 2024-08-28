import { defineStore } from "pinia"; //! Importa la función defineStore de Pinia para definir una tienda de estado (store).
import UserGatewayHttp from '@/infrastructure/gateways/UserGatewayHttp'; //! Importa el gateway HTTP para manejar las operaciones relacionadas con usuarios.
import User from "@/infrastructure/entities/User"; //! Importa la entidad User para tipado y manipulación de datos de usuario.

// =========================================================================

//~ Crea una instancia del gateway de usuario (UserGatewayHttp) para realizar solicitudes HTTP relacionadas con usuarios.
const userGateway = new UserGatewayHttp();

//* Define una tienda de estado (store) llamada 'users' utilizando Pinia.
export const useUsersStore = defineStore('users', {
   //& Define el estado de la tienda.
   state: () => ({
      me: null as null | User, //~ Estado para almacenar los datos del usuario autenticado (inicialmente es null).
      users: [] as User[] //~ Estado para almacenar una lista de usuarios (inicialmente es un array vacío).
   }),
   
   //& Define los getters de la tienda, que son propiedades computadas basadas en el estado.
   getters: {
      //^ Getter que verifica si hay usuarios en la lista de usuarios.
      hasUsers: (state) => state.users.length > 0, //~ Retorna true si hay al menos un usuario en la lista; de lo contrario, false.
   },
   
   //& Define las acciones de la tienda, que son funciones que pueden realizar operaciones asincrónicas o sincronas y mutar el estado.
   actions: {
      //& Acción asincrónica para autenticar un usuario llamando al método `login` del UserGatewayHttp.
      async auth(email: string, password: string): Promise<any> {
         return await userGateway.login(email, password); //~ Llama al método login del gateway de usuario para autenticar con el email y la contraseña proporcionados.
      },
      
      //& Acción asincrónica para obtener los datos del usuario autenticado llamando al método `getMe` del UserGatewayHttp.
      async getMe(): Promise<void> {
         await userGateway.getMe().then(user => this.me = user); //~ Llama al método getMe del gateway de usuario y actualiza el estado 'me' con los datos del usuario autenticado.
      }
   }
});
