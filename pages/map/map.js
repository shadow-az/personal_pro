// pages/map/map.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    subKey:'3OPBZ-A3B65-SZ3I5-IT7EE-IGTF2-NIF2J',
    longitude:'120.38852',
    latitude:'30.308794',
    showDialog:false,
    currentmarker:null,
    navi_url:null,
    marker:[],
  //   markers:[{
  //     id:1,
  //     latitude:'30.3109937',
  //     longitude:'120.3930075',
  //     iconPath:'../image/定位.png',
  //     title:'云滨站',
  //     width:30,
  //     height:30,
  //     explain:"浙江工商大学的地铁站"
  //   },
  //   {
  //     id:2,
  //     latitude:'30.31113375',
  //     longitude:'120.3762090',
  //     iconPath:'../image/定位.png',
  //     title:'文海南路站',
  //     width:30,
  //     height:30,
  //     explain:""
  //   },
  //   {
  //     id:3,
  //     latitude:'30.3027819',
  //     longitude:'120.3817988',
  //     iconPath:'../image/定位.png',
  //     title:'云水站',
  //     width:30,
  //     height:30,
  //     explain:""
  //   }
  // ],
    showLocation:true,
    enablebuilding:true
  },

  handleMarkerTap(e){
    console.log(this.data);
    const markers=this.data.marker.find(item=>item.id == e.markerId);
    markers && this.setData({
      currentmarker:markers,
      showDialog:true,
      navi_url:markers.urll
    })
  },

  navi1(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/pic/pic?id='+e.currentTarget.dataset.id,
    })
  },

  navi2(e){
    console.log('111222',this.data);
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/signin/signin?id='+e.currentTarget.dataset.id,
      acceptData(res){
        console.log(res.data)
      },
      success:(e)=>{
        e.eventChannel.emit('acceptDataFromOpenerPage',{data:this.data.currentmarker})
      }
      
    })
  },

  getmarker(){
    db.collection('markers')
    .get({
      success:(res)=>{
        console.log(res)
        this.setData({
          marker:res.data
        })
        console.log(this.data.marker)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('初始',this.data)
    wx.getLocation({
      success:(res)=>{
        console.log(res),
        this.setData({
          // latitude:res.latitude,
          // longitude:res.longitude
        })
        // this.data.latitude=res.latitude,
        // this.data.longitude=res.longitude
      }
    })

    this.getmarker()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})

