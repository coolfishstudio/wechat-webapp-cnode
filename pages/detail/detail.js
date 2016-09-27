// posts.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');

Page({
  data: {
    title: '话题详情',
    detail: {},
    hidden: false
  },
  onLoad: function (options) {
    this.fetchData(options.id);
  },
  fetchData: function (id) {
    var self = this;
    self.setData({
      hidden: false
    });
    wx.request({
      url: Api.getTopicByID(id, { mdrender: false }),
      success: function (res) {
        console.log(res);
        res.data.data.create_at = util.getDateDiff(new Date(res.data.data.create_at));
        res.data.data.replies = res.data.data.replies.map(function (item) {
            item.create_at = util.getDateDiff(new Date(item.create_at));
            return item;
          })
        self.setData({
          detail: res.data.data
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  }
})
