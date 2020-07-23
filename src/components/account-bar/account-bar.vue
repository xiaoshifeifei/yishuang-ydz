<template>
  <div class="ui-list">
    <ul>
      <uiScroll class="wrapper" ref="scroll" :backcolor="'#f5f5f5'" :uiPull="true" :data="scroll_data">
        <li v-for="(item, index) in list" :key="index" @click="go(item)" id="ulHeight">
          <!-- <i class="iconfont" v-if="icon && item.icon" :class="item.icon" :style="{ backgroundColor: item.color }"></i> -->
          <span>{{ item }}</span>
          <!-- <i class="el-icon-arrow-right go-icon" v-if="item.right_button"></i> -->
          <i class="el-icon-close icon-right" v-if="item != '请使用其他账号登录'" @click.stop="empty(item)"></i>
        </li>
      </uiScroll>
    </ul>
  </div>
</template>
<script>
import uiScroll from '../scroll-bar/scroll-bar'
import YsConfigJs from '../../dora/ys.config'
export default {
  components: {
    uiScroll,
  },
  props: {
    scroll_data: true,
    list: {
      type: Array,
      default: ['请使用其他账号登陆'],
    },
    icon: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // if (YsConfigJs.get_userHistory().slice(0, 3).length != 0) {
    //   this.$refs.scroll.$el.style.height = document.getElementById('ulHeight').offsetHeight + 'px'
    // }
  },
  methods: {
    go(path) {
      if (path == '请使用其他账号登录') {
        this.$emit('accountParams', '')
      } else {
        this.$emit('accountParams', path)
      }
    },
    empty(items) {
      const aaa = YsConfigJs.get_userHistory()
        .slice(0, 3)
        .filter((item) => {
          return item != items
        })
      YsConfigJs.setCache('userHistory', aaa)
      this.$emit('openParams', 'down')
    },
  },
}
</script>
<style lang="less" scoped>
@import '../../assets/less/common.less';
.ui-list {
  position: relative;
  .wrapper {
    overflow: hidden;
  }
  li {
    height: 3.125rem;
    line-height: 3.125rem;
    position: relative;
    display: block;
    border-bottom: 0.05rem solid rgb(200, 200, 200);
    .iconfont,
    span,
    .go-icon {
      vertical-align: top;
    }
    span {
      margin-left: 0.5rem;
    }
    .iconfont {
      padding: 0.12rem;
      border-radius: 100px;
      color: white;
      font-weight: 500;
      font-size: 1.2rem;
      overflow: hidden;
    }
    .icon-right {
      position: absolute;
      right: 0.9375rem;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
  li:last-child {
    border-bottom: none;
  }
  .go-icon {
    position: absolute;
    right: 0.8rem;
    top: 1.4rem;
    width: 0.6rem;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 1.5rem;
  }
}
</style>
