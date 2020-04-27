import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import {Message} from "iview";
import MessageUtils from "../../common/MessageUtils";
import Echart from 'echarts';
import router from "../../router/.invoke/router";
import {AxiosRequestConfig} from "axios";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "SpectacularsStore",
    store,
})
export default class SpectacularsStore extends VuexModule {



    constructor(e){
        super(e);

    }

}
