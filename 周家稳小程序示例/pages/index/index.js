//index.js
//获取应用实例
const app = getApp()
Page({
  data:{
    headBtnA:0,
    animationData: {},
    recommendList:[],
    attentionList:[],
    hotsearchList:[],
  },
  onLoad: function () {
    var that = this;
    //关注列表 
    that.requestList(app.globalData.url + "/home/attention/list", {}, "get", function (res) {
      that.setData({ attentionList: res.data.data });
    }); 
    //推荐列表 
    that.requestList(app.globalData.url +"/home/recommend/list",{},"get",function(res){
      that.setData({recommendList:res.data.data});
    });
    //热搜列表 
    that.requestList(app.globalData.url + "/home/hotsearch/list", {}, "get", function (res) {
      that.setData({ hotsearchList: res.data.data });
    });

  },
  //点击头部按钮
  tapHeadBtn: function (event) {
    // 获取当前点击的index
    var index = event.target.dataset.btn;
    // 初始化动画数据
    var animation = wx.createAnimation({duration: 500,timingFunction: 'ease-out',delay: 0});
    // 距离左边位置
    animation.left((index * 250) + 'rpx').step();
    this.setData({animationData: animation.export()});
    this.setData({ headBtnA: index, });
  },
  requestList: function (url, body, method,callback){
    wx.request({
      url: url,
      data: body,
      method: method,
      success: function (res) {
        callback(res);
      }
    });
  },
  onPullDownRefresh: function () {
    var that = this;
    switch (that.data.headBtnA){
      case 0:
        //关注列表 
        that.requestList(app.globalData.url + "/home/attention/list", {}, "get", function (res) {
          console.log('数据跟新');
          that.setData({ attentionList: res.data.data });
          wx.stopPullDownRefresh();
        });
        break;
      case 1:
        //推荐列表 
        that.requestList(app.globalData.url + "/home/recommend/list", {}, "get", function (res) {
          that.setData({ recommendList: res.data.data });
          wx.stopPullDownRefresh();
        });
        break;
      case 2:
        //热搜列表 
        that.requestList(app.globalData.url + "/home/hotsearch/list", {}, "get", function (res) {
          that.setData({ hotsearchList: res.data.data });
          wx.stopPullDownRefresh();
        });
        break;
      default:
        wx.stopPullDownRefresh();
        break;
    } 
  },
  //跳转到询问页面
  gotoAskPage:function(){
    wx.navigateTo({
      url: '../../pages/ask/ask?id=1'
    })
  }



})