import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "CommentsStore",
    store,
})
export default class CommentsStore extends VuexModule {
    public comments? : Array<any> = [
        {name:'裴灏杰',valueDisabled:'4',valueCustomText:'4.6',goodReputation:'16',mediumReview:'5',negativeComment :'0',project:'深圳市创新科技项目',typeWork:'市政工' },
        {name:'范佳超',valueDisabled:'4',valueCustomText:'4.5',goodReputation:'15',mediumReview:'3',negativeComment :'0',project:'深圳市创新科技项目',typeWork:'市政工' },
        {name:'林陆锐',valueDisabled:'5',valueCustomText:'5.5',goodReputation:'18',mediumReview:'2',negativeComment :'0',project:'深圳市创新科技项目',typeWork:'市政工' },
        {name:'陈吕',valueDisabled:'4',valueCustomText:'4.9',goodReputation:'17',mediumReview:'3',negativeComment :'0',project:'深圳市创新科技项目',typeWork:'市政工' },
        {name:'吴之甫',valueDisabled:'4',valueCustomText:'4.6',goodReputation:'17',mediumReview:'3',negativeComment :'0',project:'深圳市创新科技项目',typeWork:'市政工' }
    ];

}
