<script lang="ts">
    import "@/assets/css/common.css";
    import { Component, Vue, Prop, Model, Watch} from 'vue-property-decorator';
    import { Message } from 'iview';

    @Component
    export default class IGrid extends Vue {

        constructor() {
            super();
        }
        mounted() {
            this.buttons
        }

        @Prop({ default: [] }) columns: Array<any>;

        @Prop({ default: [] }) data: Array<any>;

        @Prop({ default: 1 }) pageIndex?: Number;

        @Prop({ default: 50 }) pageSize?: Number;

        @Prop({ default: [] }) buttons: Array<OptionItem>;

        @Prop({ default: null }) height?: Number;

        @Prop({ default: null }) css: any;

        @Prop({ default: false }) selection?: boolean;

        @Prop({ default: false }) serialNumber?: boolean;

        public getColumns() {
            this.columns.forEach((item, i)=> {
                switch (item.title) {
                    case "处罚":
                    case "工种":
                    case "所属项目":
                    case "所属单位":
                        if(!item.render) {
                            let render = (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            cursor: 'pointer'
                                        },
                                        domProps: {
                                            title: item.title
                                        }
                                    }, item.title)
                                ])
                            };
                            item.render = render;
                        }
                        break;
                }
            });

            if(this.serialNumber && !this.columns.find(a=>a.slot == 'serialNumber')) {
                this.columns.splice(0, 0, {
                    title: '序号',
                    width: 100,
                    slot: 'serialNumber'
                });
            }

            if(this.selection && !this.columns.find(a=>a.type == 'selection')) {
                this.columns.splice(0, 0, {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                });
            }

            return this.columns;
        }
    }

    interface OptionItem {
        text: string;
        action: Function;
    }
</script>

<style scoped>
    .operation{
        width: 96px;
        height: 24px;
        background-color: #8095fd;
        border-radius: 50px;
        margin-left: auto;
        margin-right: auto;
        cursor: pointer;
        color: #ffffff;
    }
    .selected{
        height: 26px;
        width: auto;
        background-color: #789fef;
        min-width: 56px;
        float: left;
        border-radius: 20px;
        margin-top: 12px;
        padding-left: 10px;
        line-height: 26px;
        margin-right: 16px;
        color: #ffffff;
    }
    .selected .ivu-icon{
        float: right;
        padding-right: 10px;
        font-size: 18px;
        padding-top: 4px;

    }
    .inquire{
        width: 76px;
        height: 36px;
        background-image: linear-gradient(to right, #60b0fe , #5a88fa);
        color: #ffffff;
        float: right;
        border-radius: 20px;
        margin-right: 20px;
        font-size: 16px;
        text-align: center;
        padding-top: 6px;
        cursor: pointer;
    }
    .page span{
        float: left;
        padding-top: 3px;
        text-align: center;
        padding-left: 560px;
    }
</style>
<template lang="pug">
Table(border,ref="selection",:columns="this.getColumns()",:data="this.data", :height="this.height", :style="this.css")
    template(slot-scope="{row, index}",slot="serialNumber")
        span {{index + (pageIndex-1) * pageSize + 1}}
    template(slot-scope="{row, index}",slot="operation")
        div(v-if="buttons && buttons.length == 1", class="operation",@click="buttons[0].action") {{buttons[0].text}}
        Dropdown(v-if="buttons && buttons.length > 1", class="operation")
            Button(type="primary") 详细操作
                Icon(type="ios-arrow-down")
            DropdownMenu(slot="list", v-for="(item, i) in this.options")
                DropdownItem(@click="item.action") {{item.text}}
</template>
