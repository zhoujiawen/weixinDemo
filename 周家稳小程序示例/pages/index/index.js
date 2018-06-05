//index.js
//获取应用实例
const app = getApp()
Page({
  data:null,
  onLoad: function () {
    var that = this; 
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b160859271a021faf2c3904/zhoujiawen/home/list', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData(res.data);
      }
    })
  },
  /**
* 生命周期函数--监听页面初次渲染完成
*/
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },
  //点击按钮
  showDialog() {
    this.dialog.showDialog();
  },

  //取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.dialog.hideDialog();
  }

})