<template>
    <div>
        <h1>Modifier mon compte</h1>
        <form @submit.prevent="modifierCompte">
            <div>
                <label for="email">Email :</label>
                <input type="email" id="email" v-model="email" disabled required>
            </div>
            <!-- <div>
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" v-model="password" required>
            </div> -->
            <div>
                <label for="nom">Nom :</label>
                <input type="text" id="name" v-model="name" required>
            </div>
            <div>
                <label for="prenom">Prénom :</label>
                <input type="text" id="firstname" v-model="firstname" required>
            </div>
            <!-- <button type="submit">Modifier</button> -->
        </form>
    </div>
</template>
  
<script>
import axios from 'axios'

export default {
    data() {
        return {
            email: '',
            password: '',
            name: '',
            firstname: ''
        };
    },
    methods: {
        modifierCompte() {
            const userData = {
                email: this.email,
                password: this.password,
                name: this.name,
                firstname: this.firstname,
                id: this.$route.params.id
            };
            axios.post('http://localhost:5000/utilisateurs', userData)
                .then(response => {
                    console.log(response.data.message);
                    alert('Votre compte a été modifié avec succès.');
                })
                .catch(error => {
                    console.error(error.response.data.error);
                });
        }
    },
    mounted() {
        const userEmail = localStorage.getItem('userEmail');
        axios.get(`http://localhost:5000/utilisateurs/${userEmail}`)
            .then(response => {
                const userData = response.data;
                this.email = userData.email;
                this.name = userData.name;
                this.firstname = userData.firstname;
            })
            .catch(error => {
                console.error(error.response.data.error);
            });
    }
}
</script>
