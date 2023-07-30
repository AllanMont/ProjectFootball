import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Login from "@/component/Login";
import Register from "@/comopnents/Register";
// import H2 from "@/components/H2";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    }
    // {
    //   path: "/hello",
    //   name: "H2",
    //   component: H2
    // }
  ]
});
