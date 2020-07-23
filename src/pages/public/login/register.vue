<template>
  <div id="register">
    <div id="content">
      <uiTitle class="title" ref="title" :isback="true" :title="'注册'" :color="'white'"></uiTitle>
      <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :backcolor="'#f5f5f5'">
        <main>
          <div class="tips">请如实填写以下信息：</div>
          <el-form ref="form" class="el-form" v-model="form">
            <div class="ui-reg-list">
              <div class="input-name">手机号</div>
              <input name="input" type="number" v-model="form.mobile" placeholder="请输入手机号" />
              <i class="el-icon-close el-icon" v-if="form.mobile != ''" @click="empty($event, 'mobile')"></i>
            </div>
            <div class="ui-reg-list code">
              <div class="input-name input-width">验证码</div>
              <input name="code" type="url" v-model="form.code" placeholder="输入验证码" />
              <i class="el-icon-close el-icon" v-if="form.code != ''" @click="empty($event, 'code')"></i>
            </div>
            <div class="send-code" v-if="!num_show">
              <el-button class="send-button" @click="send_code()"><span>发送验证码</span></el-button>
            </div>
            <div class="send-code" v-if="num_show">
              <el-button class="send-button numShow"
                ><span class="numShow">({{ num }}秒)</span></el-button
              >
            </div>
            <div class="ui-reg-list">
              <div class="input-name">密码</div>
              <input name="pwd" type="password" v-model="form.user_pass" placeholder="请输入密码" autocomplete />
              <i class="el-icon-close el-icon" v-if="form.user_pass != ''" @click="empty($event, 'user_pass')"></i>
            </div>
            <div class="ui-reg-list">
              <div class="input-name">确认密码</div>
              <input
                name="pwd"
                type="password"
                v-model="form.user_pass_confirm"
                placeholder="再次输入密码"
                autocomplete
              />
              <i
                class="el-icon-close el-icon"
                v-if="form.user_pass_confirm != ''"
                @click="empty($event, 'user_pass_confirm')"
              ></i>
            </div>
          </el-form>
          <div class="tips">以下带<span class="red">*</span>为必填辅助信息</div>
          <el-form ref="form" class="el-form" v-model="form">
            <div class="ui-reg-list">
              <div class="input-name"><span class="red">*</span>真实姓名</div>
              <input name="input" type="text" v-model="form.info_name" placeholder="必须与银行卡姓名一致" />
              <i class="el-icon-close el-icon" v-if="form.info_name != ''" @click="empty($event, 'info_name')"></i>
            </div>
            <div class="ui-reg-list">
              <div class="input-name"><span class="red">*</span>所在地区</div>
              <uiVdistpicker class="location" @province="province" @city="city" @area="area"></uiVdistpicker>
            </div>
            <div class="ui-reg-list">
              <div class="input-name">详细地址</div>
              <input name="input" type="text" v-model="form.location" placeholder="请输入详细地址" />
              <i class="el-icon-close el-icon" v-if="form.location != ''" @click="empty($event, 'location')"></i>
            </div>
            <div class="ui-reg-list">
              <div class="input-name"><span class="red">*</span>QQ</div>
              <input name="input" type="number" v-model="form.qq" placeholder="请输入QQ号" />
              <i class="el-icon-close el-icon" v-if="form.qq != ''" @click="empty($event, 'qq')"></i>
            </div>
            <div class="ui-reg-list">
              <div class="input-name"><span class="red">*</span>微信</div>
              <input name="input" type="url" v-model="form.wx" placeholder="请输入微信号" />
              <i class="el-icon-close el-icon" v-if="form.wx != ''" @click="empty($event, 'wx')"></i>
            </div>
            <div class="ui-reg-list">
              <div class="input-name"><span class="red">*</span>旺旺号</div>
              <input name="input" type="text" v-model="form.wangwang" placeholder="请输入旺旺号" />
              <i class="el-icon-close el-icon" v-if="form.wangwang != ''" @click="empty($event, 'wangwang')"></i>
            </div>
            <div class="ui-reg-list">
              <div class="input-name"><span class="red">*</span>京东号</div>
              <input name="input" type="text" v-model="form.jd_wangwang" placeholder="请输入京东号" />
              <i class="el-icon-close el-icon" v-if="form.jd_wangwang != ''" @click="empty($event, 'jd_wangwang')"></i>
            </div>
            <div class="ui-reg-list">
              <div class="input-name"><span class="red">*</span>历史订单</div>
              <input name="input" type="number" v-model="form.tb_id" placeholder="请输入任一淘宝历史订单号" />
              <i class="el-icon-close el-icon" v-if="form.tb_id != ''" @click="empty($event, 'tb_id')"></i>
            </div>
            <div class="ui-reg-list">
              <div class="input-name ime-mode"><span class="red">*</span>邀请码</div>
              <input name="input" type="text" v-model="form.user_activation_key" placeholder="邀请码" />
              <i
                class="el-icon-close el-icon"
                v-if="form.user_activation_key != ''"
                @click="empty($event, 'user_activation_key')"
              ></i>
            </div>
          </el-form>
          <el-button class="el-button" round @click="register()"><span>注册</span></el-button>
        </main>
      </uiScroll>
    </div>
  </div>
