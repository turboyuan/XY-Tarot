// pages/selectCard/selectCard.js
//获取应用实例
var app = getApp()
var allCard = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9', 'card10',
  'card11', 'card12', 'card13', 'card14', 'card15', 'card16', 'card17', 'card18', 'card19', 'card20',
  'card21', 'card22', 'card23', 'card24', 'card25', 'card26', 'card27', 'card28', 'card29', 'card30',
  'card31', 'card32', 'card33', 'card34', 'card35', 'card36', 'card37', 'card38', 'card39', 'card40',
  'card41', 'card42', 'card43', 'card44'];
var backCardImage = "../images/cardbg.jpg"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardNumber:0,
    clickNum: 0,      // 点击次数
    checked: 0,       // 已匹配牌数
    allCard: allCard,    // 全部卡牌数组
    backImage: '../images/cardbg.jpg',
    firstX: -1,        // 点击的第一张卡牌的坐标 
    firstY: -1,
    cards: [],        // 随机挑选出来的牌   
    size: 44,        // 界面显示的牌数=size*2
    clickable: true,    // 当前是否可点击
    wheelRotation: 0,
    isShuffling: false,
    selectedCard: null,
    isTransitioning: false
  },


startGame: function() {
    var tmp = this.data.allCard.sort(function(a, b) { 
      return Math.random() > 0.5 ? -1 : 1;
    });

    var cards = tmp.map(card => ({
      src: '../images/' + card + '.jpg',
      state: 0,
      shuffling: false,
      spreading: false
    }));

    this.setData({
      cards: cards,
      wheelRotation: 0,
      isShuffling: false,
      selectedCard: null,
      clickable: true,
      isTransitioning: false
    });
  },

  shuffleCards: function() {
    if (this.data.isShuffling) return;
    
    this.setData({
      isShuffling: true,
      clickable: false
    });

    // 开始洗牌动画
    const cards = this.data.cards.map(card => ({
      ...card,
      shuffling: true,
      spreading: false
    }));
    this.setData({ cards });

    // 洗牌过程
    setTimeout(() => {
      // 打乱牌序
      const shuffledCards = cards.sort(() => Math.random() - 0.5);
      
      // 结束洗牌动画，开始展开动画
      const spreadingCards = shuffledCards.map(card => ({
        ...card,
        shuffling: false,
        spreading: true
      }));
      
      this.setData({ cards: spreadingCards });

      // 展开动画完成后
      setTimeout(() => {
        const finalCards = spreadingCards.map(card => ({
          ...card,
          spreading: false
        }));
        
        this.setData({
          cards: finalCards,
          isShuffling: false,
          clickable: true
        });
      }, 1500);
    }, 1500);
  },

  onTap: function(e) {
    if (!this.data.clickable) return;
    
    const index = e.currentTarget.dataset.index;
    const card = this.data.cards[index];
    
    // 更新选中状态
    const cards = this.data.cards.map((item, i) => ({
      ...item,
      selected: i === index
    }));
    
    this.setData({ 
      cards,
      clickable: false
    });

    // 等待选中动画完成
    setTimeout(() => {
      // 跳转到结果页面，确保传递正确的参数
      const cardNumber = card.number > 22 ? card.number - 22 : card.number;
      wx.navigateTo({
        url: `/pages/resultPage/resultPage?cardNumber=${cardNumber}&cardStatus=${card.status}`,
        success: () => {
          console.log('Navigation success with card:', {
            number: cardNumber,
            status: card.status
          });
        },
        fail: (err) => {
          console.error('Navigation failed:', err);
        }
      });
    }, 1000);
  },
  
  turnAllBack: function () {
    for (var ix in this.data.cards)
      for (var iy in this.data.cards[ix])
        this.data.cards[ix][iy].state = 0;
    this.setData({ cards: this.data.cards });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '欣月塔罗'
    });
    
    // 初始化卡牌数据
    const cards = this.data.allCard.map((card, index) => {
      const cardNumber = parseInt(card.replace('card', ''));
      return {
        src: '../images/' + card + '.jpg',
        state: 0,
        shuffling: false,
        spreading: false,
        selected: false,
        name: card,
        number: cardNumber,
        status: cardNumber > 22 ? '逆位' : '正位'
      };
    });
    
    this.setData({
      cards: cards,
      wheelRotation: 0,
      isShuffling: false,
      selectedCard: null,
      clickable: true,
      isTransitioning: false
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.cardNumber = this.random();
    console.log("onShow");
    this.startGame();
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 产生随机数
   */
  random:function(){
    var max = 0;
    var min = 44;
    var diff = max - min;
    var number = Math.ceil(Math.random() * diff + min);
    return number;
  },

result: function () {
  wx.setStorageSync("cardNumber", this.data.cardNumber);
  wx.navigateTo({ url: '../resultPage/resultPage'})
  },

turn:function(elem){
  var cls = elem.className;
  //判断"photo_front"是否在cls中
  if( /photo_front /.test(cls)){   
  //判断"photo_front"是否在cls中
  cls = cls.replace(/photo_front/, 'photo_back')
}else{
  cls = cls.replace(/photo_back/, 'photo_front')
}
return elem.className = cls;
},

startMSG:function(){
  wx.showToast({
    title: '静下心来，心中默念，然后选择一张塔罗牌',
    icon: 'loading',
    duration: 1500
  })

},

spinWheel: function() {
  if (this.data.isSpinning) return;
  
  this.setData({
    isSpinning: true
  });

  // 随机旋转角度，确保至少转几圈
  const minRotation = 1080; // 至少转3圈
  const maxRotation = 1800; // 最多转5圈
  const randomRotation = Math.floor(Math.random() * (maxRotation - minRotation + 1)) + minRotation;
  
  this.setData({
    wheelRotation: this.data.wheelRotation + randomRotation
  });

  // 3秒后停止旋转
  setTimeout(() => {
    this.setData({
      isSpinning: false
    });
  }, 3000);
},

selectCard: function(e) {
  const index = e.currentTarget.dataset.index;
  const card = this.data.cards[index];
  
  // 更新选中状态
  const cards = this.data.cards.map((item, i) => ({
    ...item,
    selected: i === index
  }));
  
  this.setData({ cards });
  
  // 跳转到结果页面，传递完整的卡牌信息
  wx.navigateTo({
    url: `/pages/resultPage/resultPage?card=${card.name}&number=${card.number}&status=${card.status}`
  });
},

})

