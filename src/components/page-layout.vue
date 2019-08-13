<template>
  <a-layout>
    <breadcrumb />
    <section class="title">
      <h2>
        <slot name="title"></slot>
      </h2>
    </section>

    <section class="main">
      <div class="basic">
        <slot name="basic"></slot>
      </div>
      <slot></slot>
    </section>
  </a-layout>
</template>

<script>
export default {
  components: {
    breadcrumb: () => import("./breadcrumb")
  }
};
</script>

<style>
.title {
  margin-bottom: 1rem;
}
.main {
  margin-left: 1rem;
}

.basic {
  color: #999;
  font-size: 1.15em;
  margin-bottom: 3rem;
}
</style>