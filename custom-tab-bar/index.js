Component({
  data: {
    active: 0,
    list: [
      { pagePath: "/pages/index/index", text: "首页", icon: "home", iconText: "⌂" },
      { pagePath: "/pages/scenic/scenic", text: "导览", icon: "guide", iconText: "◎" },
      { pagePath: "/pages/ai/ai", text: "AI", icon: "ai", iconText: "◇" },
      { pagePath: "/pages/profile/profile", text: "我的", icon: "profile", iconText: "☺" }
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
