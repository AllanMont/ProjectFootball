<template>
  <div>
    <!-- <label for="search">Rechercher une équipe :</label>
    <input type="text" id="search" v-model="searchTerm" @input="getTeams">

    <ul>
      <li v-for="team in teams" :key="team.id">
        {{ team.team_long_name }}
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'TeamsList',
  data() {
    return {
      teams: [],
      searchTerm: ''
    }
  },
  mounted() {
    this.getTeams();
  },
  methods: {
    async getTeams() {
      const response = await fetch('http://localhost:5000/listclubs');
      const data = await response.json();

      // Filtrer les équipes en fonction de la chaîne de recherche
      this.teams = data.filter(team => team.team_long_name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }
}
</script>
