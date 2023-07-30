<template>
    <div>
      <table style="item-align: center">
        <div v-for="item in this.equipes" :key="item.id">
          <tr class="equipe">
            <td style="padding-right: 5px">
              <button @click="styleItem()">♡</button>
              <button @click="itemDelete(item)">X</button>
            </td>
            <td width="100px">
              {{ item.count }}
              <img :src="item.logo" height="50px" />
            </td>
            <td width="100px" :class="'favorite__' + item.favorite">
              {{ item.code }}
            </td>
  
            <td width="15px">|</td>
            <td
              style="padding-left: 10px"
              width="150px"
              :id="item.id"
              :points="item.points"
            >
              {{ item.name }}
            </td>
            <td style="min-width: 50px">
              <button v-if="item.count > 0" @click="itemUp(item)">↑</button>
              <button
                v-if="item.count !== nbEquipelist - 1"
                @click="itemDown(item)"
              >
                ↓
              </button>
            </td>
          </tr>
        </div>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        indexToPop: 0,
        nbEquipelist: 0,
        equipes: [
          {
            id: "00",
            name: "Manchester United",
            code: "MUN",
            country: "England",
            founded: 1878,
            national: false,
            count: 0,
            points: 4,
            logo:
              "https://upload.wikimedia.org/wikipedia/fr/thumb/b/b9/Logo_Manchester_United.svg/1200px-Logo_Manchester_United.svg.png",
            favorite: false,
          },
          {
            id: "01",
            name: "Olympique de Marseille",
            code: "OM",
            country: "France",
            founded: 1899,
            national: false,
            count: 1,
            points: 5,
            logo:
              "https://upload.wikimedia.org/wikipedia/fr/thumb/4/43/Logo_Olympique_de_Marseille.svg/1200px-Logo_Olympique_de_Marseille.svg.png",
            favorite: false,
          },
          {
            id: "02",
            name: "OGC Nice",
            code: "OGC Nice",
            country: "France",
            founded: 1904,
            national: false,
            count: 2,
            points: 3,
            logo:
              "https://upload.wikimedia.org/wikipedia/fr/thumb/b/b1/Logo_OGC_Nice_2013.svg/1200px-Logo_OGC_Nice_2013.svg.png",
            favorite: false,
          },
          {
            id: "03",
            name: "Paris Saint-Germain",
            code: "PSG",
            country: "France",
            founded: 1970,
            national: false,
            count: 3,
            points: 0,
            logo:
              "https://upload.wikimedia.org/wikipedia/fr/thumb/8/86/Paris_Saint-Germain_Logo.svg/1200px-Paris_Saint-Germain_Logo.svg.png",
            favorite: false,
          },
          {
            id: "04",
            name: "Olympique Lyonnais",
            code: "OL",
            country: "France",
            founded: 1950,
            national: false,
            count: 4,
            points: 2,
            logo:
              "https://upload.wikimedia.org/wikipedia/fr/thumb/a/a5/Logo_Olympique_Lyonnais_-_2022.svg/1200px-Logo_Olympique_Lyonnais_-_2022.svg.png",
            favorite: false,
          },
        ],
      };
    },
    mounted() {
      this.nbEquipelist = this.equipes.length;
    },
    methods: {
      sortList() {
        this.equipes.sort((a, b) => {
          return a.count - b.count;
        });
        // styleItem();
      },
      itemUp(item) {
        this.equipes.forEach((i) => {
          if (i.count === item.count - 1) {
            i.count++;
          }
        });
        item.count--;
        this.sortList();
      },
      itemDown(item) {
        this.equipes.forEach((i) => {
          if (i.count === item.count + 1) {
            i.count--;
          }
        });
        item.count++;
        this.sortList();
      },
      itemDelete(item) {
        var indexToPop = this.equipes.findIndex((x) => x.id === item.id);
        this.equipes.splice(indexToPop, 1);
        this.sortList();
      },
      itemFavorite(item) {
        item.favorite = !item.favorite;
        this.sortList();
      },
      styleItem() {
        // if (item.count <= 2) {
        this.equipes.forEach((i) => {
          if (i.count <= 2) {
            var nomequipe = document.getElementById(i.id);
          }
        });
        // var test = document.querySelector("#1");
        // item.styleItem("classement-podium");
        // }
      },
    },
  };
  </script>
  
  <style lang="scss">
  .favorite {
    &__true {
      color: green;
    }
    &__false {
      color: black;
    }
  }
  
  .classement {
    &-podium {
      color: green;
    }
    &-fin {
      color: red;
    }
  }
  
  table {
    border-collapse: collapse;
  }
  
  tr {
    border: 1px solid;
    display: flex;
    align-items: center;
  }
  </style>
  
  