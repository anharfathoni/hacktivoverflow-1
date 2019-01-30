<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'answer',
  watch: {
    $route(){
      console.log(this.$route.path)
    }
  }
}
</script>

