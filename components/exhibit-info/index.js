import { stringify } from "qs"

// components/exhibit-info/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: 'default title'
    },
    content: {
      type: String,
      value: 'default content',
    },
    show: {
      type: Boolean,
      value: false
    },
    play: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    focusOnKeyboard: false,
    playing: false,
    audio: wx.createInnerAudioContext()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({
        show: false
      })
    },

    showPopup() {
      this.setData({
        show: true
      })
    },
    inferQuestion() {
      this.onClose();
      this.setData({
        focusOnKeyboard: true
      });
      // ！bug 获取键盘位置并onFocus
      const query = wx.createSelectorQuery();
      query.select('.basic-input').boundingClientRect();
      query.exec(function (res) {
        console.log(res);
      })
    }, 
    getMoreMediaInfo() {
      // ! bug 按下播放，再次按下暂停音频播放
      const audio = wx.createInnerAudioContext();
      audio.src = "https://www.snhm.org.cn:/museum/uploadFiles/exhibit/d72e2194-30b8-4ece-b28f-a727a72c97de.mp3";
      console.log(audio.paused);
      audio.paused ? audio.play() : audio.pause();
    }
  }
})
