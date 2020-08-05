<template>
  <div class="side-bar">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      id="el-menu-vertical-demo"
      background-color="#2b2d36"
      text-color="#fff"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :unique-opened="uniqueOpened"
    >
      <el-menu-item class="logo-name" disabled>
        <i class="el-icon-help"></i>
        <!-- <img class="logo" src="@/assets/imgs/yuanbao.jpg" alt=""> -->
        <span class="name">CRM</span>
      </el-menu-item>
      <!-- <my-menu></my-menu> -->
      <template v-for="(item, index) in menu">
        <el-submenu v-if="item.name!='开发管理' && item.children" :index="String(index+1)" :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="iitem in item.children"
            :key="iitem.id"
            :index="iitem.url"
          >{{ iitem.name }}</el-menu-item>
        </el-submenu>
        <el-menu-item :key="item.id" :index="item.url" v-else-if="!item.children">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import path from '@/assets/js/path';
export default {
  name: "Menu",
  props: {
    isCollapse: Boolean,
    uniqueOpened: Boolean,
    menu: Array
  },
  // components: {
  //   'my-menu': 'my-menu'
  // },
  data() {
    return {};
  },
  computed: {
    defaultActive() {
      return this.$store.getters.getActivePath;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    findName(data, path) {
      let name = '';
      for(let i = 0; i < data.length; i++) {
        let item = data[i];
        if(item.url === path) {
          name = item.name;
          break;
        } else if(Array.isArray(item.children) && item.children.length > 0) {
          name = this.findName(item.children, path) !== '' ? this.findName(item.children, path) : name;
        }
      }
      return name;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      let url = keyPath[keyPath.length - 1];
      let component = path[url];
      let name = this.findName(this.menu, url);
      this.$store.commit('pushToTabs', {
        label: name,
        component,
        query: {},
        path: ''
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.side-bar {
  user-select: none;
  .logo-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px;
    .logo {
      width: 20px;
      height: 20px;
    }
    .el-icon-s-help {
      font-size: 20px;
      color: #fff;
      margin-right: 10px;
    }
    .name {
      font-size: 18px;
      font-weight: 900;
      color: #f2f2f2;
    }
  }
}
</style>

<style lang="scss">
// @import "@/assets/scss/element-variables.scss";
.side-bar {
  .logo-name {
    i {
      color: #fff !important;
    }
  }
  .is-active {
    // background-color: $--color-primary !important;
    color: #fff !important;
  }
  .el-menu {
    // height: 100vh;
    // box-sizing: border-box;
    .el-submenu {
      .el-menu-item {
        padding-left: 50px !important;
      }
    }
  }
  .el-menu-item.is-disabled {
    cursor: auto !important;
    opacity: 1 !important;
  }
}
</style>
