//index.js
import { toast, addressMate, init } from '../../utils/util.js'
import pageUtil from '../../utils/page.js'
//获取应用实例
const app = getApp()

const date = new Date()

const windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕宽度
const ratio = windowWidth / 375 // 比例

Page({
  data: {
    isHasNetwork: true,
    contentHeight: 0,
    // swiper不显示之current问题
    current: 0,
    indicatorDots: false,
    autoplay: true,
    circular: true,
    interval: 4000,
    duration: 1000,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: '日一二三四五六'.charAt(date.getDay()),
    address: '广东省',
    addressDialogVisable: false,
    annoList: [
      {
        allAddress: "广东省深圳市南山区",
        city_id: 440300,
        county_id: 440305,
        faBaoId: 7113,
        gongGaoBianHao: "2020XY2019SZW",
        gongGaoMingCheng: "深圳湾实验室科研用液相、气相色谱类仪器招标采购项目招标公告",
        gongGaoType: 1,
        id: 13212,
        isXuYaoZiGeYuShen: 0,
        province_id: 440000,
        shangBaoTime: "2020-01-19 20:10:35",
        type: 2,
        zhaoBiaoFangShi: 1},
        {
          allAddress: "广东省深圳市龙岗区",
          city_id: 440300,
          county_id: 440307,
          faBaoId: 7114,
          gongGaoBianHao: "2020XY2025LGJ",
          gongGaoMingCheng: "《2019年度龙岗区地籍调查和土地总登记存在问题研究》规划研究招标公告",
          gongGaoType: 4,
          id: 13213,
          isXuYaoZiGeYuShen: 0,
          province_id: 440000,
          shangBaoTime: "2020-01-19 20:04:00",
          type: 3,
          zhaoBiaoFangShi: 1}
    ],
    totalNum: 0,
    provinceId: 440000, // 省
    cityId: '', // 市
    bannerList: [
      {
        relativePath: '../../images/gg_banner.png'
      }
    ],
    calendarConfig: {
      theme: 'default', // 日历主题，目前共两款可选择，默认 default 及 elegant，自定义主题在 theme 文件夹扩展
      highlightToday: true, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
      disablePastDay: true
    },
    msg: {
      content: "系统已部署完毕，即日起投入试运行。感谢您的理解与配合！",
      createDate: "2019-08-29 20:42:41",
      isDelete: 0,
      objectid: 1,
      publishStatus: 1,
      title: "系统试运行通知"
    },
    isScollEnable: false,
    marqueePace: 5,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    size: 12 * ratio,
    // 通知滚动时间间隔
    interval: 180,
    // 通知除去内容所占的空间
    txt_margin: 60 * ratio
  },
  onLoad: function () {
    this.getSingleMsg()
    init((isHasNet, height) => {
      this.pageNo = 1
      this.setData({
        isHasNetwork: isHasNet,
        contentHeight: height
      })
      if (isHasNet) {
        pageUtil.initPage()
      }
    })
    wx.setStorage({
      key: 'myData',
      data: '123456'
    })
  },
  // 打开弹框
  handleAddresClick: function () {
    this.setData({
      addressDialogVisable: true
    })
  },
  /**
  * 关闭地址弹框
  */
  closeDialog: function () {
    this.setData({
      addressDialogVisable: false
    })
  },
  /**
   * 地址弹框确认
   */
  handleConfirm: function (event) {
    this.closeDialog()
    let item = event.detail.item
    if (item.isProvinceId) {
      this.setData({
        provinceId: item.id,
        address: item.city,
        cityId: ''
      })
    } else {
      this.setData({
        cityId: item.id,
        address: item.city,
        provinceId: ''
      })
    }
    let option = {
      id: item.id
    }
    this.pageNo = 1
    pageUtil.initPage()
  },
  // 列表数据获取
  getList() {
    let that = this
    let params = {
      pageNo: this.pageNo || 1
    }
    if (this.searchKey) {
      params.gonggaomingcheng = this.searchKey
    }
    if (this.data.provinceId) {
      params.provinceId = this.data.provinceId
    }
    if (this.data.cityId) {
      params.cityId = this.data.cityId
    }
    console.log(params)
  },
  /**
   * 搜索输入
   */
  searchInput: function (e) {
    pageUtil.initPage()
    this.pageNo = 1
    this.searchKey = e.detail.value
  },
/**
 * 处理搜索
 */
  handleSearch: function () {
    this.getList()
  },
  afterTapDay: function(e) {
    console.log(e)
  },
  // 单条数据获取
  getSingleMsg() {
    this.initAnimation('系统已部署完毕，即日起投入试运行。感谢您的理解与配合！')
  },
  /**
     * 开启公告字幕滚动动画
     * @param  {String} announcementText 公告内容
     * 
     */
  initAnimation: function (announcementText) {
    console.log(announcementText)
    let length = announcementText.length * this.data.size;//文字长度
    this.contentWidth = windowWidth - this.data.txt_margin;
    this.setData({
      isScrollEnable: false
    });
    this.scrolltxt(length);
  },

  scrolltxt: function (length) {
    let that = this
    let contentWidth = this.contentWidth;
    if (length > contentWidth) {
      this.setData({
        isScrollEnable: true
      })
      if (this.interval) {
        this.interval = null
      }
      this.interval = setInterval(function () {
        //滚动的最大宽度
        let maxscrollwidth = windowWidth - 60 ;
        let crentleft = that.data.marqueeDistance;
        //判断是否滚动到最大宽度
        if (crentleft < maxscrollwidth) {
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        } else {
          // 直接重新滚动
          that.setData({
            marqueeDistance: -contentWidth
          });
        }
      }, this.data.interval);
    }
  }
})
