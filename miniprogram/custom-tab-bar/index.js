Component({
  data: {
    active: 0,
    list: [{
      "url": "/pages/tools/tools",
      "icon":"apps-o",
      "text": "工具"
    }, {
      "url": "/pages/user/user",
      "icon":"user-o",
      "text": "我的"
    }]
  },
  methods:{
    onChange(event) {
      this.setData({ active: event.detail }); 
      let navigateUrl=this.data.list[event.detail].url;
      wx.switchTab({
        url: navigateUrl,
      })
    },
    init() {
      const page = getCurrentPages().pop();
      this.setData({
      　  active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
});