//@---libs
import axios, { AxiosInstance } from "axios"; //! Importa la biblioteca Axios para realizar solicitudes HTTP y el tipo AxiosInstance para tipado.

//---@interfaces
import { AxiosAdapterInterface } from "@/infrastructure/interfaces/AxiosAdapterInterface"; //! Importa la interfaz que define los métodos que debe implementar el adaptador Axios.

//@---utils
import { API_URL, NAME_TOKEN } from "@/utils/constants"; //! Importa la URL de la API y la constante NAME_TOKEN de las constantes.

// =========================================================================

//* Clase AxiosAdapter que implementa la interfaz AxiosAdapterInterface para proporcionar un adaptador de Axios.
class AxiosAdapter implements AxiosAdapterInterface {
   private axiosInstance: AxiosInstance | null = null; //~ Instancia privada de Axios para manejar las solicitudes HTTP.
   private static instance: AxiosAdapterInterface | null = null; //~ Instancia estática para implementar el patrón Singleton.

   //& Constructor que inicializa la instancia de Axios con una configuración predeterminada.
   constructor() {
      const baseURL = API_URL; //^ Define la URL base para todas las solicitudes HTTP.
      this.axiosInstance = axios.create({
         baseURL: baseURL, //^ Establece la URL base de la API.
         headers: {
            'Content-Type': 'application/json' //^^ Establece el encabezado de Content-Type a JSON para todas las solicitudes.
         },
      });
   }

   //& Método estático para obtener la instancia única de AxiosAdapter, implementando el patrón Singleton.
   static getInstance(): AxiosAdapterInterface {
      if (this.instance === null) { //^ Verifica si la instancia aún no ha sido creada.
         this.instance = new AxiosAdapter(); //^ Si no ha sido creada, crea una nueva instancia de AxiosAdapter.
      }

      return this.instance; //^ Retorna la instancia única de AxiosAdapter.
   }

   //& Método para realizar una solicitud GET utilizando la instancia de Axios configurada.
   async get(url: string, configs?: object): Promise<any> {
      return await this.axiosInstance?.get(url, configs); //^ Realiza la solicitud GET a la URL proporcionada con configuraciones opcionales.
   }

   //& Método para realizar una solicitud POST utilizando la instancia de Axios configurada.
   async post(url: string, body: object, configs?: object): Promise<any> {
      return await this.axiosInstance?.post(url, body, configs); //^ Realiza la solicitud POST a la URL proporcionada con el cuerpo de datos y configuraciones opcionales.
   }

   //& Método para realizar una solicitud PUT utilizando la instancia de Axios configurada.
   async put(url: string, body: object, configs?: object): Promise<any> {
      return await this.axiosInstance?.put(url, body, configs); //^ Realiza la solicitud PUT a la URL proporcionada con el cuerpo de datos y configuraciones opcionales.
   }

   //& Método para realizar una solicitud DELETE utilizando la instancia de Axios configurada.
   async delete(url: string, configs?: object): Promise<any> {
      return await this.axiosInstance?.delete(url, configs); //^ Realiza la solicitud DELETE a la URL proporcionada con configuraciones opcionales.
   }

   //& Método para configurar la autorización con el token almacenado en localStorage.
   withAuthorization(): this {
      if (this.axiosInstance) { //^ Verifica si la instancia de Axios está inicializada.
         const token = localStorage.getItem(NAME_TOKEN); //~ Obtiene el token de autenticación almacenado en el localStorage utilizando la clave NAME_TOKEN.
         this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`; //~ Establece el encabezado 'Authorization' con el token de autenticación en las solicitudes HTTP.
      }

      return this; //^ Retorna la misma instancia para permitir el encadenamiento de métodos.
   }
}

//* Exporta la instancia única de AxiosAdapter utilizando el método estático getInstance.
//* Esto garantiza que se utilice la misma instancia en todas las partes de la aplicación.
export default AxiosAdapter.getInstance();
