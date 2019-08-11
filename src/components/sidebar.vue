<template>
  <aside>
    <a-menu
      @click="handleClick"
      class="menu"
      :defaultSelectedKeys="['1']"
      :openKeys.sync="openKeys"
      mode="inline"
      :inlineCollapsed="collapsed"
      :style="'width: ' + currentWidth + 'px'"
    >
      <a-sub-menu key="sub1" @titleClick="titleClick">
        <span slot="title">
          <a-icon type="mail" />
          <span>基本信息</span>
        </span>
        <a-menu-item-group key="g1">
          <a-menu-item key="1">Option 1</a-menu-item>
          <a-menu-item key="2">Option 2</a-menu-item>
        </a-menu-item-group>
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
      openKeys: ["sub1"]
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
    },
    titleClick(e) {
      console.log("titleClick", e);
    },
    updateCurrentNavWidth() {
      this.$route.params.currentWidth = this.currentWidth;
    }
  },
  created() {
    this.updateCurrentNavWidth();
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
    currentWidth(val) {
      console.log(this.currentWidth)
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
</style>