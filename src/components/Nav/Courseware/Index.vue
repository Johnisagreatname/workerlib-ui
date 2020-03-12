<script lang="ts">
    import "@/assets/css/common.css";
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
    export default class Courseware extends Vue {
        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;
        mounted() {
            this.store.search();
            this.store.getProjectType();
        }

        single = true;
        singleUser = false;
        loading = true;

        public indeterminate: boolean;
        public checkAll: boolean;
        public addCourseware: boolean;
        public addUpCourseware: boolean;
        public deleteCourseware: boolean;
        public updateCourseware: boolean;
        public addCultivate: boolean;
        public addUpCultivate: boolean;
        public pageName: string;
        public pageUpName: string;
        private store: any;
        public id:number;
        public checkAllGroup :Array<any>;
        public onTitle:string;
        public onUpTitle:string;
        constructor() {
            super();
            this.onTitle = null;
            this.onUpTitle = null;
            this.indeterminate= true;
            this.checkAll = false;
            this.addCultivate = false;
            this.addUpCultivate = false;
            this.addCourseware = false;
            this.addUpCourseware = false;
            this.updateCourseware = false;
            this.pageName = "name1";
            this.pageUpName = "name1";
            this.deleteCourseware = false;
            this.id = null;
            this.checkAllGroup = [];
            this.store = getModule(CoursewareStore)

        }
        rowClass(row, index) {
            return "rowClasses"
        }

        search(){
            this.store.searchPeople();
        }
        checkAllGroupChange(){
            this.store.setSelectUnitId("E1518A607E764390848F188390482597");
            this.store.searchPeople();
        }
        getColumns() : any{
            return this.store.columns;
        }
        getData() : any{
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

        getCourseWareList():any{
            return this.store.courseWareInfo;
        }
        getCourseware() : any{
            return this.store.courseware;
        }
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
        ok() : any{
            this.store.setTeachingMethod("录播");
            if(this.store.courseWare.title == "" || this.store.courseWare.title == null ){
                this.messageWarningFn('请输入课件名称！');
                return;
            }
            if(this.store.courseWare.course == "" || this.store.courseWare.course == null ){
                this.messageWarningFn('请选择课程！');
                return;
            }
            if(this.store.courseWare.total_hours == "" || this.store.courseWare.total_hours == null ){
                this.messageWarningFn('请输入总课时！');
                return;
            }
            if(this.store.courseWare.type_work == "" || this.store.courseWare.type_work == null ){
                this.messageWarningFn('请绑定课件工种分类！');
                return;
            }
            // if(this.store.courseWare.video == "" || this.store.courseWare.video == null ){
            //     this.messageWarningFn('请上传资料！');
            //     this.pageName = "name2"
            //     return;
            // }
            this.store.setStatus(1);
            this.store.insertCourseware();
            this.store.clearCourseWare();
            this.addCourseware = false;
        }
        cancel():any {
            this.store.clearCourseWare();
            this.addCourseware = false;
        }
        okUp() : any{
            this.store.setTeachingMethod("现场培训");
            if(this.store.courseWare.title == "" || this.store.courseWare.title == null ){
                this.messageWarningFn('请输入课件名称！');
                return;
            }
            if(this.store.courseWare.course == "" || this.store.courseWare.course == null ){
                this.messageWarningFn('请选择课程！');
                return;
            }
            if(this.store.courseWare.total_hours == "" || this.store.courseWare.total_hours == null ){
                this.messageWarningFn('请输入总课时！');
                return;
            }
            if(this.store.courseWare.type_work == "" || this.store.courseWare.type_work == null ){
                this.messageWarningFn('请绑定课件工种分类！');
                return;
            }
            this.store.setStatus(2);
            this.store.insertCourseware();
            this.store.clearCourseWare();
            this.addUpCourseware = false;
        }
        cancelUp():any {
            this.store.clearCourseWare();
            this.addUpCourseware = false;
        }

        okEdit() : any{
            if(this.store.courseWareEdit.title == "" || this.store.courseWareEdit.title == null ){
                this.messageWarningFn('请输入课件名称！');
                return;
            }
            if(this.store.courseWareEdit.course == "" || this.store.courseWareEdit.course == null ){
                this.messageWarningFn('请选择课程！');
                return;
            }
            if(this.store.courseWareEdit.total_hours == "" || this.store.courseWareEdit.total_hours == null ){
                this.messageWarningFn('请输入总课时！');
                return;
            }
            if(this.store.courseWareEdit.type_work == "" || this.store.courseWareEdit.type_work == null ){
                this.messageWarningFn('请绑定课件工种分类！');
                return;
            }
            // if(this.store.courseWare.video == "" || this.store.courseWare.video == null ){
            //     this.messageWarningFn('请上传资料！');
            //     this.pageName = "name2"
            //     return;
            // }
            this.store.updateCourseware();
            this.updateCourseware = false;
        }
        cancelEdit():any {
            this.updateCourseware = false;
        }

        okDel() : any{
            this.store.setId(this.id);
            this.store.deleteCourseware();
            this.deleteCourseware = false;
        }
        cancelDel():any {
            this.deleteCourseware = false;
        }
        getTeacher(){
            return this.store.teacherList;
        }
        okAdd() : any{

            this.store.setState("待学习");
            this.store.setCStatus(1);
            if(this.singleUser==true){
                this.store.setPeoples(this.store.peoples.length);
                for(let i = 0; i< this.store.peoples.length;i++){
                    var itemTrue = {};
                    itemTrue['archives_id'] = this.store.peoples[i].eafId;
                    // itemTrue['cultivate_id'] = this.store.cultivate.course_id;
                    this.store.setCultivateArchivesList(itemTrue);
                }
            }else {
                this.store.setPeoples(this.store.checkeds.length);
                for(let i = 0; i< this.store.checkeds.length;i++){
                    var itemTrue = {};
                    itemTrue['archives_id'] = this.store.checkeds[i].id;
                    this.store.setCultivateArchivesList(itemTrue);
                }
            }
            this.store.insertCultivate();
            this.addCultivate = false;
        }
        cancelAdd():any {
            this.addCultivate = false;
        }
        okUpAdd() : any{
            this.store.setPeoples(this.store.checkeds.length);
            this.store.setState("待学习");
            this.store.setCStatus(2);
            // for(let i = 0; i< this.store.checkeds.length;i++){
            //     var itemTrue = {};
            //     itemTrue['archives_id'] = this.store.checkeds[i].id;
            //     itemTrue['cultivate_id'] = this.store.cultivate.course_id;
            //     this.store.setCultivateArchivesList(itemTrue);
            // }
            this.store.insertUpCultivate();
            this.addUpCultivate = false;
        }
        cancelUpAdd():any {
            this.addUpCultivate = false;
        }

        offChecked(id): boolean {
            if(!id) return;
            if(this.store.checkeds.findIndex(x => x.id == id) > -1){
                return false;
            }else {
                return true;
            }
        }
        // 单选
        handleSelectRow(selection, row) {
            var itemTrue = {};
            itemTrue['id'] = row.eafId;
            itemTrue['name'] = row.eafName;
            itemTrue['photo'] = row.cwrPhoto;
            this.checkAllGroup.push(itemTrue);
        }
        handleSelectRowCancel(selection, row){
            for(let i = 0;i < this.store.peoples.length;i++) {
                if(this.store.peoples.filter(a => a.eafId == row.eafId ).length > 0){
                    this.$set(this.store.peoples[i], '_checked', false)
                }
            }
            let index =  this.checkAllGroup.findIndex(x => x.id == row.eafId);
            this.checkAllGroup.splice(index, 1);

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
        }
        handleSelectAllCancel(selection){
            for(let i = 0;i < this.store.peoples.length;i++) {
                if(this.checkAllGroup.findIndex(x => x.id == this.store.peoples[i].eafId) > -1){
                    let index =  this.checkAllGroup.findIndex(x => x.id == this.store.peoples[i].eafId);
                    this.$set(this.store.peoples[i], '_checked', false);
                    this.checkAllGroup.splice(index, 1);
                }
            }
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
                    this.$set(this.store.peoples[i], '_disabled', true)
                    this.$set(this.store.peoples[i], '_checked', true)
                }else {
                    this.$set(this.store.peoples[i], '_checked', false)
                }
            }
        }
        toggle(name){
            if(name=="线上培训"){
                this.store.setSelectStatus(1);
                this.store.search();
            }else {
                this.store.setSelectStatus(2);
                this.store.search();
            }
        }
        private options!: any;
        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                { value: '在场', key: 1 },
                { value: '离场', key: 2 }
            ];
            return this.options;
        }

        getType(){
            return this.store.projectType.filter(x => x.category === "工种");
        }
        getCType(){
            return this.store.projectType.filter(x => x.category === "课程类型");
        }
        change(name){
            this.id= name.split('_')[1];
            if(name.split('_')[0] == 'edit') {
                this.store.setEditId(this.id);
                this.store.searchInfo();
                this.updateCourseware = true;
            }else {
                this.deleteCourseware = true;
            }
        }
        viewData(id,title) {
            this.addCultivate=!this.addCultivate;
            this.store.setCourseId(id);
            this.store.setCourseName(title);
            this.onTitle = title;
            this.store.searchPeople();
        }
        viewUpData(id,title) {
            this.addUpCultivate=!this.addUpCultivate;
            this.store.getTeacherList();
            this.store.setCourseId(id);
            this.store.setCourseName(title)
            this.onUpTitle = title;
        }
        handleSuccessVideo (res, file) {
            if(res.file.split('.')[1] == 'ppt' || res.file.split('.')[1] == 'pptx'){
                this.store.setPPtPages(res.pageCount);
            }
            this.store.setVideo(res.file);
        }
        handleFormatError (file) {
            let alert: any = Message;
            alert.warning(file.name + ' 文件格式错误！请上传ogg、mp4、WebM、ppt、pptx格式文件！');
        }
        handleFormatPictrueError (file) {
            let alert: any = Message;
            alert.warning(file.name + ' 文件格式错误！请上传jpg、jpeg、png格式文件！');
        }
        handleSuccessPicture (res, file) {
            this.store.setCoverPicture(res.file);
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
        onPageSizeInChange(pageSize){
            this.store.setInPageSize(pageSize);
            this.store.setInPageIndex(1);
            this.onPageIndexInChange(1);
        }
        onPageIndexInChange(pageIndex){
            this.store.setInPageIndex(pageIndex);
            this.store.searchPeople();
        }

        set pageTotal(data:number){
            this.store.setPageToatl(data);
        }
        get pageTotal():number{
            return this.store.pageTotal;
        }

        set pageInTotal(data:number){
            this.store.setPageToatl(data);
        }
        get pageInTotal():number{
            return this.store.pageInTotal;
        }


        set selectTypeWork(data:string){
            this.store.setSelectTypeWork(data);
        }
        get selectTypeWork():string{
            return this.store.selectTypeWork;
        }

        set selectTitle(data:string){
            this.store.setSelectTitle(data);
        }
        get selectTitle():string{
            return this.store.selectTitle;
        }

        set status(data:number){
            this.store.setStatus(data);
        }
        get status():number{
            return this.store.courseWare.status;
        }

        set title(data:string){
            this.store.setTitle(data);
        }
        get title():string{
            return this.store.courseWare.title;
        }

        set course(data:string){
            this.store.setCourse(data);
        }
        get course():string{
            return this.store.courseWare.course;
        }

        set totalHours(data:string){
            this.store.setTotalHours(data);
        }
        get totalHours():string{
            return this.store.courseWare.total_hours;
        }

        set teachingMethod(data:string){
            this.store.setTeachingMethod(data);
        }
        get teachingMethod():string{
            return this.store.courseWare.teaching_method;
        }

        set whether(data:string){
            this.store.setWhether(data);
        }
        get whether():string{
            return this.store.courseWare.whether;
        }

        set typeWork(data:string){
            this.store.setTypeWork(data);
        }
        get typeWork():string{
            if(!this.store.courseWareEdit.type_work) {
                return '';
            }
            return this.store.courseWareEdit.type_work.toString().split(",");
        }

        set describe(data:string){
            this.store.setDescribe(data);
        }
        get describe():string{
            return this.store.courseWare.describe;
        }

        set particulars(data:string){
            this.store.setParticulars(data);
        }
        get particulars():string{
            return this.store.courseWare.particulars;
        }

        set editId(data:number){
            this.store.setEditId(data);
        }
        get editId():number{
            return this.store.courseWareEdit.id;
        }

        set editTitle(data:string){
            this.store.setEditTitle(data);
        }
        get editTitle():string{
            return this.store.courseWareEdit.title;
        }

        set editCourse(data:string){
            this.store.setEditCourse(data);
        }
        get editCourse():string{
            return this.store.courseWareEdit.course;
        }

        set editTotalHours(data:string){
            this.store.setEditTotalHours(data);
        }
        get editTotalHours():string{
            return this.store.courseWareEdit.total_hours;
        }

        set editTeachingMethod(data:string){
            this.store.setEditTeachingMethod("录播");
        }
        get editTeachingMethod():string{
            return this.store.courseWareEdit.teaching_method;
        }

        set editWhether(data:string){
            this.store.setEditWhether("是");
        }
        get editWhether():string{
            return this.store.courseWareEdit.whether;
        }

        set editTypeWork(data:string){
            this.store.setEditTypeWork(data);
        }
        get editTypeWork():string{
            if(!this.store.courseWareEdit.type_work) {
                return '';
            }
            return this.store.courseWareEdit.type_work.toString().split(",");
        }

        set editDescribe(data:string){
            this.store.setEditDescribe(data);
        }
        get editDescribe():string{
            return this.store.courseWareEdit.describe;
        }

        set editVideo(data:string){
            this.store.setEditVideo(data);
        }
        get editVideo():string{
            return this.store.courseWareEdit.video;
        }

        set editParticulars(data:string){
            this.store.setEditParticulars(data);
        }
        get editParticulars():string{
            return this.store.courseWareEdit.particulars;
        }


        set selectUserName(data:string){
            this.store.setSelectUserName(data);
        }
        get selectUserName():string{
            return this.store.selectUserName;
        }

        set selectLeave(data:string){
            this.store.setSelectLeave(data);
        }
        get selectLeave():string{
            return this.store.selectLeave;
        }
        //-------------------------------------
        set courseId(data:string){
            this.store.setCourseId(data);
        }
        get courseId():string{
            return this.store.cultivate.course_id;
        }

        set startTime(data:string){
            this.store.setStartTime(data);
        }
        get startTime():string{
            return this.store.cultivate.start_time;
        }

        set peoples(data:string){
            this.store.setPeoples(data);
        }
        get peoples():string{
            return this.store.cultivate.peoples;
        }

        set state(data:string){
            this.store.setState(data);
        }
        get state():string{
            return this.store.cultivate.state;
        }

        set mark(data:string){
            this.store.setMark(data);
        }
        get mark():string{
            return this.store.cultivate.mark;
        }
        set coursewareBrief(data:string){
            this.store.setCoursewareBrief(data);
        }
        get coursewareBrief():string{
            return this.store.cultivate.courseware_brief;
        }
        set trainingInstitution(data:string){
            this.store.setTrainingInstitution(data);
        }
        get trainingInstitution():string{
            return this.store.cultivate.trainingInstitution;
        }
        set trainingTeacher(data:string){
            this.store.setTrainingTeacher(data);
        }
        get trainingTeacher():string{
            return this.store.cultivate.trainingTeacher;
        }
        set trainingAddress(data:string){
            this.store.setTrainingAddress(data);
        }
        get trainingAddress():string{
            return this.store.cultivate.trainingAddress;
        }
    }
</script>
<style scoped src="@/styles/courseware.css" />
<template lang="pug" src="@/views/courseware.pug" />
