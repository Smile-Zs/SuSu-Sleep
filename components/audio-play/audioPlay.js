// 创建一个播放对象
const myaudio = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tridPlay: true,// 播放的flag
    duration: '06:11',// 播放时长     时间格式
    current:'00:00',// 当前播放时长   时间格式
    durationNum:0,// 播放时长数字     数字格式
    currentNum:0// 当前播放时长数字   数字格式
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this
    myaudio.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
    myaudio.onTimeUpdate(function(){
      let durationnum = parseInt(myaudio.duration)
      let time = that.formatSeconds(myaudio.duration)
      that.setData({
        duration: time,
        durationNum: durationnum,
      })
      that.changeCurrent(myaudio.currentTime)
    })
  },
  // 左侧补零
  addZero(val){
    if(val<10){
      return 0+''+val
    }else{
      return val
    }
  },
  // 时间格式化
  formatSeconds(value) {
    var secondTime = parseInt(value); // 秒
    var minuteTime = 0; // 分
    var hourTime = 0; // 小时
    if (secondTime > 60) {
      minuteTime = parseInt(secondTime / 60);
      secondTime = parseInt(secondTime % 60);
      if (minuteTime > 60) {
        hourTime = parseInt(minuteTime / 60);
        minuteTime = parseInt(minuteTime % 60);
      }
    }
    var result = "" + this.addZero(parseInt(secondTime)) + "";
    if (minuteTime > 0) {
      result = "" + this.addZero(parseInt(minuteTime)) + ":" + result;
    }else{
      result = "" + this.addZero(parseInt(minuteTime)) + ":" + result;
    }
    if (hourTime > 0) {
      result = "" + parseInt(hourTime) + ":" + result;
    }
    return result;
  },
  // 播放暂停
  play() {
    let that = this;
    if (that.data.tridPlay) {
      myaudio.play();
      that.setData({
        tridPlay: false
      })
    } else {
      myaudio.pause()
      that.setData({
        tridPlay: true
      })
    }
    
  },
  // 快进
  go() {
    myaudio.seek(parseInt(myaudio.currentTime) + 10)
    this.changeCurrent(parseInt(myaudio.currentTime) + 10)
  },
  // 快退
  back() {
    myaudio.seek(parseInt(myaudio.currentTime) - 10)
    this.changeCurrent(parseInt(myaudio.currentTime) - 10)
  },
  // 滑块拖动快进，快退
  changeValue(e){
    let val = e.detail.value
    let step = (val / 100) * this.data.durationNum
    myaudio.seek(parseInt(step))
    this.changeCurrent(step)
    // setTimeout(() => { myaudio.pause()},0)
    // setTimeout(() => { myaudio.play() }, 10)
    // myaudio.pause()
    // myaudio.play()
  },
  // 当前播放格式化
  changeCurrent(step){
    let currentnum = parseInt(step)
    let currentt = this.formatSeconds(currentnum)
    this.setData({
      current: currentt,
      currentNum: currentnum*100
    })
  },
})