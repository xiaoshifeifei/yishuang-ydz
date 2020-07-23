import router from 'pages/router/router.js'
import store from './store'
import vuex from './store'
import http from './http.config'
import util from './util'
import qiniu from './qiniu.min.js'
let YsConfigJs = {
  isMobile() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      return true
    } else {
      return false
    }
  },
  isSafari() {
    // alert( window.availHeight );
    if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
      //localStorage.setItem('isSafari',true);
      return true
    } else {
      //localStorage.setItem('isSafari',false);
      return false
    }
  },
  /**
   * 跳转第三方
   */
  go_third({ url, isNewWin = false } = {}) {
    return new Promise((resolve) => {
      if (isNewWin) {
        let routeData = router.resolve({ path: url, query: { id: 1 } })
        window.open(routeData.href, '_blank')
        resolve(true)
      } else {
        router.push(url)
        resolve(true)
      }
    })
  },

  /** 获取用户token值 */
  get_token() {
    //console.log(JSON.parse(window.localStorage.getItem(name)));
    const token = window.localStorage.getItem('token') ? JSON.parse(window.localStorage.getItem('token')) : null
    return token
  },

  /** 获取用户信息 */
  get_user() {
    const users = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null
    return users
  },

  /** 获取用户历史登录账号信息 */
  get_userHistory() {
    const userHistory = window.localStorage.getItem('userHistory')
      ? JSON.parse(window.localStorage.getItem('userHistory'))
      : null
    return userHistory
  },

  /** 获取师傅or徒弟身份 */
  isMaster() {
    const states = this.get_user() ? this.get_user().group : null
    if (states == 6) {
      return true
    } else {
      return false
    }
  },

  /** 获取登录状态 */
  isLogin() {
    return vuex.state.isLogin
  },
  /** 是否手机app */
  isApp() {
    return this.getCache('isapp')
  },

  /** 全局存储定值 */
  setCache(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value))
  },

  /** 获取缓存定值 */
  getCache(name) {
    return JSON.parse(window.localStorage.getItem(name))
  },
  /**
   * 设置定时token
   */
  set_time_cache() {
    window.localStorage.setItem(name, JSON.stringify(value))
    setTimeout(() => {
      localStorage.removeItem(name)
    }, 10 * 24 * 60 * 60 * 1000)
  },
  /**
   * 设置定时session
   */
  set_time_session(name, value) {
    window.sessionStorage.setItem(name, JSON.stringify(value))
    setTimeout(() => {
      sessionStorage.removeItem(name)
    }, 10 * 60 * 1000)
  },
  /**
   * 获取定时session
   */
  get_time_session(name) {
    return JSON.parse(window.sessionStorage.getItem(name))
  },
  /**
   * 删除缓存定值
   */
  removeCache(name) {
    localStorage.removeItem(name)
  },

  clearHistory() {
    vuex.dispatch('clearRouter')
  },

  /** app端顶起刘海高度 */
  fixStatusBar(el) {
    el.style.paddingTop = vuex.state.safeTop + 'px'
    return el.style.paddingTop
  },

  /** app端顶起底部高度 */
  fixTabBar(el) {
    el.style.paddingBottom = vuex.state.safeBottom + 'px'
  },
  /** 获取屏幕高度 */
  get_Height() {
    return window.screen.height
  },
  /** 验证 */
  check_Re(type, content) {
    switch (type) {
      case 'phone':
        return this.check_re_phone(content)
        break
    }
  },

  /** 验证手机号 */
  check_re_phone(phone) {
    return new Promise((resolve) => {
      const regex = /^1[3456789]\d{9}$/
      if (regex.test(phone)) {
        resolve(true)
      } else if (phone.length > 0) {
        resolve('手机号格式不正确')
      }
    })
  },

  /**
   * 七牛上传图片，返回url
   */
  upload_image(api) {
    return new Promise((resolve) => {
      api.requestPermission(
        {
          list: ['photos', 'storage-r', 'storage-w'],
          code: 1,
        },
        (ret, err) => {
          if (ret.list[1].granted) {
            api.getPicture(
              {
                sourceType: 'album',
                mediaValue: 'pic',
                destinationType: 'base64',
              },
              (ret, err) => {
                if (ret) {
                  let txtxtx = ret.data
                  let txbase = ret.base64Data
                  if (txtxtx) {
                    let txarr = txbase.split(',')
                    let txmime = txarr[0].match(/:(.*?);/)[1]
                    let txbstr = atob(txarr[1])
                    let txn = txbstr.length
                    let txu8arr = new Uint8Array(txn)
                    while (txn--) {
                      txu8arr[txn] = txbstr.charCodeAt(txn)
                    }
                    let txblob = new Blob([txu8arr], { type: txmime })
                    let imageFilter = api.require('imageFilter')
                    imageFilter.getAttr(
                      {
                        path: txtxtx,
                      },
                      (ret, err) => {
                        if (ret.status) {
                          let txsize = ret.size
                          if (txsize < 5242880) {
                            http.postHttpRequest('api.php/common/Common/upload_jssdk', {}).then((res) => {
                              if (res) {
                                this.sy_qiniu(txblob, res.data.domain, res.data.uptoken).then((res) => {
                                  console.log('img', res)
                                  resolve(res)
                                })
                              } else {
                                util.alert({
                                  content: res.msg,
                                  define: () => {
                                    console.log(res)
                                  },
                                })
                              }
                            })
                          } else {
                            util.alert({
                              content: '请上传5Mb以下的图片',
                              define: () => {
                                console.log(res)
                              },
                            })
                          }
                        } else {
                          util.alert({
                            content: '文件路径错误',
                            define: () => {
                              console.log(res)
                            },
                          })
                        }
                      }
                    )
                  }
                } else {
                  alert(err.msg)
                }
              }
            )
          }
        }
      )
    })
  },
  web_upload(files) {
    return new Promise((resolve) => {
      if (files && /(\.jpeg|\.png|\.jpg)/i.test(files.name)) {
        http.postHttpRequest('api.php/common/Common/upload_jssdk', {}).then((res) => {
          if (res) {
            this.sy_qiniu(files, res.data.domain, res.data.uptoken).then((res) => {
              resolve(res)
            })
          } else {
            util.alert({
              content: res.msg,
              define: () => {
                console.log(res)
              },
            })
          }
        })
      } else {
        util.alert({
          content: '图片格式错误<br>请重新上传',
          define: () => {
            // reject(false);
          },
        })
      }
    })
  },
  sy_qiniu(file, key, token) {
    //七牛使用
    // let that = this;
    return new Promise((resolve) => {
      let observer = {
        next(res) {
          var num = Math.floor(res.total.percent)
          var percent = num + '%'
          util.toast({
            content: '正在上传中...' + percent,
          })
        },
        error(err) {
          util.toast({
            content: '上传失败',
            time: 1000,
          })
        },
        complete(res1) {
          util.closeToast()
          const idcard_img = key + '/' + res1.key
          console.log('img', idcard_img)
          resolve(idcard_img)
        },
      }
      let config = {
        concurrentRequestLimit: 100,
      }
      let putExtra = {
        fname: key,
        params: {},
        mimeType: null,
      }
      let imgUrl = 'cashApply/' + new Date().valueOf()
      let observable = qiniu.upload(file, imgUrl, token, putExtra, config)
      observable.subscribe(observer) // 上传开始
    })
  },

  /** 复制文本 */
  copy_text(text) {
    return new Promise((resolve) => {
      // 判断是否为app
      if (this.getCache('isapp')) {
        //app
        let clipBoard = api.require('clipBoard')
        clipBoard.set(
          {
            value: text,
          },
          function (ret, err) {
            if (ret) {
              resolve('复制成功')
            } else {
              resolve('复制失败，请重试')
            }
          }
        )
      } else {
        //web
        var clipboard = new ClipboardJS('.copy')
        clipboard.on('success', function (e) {
          resolve('复制成功')
        })
        clipboard.on('error', function (e) {
          resolve('复制失败，请重试')
        })
      }
    })
  },
  /**
   * app保存图片到手机相册
   */
  perserve_img(url) {
    util.comfirm({
      content: '保存图片到相册？',
      define: () => {
        api.download(
          {
            url: url,
            report: true,
            cache: true,
            allowResume: true,
          },
          function (ret, err) {
            if (ret.state == 1) {
              //下载成功，保存到相册
              api.saveMediaToAlbum(
                {
                  path: ret.savePath,
                },
                function (ret, err) {
                  if (ret && ret.status) {
                    util.toast({ content: '保存成功', times: 1000 })
                  } else {
                    util.toast({ content: '保存成功', times: 1000 })
                  }
                }
              )
            } else {
              util.toast({ content: '下载失败', times: 1000 })
            }
          }
        )
      },
      cancel: () => {},
    })
  },
  /**
   * app保存视频到手机相册
   */
  perserve_video(url) {
    util.comfirm({
      content: '保存视频到相册？',
      define: () => {
        var shortName = url.substring(url.length - 6, url.length)
        var filename = 'ydz_' + new Date().getTime() + shortName
        api.download(
          {
            url: url,
            savePath: 'fs://' + filename,
          },
          (ret, err) => {
            if (ret.state == 1) {
              //下载成功，保存到相册
              api.saveMediaToAlbum(
                {
                  path: 'fs://' + filename,
                },
                (ret, err) => {
                  if (ret && ret.status) {
                    util.toast({ content: '保存成功', times: 1000 })
                  } else {
                    util.toast({ content: '保存成功', times: 1000 })
                  }
                }
              )
            } else {
              util.toast({ content: '下载失败', times: 1000 })
            }
          }
        )
      },
      cancel: () => {},
    })
  },
  /**
   * 传时间戳获取时间
   */
  get_time(timestamp, type) {
    let date = new Date(timestamp * 1000)
    let yy = date.getFullYear() //年
    let mm = this.add_zero(date.getMonth() + 1) //月
    let dd = this.add_zero(date.getDate()) //日
    let h = this.add_zero(date.getHours()) //时
    let m = this.add_zero(date.getMinutes()) //分
    let s = this.add_zero(date.getSeconds()) //秒
    let time
    if (type == 'indays') {
      time = yy + '/' + mm + '/' + dd
      return time
    } else if (type == 'inminutes') {
      time = yy + '/' + mm + '/' + dd + ' ' + h + ':' + m
      return time
    } else if (type == 'inseconds') {
      time = yy + '/' + mm + '/' + dd + ' ' + h + ':' + m + ':' + s
      return time
    } else {
      time = '错误类型'
      return time
    }
  },
  /**
   * 添零
   */
  add_zero(sum) {
    if (sum < 10) {
      return '0' + sum
    } else {
      return sum
    }
  },
}
export default YsConfigJs
