<template>
  <div id="app">
   <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
 
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
      return{
        isRouterAlive:true
      }
  },
  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(()=>{
        this.isRouterAlive=true
      })
    }
  }
}
</script>

<style>

</style>
