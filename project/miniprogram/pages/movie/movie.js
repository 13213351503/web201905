var { getMovieList } = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var inTheatersUrl = 'http://t.yushu.im/v2/movie/in_theaters?start=0&count=3';
    var comingSoonUrl = 'http://t.yushu.im/v2/movie/coming_soon?start=0&count=3';
    var top250Url = 'http://t.yushu.im/v2/movie/top250?start=0&count=3';
    // 发送请求获取电影列表
    /*
    wx.request({
      url:'http://t.yushu.im/v2/movie/in_theaters?start=0&count=3',
      success:function(res){
        // console.log(res)
        var data = res.data.subjects.map(function(item){
          return {
            coverImage: item.images.large,
            title:item.title,
            score:item.rating.average,
            stars:item.rating.stars
          }
        })
        _this.setData({ inTheaters:data})
      }
    })
    wx.request({
      url: 'http://t.yushu.im/v2/movie/coming_soon?start=0&count=3',
      success: function (res) {
        // console.log(res)
        var data = res.data.subjects.map(function (item) {
          return {
            coverImage: item.images.large,
            title: item.title,
            score: item.rating.average,
            stars: item.rating.stars
          }
        })
        _this.setData({ comingSoon: data })
      }
    })
    */
    getMovieList(inTheatersUrl,function(data){
      _this.setData({ inTheaters: data })
    })
    getMovieList(comingSoonUrl, function (data) {
      _this.setData({ comingSoon: data })
    })
    getMovieList(top250Url, function (data) {
      _this.setData({ top250: data })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})