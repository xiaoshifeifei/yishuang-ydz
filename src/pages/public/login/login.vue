<template>
  <div id="login">
    <uiTitle :isback="false" :fontcolor="'white'"></uiTitle>
    <h2 class="title">登录</h2>
    <el-form ref="form" class="el-form" v-model="form">
      <div class="ui-input-list">
        <div class="input-name">手机号</div>
        <input
          name="phone"
          type="text"
          id="phone"
          class="phoneWitgh"
          v-model="form.mobile"
          placeholder="请输入手机号"
        /><!-- @blur="check($event,'phone')"-->
        <i class="el-icon-close el-icon" v-if="form.mobile != ''" @click="empty($event, 'mobile')"></i>
        <span v-if="hiddenSpan">
          <i class="el-icon-arrow-down upDown" v-if="downParams" @click="downEmpty('down')"></i>
          <i class="el-icon-arrow-up upDown" v-if="!downParams" @click="downEmpty('up')"></i>
        </span>
      </div>
      <div class="error">{{ error.mobile }}</div>
      <div class="ui-input-list">
        <div class="input-name">密码</div>
        <input name="pwd" type="password" v-model="form.password" placeholder="请输入密码" autocomplete />
        <i class="el-icon-close el-icon" v-if="form.password != ''" @click="empty($event, 'pwd')"></i>
      </div>
      <div class="error">{{ error.password }}</div>
      <div class="error"></div>
      <el-button class="el-button" @click="login()"><span>登录</span></el-button>
      <div class="forget-pwd">
        <router-link to="/register">注册</router-link>
        <div class="long-string"></div>
        <router-link to="/forget-pwd">找回登录密码</router-link>
      </div>
    </el-form>
    <!-- 选择账户 -->
    <div class="footer_selet" v-if="closeParams">
      <div class="account">
        <i class="el-icon-close icon_closes" @click="closeEmpty($event, 'close')"></i>
        选择账户
      </div>
      <div class="account_bottom">
        <uiAccount
          class="ui-list"
          :list="list"
          @accountParams="accountParams"
          @openParams="openParams"
          v-if="list.length != 0"
        ></uiAccount>
      </div>
    </div>
  </div>
