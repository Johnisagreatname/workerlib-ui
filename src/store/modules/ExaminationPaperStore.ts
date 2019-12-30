import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "ExaminationPaperStore",
    store,
})
export default class ExaminationPaperStore extends VuexModule {
    public paper? : Array<any> = [
        {title:'钢筋工前知识培训试卷',questionNumber:'10',grade:'85',img:'http'},
        {title:'电焊工前知识培训试卷',questionNumber:'15',grade:'90',img:'http'},
        {title:'水泥工前知识培训试卷',questionNumber:'12',grade:'80',img:'http'}
    ];
}
