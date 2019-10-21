<template lang="pug">
    #app
        Home
</template>
<script lang="ts">

    import Home from '@/components/Home.vue';
    import { Vue, Component } from 'vue-property-decorator'
    @Component({
        components: {
            Home
        }
    })
    export default class App extends Vue {}
</script>
