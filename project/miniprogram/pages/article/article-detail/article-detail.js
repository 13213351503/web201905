var { articles } = require('../../../data/db.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var articleId = options.articleId
    var article = articles[articleId]

    // 处理收藏
    var isCollected = true;

    // 获取文章收藏状态
    var articles_collections = wx.getStorageSync('articles_collections')
    if (articles_collections){
      // 有文章的收藏状态
      isCollected = !!articles_collections[articleId];
    }
    //没有文章收藏状态,则初始化
    else{
      /**
       * {
       *  '0':false,
       *  '1':true
       * }
       */
      var data = {}
      data[articleId] = false;
      wx.setStorageSync('articles_collections',data)
    }

    // 处理音乐
    // 获取背景音乐实例
    var backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.onPlay(function(){
      this.setData({isPlaying:true})
    }.bind(this))
    backgroundAudioManager.onPause(function () {
      this.setData({ isPlaying: false })
    }.bind(this))
    
    // 动态加载文章详情
    this.setData({...article,isCollected:isCollected})
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

  },

  /**
   * 处理点击收藏
   */
  tapCollection:function(){
    // wx.setStorageSync('key1',{name:'Tom'})
    // var data = wx.getStorageSync('key1')
    // console.log(data)

    // 获取文章收藏状态
    var articles_collections = wx.getStorageSync('articles_collections') 
    // 获取当前文章的收藏状态
    var currentCollection = articles_collections[this.data.articleId]
    // console.log(currentCollection)
    // 改变当前文章的收藏状态
    // currentCollection = !currentCollection;
    // 改变storage收藏状态
    articles_collections[this.data.articleId] = !currentCollection;
    wx.setStorageSync('articles_collections', articles_collections )
  //同步收藏图标状态
    this.setData({ isCollected: !currentCollection},function(){
      wx.showToast({
        title: currentCollection ? '取消成功' : '收藏成功',
        duration:2000
      })
    })
  },
  /**
   * 点击处理分享
   */
  tapShare:function(){
    var itemList = ['分享到QQ', '分享到朋友圈', '分享到微博']
    wx.showActionSheet({
      itemList: itemList,
      success:function(res){
        wx.showToast({
          title: itemList[res.tapIndex]+'成功' ,
          duration: 2000
        })
      }
    })
  },
  /**
   * 点击播放音乐
   */
  tapMusic:function(){
    // 获取背景音乐实例
    var backgroundAudioManager = wx.getBackgroundAudioManager()
    if(this.data.isPlaying){//正在播放
      backgroundAudioManager.pause()
      //改变音乐状态
      // this.setData({ isPlaying: false })
    }else{//没有播放音乐
    /*
      backgroundAudioManager.src = 'http://music.163.com/song/media/outer/url?id=1407551413.mp3';
      backgroundAudioManager.title = "麻雀";
      backgroundAudioManager.coverImgUrl = 'http://qukufile2.qianqian.com/data2/pic/75483d9e5dc2aaaa2808fe01361231e8/674195259/674195259.jpg@s_1,w_224,h_224';
    */
      backgroundAudioManager.src = this.data.music.src;
      backgroundAudioManager.title = this.data.music.title;
      backgroundAudioManager.coverImgUrl = this.data.music.coverImgUrl;
      //改变音乐状态
      // this.setData({isPlaying:true})
    }
  }
})