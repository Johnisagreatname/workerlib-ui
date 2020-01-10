<script lang="ts">
    import "@/assets/css/common.css";
    import CheckEvaluateStore from '../../../store/modules/CheckEvaluateStore';
    import CoursewareStore from '../../../store/modules/CoursewareStore';
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
    export default class CheckEvaluate extends Vue {
        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;
        private options!: any;
        public addRate: boolean;
        public addTeamRate: boolean;
        public viewTeamRate: boolean;
        public addViewTeamRate: boolean;
        public checkedArray: Array<any>;
        public checkAllGroup :Array<any>;
        public userName:string;
        public addId:string;
        public workType:Array<any>;
        mounted() {
            this.store.setSelectStatus(1);
            this.store.getProjectType();
            this.store.search();
            this.store.getGrade();
            this.store.getCommtenGrade();
            this.store.getCommtenRank();
            this.checkedArray = [];
            this.checkAllGroup = [];
            this.workType = [];
        }
        private store: any;
        constructor() {
            super();
            this.store = getModule(CheckEvaluateStore)
            this.addRate = false;
            this.addTeamRate = false;
            this.addViewTeamRate = false;
            this.viewTeamRate = false;
            this.userName = null;
            this.addId = null;
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
            }, 1000)
        }
        toggle(name){
            if(name=="评定记录"){
                this.store.setSelectStatus(1);
                this.store.search();
            }else {
                this.store.setSelectStatus(2);
                this.store.search();
            }
        }
        getWorkType():any{
            return this.workType;
        }
        okTeamRate():any{
            if(!this.store.insertRatingname){
                this.messageWarningFn('请输入评定记录名称！');
                return;
            }if(this.store.rate.filter(a =>a.ratingname == this.store.insertRatingname).length>0){
                this.messageWarningFn('评定记录名称已存在！');
                return;
            }
            debugger
            this.store.setInsertNorating(this.store.checkeds.length);
            this.store.setInsertRate(0);
            for(let i = 0; i< this.store.checkeds.length;i++){
                this.store.setCultivateArchivesList(this.store.checkeds[i].id);
            }
            this.store.insertTeamRate(this.change);

            this.addTeamRate = false;

        }
        cancelTeamRate():any{
            this.addTeamRate = false;
        }

        viewData() {
            this.addTeamRate=!this.addTeamRate;
            this.store.searchPeople();
        }
        view(id){
           this.store.setViewRateId(id);
           this.store.searchViewRate();
           this.viewTeamRate =!this.viewTeamRate;

        }

        addRateName(id,name,workType){
            this.addId = id;
            this.userName = name;
            if(workType) {
                this.workType = new Array<any>();
                let list = workType.split(",");
                for (let i = 0;i<list.length;i++){
                    let item = {};
                    item["name"] = list[i];
                    this.workType.push(item);
                }
            }
            this.addRate =!this.addRate;
        }

        onPageSizeChange(pageSize){
            this.store.setPageSize(pageSize);
            this.store.setPageIndex(1);
            this.onPageIndexChange(1);
        }
        onPageIndexChange(pageIndex){
            this.store.setPageIndex(pageIndex);
            this.store.search();
        }
        onPageSizeViewRateChange(pageSize){
            this.store.setPageViewRateSize(pageSize);
            this.store.setPageViewRateIndex(1);
            this.onPageIndexViewRateChange(1);
        }
        onPageIndexViewRateChange(pageIndex){
            this.store.setPageViewRateIndex(pageIndex);
            this.store.search();
        }
        handleCreate (type) {
            this.getType().push({
                value: type,
                label: type
            });
        }
        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                {value: '在场', key: 1 },
                {value: '离场', key: 2 }

            ];
            return this.options;
        }
        onSelect(selection,row){
            var itemTrue = {};
            itemTrue['eafId'] = row.eafId;
            itemTrue['eafName'] = row.eafName;
            this.store.setCheckedUser(itemTrue);
            console.log(this.store.checkedUser)
        }
        onSelectCancel(selection,row){
            for(let i = 0;i < this.store.rate.length;i++) {
                if(this.store.rate.filter(a => a.eafId == row.eafId ).length > 0){
                    this.$set(this.store.rate[i], '_checked', false)
                }
            }
            let index =  this.store.checkedUser.findIndex(x => x.eafId == row.eafId);
            this.store.checkedUser.splice(index, 1);
            console.log(this.store.checkedUser)
        }
        onSelectAll(selection) {
            for(let i= 0;i<selection.length;i++){
                let row = selection[i];
                var itemTrue = {};
                let index =  this.store.checkedUser.findIndex(x => x.eafId == row.eafId);
                if(index > -1){
                    continue;
                }
                itemTrue['eafId'] = row.eafId;
                itemTrue['eafName'] = row.eafName;
                this.store.setCheckedUser(itemTrue)
            }
            console.log(this.store.checkedUser)


        }
        onSelectAllCancel(selection){
            for(let i = 0;i < this.store.rate.length;i++) {
                if(this.store.rate.findIndex(x => x.eafId == this.store.rate[i].eafId) > -1){
                    let index =  this.store.checkedUser.findIndex(x => x.eafId == this.store.peoples[i].eafId);
                    this.$set(this.store.rate[i], '_checked', false);
                    this.store.checkedUser.splice(index, 1);
                }

            }
            console.log(this.store.checkedUser)
        }

        getCommtenGrade() : any {
            return this.store.commtenGrade;
        }
        getCommtenRank() : any {
            return this.store.commtenRank;
        }
        getGrade() : any {
            return this.store.grades;
        }
        ok() : any{
            let item = {};
            item["userId"] = this.addId;
            item["grade"] = this.store.grade;
            item["rank"] = this.store.rank;
            item["evaluateTime"]=
                this.store.evaluateTime.getFullYear()+"-"+
                (Number(this.store.evaluateTime.getMonth())+1)+"-"+
                this.store.evaluateTime.getDay();
            item["rateWorkType"] = this.store.rateWorkType;
            this.store.setInsertUser(item)

            this.store.insertArchives();
            this.store.clearInsertUser();
            this.store.clearCheckedUser();
            this.addRate = false;
            this.addViewTeamRate=false;
        }
        cancel():any {
            this.addRate = false;
        }
        getColumns() : any{
            return this.store.columns;
        }
        getData() : any{
            return this.store.rate;
        }
        getTeamColumns() : any{
            return this.store.teamColumns;
        }
        getType(){
            return this.store.projectType;
        }
        addSelected(){
            for (let i=0;i<this.checkAllGroup.length;i++){
                var itemTrue = {};
                let row = this.checkAllGroup[i];
                itemTrue['id'] = row.id;
                itemTrue['name'] = row.name;
                itemTrue['photo'] = row.photo;
                this.store.setChecked(itemTrue);
                let index = this.store.peoples.findIndex(x => x.eafId == row.id);
                this.$set(this.store.peoples[index], '_disabled', true)
            }
            this.checkAllGroup = [];
            console.log(this.checkAllGroup);
        }
        change(id){
            this.store.setTeamId(id);
            this.store.searchTeamUserInfo();
            this.addViewTeamRate = !this.addViewTeamRate;
        }
        okViewTeamRate():any{
            this.addViewTeamRate=false;
        }
        cancelViewTeamRate():any{
            this.addViewTeamRate=false;
        }
        getViewColumns():any{
            return this.store.viewColumns;
        }
        getViewData():any{
            return this.store.viewInfo;
        }
        getViewRateColumns():any{
            return this.store.viewRateColumns;
        }
        getViewRateData():any{
            return this.store.viewRateInfo;
        }

        get checkedUser():any{
            return this.store.checkedUser;
        }
        get user(){
            return this.userName;
        }
        get rank():string{
            return this.store.rank;
        }
        set rank(data:string){
            this.store.setRank(data)
        }
        get selectRank():string{
            return this.store.selectRank;
        }
        set selectRank(data:string){
            this.store.setSelectRank(data)
        }
        get evaluateTime():Date{
            return this.store.evaluateTime;
        }
        set evaluateTime(data:Date){
            this.store.setEvaluateTime(data)
        }

        get grade():string{
            return this.store.grade;
        }
        set grade(data:string){
            this.store.setGrade(data);
        }
        get rateWorkType():string{
            return this.store.rateWorkType;
        }
        set rateWorkType(data:string){
            this.store.setRateWorkType(data);
        }
        set totalRecords(data:number){
            this.store.setPageTotal(data);
        }
        get totalRecords():number{
            return this.store.pageTotal;
        }
        set selectConstructionUit(data:string){
            this.store.setConstructionUit(data);
        }
        get selectConstructionUit():string{
            return this.store.selectConstructionUit;
        }
        set selectProjectName(data:string){
            this.store.setProjectName(data);
        }
        get selectProjectName():string{
            return this.store.selectProjectName;
        }
        set name(data:string){
            this.store.setName(data);
        }
        get name():string{
            return this.store.selectName;
        }
        set selectType(data:string){
            this.store.setType(data);
        }
        get selectType():string{
            return this.store.selectType;
        }
        set selectStatus(data:number){
            this.store.setSelectStatus(data);
        }
        get selectStatus():number{
            return this.store.selectStatus;
        }
        set selectRate(data:string){
            this.store.setRate(data);
        }
        get selectRate():string{
            return this.store.selectRate;
        }
        set selectTime(data:Date){
            this.store.setSelectTime(data);
        }
        get selectTime():Date{
            return this.store.selectTime;
        }
        set insertRatingname(data:string){
            this.store.setInsertRatingname(data);
        }
        get insertRatingname():string{
            return this.store.insertRatingname;
        }
        set insertNorating(data:number){
            this.store.setInsertNorating(data);
        }
        get insertNorating():number{
            return this.store.insertNorating;
        }
        set insertRate(data:number){
            this.store.setInsertRate(data);
        }
        get insertRate():number{
            return this.store.insertRate;
        }

        set insertRemark(data:string){
            this.store.setInsertRemark(data);
        }
        get insertRemark():string{
            return this.store.insertRemark;
        }


        //coursewareStore

        search(){
            this.store.searchPeople();
        }
        getColumnsTeam() : any{
            return this.store.peopleColumns;
        }
        getDataTeam() : any{
            for(let i=0;i<this.store.peoples.length;i++) {
                if(this.store.checkeds.filter(a => a.id == this.store.peoples[i].eafId).length > 0){
                    this.$set(this.store.peoples[i], '_disabled', true)
                    this.$set(this.store.peoples[i], '_checked', true)
                }
                if(this.checkAllGroup.filter(a => a.id == this.store.peoples[i].eafId ).length > 0){
                    this.$set(this.store.peoples[i], '_checked', true)
                }
            }
            return this.store.peoples;

        }
        offChecked(id): boolean {
            if(!id) return;
            if(this.store.checkeds.findIndex(x => x.id == id) > -1){
                return false;
            }else {
                return true;
            }
        }
        show(id: number,name:string,photo:string): void {
            let index = this.store.checkeds.findIndex(x => x.id == id); //已有列表
            if(index > -1) {
                this.store.checkeds.splice(index, 1);   //去除
                var item = {};
                item['id'] = id;
                item['name'] = name;
                item['photo'] = photo;
                this.checkAllGroup.push(item);
                let indexPeople = this.store.peoples.findIndex(x => x.eafId == id);
                if(indexPeople > -1)  {  //未选中列表
                    this.$set(this.store.peoples[indexPeople], '_disabled', false);
                    return;
                }
            }
            if(this.checkAllGroup.findIndex(x => x.id == id) > -1){
                this.checkAllGroup.splice(this.checkAllGroup.findIndex(x => x.id == id), 1);   //去除
            }
            var itemTrue = {};
            itemTrue['id'] = id;
            itemTrue['name'] = name;
            itemTrue['photo'] = photo;
            this.store.setChecked(itemTrue);
            for(let i = 0;i < this.store.peoples.length;i++) {
                if(this.store.peoples[i].eafId == id){
                    this.$set(this.store.peoples[i], '_checked', true)
                    this.$set(this.store.peoples[i], '_disabled', true)
                }else {
                    this.$set(this.store.peoples[i], '_checked', false)
                    this.$set(this.store.peoples[i], '_disabled', false)
                }
            }
        }
        // 单选
        handleSelectRow(selection, row) {
            var itemTrue = {};
            itemTrue['id'] = row.eafId;
            itemTrue['name'] = row.eafName;
            itemTrue['photo'] = row.cwrPhoto;
            this.checkAllGroup.push(itemTrue);
            console.log(this.checkAllGroup);
        }
        handleSelectRowCancel(selection, row){
            for(let i = 0;i < this.store.peoples.length;i++) {
                if(this.store.peoples.filter(a => a.eafId == row.eafId ).length > 0){
                    this.$set(this.store.peoples[i], '_checked', false)
                }
            }
            let index =  this.checkAllGroup.findIndex(x => x.id == row.eafId);
            this.checkAllGroup.splice(index, 1);
            console.log(this.checkAllGroup);

        }
        //多选
        handleSelectAll(selection) {
            for(let i= 0;i<selection.length;i++){
                var itemTrue = {};
                let row = selection[i];
                itemTrue['id'] = row.eafId;
                itemTrue['name'] = row.eafName;
                itemTrue['photo'] = row.cwrPhoto;
                this.checkAllGroup.push(itemTrue);
            }
            console.log(this.checkAllGroup);
        }
        handleSelectAllCancel(selection){
            for(let i = 0;i < this.store.peoples.length;i++) {
                if(this.checkAllGroup.findIndex(x => x.id == this.store.peoples[i].eafId) > -1){
                    let index =  this.checkAllGroup.findIndex(x => x.id == this.store.peoples[i].eafId);
                    this.$set(this.store.peoples[i], '_checked', false);
                    this.checkAllGroup.splice(index, 1);
                }
            }
            console.log(this.checkAllGroup);
        }
        onPageSizeInChange(pageSize){
            this.store.setInPageSize(pageSize);
            this.store.setInPageIndex(1);
            this.onPageIndexInChange(1);
        }
        onPageIndexInChange(pageIndex){
            this.store.setInPageIndex(pageIndex);
            this.store.searchPeople();
        }


        onPageSizeViewChange(pageSize){
            this.store.setPageViewSize(pageSize);
            this.store.setPageViewIndex(1);
            this.onPageIndexViewChange(1);
        }
        onPageIndexViewChange(pageIndex){
            this.store.setViewPageIndex(pageIndex);
            this.store.searchTeamUserInfo();
        }

        set selectUserName(data:string){
            this.store.setSelectUserName(data);
        }
        get selectUserName():string{
            return this.store.selectUserName;
        }
        set pageInTotal(data:number){
            this.store.setInPageTotal(data);
        }
        get pageInTotal():number{
            return this.store.pageInTotal;
        }
        set pageViewTotal(data:number){
            this.store.setPageViewRateTotal(data);
        }
        get pageViewTotal():number{
            return this.store.pageViewTotal;
        }
        set pageViewRateTotal(data:number){
            this.store.setPageViewTotal(data);
        }
        get pageViewRateTotal():number{
            return this.store.pageViewRateTotal;
        }
        set selectViewIdCard(data:string){
            this.store.setSelectViewIdCard(data);
        }
        get selectViewIdCard():string{
            return this.store.selectViewIdCard;
        }
        set selectViewName(data:string){
            this.store.setSelectViewName(data);
        }
        get selectViewName():string{
            return this.store.selectViewName;
        }

    }
</script>
<style scoped src="@/styles/checkEvaluate.css" />
<template lang="pug" src="@/views/checkEvaluate.pug" />
