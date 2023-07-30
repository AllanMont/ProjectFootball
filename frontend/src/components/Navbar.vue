<template>
    <nav>
      <ul>
        <li><a href="#">Accueil</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Equipes</a></li>
        <li><a href="#">Connexion</a></li>
      </ul>
    </nav>
  </template>
  
  <style>
  nav {
    background-color: #333;
    color: white;
    display: flex;
    justify-content: center;
  }
  
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  li {
    margin: 0 10px;
  }
  
  a {
    color: white;
    text-decoration: none;
    padding: 10px;
  }
  
  a:hover {
    background-color: #555;
  }
  </style>
<script>
export default {
  name: 'Navbar',
};
</script>  