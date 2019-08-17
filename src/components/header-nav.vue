<template>
  <header style="height: 48px">
    <div class="logo" :style="'width: ' + currentWidth + 'px'">
      <span class="text">SAdmin</span>
    </div>

    <nav :style="'margin-left: ' + currentWidth + 'px'" :class="isScrollDown ? 'shadow' : ''">
      <a-menu v-model="current" mode="horizontal">
        <a-menu-item key="basic">
          <a-icon type="home" />Basic
        </a-menu-item>

        <a-sub-menu>
          <span slot="title" class="submenu-title-wrapper">
            <a-icon type="setting" />Navigation Three - Submenu
          </span>
          <a-menu-item-group title="Item 1">
            <a-menu-item key="setting:1">Option 1</a-menu-item>
            <a-menu-item key="setting:2">Option 2</a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group title="Item 2">
            <a-menu-item key="setting:3">Option 3</a-menu-item>
            <a-menu-item key="setting:4">Option 4</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu style="float: right">
          <span slot="title" class="submenu-title-wrapper">
            <a-icon type="setting" />user
          </span>
          <a-menu-item-group title="user">
            <a-menu-item key="setting:3">Option 3</a-menu-item>
            <a-menu-item key="setting:4">Option 4</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
      </a-menu>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      //   currentWidth: "",
      current: ["basic"]
    };
  },
  props: {
    currentWidth: {
      type: Number
    },
    isScrollDown: {
      type: Boolean
    }
  }
};
</script>

<style scoped>
.logo {
  position: fixed;
  padding: 0.5rem;
  text-align: center;
  user-select: none;
}
.logo .text {
  font-size: 1.5rem;
}
.shadow {
  box-shadow: -6px 11.2px 59px -22px;
}
</style>