<script lang="ts">
    import "@/assets/css/common.css";
    import IndexVideoStore from '../../../store/modules/IndexVideoStore';
    import { Component, Vue, Prop, Model} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
    import {Message} from "iview";
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
    export default class Grade extends Vue {
        rowClassName (row, index) : string {
            if(index == 0) {
                return 'table-header'
            }
            return '';
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
        private store: any;
        public addVideo: boolean;
        constructor() {
            super();
            this.store = getModule(IndexVideoStore);
            this.addVideo = false;
        }

        mounted() {
            this.store.searchVideoInfo();
        }
        addVideos():any{
            this.addVideo = !this.addVideo;
        }
        okUpload() : any{
            this.store.insertVideoInfo();
            this.addVideo = false;
        }
        cancelUpload():any {
            this.addVideo = false;
        }
        handleSuccessVideo (res, file) {
            this.store.setInsertVideo(res.file);
        }
        handleFormatError (file) {
            let alert: any = Message;
            alert.warning(file.name + ' 文件格式错误！ogg、mp4、WebM格式文件！');
        }
        handleFormatPictrueError (file) {
            let alert: any = Message;
            alert.warning(file.name + ' 文件格式错误！请上传jpg、jpeg、png格式文件！');
        }
        handleSuccessPicture (res, file) {
            let item = {};
            item["file"] = res.file;
            item["type"] = "photo"
            this.store.setInsertPhoto(item);
            console.log(this.store.insertCultivateVideo);
        }
        handleUpload(file){
            if(this.store.indexVideo.filter(a =>a.type == 'video').length>0){
                this.messageWarningFn('视频已存在，请删除！');
                return;
            }
        }
        onDelete(id){
            this.store.setDeleteId(id);
            this.store.delete();
        }

        set okVideo(data:string){
            if(data) {
                if (data == "是") {
                    //视频
                    this.store.setIsOk(1);
                }else {
                    //图片
                    this.store.setIsOk(2);
                }
            }
            this.store.setOkVideo(data);
        }
        get okVideo():string{
            return this.store.okVideo;
        }
        getVideo():any{
            return this.store.indexVideo.filter(a =>a.type == 'video');
        }
        getPhoto():any{
            return this.store.indexVideo.filter(a =>a.type == 'photo');
        }
    }
</script>
<style scoped src="@/styles/indexVideo.css" />
<template lang="pug" src="@/views/indexVideo.pug" />