</template>
<script>
import YsConfigJs from '../../../dora/ys.config'
import uiTitle from '../../../components/title-bar/title-bar'
import uiAccount from '../../../components/account-bar/account-bar'
import LoginService from './login.http'
import util from '../../../dora/util.js'
export default {
  components: {
    uiTitle,
    uiAccount,
  },
  data() {
    return {
      form: {
        mobile: '',
        password: '',
        code: '',
      },
      error: {
        mobile: '',
        password: '',
        code: '',
      },
      code: '',
      downParams: 1,
      closeParams: false,
      scroll_data: true,
      hiddenSpan: true,
      list: [],
    }
  },
  mounted() {
    util.closeToast()
    const mobileArray = YsConfigJs.getCache('userHistory')
    if (mobileArray.length != 0) {
      this.form.mobile = mobileArray[0]
    } else {
      this.hiddenSpan = false
    }
    const that = this;
    document.getElementById('phone').addEventListener('focus', function(){
        that.downParams = 1
        that.closeParams = false;
    })
  },
  created() {},
  watch: {
    list(item) {
      console.log('item', item)
    },
  },
  methods: {
    // 点击删除不关闭窗口
    openParams(type) {
      this.downParams = 0
      this.closeParams = true
      this.downEmpty(type)
    },
    accountParams(params) {
      if (params) {
        this.form.mobile = params
        this.form.password = ''
        this.closeParams = false
        this.downParams = 1
      } else {
        this.form.mobile = ''
        this.form.password = ''
        this.closeParams = false
        this.downParams = 1
        document.getElementsByName('phone')[0].focus()
      }
    },
    //   关闭选择账户功能
    closeEmpty(e, type) {
      if (type == 'close') {
        this.closeParams = false
        this.downParams = 1
      }
    },
    // 点击下拉箭头划出选择账户功能
    downEmpty(type) {
      if (type == 'down') {
        this.downParams = 0
        this.closeParams = true
        const userHistoryArray = YsConfigJs.get_userHistory().slice(0, 3)
        console.log('userHistoryArray', userHistoryArray)
        if (userHistoryArray.length == 0) {
          this.list = ['请使用其他账号登录']
        } else {
          this.list = userHistoryArray
        }
      } else {
        this.downParams = 1
        this.closeParams = false
      }
    },
    empty(e, type) {
      if (type == 'mobile') {
        this.form.mobile = ''
      } else if (type == 'pwd') {
        this.form.password = ''
      } else if (type == 'code') {
        this.form.code = ''
      }
      e.target.previousElementSibling.focus()
    },
    check(e, type) {
      YsConfigJs.check_Re(type, e.target.value).then((res) => {
        if (res == true) {
          this.error.mobile = ''
        } else {
          if (type == 'phone') {
            this.error.mobile = res
          }
        }
      })
    },
    login() {
      if (this.form.mobile == '') {
        this.error.mobile = '手机号不能为空'
        document.getElementsByName('phone')[0].focus()
        return
      } else {
        this.error.mobile = ''
      }
      if (this.form.password == '') {
        this.error.password = '密码不能为空'
        document.getElementsByName('pwd')[0].focus()
        return
      } else {
        this.error.password = ''
      }
      if (this.error.mobile == '' && this.error.password == '') {
        const rasPw = this.$getRsaCode(this.form.password)
        LoginService.user_login({
          mobile: this.form.mobile,
          user_pass: rasPw,
        }).then((res) => {
          if (res.code == 1) {
            if (res.data == null) {
              return
            }
            this.$store.dispatch('setIsLogin', true)
            YsConfigJs.setCache('token', res.data.token)
            YsConfigJs.setCache('user', res.data.user)
            if (YsConfigJs.getCache('userHistory') == null) {
              YsConfigJs.setCache('userHistory', [res.data.user.mobile])
            } else {
              let result = YsConfigJs.getCache('userHistory')
              const index = result.some((x) => {
                return res.data.user.mobile == x
              })
              if (index == false) {
                result = [res.data.user.mobile].concat(result)
                result = result.slice(0, 5)
                YsConfigJs.setCache('userHistory', result)
              }
            }
            util.toast({
              content: '登录成功',
              times: 1000,
            })
            setTimeout(() => {
              LoginService.get_service().then((res) => {
                if (res.code == 1) {
                  if (res.data.zskf.type == 'QQ') {
                    YsConfigJs.setCache('servicer', 'QQ：' + res.data.zskf.wx)
                  } else {
                    YsConfigJs.setCache('servicer', 'wx：' + res.data.zskf.wx)
                  }
                  if (res.data.counsel == 1) {
                    ;(function () {
                      var _53code = document.createElement('script')
                      _53code.src = 'https://tb.53kf.com/code/code/fd0777bbf73e53b32be504f3d0f2114c2/1'
                      var s = document.getElementsByTagName('script')[0]
                      s.parentNode.insertBefore(_53code, s)
                    })()
                  }
                }
              })
              this.$router.push('/mypages')
            }, 700)
          } else if (res.code == 403) {
            var path = '/google-code/' + this.form.mobile
            this.$router.push(path)
          } else {
            util.alert({
              content: res.msg,
              define: () => {
                console.log(res)
              },
            })
          }
        })
      }
    },
  },
  directives: {},
  watch: {},
}
</script>
<style lang="less" scoped>
@keyframes myfirst {
  0% {
    left: 0px;
    bottom: -200px;
  }
  25% {
    left: 0px;
    bottom: -150px;
  }
  50% {
    left: 0px;
    bottom: -100px;
  }
  75% {
    left: 0px;
    bottom: -50px;
  }
  100% {
    left: 0px;
    bottom: 0px;
  }
}

