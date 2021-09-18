<template>
  <div class="tab-bar-item" @click="itemCLick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div> 
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'#FF6978'
    }
  },
  data(){
    return{
      //isActive:true,
    }
  },
  computed: {
    isActive(){
      // home -> item(/home) = true
      // home -> item(/category) = true
      // home -> item(/cart) = true
      // home -> item(/profile) = true
      return this.$route.path.indexOf(this.path) !== -1
    },
    //通过计算属性改变
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemCLick(){
      //console.log("itemCLick");
      this.$router.replace(this.path)
    }
  } 
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

/* .active {
  color: #FF6978;
} */
</style>