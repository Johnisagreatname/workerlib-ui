<script lang="ts">
    import "@/assets/css/common.css";
    import AccountStore from '../../../store/modules/AccountStore';
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
    export default class Account extends Vue {
        public addProject: boolean;
        private store: any;
        private options!: Array<any>;
        private uid:string;
        private getDispaly:string;
        private updUser:boolean;
        public delUser: boolean;

        constructor() {
            super();
            this.addProject = false;
            this.store = getModule(AccountStore);
            this.updUser=false;
            this.delUser = false;
            this.getDispaly = 'none';
        }
        rowClassName (row, index) : string {
            if(index == 0) {
                return 'table-header'
            }
            return '';
        }
        mounted() {
            this.store.search();
            this.store.findRole();
            this.store.searchGroupId();
        }
        public search() {
            this.store.search();
        }
        get moderole() {
            return this.store.moderole;
        }
        set moderole(data) {
            this.store.setModerole(data);
        }
        get modegroup() {
            return this.store.modegroup;
        }
        set modegroup(data) {

            this.store.setModegroup(data);
        }
        async ok() {
            await this.store.insertUser();
            this.addProject = false;
        }
        yes() : any{
            this.store.updateUser();
        }
        popupDelUser(userId){
            this.store.setUid(userId);
            // this.store.deleteUser(userId);
            this.delUser =! this.delUser;
        }
        deletes() : any{
            this.store.deleteUser();
        }
        popupUpdUser(userId){
            this.uid = userId;
            this.store.setUid(this.uid);
            this.updUser = !this.updUser;
            // this.store.updateUser(userId);
        }
        cancel():any {
            this.addProject = false;
        }

        onPageSizeChange(pageSize){

            this.store.pageSize(pageSize);
            this.store.pageIndex(1);
            this.onPageIndexChange(1);
        }

        onPageIndexChange(pageIndex){

            console.log(pageIndex)

            this.store.pageIndex(pageIndex);
            this.store.search();
        }

        getColumns() : any{
            return this.store.columns;
        }
        getData() : any{
            return this.store.userList;
        }


        getRoles() : any{
            return this.store.role;
        }

        getGroup() : any{
            return this.store.group;
        }

        changeRole(value):any{
            if(this.store.role.filter(x => x.roleName == "管理员" && x.roleId==value).length>0){
                this.getDispaly = "display:block";
            }else {
                this.getDispaly = "display:none";
            }
        }

        set getDisplay(data:string){
            this.store.setGetDisplay(data);
        }

        get username():string{
            return this.store.userInfo.username;
        }
        set username(data:string){
            this.store.setUsername(data);
        }
        get password():string{
            return this.store.userInfo.password;
        }
        set password(data:string){
            this.store.setPassword(data);
        }

    }
</script>
<style scoped src="@/styles/account.css" />
<template lang="pug" src="@/views/account.pug" />
