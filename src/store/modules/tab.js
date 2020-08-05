import { Message } from 'element-ui'
let tabs = sessionStorage.getItem('tabs');

function addRefresh(data) {
  data.forEach(item => {
    if(typeof item.refresh === 'undefined') {
      item.refresh = false;
    }
  })
  return data;
}
const state = {
  tabs:  tabs ? JSON.parse(tabs) : [],
  activeIndex: '0'
}

const mutations = {
  setTabs(state, tabs) {
    tabs = addRefresh(tabs);
    state.tabs = tabs;
    sessionStorage.setItem('tabs', JSON.stringify(tabs));
  },
  pushToTabs(state, tab) {
    if(state.tabs.length === 20) {
      Message.warning("打开的tab不能超过20个，请先关闭其他tab")
      return;
    }
    let item = state.tabs.find(x => {
      if(x.query && x.query.id && tab.query && tab.query.id) {
        return x.query.id == tab.query.id && x.component == tab.component
      } else {
        return x.component == tab.component
      }
      
    });
    let id1 = item && item.query && item.query.id;
    let id2 = tab && tab.query && tab.query.id;
    if(!item) {
      state.tabs.push(tab)
    } else if(id1 != id2) {
      state.tabs.push(tab)
    } else if(id1 && id2 && id1 == id2) {
      let index = state.tabs.findIndex(x => x.query.id == tab.query.id);
      state.activeIndex = String(index);
      state[index] = tab;
    } else if(!id1 && !id2) {
      let index = state.tabs.findIndex(x => x.query.id == tab.query.id && x.component == tab.component);
      state.activeIndex = String(index);
    }
    state.tabs = addRefresh(state.tabs);
    sessionStorage.setItem('tabs', JSON.stringify(state.tabs));
  },
  setActiveIndex(state, index) {
    state.activeIndex = index;
  }
}

const getters = {
  getTabs(state) {
    return state.tabs;
  },
  getActiveIndex(state) {
    return state.activeIndex;
  }
}

export default {
  state,
  mutations,
  getters
}