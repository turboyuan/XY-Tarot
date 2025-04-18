// 塔罗牌数据管理类
const TarotData = {
  // 获取卡牌名称
  getCardName: function(number) {
    const names = {
      "1": "魔术师 The Magician",
      "2": "女祭司 The High Priestess",
      "3": "皇后 The Empress",
      "4": "皇帝 The Emperor",
      "5": "教皇 The Hierophant",
      "6": "恋人 The Lovers",
      "7": "战车 The Chariot",
      "8": "力量 Strength",
      "9": "隐士 The Hermit",
      "10": "命运之轮 Wheel Of Fortune",
      "11": "正义 Justice",
      "12": "倒吊者 The Hanged Man",
      "13": "死神 Death",
      "14": "节制 Temperance",
      "15": "恶魔 The Devil",
      "16": "高塔 The Tower",
      "17": "星星 The Stars",
      "18": "月亮 The Moon",
      "19": "太阳 The Sun",
      "20": "审判 Judgement",
      "21": "世界 The World",
      "22": "愚人 The Fool"
    };
    return names[number] || '';
  },

  // 获取卡牌关键字
  getCardKeyword: function(number) {
    const keywords = {
      "1": "沟通、学习、交流",
      "2": "等待、理性、消极、静止",
      "3": "高贵、热情、丰收",
      "4": "开创、竞争、权力",
      "5": "宗教、传统仪式、权威",
      "6": "选择、爱情、罗曼蒂克",
      "7": "保护、防御、安全感",
      "8": "意志、自律、胜利",
      "9": "谨慎、内敛、自省",
      "10": "契机、进展、运气",
      "11": "公正、均衡、法律",
      "12": "牺牲、等待、以退为进",
      "13": "结束、转变、关口、蜕变",
      "14": "协调、配合、节制、净化",
      "15": "欲望、束缚、沉溺、物质",
      "16": "死亡、毁灭、结束",
      "17": "希望、祝福、远方",
      "18": "不安、多变、忧郁、情绪化",
      "19": "纯真、智慧、创造力",
      "20": "衡量、审判、结果",
      "21": "起点及终点、远方、自由",
      "22": "开始、大胆、好奇、旅行"
    };
    return keywords[number] || '';
  },

  // 获取卡牌星相
  getCardZodiac: function(number) {
    const zodiacs = {
      "1": "水星",
      "2": "月亮",
      "3": "金星",
      "4": "牧羊座",
      "5": "金牛座",
      "6": "双子座",
      "7": "巨蟹座",
      "8": "狮子座",
      "9": "处女座",
      "10": "木星",
      "11": "天秤座",
      "12": "海王星",
      "13": "天蝎座",
      "14": "射手座",
      "15": "摩羯座",
      "16": "火星",
      "17": "水瓶座",
      "18": "双鱼座",
      "19": "太阳",
      "20": "冥王星",
      "21": "土星",
      "22": "天王星"
    };
    return zodiacs[number] || '';
  },

  // 获取卡牌四要素
  getCardElement: function(number) {
    const elements = {
      "1": "风",
      "2": "水",
      "3": "土",
      "4": "火",
      "5": "土",
      "6": "风",
      "7": "水",
      "8": "火",
      "9": "土",
      "10": "火",
      "11": "风",
      "12": "水",
      "13": "水",
      "14": "火",
      "15": "土",
      "16": "火",
      "17": "风",
      "18": "水",
      "19": "火",
      "20": "水",
      "21": "土",
      "22": "风"
    };
    return elements[number] || '';
  },

  // 获取卡牌象征
  getCardSymbol: function(number) {
    const symbols = {
      "1": "魔术师代表我们的智慧之光，拥有聪明的头脑，懂得善加发挥自己的能力，来掌握自己的命运，活出多采多姿的人生。",
      "2": "女祭司代表我们深层潜意识的灵性直觉，她喜欢静静一个人体会内心的感受，不想受到别人的打扰。",
      // ... 其他卡牌的象征可以继续添加
    };
    return symbols[number] || '';
  },

  // 获取卡牌含义
  getCardMeaning: function(number, status) {
    const meanings = {
      "1": {
        "正位": "基本含义——受好奇心驱使展开调查研究、具有独创性、具备发展潜力、展开新的计划并获得成功、幸福的开始。",
        "逆位": "基本含义——犹豫不决、因学艺不精而败北、看待事物过于消极、易受骗上当、遇事光说不练。"
      },
      "2": {
        "正位": "基本含义——有良知的、文静的、知性的、具备敏锐的洞察力、理性的、富有研究精神、有正确的时机或人将出现的预感。",
        "逆位": "基本含义——缺乏理性思维能力、粗心大意、因精神压抑以致歇斯底里、易紧张、神经质、意气用事。"
      }
      // ... 其他卡牌的含义可以继续添加
    };
    return meanings[number] ? meanings[number][status] || '' : '';
  },

  // 获取完整的卡牌信息
  getCardInfo: function(number, status) {
    return {
      name: this.getCardName(number),
      keyword: this.getCardKeyword(number),
      zodiac: this.getCardZodiac(number),
      element: this.getCardElement(number),
      symbol: this.getCardSymbol(number),
      meaning: this.getCardMeaning(number, status)
    };
  }
};

module.exports = TarotData; 