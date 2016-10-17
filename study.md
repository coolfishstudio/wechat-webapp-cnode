> 微信应用号入门实践之cnode社区版

首先感谢cnode社区提供的api，本次实现了简单的cnode社区应用号制作。
实现了数据的读取、展示，
实现了简单的布局，
实现了下一页功能。

放上我的github地址
https://github.com/coolfishstudio/wechat-webapp-cnode

![首页列表](//dn-cnode.qbox.me/Fo4zG2Vfe50352POPZYXv8Ls0Jcc)
![内容详情](//dn-cnode.qbox.me/Fl7TiaW13s541lHZ7Crq7NxKshqG)

下面就说说我做这个的过程，不足之处，请多多指教，只愿为进步。

## 1.创建项目

首先，在官网下载工具，[下载地址](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=1474887501214) 我的是选择mac版本0.9.092300。

然后跟着官方的[简版教程](https://mp.weixin.qq.com/debug/wxadoc/dev/?t=1474887501301) 创建一个项目。

#### 注：现在官方的工具支持无appid创建项目。

##### 1.打开开发者工具，选择“添加项目”
![](//dn-cnode.qbox.me/FsqxRNIzNDyzItbl-vhAFPr0J5t2)
##### 2.选择无appid，填写地址，创建项目
![](//dn-cnode.qbox.me/Fp098WRAyxgJ415Dt_f0YGhjIMHr)
##### 3.创建成功，看到默认的Demo项目页面
![](//dn-cnode.qbox.me/FuvUmKfcUu8MeLc4eeuwNBfkbfMC)

## 2.配置
默认的项目里已经没有关于tabBar的配置信息，所以为了学习，我把这个配置进行了修改。

首先关于配置的说明同样来自于[官方](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html?t=1474887501556) 

注意：官方的代码有些字段是不一样的，小心被坑。

```
{
  "pages":[
    "pages/index/index",
    "pages/logs/logs"
  ],
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "WeChat",
    "navigationBarTextStyle":"black"
  },
  "tabBar":{
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    }, {
      "pagePath": "pages/logs/logs",
      "text": "日志"
    }]
  }
}

```
增加了tabBar, 查看调试
![](//dn-cnode.qbox.me/Fl-OboTDeCULcPbs5BiM81nj_Xrc)
看界面是如此的简陋，为此针对tabBar参考官方说明进行了简单的美化。

```
 "tabBar":{
    "color":"#272636",
    "selectedColor":"#80bd01",
    "backgroundColor":"#fff",
    "borderStyle":"white",
    "list":[{
      "pagePath":"pages/index/index",
      "text":"首页",
      "iconPath":"images/tabBar/my.png",
      "selectedIconPath":"images/tabBar/my_hl.png"
    },{
      "pagePath":"pages/index/index",
      "text":"我的",
      "iconPath":"images/tabBar/list.png",
      "selectedIconPath":"images/tabBar/list_hl.png"
    }]
  }
```
效果如图
![](//dn-cnode.qbox.me/FjzwAq6RH5TstCXIYb5ZIt6z3cuj)
最后根据文档，对默认页面的窗口表现进行了修改

```
  "window":{
    "backgroundTextStyle":"black",
    "backgroundColor":"#fff",
    "navigationBarBackgroundColor":"#000",
    "navigationBarTitleText":"CNODE 应用号版",
    "navigationBarTextStyle":"white",
    "enablePullDownRefresh":"true"
  },
```
效果如图
![](//dn-cnode.qbox.me/Fl4S7o2m50JXXt1xebSgq1pNR_iX)
整体配置文件为

```
{
  "pages":[
    "pages/index/index",
    "pages/logs/logs"
  ],
  "window":{
    "backgroundTextStyle":"black",
    "backgroundColor":"#fff",
    "navigationBarBackgroundColor":"#000",
    "navigationBarTitleText":"CNODE 应用号版",
    "navigationBarTextStyle":"white",
    "enablePullDownRefresh":"true"
  },
  "tabBar":{
    "color":"#272636",
    "selectedColor":"#80bd01",
    "backgroundColor":"#fff",
    "borderStyle":"white",
    "list":[{
      "pagePath":"pages/index/index",
      "text":"首页",
      "iconPath":"images/tabBar/my.png",
      "selectedIconPath":"images/tabBar/my_hl.png"
    },{
      "pagePath":"pages/index/index",
      "text":"我的",
      "iconPath":"images/tabBar/list.png",
      "selectedIconPath":"images/tabBar/list_hl.png"
    }]
  }
}
```
## 3.制作首页列表
根据官方要求，我在pages文件夹内创建了topics文件夹，并创建了对应了 topics.js、topics.wxml、topics.wxss 三个文件。

### 1.注册页面
首先在配置文件里注册这个topics,

```
  "pages":[
    "pages/topics/topics",
    "pages/index/index",
    "pages/logs/logs"
  ],
```
并且制定tabBar点击跳到对应的topics页面

```
  "tabBar":{
    "color":"#272636",
    "selectedColor":"#80bd01",
    "backgroundColor":"#fff",
    "borderStyle":"white",
    "list":[{
      "pagePath":"pages/topics/topics",
      "text":"首页",
      "iconPath":"images/tabBar/my.png",
      "selectedIconPath":"images/tabBar/my_hl.png"
    },{
      "pagePath":"pages/index/index",
      "text":"我的",
      "iconPath":"images/tabBar/list.png",
      "selectedIconPath":"images/tabBar/list_hl.png"
    }]
  }
```
##### 注意：我发现注册页面的顺序会影响到默认显示tabBar的顺序，所以我把`"pages/topics/topics"`放到了`"pages/index/index"`的前面

然后编写topics.js

```
Page({
  data: {
    title: '首页列表'
  },
  onLoad: function () {
    console.log('onLoad by topics');
  }
});
```

以及topics.wxml文件

```
<view class="topics-main">
  测试首页列表界面
</view>
```
和topics.wxss文件

```
.topics-main {
  background: #f60;
  height: 100%;
}
```
最后效果如图
![](//dn-cnode.qbox.me/FiunQ0XhES_sidHnkBN9YxABF2iI)

### 2.创建请求
根据文档[请求数据](https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html?t=1474887499445)，在util文件夹内创建一个api.js文件，专门进行数据请求处理。

```
'use strict';
var HOST_URI = 'https://cnodejs.org/api/v1';

var GET_TOPICS = '/topics';
var GET_TOPIC_BY_ID = '/topic/';

function obj2uri (obj) {
    return Object.keys(obj).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
    }).join('&');
}

module.exports = {
    // 获取列表数据
    getTopics: function (obj) {
        return HOST_URI + GET_TOPICS + '?' + obj2uri(obj);
    },
    // 获取内容页数据
    getTopicByID: function (id, obj) {
        return HOST_URI + GET_TOPIC_BY_ID + id + '?' + obj2uri(obj);
    }
};
```
修改topics.js

```
var Api = require('../../utils/api.js');

Page({
  data: {
    title: '首页列表'
  },
  onLoad: function () {
    console.log('onLoad by topics');
    this.fetchData();// 获取数据
  },
  fetchData: function (data) {
    // 处理参数
    if (!data) data = {};
    if (!data.page) data.page = 1;
    wx.request({
      url: Api.getTopics(data),
      success: function (res) {
        console.log(res);
      }
    });
  }
});
```
效果如图
![](//dn-cnode.qbox.me/FoonyAMQBgqDpiTKZshoB3ZmnUEU)
成功拿到了数据。

### 3.完善首页列表
拿到了数据，也能修改界面，那么就直接完善这个首页吧

代码就不放了，直接上图
![](//dn-cnode.qbox.me/Fo4zG2Vfe50352POPZYXv8Ls0Jcc)
我认为这里值得说的大概只有loading、循环、传参、下一页和页面跳转了。
#### 1.loading
```
  <loading hidden="{{hidden}}">
    加载中...
  </loading>
```
在topics.wxml中写官方提供的loading组件，根据在topics.js中对hidden值的修改，来触发loading。
#### 2.循环数据，展示列表
文档提供了[列表渲染](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/list.html?t=1474887501556)

通过`wx:for`实现列表的渲染。

##### 注意: 默认数组的当前项的下标变量名默认为index，数组当前项的变量名默认为item。
```
<block wx:for="{{postsList}}">
  <view class="posts-item" index="{{index}}" id="{{item.id}}" catchtap="redictDetail">
    <view class="author">
      <image class="author-avatar" src="{{item.author.avatar_url}}"></image>
      <view class="author-name">{{item.author.loginname}}</view>
      <view class="posts-tag hot" wx:if="{{item.top === true}}">置顶</view>
      <view class="posts-tag" wx:if="{{item.good === true}}">精华</view>
      <view class="posts-last-reply">{{item.last_reply_at}}</view>
    </view>
    <view class="posts-title">{{item.title}}</view>
    <view class="bar-info">
      <view class="bar-info-item">
        <image class="bar-info-item-icon" src="/images/icon/reply.png"></image>
        <view class="bar-info-item-number">{{item.reply_count}}</view>
      </view>
      <view class="bar-info-item">
        <image class="bar-info-item-icon" src="/images/icon/visit.png"></image>
        <view class="bar-info-item-number">{{item.visit_count}}</view>
      </view>
    </view>
  </view>
</block>
```

附上一个没有样式的列表展现
![](//dn-cnode.qbox.me/FkoTZY1Q9kqOWa1-e70FHifzHVo7)

#### 3.传参，实现tab切换
根据cnode的api可以知道通过tab不同的值，获得到不同标签下的内容列表。

所以 在页面的最上面 tab 栏中

```
  <view class="top-bar">
    <view class="top-bar-item" id="all" catchtap="onTapTag">全部</view>
    <view class="top-bar-item" id="good" catchtap="onTapTag">精华</view>
    <view class="top-bar-item" id="share" catchtap="onTapTag">分享</view>
    <view class="top-bar-item" id="ask" catchtap="onTapTag">问答</view>
    <view class="top-bar-item" id="job" catchtap="onTapTag">招聘</view>
  </view>
```

将id进行定义，通过获取id拿到对应的tab类型。

其中`catchtap`是事件绑定。

bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡。

在topics.js获取

```
  onTapTag: function (e) {
    var self = this;
    var tab = e.currentTarget.id;
    // 这里就能获取到不同的tab值了
    self.setData({
      tab: tab
    });
    if (tab !== 'all') {
      this.fetchData({tab: tab});
    } else {
      this.fetchData();
    }
  },
```
#### 4.下一页的实现
根据文档，组件的视图容器中有[scroll-view](https://mp.weixin.qq.com/debug/wxadoc/dev/component/scroll-view.html?t=1474887496374)这个可滚动视图区域。
##### 注意：使用竖向滚动时，需要给<scroll-view/>一个固定高度。
```
<scroll-view class="posts-list" style="height:100%" scroll-y="true" bindscrolltolower="lower">
  <block wx:for="{{postsList}}">
    ...
  </block>
</scroll-view>
```
topics.js文件

```
  lower: function (e) {
    var self = this;
    // 修改当前页码
    self.setData({
      page: self.data.page + 1
    });
    // 判断当前页的tab值 进行请求数据
    if (self.data.tab !== 'all') {
      this.fetchData({tab: self.data.tab, page: self.data.page});
    } else {
      this.fetchData({page: self.data.page});
    }
  }
```
#### 5.跳页的实现
在`posts-item`中已经进行了事件绑定。利用`wx.navigateTo`实现页面的跳转。
##### 注意：一个应用同时只能打开5个页面，当已经打开了5个页面之后，wx.navigateTo不能正常打开新页面。
```
redictDetail: function (e) {
  console.log('我要看详情');
  var id = e.currentTarget.id,
      url = '../detail/detail?id=' + id;
      // 这里的detail是需要创建对应的文件，以及页面注册的
  wx.navigateTo({
    url: url
  })
},
```
### 4.实现详情页
同样的原理，创建detail文件，并注册，获取数据，并美化页面。
![](//dn-cnode.qbox.me/FmJ5n5-t3gLCfFQTpbzIBS1_ag2L)

### 5.总结
* 微信小应用页面的脚本逻辑在是在JsCore中运行，JsCore是一个没有窗口对象的环境，所以不能再脚本中使用window，也无法在脚本中操作组件
* 同样不能用jquery
* 也不能操作dom
* 部分标签不支持，比如 h1-h6 会编译报错。
* 暂时没找到解决富文本详情页显示的办法。
* 整体下来，感觉开发简单，限制很多。
* 写过react的看这个确实比较简单。

放上我的github地址
[https://github.com/coolfishstudio/wechat-webapp-cnode](https://github.com/coolfishstudio/wechat-webapp-cnode)

最后感谢：cnode社区和博卡君

附上 博卡君的教程

[全球首个微信应用号开发教程！通宵吐血赶稿，每日更新！](https://my.oschina.net/wwnick/blog/750055)

[博卡君的应用号（小程序）开发教程首发第二弹！（0923）](https://my.oschina.net/wwnick/blog/750495)

[第三弹！全球首个微信应用号开发教程！通宵吐血赶稿，每日更新！](https://my.oschina.net/wwnick/blog/750974)

[第四弹！全球首个微信应用号开发教程！通宵吐血赶稿，每日更新！](https://my.oschina.net/wwnick/blog/751826)

[第五弹！全球首个微信应用号开发教程！通宵吐血赶稿，每日更新！](https://my.oschina.net/wwnick/blog/752421)

[第六弹！全球首个微信小程序（应用号）开发教程！通宵吐血赶稿！](https://my.oschina.net/wwnick/blog/753597)
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
总结一下我遇到的问题
1.页面没有注册 那么 template 模版无法传递数据 拿不到动态数据 但是能使用wxss
2.进度条注意右侧百分号 100%的时候 进度条缩短
3.轮播图加上属性vertical="vertical/horizontal" 可以修改布局方向，文档没说
4.有关icon，文档提供默认的只有9个，实际目前测出有15个 success, info, warn, waiting, safe_success, safe_warn,success_circle, success_no_circle, waiting_circle, circle, download,info_circle, cancel, search, clear

最后
新版的已经不支持100%了 刚刚测试 0.10.101100 版本 100% 失效了  
不过 给scroll-view 的页面里加样式  
page {height: 100%} 依旧可以使用100%  