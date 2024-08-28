//@---layouts
import AuthLayout from "@/pages/layouts/AuthLayout.vue";
import DefaultLayout from "@/pages/layouts/DefaultLayout.vue";

//@---pages
import ForgotPage from "@/pages/auth/ForgotPage.vue";
import LoginPage from "@/pages/auth/LoginPage.vue";
import HomeAdmin from "@/pages/admin/home/HomeAdmin.vue";

// =========================================================================

export default [
   {
      path: '/',
      component: AuthLayout,
      children: [
         {
            path: '',
            component: LoginPage,
            name: 'auth.login',
         },
         {
            path: 'forgot-password',
            component: ForgotPage,
            name: 'forgot.password',
         }
      ]
   },
   {
      component: DefaultLayout,
      path: '/admin',
      children: [
         {
            path: '',
            component: HomeAdmin,
            name: 'admin.home',
         },
      ]
   },
];