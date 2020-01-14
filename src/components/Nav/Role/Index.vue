<script lang="ts">
    import "@/assets/css/common.css";
    import RoleStore from '../../../store/modules/RoleStore';
    import { Component, Vue, Prop, Model} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';

    @Component({
        components:{
        },
        directives: { // 自定义指令
        },
        mounted() {
        },
        computed: {
            menuitemClasses: () => {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    })
    export default class Role extends Vue {
        public addRole: boolean;
        public delRole: boolean;
        private store: any;
        private updUser:boolean;

        constructor() {
            super();
            this.addRole = false;
            this.store = getModule(RoleStore);
            this.updUser=false;
            this.delRole = false;
        }
        rowClassName (row, index) : string {
            if(index == 0) {
                return 'table-header'
            }
            return '';
        }
        mounted() {
            this.store.search();

        }
        public search() {
            this.store.search();
        }
        ok() : any{
            this.store.insertRole();
            this.addRole = false;
        }
        yes() : any{
            this.store.deleteRole();
            this.delRole = false;
        }
        popupDelRole(roleId){
            this.store.roleInfo.roleid = roleId;
            this.delRole =! this.delRole;
        }
        cancel():any {
            this.addRole = false;
        }

        onPageSizeChange(pageSize){
            this.store.pageSize(pageSize);
            this.store.pageIndex(1);
            this.onPageIndexChange(1);
        }

        onPageIndexChange(pageIndex){

            this.store.pageIndex(pageIndex);
            this.store.search();
        }
        getColumns() : any{
            return this.store.columns;
        }
        getData() : any{
            return this.store.role;
        }
        getTotalRecords() {
            return this.store.pageInfo.totalRecords;
        }
        get roleid():string{
            return this.store.roleInfo.roleid;
        }
        set roleid(data:string){
            this.store.setRoleid(data);
        }
        get roleName():string{
            return this.store.roleInfo.roleName;
        }
        set roleName(data:string){
            this.store.setRoleName(data);
        }
        get description():string{
            return this.store.roleInfo.description;
        }
        set description(data:string){
            this.store.setDescription(data);
        }
        get createTime():string{
            return this.store.roleInfo.createTime;
        }
        set createTime(data:string){
            this.store.setCreateTime(data);
        }
        get createBy():number{
            return this.store.roleInfo.createBy;
        }
        set createBy(data:number){
            this.store.setCreateBy(data);
        }


    }
</script>
<style scoped src="@/styles/role.css" />
<template lang="pug" src="@/views/role.pug" />
