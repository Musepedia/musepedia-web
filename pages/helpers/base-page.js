export function BasePage(config){
  const {onShow, onUnload } = config;

  config.data.__globalFontSize = 'system';

  // hook onShow()
  config.onShow = function(){
    // 先执行page自己onShow
    if(onShow) {
      onShow.call(this);
    }

    // 再执行每个page默认的onLoad
    const fontSize = wx.getStorageSync('globalFontSize') || 'system';
    this.setData({
      __globalFontSize: fontSize
    })

  }

  return Page(config);
}

export default BasePage;