</template>
<script>
import YsConfigJs from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import uiTitle from '../../../components/title-bar/title-bar'
import uiScroll from '../../../components/scroll-bar/scroll-bar'
import LoginService from './login.http'
import uiVdistpicker from 'v-distpicker'
export default {
  components: {
    uiTitle,
    uiScroll,
    uiVdistpicker,
  },
  data() {
    return {
      form: {
        mobile: '',
        code: '',
        user_pass: '',
        user_pass_confirm: '',
        info_name: '',
        all_location: '',
        location: '',
        qq: '',
        wx: '',
        wangwang: '',
        jd_wangwang: '',
        tb_id: '',
        user_activation_key: '',
      },
      location: {
        province: '',
        city: '',
        area: '',
      },
      bounce: {
        top: false,
        bottom: false,
        left: false,
        right: false,
      },
      num: 60,
      num_show: false,
      countdown: null,
    }
  },
  mounted() {
    this.form.user_activation_key = this.$route.query.code ? this.$route.query.code : ''
    document.getElementById('register').style.height = YsConfigJs.get_Height()
    this.$refs.scroll.$el.style.height =document.getElementById('register').offsetHeight - this.$refs.title.$el.offsetHeight + 'px'
  },
  methods: {
    province(e) {
      this.location.province = e.value
    },
    city(e) {
      this.location.city = e.value
    },
    area(e) {
      this.location.area = e.value
    },
    empty(e, type) {
      switch (type) {
        case 'mobile':
          this.form.mobile = ''
          break
        case 'code':
          this.form.code = ''
          break
        case 'user_pass':
          this.form.user_pass = ''
          break
        case 'user_pass_confirm':
          this.form.user_pass_confirm = ''
          break
        case 'info_name':
          this.form.info_name = ''
          break
        case 'all_location':
          this.form.all_location = ''
          break
        case 'location':
          this.form.location = ''
          break
        case 'qq':
          this.form.qq = ''
          break
        case 'wx':
          this.form.wx = ''
          break
        case 'wangwang':
          this.form.wangwang = ''
          break
        case 'jd_wangwang':
          this.form.jd_wangwang = ''
          break
        case 'tb_id':
          this.form.tb_id = ''
          break
        case 'user_activation_key':
          this.form.user_activation_key = ''
          break
      }
      e.target.previousElementSibling.focus()
    },
    send_code() {
      if (this.form.mobile == '') {
        util.alert({
          content: '请输入手机号码',
          define: () => {},
        })
        return
      }
      YsConfigJs.check_Re('phone', this.form.mobile).then((res) => {
        if (res == true) {
          LoginService.get_code({
            mobile: this.form.mobile,
          }).then((res) => {
            if (res.code == 1) {
              this.num_show = true
              this.countdown = setInterval(() => {
                this.num--
                if (this.num === 0) {
                  this.num = 60
                  this.num_show = false
                  clearInterval(this.countdown)
                }
              }, 1000)
              util.toast({
                content: res.msg,
                times: 1000,
              })
            } else {
              util.alert({
                content: res.msg,
                define: () => {},
              })
            }
          })
        } else {
          util.alert({
            content: res,
            define: () => {
              console.log(res)
            },
          })
          this.form.mobile = ''
        }
      })
    },
    register() {
      const rasPw1 = this.$getRsaCode(this.form.user_pass)
      const rasPw2 = this.$getRsaCode(this.form.user_pass_confirm)
      this.form.all_location = this.location.province + this.location.city + this.location.area
      LoginService.user_register({
        mobile: this.form.mobile,
        vCode: this.form.code,
        user_pass: rasPw1,
        user_pass_confirm: rasPw2,
        info_name: this.form.info_name,
        all_location: this.form.all_location,
        location: this.form.location,
        qq: this.form.qq,
        wx: this.form.wx,
        wangwang: this.form.wangwang,
        jd_wangwang: this.form.jd_wangwang,
        tb_id: this.form.tb_id,
        user_activation_key: this.form.user_activation_key,
      }).then((res) => {
        if (res.code == 1) {
          util.alert({
            content: res.msg,
            define: () => {
              this.$router.push('/mypages')
            },
          })
        } else {
          util.alert({
            content: res.msg,
            define: () => {},
          })
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
@import '../../assets/less/common.less';
#register {
  position: relative;
  height: 100vh;
  z-index: 5;
  #content {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    background-color: #f5f5f5;
  }
  .title {
    z-index: 100;
  }
  .wrapper {
    overflow: hidden;
    main {
      padding-bottom: 1rem;
    }
  }
  .red {
    color: red;
  }
  .el-form {
    position: relative;
    width: 100%;
    margin: auto;
    min-height: 10rem;
    padding: 0.2rem 0.7rem;
    background-color: white;
    .ui-reg-list:last-of-type {
      border-bottom: none;
    }
    .ui-reg-list {
      min-height: 3rem;
      line-height: 2.6rem;
      background-color: white;
      border-bottom: 0.07rem solid rgb(230, 230, 230);
      position: relative;
      .ime-mode {
        ime-mode: active;
      }
      .input-name {
        display: inline-block;
        height: 100%;
        width: 22%;
       // text-align: end;
        vertical-align: bottom;
        line-height: 3rem;
        font-size: 0.9rem;
        color: #4c4c4c;
      }
      .input-width {
        width: 31%;
      }
      input {
        display: inline-block;
        height: 2.8rem;
        min-width: 65%;
        max-width: 70%;
        vertical-align: top;
        font-size: 0.9rem;
        padding-left: 0.1rem;
        color: #4c4c4c;
      }
      input::-webkit-input-placeholder {
        color: rgba(200, 200, 200, 0.8);
      }
      .shortiInput {
        width: 55%;
      }
      .el-icon {
        position: absolute;
        right: 1rem;
        top: 0.8rem;
        background-color: rgba(100, 100, 100, 0.1);
        border-radius: 100px;
        line-height: 1.3rem;
        color: #8c8c8c;
        text-align: center;
        width: 1.3rem;
        height: 1.3rem;
        font-size: 1rem;
      }
      .location {
        margin-bottom: 0.8rem;
      }
    }
    .code {
      width: 70%;
      display: inline-block;
      input {
        width: 30%;
      }
    }
    .el-form{
        position: relative;
        width:100%;
        margin: auto;
        min-height: 10rem;
        padding:0.2rem 0.7rem ;
        background-color: white;
        .ui-reg-list:last-of-type{
             border-bottom:none;
        }
        .ui-reg-list{
            min-height:3rem;
            line-height:2.6rem;
            background-color: white;
            border-bottom: 0.07rem solid rgb(230,230,230);
            position: relative;        
            .ime-mode{
                ime-mode:active;
            }
            .input-name{
                display: inline-block;
                height:100%;
                vertical-align: bottom;
                line-height:3rem;
                font-size: 0.9rem;
                color:rgba(100,100,100,0.8);
            }
            input{
                display: inline-block;
                height:3rem;
                line-height: 3rem;
                width: 70%;
                vertical-align:top;
                font-size: 0.9rem;
                padding-left: 0.1rem;
                color:#4c4c4c;
                line-height: 3rem;
            }
            input::-webkit-input-placeholder {
                color:rgba(200,200,200,0.8);
            }
            .shortiInput{
                width: 55%;
            }
            .el-icon{
                position: absolute;
                right:1rem;
                top:0.8rem;
                background-color: rgba(100,100,100,0.1);
                border-radius: 100px;
                line-height: 1.3rem;
                color:#8c8c8c;
                text-align: center;
                width:1.3rem;
                height:1.3rem;
                font-size: 1rem;
            }
            .location{
                margin-bottom: 0.8rem;
            }
        }  
        .code{
            width:65%;
            display: inline-block;
            input{
                width:50%;
            }
        }
      
    }
    .send-code{
        //display: inline-block;
        float: right;
        padding:0.5rem 0;
        .send-button{
            width: 100%;
            border:none;
            padding: 0 0.5rem;
            text-align: center;
            background-image:linear-gradient(to bottom right,#2d99e0,#6fbaec);
            span{
                color:white;
                font-size: 0.8rem;
            }
            margin: 0 auto 0 auto;
            height: 2rem;
            font-size: 0.8rem;
            border-radius: 0.5rem;
        }
    }
  }
}
</style>
