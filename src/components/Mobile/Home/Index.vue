<script lang="ts">
    import { Component, Vue, Prop, Model } from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
    import { Search, Group, Cell, XButton } from 'vux'

    @Component({
        components:{
            Search,
            Group,
            Cell,
            XButton
        }
    })
    export default class MobileHome extends Vue {

        private results: Array<String> = [];
        private value:String = 'test';

        public setFocus () {
            this.setFocus()
        }

        public resultClick (item) {
            window.alert('you click the result item: ' + JSON.stringify(item))
        }
        public getResult (val) {
            console.log('on-change', val)
            this.results = val ? this.getResultSet(this.value) : []
        }

        public onSubmit () {

        }

        public onFocus () {
            console.log('on focus')
        }

        public onCancel () {
            console.log('on cancel')
        }

        public getResultSet (val) {
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
<template lang="pug" src="@/views/mobile/home.pug" />


<!--<template>-->
<!--    <div>-->
<!--        <search-->
<!--                @result-click="resultClick"-->
<!--                @on-change="getResult"-->
<!--                :results="results"-->
<!--                v-model="value"-->
<!--                position="absolute"-->
<!--                auto-scroll-to-top-->
<!--                top="46px"-->
<!--                @on-focus="onFocus"-->
<!--                @on-cancel="onCancel"-->
<!--                @on-submit="onSubmit"-->
<!--                ref="search"></search>-->
<!--        <group>-->
<!--            <cell title="keyword">{{ value }}</cell>-->
<!--        </group>-->

<!--        <div style="padding:15px;">-->
<!--            <x-button-->
<!--                    @click.native="setFocus"-->
<!--                    type="primary">set focus</x-button>-->
<!--        </div>-->
<!--        <group>-->
<!--            <cell-->
<!--                    title="static position demo"-->
<!--                    is-link-->
<!--                    link="/component/search-static"></cell>-->
<!--        </group>-->
<!--    </div>-->
<!--</template>-->


<!--<script>-->
<!--    import { Search, Group, Cell, XButton } from 'vux'-->

<!--    export default {-->
<!--        components: {-->
<!--            Search,-->
<!--            Group,-->
<!--            Cell,-->
<!--            XButton-->
<!--        },-->
<!--        methods: {-->
<!--            setFocus () {-->
<!--                this.$refs.search.setFocus()-->
<!--            },-->
<!--            resultClick (item) {-->
<!--                window.alert('you click the result item: ' + JSON.stringify(item))-->
<!--            },-->
<!--            getResult (val) {-->
<!--                console.log('on-change', val)-->
<!--                this.results = val ? getResult(this.value) : []-->
<!--            },-->
<!--            onSubmit () {-->
<!--                this.$refs.search.setBlur()-->
<!--                this.$vux.toast.show({-->
<!--                    type: 'text',-->
<!--                    position: 'top',-->
<!--                    text: 'on submit'-->
<!--                })-->
<!--            },-->
<!--            onFocus () {-->
<!--                console.log('on focus')-->
<!--            },-->
<!--            onCancel () {-->
<!--                console.log('on cancel')-->
<!--            }-->
<!--        },-->
<!--        data () {-->
<!--            return {-->
<!--                results: [],-->
<!--                value: 'test'-->
<!--            }-->
<!--        }-->
<!--    }-->

<!--    function getResult (val) {-->
<!--        let rs = []-->
<!--        for (let i = 0; i < 20; i++) {-->
<!--            rs.push({-->
<!--                title: `${val} result: ${i + 1} `,-->
<!--                other: i-->
<!--            })-->
<!--        }-->
<!--        return rs-->
<!--    }-->
<!--</script>-->

