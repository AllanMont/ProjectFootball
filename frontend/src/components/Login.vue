<template>
    <div>
      <form action="">
        <label for="username">Nom d'utilisateur :</label>
        <input type="text" id="username" name="username" />
  
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" name="password" />
  
        <input type="submit" value="Connexion" />
      </form>
    </div>
  </template>
  
  <style lang="scss">
  form {
    width: 300px;
    margin: auto;
    padding: 20px;
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  
  label,
  input[type="submit"] {
    display: block;
    margin-bottom: 10px;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid lightgray;
  }
  
  input[type="submit"] {
    background-color: lightgray;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  </style>