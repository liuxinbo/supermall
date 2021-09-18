<!--  -->
<template>
  <div class="goods-item" @click='itemClick'>
    <img :src="goodsItem.show.img" alt="" @load="imageLoad"/>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods:{
    imageLoad(){
     // console.log('img');
      this.$bus.$emit('itemImageLoad');
      //console.log(this.$bus)
    },
    itemClick(){
      //console.log("跳转到详情页面")
      this.$router.push('/detail/' + this.goodsItem.iid)
     
    }
  },
  data() {
    return {};
  },
};
</script>

<style  scoped>
.goods-item {
  padding-bottom: 12.5vw;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  position: absolute;
  bottom: 1.5625vw;
  left: 0;
  right: 0;
  font-size: 3.75vw;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.9375vw;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect{
  position: relative;
}

.goods-info .collect:before {
  content: "";
  position: absolute;
  left: -16px;
  width: 15px;
  height: 15px;
  background: url(../../../assets/img/common/collect.svg) 0 0/15px 15px;
}
</style>
