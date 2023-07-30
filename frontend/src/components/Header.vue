<template>
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="/login">Se connecter</a></li>
            <li><a href="/signin">Créer un compte</a></li>
          </ul>
        </nav>
      </header>
    </div>
  </template>
  <script>
  export default {
    name: 'Header',
  };
</script>
  
  <style lang="scss">
  header {
    background-color: lightgray;
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  
  nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  nav a {
    color: black;
    text-decoration: none;
    padding: 10px 20px;
  }
  </style>