<script lang="ts">
    import {Component, Vue, Prop, Model} from 'vue-property-decorator';
    import {getModule} from 'vuex-module-decorators';
    import {Search, Group, Cell, XButton, Flexbox, FlexboxItem,Swiper,SwiperItem,ViewBox } from 'vux'

    @Component({
        components: {
            Search,
            Group,
            Cell,
            XButton,
            Flexbox,
            FlexboxItem,
            Swiper,
            SwiperItem,
            ViewBox
        }
    })
    export default class MobileHome extends Vue {

        private results: Array<String> = [];
        private value: String = 'test';
        private imgList = [
            'https://ws1.sinaimg.cn/large/663d3650gy1fq685v5csyj208c06ygm0.jpg',
            'https://ws1.sinaimg.cn/large/663d3650gy1fq685v5csyj208c06ygm0.jpg',
            'https://ws1.sinaimg.cn/large/663d3650gy1fq685v5csyj208c06ygm0.jpg'
        ];
        private demoList = this.imgList.map((one, index) => ({
            url: 'javascript:',
            img: one
        }));

        public data() {
            return {
                demo03_list: this.demoList,
            }
        }

        public setFocus() {
            this.setFocus()
        }

        public resultClick(item) {
            window.alert('you click the result item: ' + JSON.stringify(item))
        }

        public getResult(val) {
            console.log('on-change', val)
            this.results = val ? this.getResultSet(this.value) : []
        }

        public onSubmit() {

        }

        public onFocus() {
            console.log('on focus')
        }

        public onCancel() {
            console.log('on cancel')
        }

        public getResultSet(val) {
            let rs = []
            for (let i = 0; i < 20; i++) {
                rs.push({
                    title: `${val} result: ${i + 1} `,
                    other: i
                })
            }
            return rs
        }
    }
</script>
<template lang="pug" src="@/views/mobile/home.pug"/>
<style scoped src="@/styles/mobile/home.css"/>

