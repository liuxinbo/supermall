<!--  -->
<template>
  <div id="detail">
    <!-- 导航 -->
    <detail-nav-bar />
    <detail-swiper :top-images="topImages" />
    <detail-base-info :goods="goods" />
    <detail-shop-info :shop="shop"/>
  </div>
</template>

<script>
import DetailNavBar from "./detailComps/DetailNavBar";
import DetailSwiper from "./detailComps/DetailSwiper";
import DetailBaseInfo from "./detailComps/DetailBaseInfo";
import DetailShopInfo from './detailComps/DetailShopInfo';

import { getDetail, Goods,Shop } from "network/detail";


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: null,
      shop:{},
    };
  },
  created() {
    //1.保存存入的iid
    //console.log(this.$route.params);
    this.iid = this.$route.params.iid;

    //2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      //1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //创建店铺信息对象
      this.shop = new Shop(
        data.shopInfo
      )
    });
  },
};
</script>

<style  scoped>
</style>
