<template>
<div class="compare">
    <h2>Comparaison d'équipes</h2>
    <div class="team-selection">
        <h3>Choix des équipes à comparer :</h3>
        <div class="select">
            <label>Equipe 1 :</label>
            <select v-model="selectedTeam1">
                <option v-for="equipe in equipes" :key="equipe.id" :value="equipe">{{ equipe.team_long_name }}</option>
            </select>
        </div>
        <div class="select">
            <label>Equipe 2 :</label>
            <select v-model="selectedTeam2">
                <option v-for="equipe in equipes" :key="equipe.id" :value="equipe">{{ equipe.team_long_name }}</option>
            </select>
        </div>
        <button @click="compareTeams">Comparer</button>
    </div>
    <div v-if="showComparison">
        <div v-if="showComparison" class="modal">
            <div class="modal-content">
                <span class="close" @click="showComparison = false">&times;</span>
                <div class="comparison">
                    <div class="team">
                        <h4>{{ selectedTeam1.team_long_name }}</h4>
                        <ul>
                            <li>Points : {{ selectedTeam1.points }} 
                                <i v-if="(selectedTeam1.points-selectedTeam2.points)>0" style="color:green">
                                    (+{{ selectedTeam1.points-selectedTeam2.points }})
                                </i>
                                <i v-else-if="(selectedTeam1.points-selectedTeam2.points)<0" style="color:red">
                                    ({{ selectedTeam1.points-selectedTeam2.points }})
                                </i>
                            </li>
                            <li>Classement : {{ selectedTeam1.classement }}
                                <i v-if="(selectedTeam1.classement-selectedTeam2.classement)>0" style="color:red">
                                    (+{{ selectedTeam1.classement-selectedTeam2.classement }})
                                </i>
                                <i v-else-if="(selectedTeam1.classement-selectedTeam2.classement)<0" style="color:green">
                                    ({{ selectedTeam1.classement-selectedTeam2.classement }})
                                </i>
                            </li>
                            <li>Nombre de victoires : {{ selectedTeam1.win }}
                                <i v-if="(selectedTeam1.win-selectedTeam2.win)>0" style="color:green">
                                    (+{{ selectedTeam1.win-selectedTeam2.win }})
                                </i>
                                <i v-else-if="(selectedTeam1.win-selectedTeam2.win)<0" style="color:red">
                                    ({{ selectedTeam1.win-selectedTeam2.win }})
                                </i>
                            </li>
                            <li>Nombre de défaites : {{ selectedTeam1.loose }}
                                <i v-if="(selectedTeam1.loose-selectedTeam2.loose)>0" style="color:red">
                                    (+{{ selectedTeam1.loose-selectedTeam2.loose }})
                                </i>
                                <i v-else-if="(selectedTeam1.loose-selectedTeam2.loose)<0" style="color:green">
                                    ({{ selectedTeam1.loose-selectedTeam2.loose }})
                                </i>
                            </li>
                            <li>Nombre de nuls : {{ selectedTeam1.nul }}
                                <i v-if="(selectedTeam1.nul-selectedTeam2.nul)>0" style="color:red">
                                    (+{{ selectedTeam1.nul-selectedTeam2.nul }})
                                </i>
                                <i v-else-if="(selectedTeam1.nul-selectedTeam2.nul)<0" style="color:green">
                                    ({{ selectedTeam1.nul-selectedTeam2.nul }})
                                </i>
                            </li>
                        </ul>
                    </div>
                    <div class="team">
                        <h4>{{ selectedTeam2.team_long_name }}</h4>
                        <ul>
                            <li>Points : {{ selectedTeam2.points }}
                                <i v-if="(selectedTeam2.points-selectedTeam1.points)>0" style="color:green">
                                    (+{{ selectedTeam2.points-selectedTeam1.points }})
                                </i>
                                <i v-else-if="(selectedTeam1.points-selectedTeam2.points)<0" style="color:red">
                                    ({{ selectedTeam1.points-selectedTeam2.points }})
                                </i>
                            </li>
                            <li>Classement : {{ selectedTeam2.classement }}
                                <i v-if="(selectedTeam2.classement-selectedTeam1.classement)>0" style="color:red">
                                    (+{{ selectedTeam2.classement-selectedTeam1.classement }})
                                </i>
                                <i v-else-if="(selectedTeam2.classement-selectedTeam1.classement)<0" style="color:green">
                                    ({{ selectedTeam2.classement-selectedTeam1.classement }})
                                </i>
                            </li>
                            <li>Nombre de victoires : {{ selectedTeam2.win }}
                                <i v-if="(selectedTeam2.win-selectedTeam1.win)>0" style="color:green">
                                    (+{{ selectedTeam2.win-selectedTeam1.win }})
                                </i>
                                <i v-else-if="(selectedTeam2.win-selectedTeam1.win)<0" style="color:red">
                                    ({{ selectedTeam2.win-selectedTeam1.win }})
                                </i>
                            </li>
                            <li>Nombre de défaites : {{ selectedTeam2.loose }}
                                <i v-if="(selectedTeam2.loose-selectedTeam1.loose)>0" style="color:red">
                                    (+{{ selectedTeam2.loose-selectedTeam1.loose }})
                                </i>
                                <i v-else-if="(selectedTeam2.loose-selectedTeam1.loose)<0" style="color:green">
                                    ({{ selectedTeam2.loose-selectedTeam1.loose }})
                                </i>
                            </li>
                            <li>Nombre de nuls : {{ selectedTeam2.nul }}
                                <i v-if="(selectedTeam2.nul-selectedTeam1.nul)>0" style="color:red">
                                    (+{{ selectedTeam2.nul-selectedTeam1.nul }})
                                </i>
                                <i v-else-if="(selectedTeam2.nul-selectedTeam1.nul)<0" style="color:green">
                                    ({{ selectedTeam2.nul-selectedTeam1.nul }})
                                </i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            equipes: [],
            selectedTeam1: null,
            selectedTeam2: null,
            showComparison: false, 
        };
    },
    methods: {
        compareTeams() {
            this.showComparison = true;
        }

    },
    mounted() {
        fetch("http://localhost:5000/listclubs")
            .then((response) => response.json())
            .then((data) => {
                this.equipes = data;
            });
    },
};
</script>

<style>
.compare {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem;
}

.compare h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
}

.team-selection {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
}

.team-selection h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.select {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
}

.select label {
    margin-right: 1rem;
    font-size: 1rem;
}

.select select {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.select select:focus {
    outline: none;
    border-color: #2a9fd6;
}

.compare button {
    background-color: #2a9fd6;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

.compare button:hover {
    background-color: #1c7ebf;
}

.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #6e6e6e;
    margin: 15% auto;
    padding: 1rem;
    border: 1px solid #888;
    width: 50%;
    border-radius: 4px;

}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.comparison {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.comparison .team {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 2rem;
    border: 5px solid black;
    border-radius: 10px;
    background-color: rgb(158, 158, 158);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    min-width: 300px;
}

.comparison .team h4 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.comparison .team ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.comparison .team li {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
}

.button:hover {
    background-color: #3e8e41;
}

.button:active {
    background-color: #4CAF50;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
}
</style>
