<template>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1>Connexion</h1>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="email">Email :</label>
              <input type="email" class="form-control" id="email" v-model="email" aria-describedby="emailHelp" placeholder="Email" required>
            </div>
            <div class="form-group">
              <label for="password">Mot de passe : </label>
              <input type="password" class="form-control" id="password" v-model="password" placeholder="Mot de passe" required>
            </div>
            <button type="submit" class="btn btn-primary">Se connecter</button>
          </form>
          <div v-if="error" class="alert alert-danger mt-3" role="alert">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import axios from 'axios'

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        error: null
      }
    },
    methods: {
      submitForm() {
        const formData = {
          email: this.email,
          password: this.password
        }
        axios.post('http://localhost:5000/login', formData)
      .then(response => {
        const token = response.data.token
        localStorage.setItem('token', token)
        localStorage.setItem('userEmail', this.email)
        this.$router.go()
      })
      .catch(error => {
        this.error = error
      })


      }
    }
  }
  </script>
  
  <style>
  .container {
    margin-top: 50px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  </style>
  