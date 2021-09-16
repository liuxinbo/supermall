<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
      @tabClick="tabClick"
      ref="tabControl1"
      :titles="['流行', '新款', '精选']"
      class="tab-control1"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        @tabClick="tabClick"
        ref="tabControl2"
        :titles="['流行', '新款', '精选']"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- vue2组件不能直接监听点击原生事件需要加@click.native修饰符，vue3组件可以直接监听点击 -->
    <back-top @click="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //3.监听item中图片加载完成
    //防抖函数
    const refresh = debounce(this.$refs.scroll.refresh, 50);

    this.$bus.$on("itemImageLoad", () => {
      //执行频率有点高
      refresh();
    });
  },
  methods: {
    //事件监听相关的
    tabClick(index) {
      //console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //需要将状态保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      //console.log(position)
      // position.y > 1000
      //判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      //判断tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    //上拉加载更多
    loadMore() {
      //console.log("上拉加载更多");
      this.getHomeGoods(this.currentType);
      //刷新可以一直下拉，不会出现下拉不动问题
      //this.$refs.scroll.scroll.refresh()
    },

    swiperImageLoad() {
      //获取tabControl的offsetTop
      //所有组件都有一个属性$el:用于获取组件中的元素
      //console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    //防抖函数
    //func函数名称，delay需要等多久
    // debounce(func,delay){
    //   let timer = null
    //   return function(...args){
    //     //判断timer有没有值，如果有值清除掉
    //     if (timer) clearTimeout(timer)
    //     //setTimeout异步，下次
    //     timer = setTimeout(() => {
    //       func.apply(this,args)
    //     }, delay);
    //   }
    // },

    // 网络请求相关的
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        //将数组塞入数组
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成了上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  height: calc(100% - 98px);
  overflow: hidden;
}

/* .content {
  height: calc(100% - 98px);
  overflow: hidden;
  margin-top: 44px;
} */
.tab-control {
  position: relative;
  z-index: 9;
}
</style>