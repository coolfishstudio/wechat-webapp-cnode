// posts.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');

Page({
  data: {
    title: '话题列表',
    postsList: [],
    hidden: false,
    page: 1,
    tab: 'all'
  },
  onPullDownRefresh: function () {
    this.fetchData();
    console.log('下拉刷新', new Date());
  },
  onLoad: function () {
    this.fetchData();
  },
  onTapTag: function (e) {
    var self = this;
    var tab = e.currentTarget.id;
    self.setData({
      tab: tab
    });
    if (tab !== 'all') {
      this.fetchData({tab: tab});
    } else {
      this.fetchData();
    }
  },
  fetchData: function (data) {
    var self = this;
    self.setData({
      hidden: false
    });
    if (!data) data = {};
    if (!data.page) data.page = 1;
    if (data.page === 1) {
      self.setData({
        postsList: []
      });
    }
    wx.request({
      url: Api.getTopics(data),
      success: function (res) {
        self.setData({
          postsList: self.data.postsList.concat(res.data.data.map(function (item) {
            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
            return item;
          }))
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  },
  redictDetail: function (e) {
    console.log('我要看详情');
    var id = e.currentTarget.id,
        url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
  },
  lower: function (e) {
    var self = this;
    self.setData({
      page: self.data.page + 1
    });
    if (self.data.tab !== 'all') {
      this.fetchData({tab: self.data.tab, page: self.data.page});
    } else {
      this.fetchData({page: self.data.page});
    }
  }
})
