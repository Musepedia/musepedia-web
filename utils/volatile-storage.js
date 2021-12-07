const VolatileStorage = {
  /**
   * 从缓存获取数据，如果过期或找不到返回null
   * @param {String} key
   */
  get(key) {
    const obj = wx.getStorageSync(key);
    if (!obj) {
      return null;
    }
    const now = new Date().getTime();
    const {value, expire} = obj;
    if (expire <= 0 || now <= expire) {
      // 没有过期
      return value;
    }
    wx.removeStorage({
      key: key
    });
    return null;
  },
  /**
   * @param {String} key
   * @param {Number | Date} expire 过期时间 <br/>
   * 如果是 Date 则过期时间为 expire <br/>
   * 如果是 Number 则距离现在过 expire (秒)后过期， <br/>
   * 默认以及 expire<=0 时不过期
   */
  set(key, value, expire = -1) {
    const now = new Date().getTime();
    const expireTime = expire instanceof Date ?
      expire.getTime() :
      expire > 0 ? (now + expire * 1000) : -1;
    wx.setStorage({
      key: key,
      data: {
        value: value,
        expire: expireTime,
      }
    })
  },
  invalidate(key) {
    wx.removeStorage({
      key: key
    })
  },
};

export default VolatileStorage;
