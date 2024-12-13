<template>
  <transition :name="$route.meta.transition || 'fade'">
    <router-view />
  </transition>
</template>

<script>
export default {
  name: "App",
};
</script>
