//index.js

//获取应用实例
const dash = require("../data-json/datajson.js")
var app = getApp();
Page({
  data: {  
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    inTheaters: {},
    comingSoon: {},
    top250: {},
    scrollbt:false

  },
    onLoad: function (event) {
        this.setData({
            //主页电影秒杀电影列表
            moverlist: dash.miaosjson(0, 7),
            //主页电影排列电影列表
            miaosjson: dash.miaosjson(7, 16),
            imgUrls: dash.imgurls,
            banners: dash.banners,
            activity: dash.activity,
            //秒杀时间
            datatime:{
                actititle: dash.actititle,
                countDownDay: 0,
                countDownHour: 0,
                countDownMinute: 0,
                countDownSecond: 0,
            }
        });
        wx.getUserInfo({
            success: function (res) {
                console.log(res.userInfo);
            }
        })

        let inTheatersUrl = "https://web.zayata.com/lockes/getdata.php"
        // this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    },

    onPageScroll:function (event) {
      console.log(this.data.scrollbt==true)
      if(event.scrollTop>140){
          this.setData({
              scrollbt:true
          });

      }
      if(this.data.scrollbt==true){
          if(event.scrollTop<220){
              this.setData({
                  scrollbt:false
              });
          }
      }

        console.log(event.scrollTop)
    },
    /*  touchmoveTap:function(event){
      console.log("event");
     },*/
    //下拉
  /*  onPullDownRefresh: function () {
        console.log("好用不?")
        wx.showToast({
            title: '没事儿别乱拉',//提示信息
            icon: 'success',//成功显示图标
            duration: 2000//时间
        })
    },*/
   /* //上拉
    onReachBottom: function () {
        console.log("好用不?")
    },*/

    //秒杀时间
    onReady: function () {
        var totalSecond = 1533609647 - Date.parse(new Date())/1000;

        var interval = setInterval(function () {
            // 秒数
            var second = totalSecond;

            // 天数位
            var day = Math.floor(second / 3600 / 24);
            var dayStr = day.toString();
            if (dayStr.length == 1) dayStr = '0' + dayStr;

            // 小时位
            var hr = Math.floor((second - day * 3600 * 24) / 3600);
            var hrStr = hr.toString();
            if (hrStr.length == 1) hrStr = '0' + hrStr;

            // 分钟位
            var min = Math.floor((second - day * 3600 *24 - hr * 3600) / 60);
            var minStr = min.toString();
            if (minStr.length == 1) minStr = '0' + minStr;

            // 秒位
            var sec = second - day * 3600 * 24 - hr * 3600 - min*60;
            var secStr = sec.toString();
            if (secStr.length == 1) secStr = '0' + secStr;
            this.setData({
                datatime:{
                  countDownDay: dayStr,
                  countDownHour: hrStr,
                  countDownMinute: minStr,
                  countDownSecond: secStr,
              }
            });
            totalSecond--;
            if (totalSecond < 0) {
                clearInterval(interval);
                wx.showToast({
                    title: '活动已结束',
                });
                this.setData({
                    datatime:{
                        countDownDay: '00',
                        countDownHour: '00',
                        countDownMinute: '00',
                        countDownSecond: '00',
                    }
                });
            }
        }.bind(this), 1000);
    },
    onMovieTap: function (e) {
        var movieId = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../template-lists/movie-detail/movie-detail?id=" + movieId
        })
    },
    gotomap:function (e) {
        wx.navigateTo({
            url: "../map/map"
        })

    },


  //onload方法中调用
  getMovieListData: function (url = '', settedKey, categoryTitle) {
    wx.showNavigationBarLoading()
    var that = this;
    wx.request({
      url: url,
      method: 'POST',
      header: {
      },
      data: {
        codes: 'movelist',
        offset: 0,
        length: 6
      },
      success: function (res) {
        console.log(res)
        //that.inTheaters = res.data.data.CommentResponseModel;
        // console.log(res.data.data.CommentResponseModel)
        // that.setData({ inTheaters: res.data.data.CommentResponseModel});
        // that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },



})

