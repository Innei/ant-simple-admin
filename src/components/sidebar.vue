<template>
  <aside>
    <a-menu
      @click="handleClick"
      class="menu"
      :defaultSelectedKeys="defaultSelectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :inlineCollapsed="collapsed"
      :style="'width: ' + currentWidth + 'px'"
      router
    >
      <a-sub-menu key="basic" @titleClick="titleClick">
        <span slot="title">
          <a-icon type="home" />
          <span>Basic</span>
        </span>
        <a-menu-item key="dashboard">Dashboard</a-menu-item>
        <a-menu-item key="views">Views</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2" @titleClick="titleClick">
        <span slot="title">
          <a-icon type="appstore" />
          <span>Navigation Two</span>
        </span>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <span slot="title">
          <a-icon type="setting" />
          <span>Navigation Three</span>
        </span>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-menu-item key="11">Option 11</a-menu-item>
        <a-menu-item key="12">Option 12</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      openKeys: ["basic"],
      defaultSelectedKeys: ["basic", "dashboard"]
    };
  },
  props: {
    currentWidth: {
      // 当前导航栏的宽度 // TODO 响应式调整
      type: Number,
      default: 200
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(e) {
      console.log("click", e);
      const route = e.keyPath.reverse().join("/");
      this.$router.push("/" + route);
    },
    titleClick(e) {
      console.log("titleClick", e);
    },
    updateCurrentNavWidth() {
      this.$route.params.currentWidth = this.currentWidth;
    },
    updateSelectKeys(val = this.$route) {
      const fullPath = val.fullPath;
      const arr = fullPath.split("/");
      if (!arr[0]) {
        arr.shift();
      }
      // 两级菜单

      this.openKeys = [String(arr[0])];
      this.defaultSelectedKeys = [String(arr[1])];
    }
  },
  created() {
    this.updateCurrentNavWidth();
    this.updateSelectKeys();
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
    currentWidth(val) {
      console.log(this.currentWidth);
    },
    $route(val) {
      this.updateSelectKeys(val);
    }
  }
};
</script>

<style scoped>
.menu {
  position: fixed;
  height: 100vh;
  overflow: auto;
}
.menu::-webkit-scrollbar {
  height: 0px;
}
.ant-menu {
  border-top: 0.5px solid #e8e8e8;
}
</style>