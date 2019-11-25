
import {Message} from "iview";

const service = {
    warning: (e)=>{
        console.log(e)
        let alert: any = Message;
        if(!e) {
            alert.warning('未知错误！')
            return
        }

        if(e.response && e.response.data && e.response.data.message) {
            alert.warning(e.response.data.message)
            return
        }

        if(!e.message) {
            return;
        }

        alert.warning(e.message || e)
    },

    error: (e)=>{
        console.log(e)
        let alert: any = Message;
        if(!e) {
            alert.error('未知错误！')
            return
        }

        if(e.response && e.response.data && e.response.data.message) {
            alert.error(e.response.data.message)
            return
        }

        if(!e.message) {
            return;
        }

        alert.error(e.message || e)
    }
};

export default service;
