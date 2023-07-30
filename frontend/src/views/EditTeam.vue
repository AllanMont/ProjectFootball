<template>
  <form @submit.prevent="submitTeam" action="http://localhost:5000/newclub" method="POST">
    <label for="team_name">Nom de l'équipe : </label>
    <input v-if="idTeamToModify" type="text" id="team_name" name="team_name" v-model="team_long_name" required>
    <input v-else type="text" id="team_name" name="team_name" v-model="team_long_name" required><br><br>
    <label for="team_code">Code de l'équipe : </label>
    <input v-if="idTeamToModify" type="text" id="team_code" name="team_code" v-model="team_short_name" required>
    <input v-else type="text" id="team_code" name="team_code" v-model="team_short_name" required><br><br>
    <label for="team_points">Points de l'équipe : </label>
<input v-if="idTeamToModify" type="number" id="team_points" name="team_points" v-model="points" required>
<input v-else type="number" id="team_points" name="team_points" v-model="points" required><br><br>


<label for="team_win">Nombre de victoires de l'équipe : </label>
<input v-if="idTeamToModify" type="number" id="team_win" name="team_win" v-model="win" required>
<input v-else type="number" id="team_win" name="team_win" v-model="win" required><br><br>

<label for="team_loose">Nombre de défaites de l'équipe : </label>
<input v-if="idTeamToModify" type="number" id="team_loose" name="team_loose" v-model="loose" required>
<input v-else type="number" id="team_loose" name="team_loose" v-model="loose" required><br><br>

<label for="team_nul">Nombre de matchs nuls de l'équipe : </label>
<input v-if="idTeamToModify" type="number" id="team_nul" name="team_nul" v-model="nul" required>
<input v-else type="number" id="team_nul" name="team_nul" v-model="nul" required><br><br>

<input type="submit" value="Enregistrer">
</form>
</template>
<script>
export default {
  name: 'EditTeam',
  data() {
    return {
      idTeamToModify: null,
      team_long_name: '',
      team_short_name: '',
      points: '',
      win: '',
      loose: '',
      nul: ''
    }
  },
  mounted() {
    this.idTeamToModify = this.$route.query.id;
    if (this.idTeamToModify) {
      console.log(this.idTeamToModify)
      this.getTeamToModify();
    }
  },
  methods: {
  async getTeamToModify() {
      const response = await fetch('http://localhost:5000/listclubs/' + this.idTeamToModify);
      const data = await response.json();
      console.log(data)
      this.team_long_name = data.team_long_name;
      this.team_short_name = data.team_short_name;
      this.points = data.points;
      this.win = data.win;
      this.loose = data.loose;
      this.nul = data.nul;
  },

  async submitTeam() {
    const formData = new FormData();
    formData.append('team_name', this.team_long_name);
    formData.append('team_code', this.team_short_name);
    formData.append('team_points', this.points);
    formData.append('team_win', this.win);
    formData.append('team_loose', this.loose);
    formData.append('team_nul', this.nul);

    let response;
    if (this.idTeamToModify) {
      // Envoie une requete post avec toute les données dans formData en paramètre de l'api
      response = await fetch(`http://localhost:5000/newclub/${this.team_long_name}/${this.team_short_name}/${this.points}/${this.win}/${this.loose}/${this.nul}/${this.idTeamToModify}`, {
        method: 'POST',
        body: formData
      });
    } else {
      response = await fetch(`http://localhost:5000/newclub/${this.team_long_name}/${this.team_short_name}/${this.points}/${this.win}/${this.loose}/${this.nul}`, {
        method: 'POST',
        body: formData
      });
    }

    if (response.ok) {
      this.$router.push('/ajmequipes');
    }
  }
}
}
</script>