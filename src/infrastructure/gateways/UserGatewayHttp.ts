//@---adapters
import AxiosAdapter from "@/infrastructure/http/AxiosAdapter"; //! Importa el adaptador Axios configurado para realizar solicitudes HTTP.

//@---utils
import { NAME_TOKEN } from "@/utils/constants"; //! Importa el NAME_TOKEN de las constantes, utilizado para almacenar el token de autenticación.

//@---entities
import User from "../entities/User"; //! Importa la entidad User para crear instancias de usuarios a partir de los datos obtenidos.

// =========================================================================

//* Clase UserGatewayHttp que actúa como un gateway HTTP para realizar operaciones relacionadas con usuarios.
export default class UserGatewayHttp {

   //& Método asincrónico para iniciar sesión (login) de un usuario.
   async login(email: string, password: string): Promise<any> {
      const device_name = `vue_app_${navigator.userAgent}`; //~ Construye un identificador de dispositivo utilizando el agente de usuario del navegador.

      //^ Realiza una solicitud POST al endpoint '/auth' con el correo electrónico, contraseña, y el nombre del dispositivo.
      //^ Utiliza el adaptador Axios configurado (AxiosAdapter) para gestionar la solicitud.
      //^ Una vez que la solicitud es exitosa, almacena el token de autenticación en el localStorage utilizando la clave NAME_TOKEN.
      return await AxiosAdapter.post('/auth', { email, password, device_name })
      .then(response => localStorage.setItem(NAME_TOKEN, response.data.token)); //~ Guarda el token de autenticación en el almacenamiento local del navegador.
   }

   //& Método asincrónico para obtener los datos del usuario autenticado (getMe).
   async getMe(): Promise<User> {
      //^ Realiza una solicitud GET al endpoint '/me' para obtener la información del usuario autenticado.
      //^ Utiliza el método withAuthorization() de AxiosAdapter para incluir automáticamente el token de autorización en la solicitud.
      const response = await AxiosAdapter.withAuthorization().get('/me');

      //^ Extrae los datos del usuario de la respuesta de la API.
      const { id, name, email } = response.data.data;

      //^ Crea y retorna una instancia de la entidad User utilizando los datos obtenidos de la API.
      return new User(id, name, email); //~ Devuelve un objeto User construido con los datos de la respuesta.
   }
}