@-moz-keyframes myfirst /* Firefox */ {
  0% {
    left: 0px;
    bottom: -200px;
  }
  25% {
    left: 0px;
    bottom: -150px;
  }
  50% {
    left: 0px;
    bottom: -100px;
  }
  75% {
    left: 0px;
    bottom: -50px;
  }
  100% {
    left: 0px;
    bottom: 0px;
  }
}

@-webkit-keyframes myfirst /* Safari 和 Chrome */ {
  0% {
    left: 0px;
    bottom: -200px;
  }
  25% {
    left: 0px;
    bottom: -150px;
  }
  50% {
    left: 0px;
    bottom: -100px;
  }
  75% {
    left: 0px;
    bottom: -50px;
  }
  100% {
    left: 0px;
    bottom: 0px;
  }
}

@-o-keyframes myfirst /* Opera */ {
  0% {
    left: 0px;
    bottom: -200px;
  }
  25% {
    left: 0px;
    bottom: -150px;
  }
  50% {
    left: 0px;
    bottom: -100px;
  }
  75% {
    left: 0px;
    bottom: -50px;
  }
  100% {
    left: 0px;
    bottom: 0px;
  }
}

@import '../../assets/less/common.less';
#login {
  width: 100%;
  height: 100vh;
  background: rgb(77, 151, 201);
  position:absolute;
  overflow-y: auto;
  z-index: 4;
  .title {
    text-align: center;
    color: rgb(250, 250, 250);
  }
  .el-form {
    border-radius: 2rem;
    padding: 1rem 0.5rem;
    width: 90%;
    margin: auto;
    min-height: 10rem;
    .ui-input-list {
      position: relative;
      .phoneWitgh {
        width: 63%;
      }
      .upDown {
        position: absolute;
        right: 0.6875rem;
        top: 50%;
        transform: translate(0, -50%);
      }
      .el-icon-close {
        position: absolute;
        right: 2rem;
        top: 0.8rem;
        background-color: rgba(100, 100, 100, 0.3);
        border-radius: 100px;
        line-height: 1.3rem;
        color: #7c7c7c;
        text-align: center;
        width: 1.3rem;
        height: 1.3rem;
        font-size: 1rem;
      }
    }
    .code {
      width: 60%;
      display: inline-block;
      input {
        width: 50%;
      }
    }
    .error {
      font-size: 0.9rem;
      color: red;
      height: 1.5rem;
      padding-left: 1rem;
    }
    .forget-pwd {
      margin-top: 0.8rem;
      width: 100%;
      height: 2rem;
      color: white;
      text-align: center;
      font-size: 1.2rem;
      a {
        display: inline-block;
        color: white;
        padding: 0 0.5rem;
        font-size: 0.9rem;
      }
      a:first-of-type {
        text-align: right;
      }
      .long-string{
        display: inline-block;
        width: 0.1rem;
        height: 1rem;
        background-color: white;
        transform: translateY(0.2rem);
      }
    }
  }
  .footer_selet {
    animation: myfirst 0.5s linear 1;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    /* height: 6.25rem; */
    border-radius: 7% 7% 0 0;
    background-color: #fff;
    box-sizing: border-box;
    .account {
      position: relative;
      background-color: #fff;
      border-radius: 10% 10% 0 0;
      border-bottom: 0.0625rem solid #b9bcbc;
      height: 3.125rem;
      text-align: center;
      line-height: 3.125rem;
      font-size: 20px;
      font-weight: 700;
      .icon_closes {
        position: absolute;
        left: 5%;
        top: 50%;
        transform: translate(0, -50%);
      }
    }
    .account_bottom {
      width: 100%;
      /* height: 3.125rem; */
    }
    .ui-list {
      background-color: rgb(240, 240, 240);
    }
  }
}
</style>
