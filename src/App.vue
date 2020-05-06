<!--
 * @Date         : 2020-04-27 19:40:42
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-05-06 23:33:54
 * @FilePath     : \src\App.vue
 -->
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
    min-width: 1900px;
    overflow-x: auto;
}
</style>
