Page({
  data: {
    messages: [],
    inputValue: '',
    scrollToView: '',
    isTyping: false,
    isFocused: false,
    quickQuestions: [
      '两航起义是什么？',
      '纪念馆在哪？',
      '开放时间？',
      '怎么去？',
      '免费参观吗？',
      '起义历史意义？'
    ],
    currentHour: 0
  },

  onLoad() {
    this.setData({ currentHour: new Date().getHours() });
    this.initMessages();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ active: 2 });
    }
  },

  initMessages() {
    const hour = this.data.currentHour;
    let greeting = '您好';
    if (hour < 6) greeting = '夜深了';
    else if (hour < 12) greeting = '上午好';
    else if (hour < 14) greeting = '中午好';
    else if (hour < 18) greeting = '下午好';
    else greeting = '晚上好';

    const welcomeMsg = {
      role: 'bot',
      content: `${greeting}！我是两航起义纪念馆AI助手 🤖\n\n我可以为您解答关于两航起义历史、纪念馆参观等问题。请问有什么可以帮助您的？`,
      time: this.getTime()
    };
    this.setData({ messages: [welcomeMsg] });
  },

  getTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  onFocus() {
    this.setData({ isFocused: true });
  },

  onBlur() {
    this.setData({ isFocused: false });
  },

  sendQuickQuestion(e) {
    const question = e.currentTarget.dataset.question;
    this.setData({ inputValue: question });
    this.sendMessage();
  },

  sendMessage() {
    const content = this.data.inputValue.trim();
    if (!content || this.data.isTyping) return;

    // 添加用户消息
    const messages = this.data.messages;
    messages.push({
      role: 'user',
      content: content,
      time: this.getTime()
    });

    this.setData({
      messages: messages,
      inputValue: '',
      scrollToView: 'msg-' + (messages.length - 1)
    });

    // 显示正在输入
    this.setData({ isTyping: true });

    // 模拟AI思考和回复
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const reply = this.getAIReply(content);
      messages.push({
        role: 'bot',
        content: reply.text,
        time: this.getTime(),
        action: reply.action || null
      });

      this.setData({
        messages: messages,
        isTyping: false,
        scrollToView: 'msg-' + (messages.length - 1)
      });

      // 保存对话历史
      this.saveHistory();
    }, delay);
  },

  getAIReply(question) {
    const q = question.toLowerCase();

    // 关于两航起义
    if (q.includes('两航起义') || q.includes('什么是') || q.includes('介绍') || q.includes('了解')) {
      return {
        text: '两航起义是1949年11月9日发生的重要历史事件。\n\n📌 核心要点：\n• 中国航空公司和中央航空运输公司2000多名员工在香港宣布起义\n• 12架民航客机飞回祖国大陆\n• 这是新中国民航事业的起点\n\n您可以在"历史"页面查看完整故事。'
      };
    }

    // 起义过程
    if (q.includes('过程') || q.includes('经过') || q.includes('怎么') && q.includes('发生')) {
      return {
        text: '📜 起义过程：\n\n1️⃣ 1949年11月9日凌晨，两航员工在香港启德机场集合\n2️⃣ 12架飞机分批起飞，避开国民党控制区域\n3️⃣ 其中1架飞往北京，11架降落天津张贵庄机场\n4️⃣ 留港员工通电宣布脱离国民党政权\n\n整个行动组织严密，是中国近代史上的爱国壮举。'
      };
    }

    // 历史意义
    if (q.includes('意义') || q.includes('影响') || q.includes('作用') || q.includes('为什么重要')) {
      return {
        text: '🌟 两航起义的历史意义：\n\n✅ 新中国民航事业的起点\n✅ 为国内航线开辟奠定基础\n✅ 培养了第一批航空技术人才\n✅ 展现了爱国员工的崇高精神\n✅ 保存了大量航空器材和物资\n\n两航起义在中国航空史上具有里程碑意义。'
      };
    }

    // 重要人物
    if (q.includes('人物') || q.includes('谁') || q.includes('领导者') || q.includes('飞行员')) {
      return {
        text: '👤 起义主要人物：\n\n• 刘敬宜 - 中国航空公司总经理\n• 陈卓林 - 中央航空公司总经理\n• 吕明 - 起义主要组织者之一\n\n还有2000多名爱国员工参与起义，他们为中国民航事业做出了巨大贡献。'
      };
    }

    // 纪念馆位置
    if (q.includes('在哪') || q.includes('地址') || q.includes('位置') || q.includes('地点') || q.includes('地方')) {
      return {
        text: '📍 纪念馆地址：\n天津市东丽区张贵庄老机场\n\n点击下方按钮可直接导航前往 👇',
        action: { type: 'navigate', page: 'scenic', label: '打开导览' }
      };
    }

    // 开放时间
    if (q.includes('时间') || q.includes('几点') || q.includes('开放') || q.includes('营业')) {
      return {
        text: '🕐 开放时间：\n\n周二至周五：\n• 上午 09:00 - 11:30\n• 下午 13:30 - 16:30\n\n周一、周六、周日闭馆\n（法定节假日除外）\n\n建议您在工作日前往参观。'
      };
    }

    // 门票
    if (q.includes('门票') || q.includes('免费') || q.includes('收费') || q.includes('多少钱') || q.includes('票价')) {
      return {
        text: '🎫 门票信息：\n\n两航起义纪念馆免费开放，无需购票！\n\n您只需在开放时间内前往即可参观。\n\n⚠️ 注意：请携带有效身份证件。'
      };
    }

    // 交通路线
    if (q.includes('交通') || q.includes('怎么去') || q.includes('路线') || q.includes('公交') || q.includes('地铁') || q.includes('开车')) {
      return {
        text: '🚗 交通指南：\n\n📍 地址：天津市东丽区张贵庄老机场\n\n🚇 地铁：可乘坐地铁2号线至相关站点\n🚌 公交：多路公交可达\n🚗 自驾：导航至"两航起义纪念馆"\n\n点击下方按钮获取导航 👇',
        action: { type: 'navigate', page: 'scenic', label: '打开地图' }
      };
    }

    // 参观时长
    if (q.includes('多久') || q.includes('多长时间') || q.includes('游览时间') || q.includes('参观时间')) {
      return {
        text: '⏱️ 参观时长建议：\n\n• 快速参观：约30分钟\n• 详细了解：约1-1.5小时\n• 深度学习：约2小时以上\n\n馆内有丰富的历史资料和展品，建议预留充足时间。'
      };
    }

    // 联系方式
    if (q.includes('电话') || q.includes('联系') || q.includes('咨询') || q.includes('客服')) {
      return {
        text: '📞 联系方式：\n\n咨询电话：022-XXXXXXXX\n\n工作时间：周二至周五 9:00-16:30\n\n如需了解更多，可关注纪念馆官方公众号。'
      };
    }

    // 问答/知识
    if (q.includes('问答') || q.includes('测试') || q.includes('答题') || q.includes('知识')) {
      return {
        text: '📝 知识问答功能已上线！\n\n您可以在"我的"页面进入"知识问答"，测试您对两航起义历史的了解程度。\n\n答对题目还有积分奖励哦！',
        action: { type: 'navigate', page: 'quiz', label: '开始答题' }
      };
    }

    // 历史页面
    if (q.includes('历史') || q.includes('故事') || q.includes('详细')) {
      return {
        text: '📖 两航起义历史故事：\n\n1949年11月9日，2000多名爱国员工用行动诠释了什么是家国情怀。\n\n点击下方按钮查看完整历史 👇',
        action: { type: 'navigate', page: 'history', label: '查看历史' }
      };
    }

    // 感谢
    if (q.includes('谢谢') || q.includes('感谢') || q.includes('多谢') || q.includes('thanks')) {
      return {
        text: '不客气！很高兴能帮到您 😊\n\n如果还有其他问题，随时可以问我。\n\n祝您参观愉快！🏛️'
      };
    }

    // 打招呼
    if (q.includes('你好') || q.includes('hi') || q.includes('hello') || q.includes('嗨')) {
      return {
        text: '您好！👋 很高兴为您服务。\n\n我是两航起义纪念馆AI助手，可以为您解答：\n• 两航起义历史\n• 纪念馆参观信息\n• 交通路线等\n\n请问有什么可以帮您的？'
      };
    }

    // 默认回复
    return {
      text: '感谢您的提问！\n\n我主要可以帮您解答关于：\n• 两航起义历史\n• 纪念馆参观信息\n• 交通路线等问题\n\n您可以点击下方快捷问题，或直接输入您的疑问。'
    };
  },

  handleAction(e) {
    const action = e.currentTarget.dataset.action;
    if (!action) return;

    if (action.type === 'navigate') {
      if (action.page === 'scenic') {
        wx.switchTab({ url: '/pages/scenic/scenic' });
      } else {
        wx.navigateTo({ url: `/pages/${action.page}/${action.page}` });
      }
    }
  },

  clearChat() {
    wx.showModal({
      title: '清空对话',
      content: '确定要清空所有对话记录吗？',
      success: (res) => {
        if (res.confirm) {
          this.initMessages();
          wx.showToast({ title: '已清空', icon: 'success' });
        }
      }
    });
  },

  saveHistory() {
    try {
      const history = this.data.messages.slice(-20); // 保存最近20条
      wx.setStorageSync('ai_chat_history', history);
    } catch (e) {
      console.log('保存历史失败');
    }
  },

  loadHistory() {
    try {
      const history = wx.getStorageSync('ai_chat_history');
      if (history && history.length > 0) {
        this.setData({ messages: history });
        return true;
      }
    } catch (e) {
      console.log('加载历史失败');
    }
    return false;
  }
});
