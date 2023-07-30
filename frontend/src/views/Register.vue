<template>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1>Création de compte</h1>
          <form @submit.prevent="register">
            <div class="form-group">
              <label for="name">Nom :</label>
              <input type="text" class="form-control" id="name" placeholder="Nom" v-model="name">
            </div>
            <div class="form-group">
              <label for="firstname">Prénom :</label>
              <input type="text" class="form-control" id="firstname" placeholder="Prénom" v-model="firstname">
            </div>
            <div class="form-group">
              <label for="email">Email :</label>
              <input type="email" class="form-control" id="email" placeholder="Email" v-model="email">
            </div>
            <div class="form-group">
              <label for="password">Mot de passe :</label>
              <input type="password" class="form-control" id="password" placeholder="Mot de passe" v-model="password">
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirmer le mot de passe :</label>
              <input type="password" class="form-control" id="confirmPassword" placeholder="Confirmer le mot de passe" v-model="confirmPassword">
            </div>
            <button type="submit" class="btn btn-primary">Créer un compte</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import axios from 'axios'
    
  export default {
    name: 'Register',
    data() {
      return {
        name: '',
        firstname: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
    },
    methods: {
      register() {
        // Vérifier que les champs obligatoires sont remplis
        if (!this.name || !this.firstname || !this.email || !this.password || !this.confirmPassword) {
          alert('Veuillez remplir tous les champs.');
          return;
        }
  
        // Vérifier que le mot de passe est identique à la confirmation de mot de passe
        if (this.password !== this.confirmPassword) {
          alert('Les mots de passe ne correspondent pas.');
          return;
        }
  
        // Appeler l'API pour créer le compte utilisateur
        const data = {
          name: this.name,
          firstname: this.firstname,
          email: this.email,
          password: this.password,
        };
  
        axios.post('http://localhost:5000/register', data)
          .then(response => {
            alert('Votre compte a été créé avec succès.');
            this.$router.push('/login');
          })
          .catch(error => {
            alert('Une erreur est survenue lors de la création de votre compte.');
            console.error(error);
          });
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  