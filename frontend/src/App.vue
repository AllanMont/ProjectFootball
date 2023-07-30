<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/compare">Comparer</RouterLink>
        <RouterLink to="/ajmequipes">Modif. Equipes</RouterLink>
        <template v-if="!isLoggedIn">
          <RouterLink to="/login">Se connecter</RouterLink>
          <RouterLink to="/signin">Créer un compte</RouterLink>
        </template>
        <template v-else>
          <!-- RouterLink vers /account pour modifier un account, avec en paramètre l'id du compte -->
          <RouterLink :to="{ name: 'account', params: { id: 1 }}">Mon compte</RouterLink>
          <button @click="logout">Se déconnecter</button>
        </template>
      </nav>
    </div>
  </header>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ListTeam from './components/ListTeam.vue'

export default {
  components: {ListTeam},
  data() {
    return {
      isLoggedIn: false
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      this.isLoggedIn = true
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.isLoggedIn = false
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  width: 180px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
