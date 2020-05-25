<template>
  <div class="category-box">
    <div class="category-tab" ref="categoryTab">
      <ul
        class="rootList"
        @touchstart="tabTouch"
        @touchmove="touchMove"
        @touchend="touchEnd"
        ref="tab"
      >
        <li v-for="(item,index) in navList" :key="index" :class="{current:index==0}"
        @click="tab"
      :id="item.id"
      :name="index"
      >{{item.c1name}}</li>
      </ul>
    </div>
    <div
      class="branchList-content"
      @touchstart="touch"
      @touchmove="move"
      @touchend="end"
      ref="cate"
    >
      <div class="category" v-for="(item,index) in linkLists" :key="index">
        <h4 class="header">
          <slot name="header">{{item.class2Title}}</slot>
        </h4>
        <div class="content">
          <ul>
            <router-link
              tag="li"
              :to="'/main/category/'+item_.id"
              v-for="item_ in item.class3"
              :key="item_.id"
            >
              <img :src="item_.poster" alt />
              <span>{{ item_.c3name }}</span>
            </router-link>
          </ul>
        </div>
      </div>

      
    </div>
  </div>
</template>


<script>
import Category from "../../../components/content/Category";

export default {
  name: "CategoryBody",
  data() {
    return {
      startY: 0,
      starty: 0,
      y: 0,
      Y: 0,
      moveY: 0,
      movey: 0,
      minTop: 0,
      min: 0,
      max: 0,
      maxTop: 0,
      minBouceTop: 0,
      minBouce: 0,
      maxBouceTop: 0,
      maxBouce: 0,
      i: 0,
      navList: [],
      linkLists: [
        { id: 1, name: "手机" },
        { id: 2, name: "全面屏手机" },
        { id: 3, name: "游戏手机" },
        { id: 4, name: "充电宝" },
        { id: 5, name: "体温计" },
        { id: 6, name: "中医保健" },
        { id: 7, name: "调节免疫" },
        { id: 8, name: "经管励志" },
        { id: 9, name: "投影机" },
        { id: 10, name: "游戏机" },
        { id: 11, name: "除菌液" }
      ]
    };
  },
  components: {
    category: Category
  },
  mounted() {
    // 请求后端API接口，获取一级分类数据
    this.axios.get("api/getclass").then(response => {
      this.navList = response.data;

      // 获取第一个一级分类ID
      let fid = response.data[0].id

      // this
      let that = this;
      this.axios.get("api/getclass23?id="+fid).then(response => {
      this.linkLists = response.data;
      })
    });
  },
  methods: {
    touch(e) {
      this.starty = e.targetTouches[0].pageY;
    },
    move(e) {
      this.movey = e.targetTouches[0].pageY - this.starty;
      this.min = this.$refs.cate.offsetHeight - this.$refs.branch.offsetHeight;
      this.maxBouce = this.max + 100;
      this.minBouce = this.min - 100;
      if (
        this.Y + this.movey < this.minBouce ||
        this.Y + this.movey > this.maxBouce
      ) {
        return;
      }
      this.$refs.branch.style.transition = "none";
      this.$refs.branch.style.top = this.Y + this.movey + "px";
    },
    end(e) {
      if (this.Y + this.movey < this.min) {
        this.$refs.branch.style.transition = "all .5s";
        this.$refs.branch.style.top = this.min + "px";
        this.Y = this.min;
      } else if (this.Y + this.movey > this.max) {
        this.$refs.branch.style.top = this.max + "px";
        this.$refs.branch.style.transition = "all .5s";
        this.Y = this.max;
      } else {
        this.Y += this.movey;
      }
    },
    tabTouch(e) {
      this.startY = e.targetTouches[0].clientY;
    },
    touchMove(e) {
      this.moveY = e.targetTouches[0].pageY - this.startY;
      this.minTop =
        this.$refs.categoryTab.offsetHeight - this.$refs.tab.offsetHeight;
      this.maxBouceTop = this.maxTop + 160;
      this.minBouceTop = this.minTop - 160;
      //   console.log(this.minTop);
      if (
        this.y + this.moveY < this.minBouceTop ||
        this.y + this.moveY > this.maxBouceTop
      ) {
        return;
      }
      this.$refs.tab.style.transition = "none";
      this.$refs.tab.style.top = this.y + this.moveY + "px";
    },
    touchEnd(e) {
      if (this.y + this.moveY < this.minTop) {
        this.$refs.tab.style.transition = "all .5s";
        this.$refs.tab.style.top = this.minTop + "px";
        this.y = this.minTop;
      } else if (this.y + this.moveY > this.maxTop) {
        this.$refs.tab.style.top = this.maxTop + "px";
        this.$refs.tab.style.transition = "all .5s";
        this.y = this.maxTop;
      } else {
        this.y += this.moveY;
        // console.log(this.y);
      }
    },
    tab(e) {

      // 分类ID
      let id = e.target.getAttribute("id");

      // 当前li索引
      let currentIndex = e.target.getAttribute("name");
      // console.log(currentIndex)
      
      // 样式
      for (let i = 0; i < e.target.parentNode.children.length; i++) {
        if(i == currentIndex){
           e.target.classList.add("current");
        } else {
           e.target.parentNode.children[i].classList.remove("current");
        }
       }
      //  console.log(id)

       // 根据一级分类ID获取二级和三级数据
       if(id){
         this.axios.get("http://localhost:13080/api/getclass23?id="+id).then((response) =>{
           this.linkLists = response.data
         })
       }

      // this.$refs.tab.style.transition = "top .5s";
      // if (
      //   -index * e.target.offsetHeight <
      //   this.$refs.categoryTab.offsetHeight - this.$refs.tab.offsetHeight
      // ) {
      //   this.$refs.tab.style.top =
      //     this.$refs.categoryTab.offsetHeight -
      //     this.$refs.tab.offsetHeight +
      //     "px";
      //   this.y =
      //     this.$refs.categoryTab.offsetHeight - this.$refs.tab.offsetHeight;
      // } else {
      //   this.$refs.tab.style.top = -(index * e.target.offsetHeight) + "px";
      //   this.y = -(index * e.target.offsetHeight);
      // }
    }
  }
};
</script>

<style>
.category-box {
  padding-top: 44px;
}

.rootList {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}

.rootList li.current {
  background-color: #fff;
  color: #ec5052;
}

.category-tab {
  position: relative;
  float: left;
  height: 719px;
  width: 86px;
  background: #f8f8f8;
  overflow: hidden;
}

.rootList li {
  height: 46px;
  line-height: 46px;
  width: 100%;
  text-align: center;
}

.branchList-content {
  position: relative;
  float: right;
  overflow: hidden;
  height: 719px;
  width: 289px;
}

.branchList-content .branchList-div {
  position: absolute;
  right: 0;
  top: 0;
}
</style>