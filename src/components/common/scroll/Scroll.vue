<!--  -->
<template>
  <!-- ref 如果绑定在组件中，那么通过this.$refs.refname获取到的是一个组件对象 -->
  <!-- ref 如果绑定在组件中，那么通过this.$refs.refname获取到的是一个元素对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //  console.log(BScroll);
    // console.log(this.$refs.wrapper);
    // console.log(document.querySelector(".wrapper"));
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    //2.监听滚动位置:2为手指滚动，3为任何滚动
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        //console.log(position);
        this.$emit("scroll", position);
      });
    }

    //3.监听上拉事件
    if (this.pullUpLoad) {
      //监听到滚动到底部
      this.scroll.on("pullingUp", () => {
        // console.log("上拉加载更多");
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      //先判断this.scroll有没有值
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      //console.log('-------');
      this.scroll && this.scroll.refresh();
    },
  },
};
</script>

<style  scoped>
/* .wrapper {
    overflow: hidden;
  } */
</style>
