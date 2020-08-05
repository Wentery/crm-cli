<template>
  <div class="the-header">
    <el-button-group>
      <el-button size="mini" icon="el-icon-s-unfold" v-if="isCollapse" @click="isCollapse=false"></el-button>
      <el-button size="mini" icon="el-icon-s-fold" v-else @click="isCollapse=true"></el-button>
      <el-button size="mini" icon="el-icon-refresh-right" @click="refreshTab"></el-button>
    </el-button-group>
    <div class="personal">
      <i
        :class="!isFullScreen ? 'el-icon-full-screen' : 'el-icon-close'"
        class="toggle"
        @click="toggleScreen"
      ></i>
      <el-dropdown hover size="small" @command="handleSelect">
        <div class="avatar-nickname">
          <img class="avatar" alt />
          <span class="nickname">{{ user.name }}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personal">个人中心</el-dropdown-item>
          <el-dropdown-item command="change">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { screen } from '@/assets/js/utils'
export default {
  name: 'TheHeader',
  data() {
    return {
      isCollapse: false,
      isFullScreen: false,
      user: {
        name: ''
      }
    }
  },
  watch: {
    isCollapse() {
      this.$emit('on-collapse', this.isCollapse)
    }
  },
  methods: {
    refreshTab() {
      this.$emit('on-refresh')
    },
    toggleScreen() {
      //切换全屏状态
      if(this.isFullScreen) {
        screen.exitFullScreen();
        this.isFullScreen = false;
      } else {
        screen.requestFullScreen()
        this.isFullScreen = true;
      }
    },
    handleSelect() {}
  }
}
</script>

<style lang="scss" scoped>
.the-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>