<template>
  <div class="home">
    <el-container class="outer-container">
      <el-aside :class="{'collapse': isCollapse}">
        <aside-menu 
          :isCollapse="isCollapse"
          :uniqueOpened="uniqueOpened"
          :menu='menu'
          ></aside-menu>
      </el-aside>
      <el-container class="inner-container">
        <el-header>
          <the-header
            @on-collapse="handleIsCollapse"
            @on-refresh="handleRefreshCurrent"></the-header>
        </el-header>
        <el-main class="home-main">
          <el-tabs type="card" 
            @edit="handleTabsEdit" @tab-click="handleTabClick" :value="activeTab">
            <el-tab-pane v-for="(tab, index) in tabs" :name="String(index)" :key="index" :label="tab.label" :closable="index > 0">
              <span slot="label" v-if="index == 0"><i class="el-icon-s-home"></i></span>
              <component :is="tab.component" :query="tab.query" v-if="!tab.refresh"></component>
            </el-tab-pane>
          </el-tabs>
          <div class="tab-bar">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1"><i class="el-icon-refresh-right"></i>刷新当前</el-dropdown-item>
                <el-dropdown-item command="2"><i class="el-icon-circle-close"></i>关闭当前</el-dropdown-item>
                <el-dropdown-item command="3"><i class="el-icon-link"></i>关闭其他</el-dropdown-item>
                <el-dropdown-item command="4"><i class="el-icon-close"></i>关闭全部</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import components from '@/assets/js/components'
export default {
  name: 'Home',
  components: components,
  data() {
    return {
      //aside menu
      isCollapse: false,
      uniqueOpened: true,
      menu: []
    }
  },
  created() {
    this.getMenu();
    // this.getUserInfo();
  },
  computed: {
    tabs() {
      return this.$store.getters.getTabs;
    },
    activeTab() {
      let index = this.$store.getters.getActiveIndex;
      return index;
    }
  },
  watch: {
    tabs() {
      let activeTab = String(this.tabs.length - 1);
      this.$store.commit('setActiveIndex', String(activeTab))
    }
  },
  methods: {
    isLoad(index) {
      return index 
    },
    getMenu() {
      this.$api.getMenuList().then(res => {
        if(res.code === 0) {
          this.menu = res.data[0].menus;
        } else {
          this.$message.error(res.message || res.msg)
        }
      }).catch(rej => {
        console.log(rej)
        this.$message.error(rej.message)
      })
    },
    handleIsCollapse(value) {
      this.isCollapse = value;
    },
    handleRefreshCurrent() {
      console.log('kk')
      let index = this.$store.getters.getActiveIndex;
      let tabs = this.$store.getters.getTabs;
      let item = tabs[index];
      tabs[index].refresh = true;
      this.$store.commit('setTabs', tabs);
      this.$nextTick(() => {
        tabs[index].refresh = false;
        this.$store.commit('setTabs', tabs);
      })
    },
    getUserInfo() {
      this.$api.getUserInfo().then(res => {
        if(res.code === 200) {
          let info = res.data;
          this.$store.commit("setInfo", info)
        } else {
          this.$message.error(res.message || res.msg);
        }
      }).catch(rej => {
        console.log(rej);
      })
    },
    handleTabsEdit(name) {
      if(name === '0') return;
      let tabs = this.$store.getters.getTabs;
      const len = tabs.length;
      tabs.splice(parseInt(name), 1);
      this.$store.commit('setTabs', tabs);
      let activeTab = this.activeTab;
      if(name <= activeTab) {
        activeTab = String(activeTab - 1);
      }
      // this.$nextTick(() => {
        this.$store.commit('setActiveIndex', activeTab);
      // })
    },
    handleTabClick(node) {
      let index = node.index;
      // let tabs = this.$store.getters.getTabs;
      // this.$router.push(tabs[index].path)
      this.$store.commit('setActiveIndex', String(index));
    },
    handleCommand(command) {
      switch(command) {
        case '1': this.refreshCurrent(); break;
        case '2': this.closeCurrent(); break;
        case '3': this.closeOther(); break;
        case '4': this.closeAll(); break;
        default: ''; break;
      }
    },
    refreshCurrent() {
      this.handleRefreshCurrent();
    },
    closeCurrent() {
      let name = this.activeTab;
      this.handleTabsEdit(name);
    },
    closeOther() {
      let activeTab = this.activeTab;
      let tabs = this.tabs;
      this.$store.commit('setTabs', [tabs[0], tabs[activeTab]]);
    },
    closeAll() {
      let activeTab = this.activeTab;
      let tabs = this.tabs;
      this.$store.commit('setTabs', [tabs[0]]);
    }
  }
}
</script>

<style lang="scss">
.home {
  height: 100vh;
  box-sizing: border-box;
  .outer-container {
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    .el-aside {
      width: 220px !important;
      background-color: #2b2d36;
      box-sizing: border-box;
      &.collapse {
        width: auto !important;
      }
      .el-menu {
        border-right: 0 !important;
      }
    }
    .inner-container {
      display: flex;
      flex-direction: column;
      .home-main {
        flex: 1;
        position: relative;
        .tab-bar {
          position: absolute;
          right: 10px;
          top: 20px;
          .el-dropdown-link {
            cursor: pointer;
          }
        }
        > .el-tabs {
          height: 100%;
          display: flex;
          flex-direction: column;
          > .el-tabs__header {
            margin-bottom: 0 !important;
            margin-right: 20px;
          }
          > .el-tabs__content {
            flex: 1;
            margin-top: 10px;
            .el-tab-pane {
              height: 100%;
            }
          }
        }
      }
      .el-header {
        padding: 10px 10px 0 10px;
        height: auto !important;
      }
      .el-main {
        padding: 10px;
      }
    }
  }
}
</style>