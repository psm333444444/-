Page({
  data: {
    messages: [
      { role: 'bot', content: '您好！我是两航起义纪念馆AI助手，有什么可以帮助您的吗？' }
    ],
    inputValue: '',
    scrollToView: ''
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ active: 2 });
    }
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  sendMessage() {
    const content = this.data.inputValue.trim();
    if (!content) return;

    // 添加用户消息
    const messages = this.data.messages;
    messages.push({ role: 'user', content: content });

    this.setData({
      messages: messages,
      inputValue: ''
    });

    // 模拟AI回复
    setTimeout(() => {
      const reply = this.getAIReply(content);
      messages.push({ role: 'bot', content: reply });
      this.setData({
        messages: messages,
        scrollToView: 'msg-' + (messages.length - 1)
      });
    }, 500);
  },

  getAIReply(question) {
    const q = question.toLowerCase();
    if (q.includes('时间') || q.includes('几点') || q.includes('开放')) {
      return '纪念馆开放时间为周二至周五 09:00-11:30，13:30-16:30。周一、周六、周日闭馆。';
    } else if (q.includes('地址') || q.includes('在哪') || q.includes('位置')) {
      return '纪念馆位于天津市东丽区张贵庄老机场，您可以在导览页面查看地图导航。';
    } else if (q.includes('门票') || q.includes('免费') || q.includes('收费')) {
      return '两航起义纪念馆免费开放，无需购票。';
    } else if (q.includes('历史') || q.includes('起义') || q.includes('两航')) {
      return '1949年11月9日，中国航空公司和中央航空运输公司的2000多名员工在香港宣布起义，回归祖国怀抱。这一壮举被称为"两航起义"。';
    } else if (q.includes('交通') || q.includes('怎么去') || q.includes('路线')) {
      return '您可以在导览页面点击"打开地图导航"获取详细路线。';
    } else {
      return '感谢您的提问！如需了解更多关于两航起义的信息，欢迎参观纪念馆或查看历史页面。';
    }
  }
});
