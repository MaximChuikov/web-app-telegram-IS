<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>

  export default{
    data() {
    return {
      depID: Number,
    }
  },
  methods: {
    beforeMount(){
    this.depID = this.$route.query.id;
 },
  }
  }
</script>

<style scoped>
</style>