<template lang="pug">
    #app
        router-view
</template>
<script lang="ts">
    import "@/assets/css/common.css";
    import { Vue, Component } from 'vue-property-decorator'
    @Component({
        components: {
        }
    })
    export default class App extends Vue {}
</script>

<style>
body {
    min-width: 1920px;
    overflow-x: auto;
}
</style>
