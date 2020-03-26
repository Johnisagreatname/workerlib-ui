<script lang="ts">
    import "@/assets/css/common.css";
    import AccountStore from '../../../store/modules/AccountStore';
    import { Component, Vue, Prop, Model} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
    import { Message } from 'iview';

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
        public getDispaly:string;
        private updUser:boolean;
        public delUser: boolean;

        constructor() {
            super();
            this.addProject = false;
            this.store = getModule(AccountStore);
            this.updUser=false;
            this.delUser = false;
            this.getDispaly = 'display:none';
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
        loading = true;
        messageWarningFn (text) {
            let alert: any = Message;
            alert.warning(text);
            setTimeout(() => {
                this.loading = false;
                this.$nextTick(() => {
                    this.loading = true;
                })
            }, 500)
        }
        async ok() {
            if(!this.store.userInfo.username){
                this.messageWarningFn('请输入用户名！');
                return;
            }
            if(!this.store.userInfo.password){
                this.messageWarningFn('请输入密码！');
                return;
            }
            if(!this.store.moderole){
                this.messageWarningFn('请选择角色！');
                return;
            }

            // if(this.store.moderole == "9d83cad925124244b1b5ec7cf0656015" && !this.store.modegroup){
            //     this.messageWarningFn('请选择项目名称！');
            //     return;
            // }
            await this.store.insertUser();
            this.addProject = false;
        }
        yes() : any{
            if(!this.store.userInfo.password){
                this.messageWarningFn('请输入密码！');
                return;
            }
            this.store.updateUser();
            this.updUser = false;
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
            debugger
            this.uid = userId;
            this.store.setUid(userId);
            this.updUser = true;
        }
        cancel():any {
            this.addProject = false;
        }
        cancelYes():any {
            this.updUser = false;
        }
        cancelDeletes():any{
            this.delUser = false;
        }

        get name(): string {
            return this.store.userInfo.username;
        }
        set name(data: string) {
            this.store.setName(data);
        }

        getTotalRecords() {
            return this.store.pageInfo.totalRecords;
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


        get getDisplay():string{
            return this.store.getDisplay;
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
