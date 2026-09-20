Page({
  data:{
    tip1:"请选择第1题答案",
    tip2:"请选择第2题答案",
    tip3:"请选择第3题答案",
    tip4:"请选择第4题答案"
  },
  //第一题
  q1A(){
    this.setData({tip1:"✅回答正确！起义发生于1949年11月9日"})
  },
  q1B(){
    this.setData({tip1:"❌回答错误，正确时间：1949年11月9日"})
  },

  //第二题
  q2A(){
    this.setData({tip2:"❌回答错误，正确：香港启德机场"})
  },
  q2B(){
    this.setData({tip2:"✅回答正确！飞机从香港启德机场起飞北上"})
  },

  //第三题
  q3A(){
    this.setData({tip3:"✅回答正确！两航：中国航空公司、中央航空公司"})
  },
  q3B(){
    this.setData({tip3:"❌回答错误，南方、东方航空是后来成立的航空公司"})
  },

  //第四题
  q4A(){
    this.setData({tip4:"✅回答正确！两航起义奠定新中国民航事业基础"})
  },
  q4B(){
    this.setData({tip4:"❌回答错误，这是民航，不是航天事业"})
  },

  goIndex(){
    wx.navigateBack()
  }
})