Component({
  data: {
    active: 0,
    list: [
      { pagePath: "/pages/index/index", text: "首页", icon: "🏠" },
      { pagePath: "/pages/scenic/scenic", text: "导览", icon: "🗺️" },
      { pagePath: "/pages/ai/ai", text: "AI", icon: "🤖" },
      { pagePath: "/pages/profile/profile", text: "我的", icon: "👤" }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.url;
      wx.switchTab({ url });
    }
  }
});
