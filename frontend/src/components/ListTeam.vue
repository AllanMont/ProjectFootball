<template>
    <div>
      <table class="table">
        <thead>
          <tr class="tr1">
            <th @click="sortEquipes('team_short_name')">
                Equipe 
                <img v-if="sortKey === 'team_short_name' && sortDirection === 1" src="../assets/arrow_down.png" alt="arrow_down" width="30" >
                <img v-if="sortKey === 'team_short_name' && sortDirection === -1" src="../assets/arrow_top.png" alt="arrow_up" width="30" >
            </th>
            <th @click="sortEquipes('team_long_name')">
                Code
                <img v-if="sortKey === 'team_long_name' && sortDirection === 1" src="../assets/arrow_down.png" alt="arrow_down" width="30" >
                <img v-if="sortKey === 'team_long_name' && sortDirection === -1" src="../assets/arrow_top.png" alt="arrow_up" width="30" >
            </th>
            <th @click="sortEquipes('points')">
                Points
                <img v-if="sortKey === 'points' && sortDirection === 1" src="../assets/arrow_down.png" alt="arrow_down" width="30" >
                <img v-if="sortKey === 'points' && sortDirection === -1" src="../assets/arrow_top.png" alt="arrow_up" width="30" >
            </th>
            <th @click="sortEquipes('classement')">
                Classement
                <img v-if="sortKey === 'classement' && sortDirection === 1" src="../assets/arrow_down.png" alt="arrow_down" width="30" >
                <img v-if="sortKey === 'classement' && sortDirection === -1" src="../assets/arrow_top.png" alt="arrow_up" width="30" >
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="equipe in equipesPaginated" :key="equipe.id">
            <td>{{ equipe.team_short_name }}</td>
            <td>{{ equipe.team_long_name }}</td>
            <td>{{ equipe.points }}</td>
            <td>{{ equipe.classement }}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="pagination">
        <span
          class="page"
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          :class="{ active: currentPage === pageNumber }"
          @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        equipes: [],
        currentPage: 1,
        itemsPerPage: 10,
        sortDirection: 1,
        sortKey: 'team_short_name',
      };
    },
    methods: {
      addFavorite(id) {
        this.equipes.find((equipe) => equipe.id === id).favorite = true;
      },
      removeFavorite(id) {
        this.equipes.find((equipe) => equipe.id === id).favorite = false;
      },
      sortEquipes(key) {
        if (this.sortKey === key) {
          this.sortDirection = -this.sortDirection;
        } else {
          this.sortDirection = 1;
        }
        this.sortKey = key;
        this.equipes.sort((a, b) =>
          a[key] > b[key] ? this.sortDirection : -this.sortDirection
        );
      },
      changePage(pageNumber) {
        this.currentPage = pageNumber;
      },
    },
    computed: {
      totalPages() {
        return Math.ceil(this.equipes.length / this.itemsPerPage);
      },
      equipesPaginated() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.equipes.slice(startIndex, endIndex);
      },
    },
    mounted() {
      fetch('http://localhost:5000/listclubs')
        .then((response) => response.json())
        .then((data) => {
          this.equipes = data;
        });
    },
  };
  </script>
<style>
.table {
  border-collapse: collapse;
  width: 100%;
}

.tr1 {
  background-color: rgb(53, 68, 185);
  color: rgb(0, 0, 0);
}

.table td,
.table th {
  border: 1px solid white;
  padding: 8px;
}

.table tr:nth-child(even) {
  background-color: #585858;
}

.table tr:nth-child(odd) {
  background-color: #797979;
}

.table .tr1 tr:hover {
  background-color: rgb(53, 68, 185);
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page {
  margin: 0 10px;
  cursor: pointer;
}

.active {
  font-weight: bold;
}
</style>
