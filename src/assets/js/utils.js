import { Loading, Message } from 'element-ui';
import Vuex from '../../store/index'

import api from '@/api/index.js'
/**
 * 全屏控制
*/
class ScreenController {
    constructor() {
        this.element = document.documentElement;
    }
    //打开全屏
    requestFullScreen() {
        if (this.element.requestFullScreen) {
            this.element.requestFullScreen();
        } else if (this.element.webkitRequestFullScreen) {
            this.element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
            this.element.mozRequestFullScreen();
        }
    }
    //退出全屏
    exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

class DateFormat {
    getDate(value) {
        let date = new Date(value);
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
        return [year, month, day].join('-')
    }
    getDetailDate(value) {
        let date = new Date(value);
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        hour = hour < 10 ? '0' + hour : hour;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;
        return `${year}-${month}-${day} ${hour}:${min}:${sec}`
    }
    getDateArr(value) {
        let date = new Date(value);
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        hour = hour < 10 ? '0' + hour : hour;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;

        return [year, month, day, hour, min, sec]
    }
}
//加载
class Load {
    constructor() {
        this.loading = null
    }
    start() {
        this.loading = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
    }
    end() {
        this.loading.close()
    }
}

function Auth(code) {
    let noMenus = Vuex.getters.getNoMenus;
    if(noMenus) {
        let index = noMenus.findIndex(x => x === code);
        return index > -1;
    } else {
        return false;
    }
    
}

function isPhone(phone) {
    const reg = /^1[3456789]\d{9}$/
    return reg.test(phone)
}


let screen = new ScreenController();
let format = new DateFormat();
let loading = new Load();
export {
    screen,
    format,
    loading,
    Auth,
    isPhone
}