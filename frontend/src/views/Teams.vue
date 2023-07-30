<template>

    <div>
        <SearchTeam />
        <AJMTeam />
    </div>
    
</template>

<script>
import AJMTeam from '../components/AJMTeam.vue';
import SearchTeam from '../components/SearchTeam.vue';


export default {
    components: { AJMTeam, SearchTeam }
}

</script>