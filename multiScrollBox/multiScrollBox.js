// components/multiScrollBox/multiScrollBox.js
Component({
	options:{
		multipleSlots: true
	},
  /**
   * 组件的属性列表
   */
  properties: {
		amount:{
			type: Number,
			value: 2,
		},
		titleFontSize:{
			type:Number,
			value:36
		},
		titleLineHeight:{
			type:Number,
			value:80
		},
		navMagrinTop:{
			type: Number,
			value: 30
		},
		navMagrinBottom:{
			type: Number,
			value: 30
		},
		navSidesReduce:{
			type: Number,
			value: 0
		},
		hasFoot:{
			type: Boolean,
			value: false
		},
		footHeight:{
			type: Number,
			value: 0
		},
		lowerHeight:{
			type:Number,
			value:50
		},
		loadingIdx:{
			type:Number,
			value:-1
		},
		allLoading:{
			type:Boolean,
			value:false
		},
		tag: {
			type: Object,
			value:{color:"#BFBFBF",borderBottom:"none"}
		},
		activeTag: {
			type:Object,
			value:{color:"#00BF00",borderBottom:"1rpx solid #00BF00"}
		},

		hasBadge: {
			type: Boolean,
			value: false
		},
		badgeArr: {
			type: Array,
			value: [0,0,0]
		}
	},
	attached(){
		this._init()
	},

  /**
   * 组件的初始数据
   */
  data: {
		activeIndex:"0",
		swiperHeight:"0",
		normalTabStyle:'',
		activeTabStyle:'',
		navStyle:"",
  },

  /**
   * 组件的方法列表
   */
  methods: {
		_init(){
			let sysinfo = wx.getSystemInfoSync()
			let query = this.createSelectorQuery();
			query.select('#swiper').boundingClientRect()
			query.selectViewport().scrollOffset()
			query.exec(res => {
				let h
				if(!this.data.hasFoot) h = sysinfo.windowHeight - res[0].top + "px"
				else {
					let footHeight = this.data.footHeight
					let toPx = sysinfo.screenWidth / 750
					h = sysinfo.windowHeight - res[0].top - footHeight * toPx + "px"
				}
				this.setData({
					swiperHeight: h
				})
				this.triggerEvent("getHeight",h)
			})

			let data = this.data

			let width = (100 - (data.navSidesReduce / 750 * 200)) / data.amount + "%"
			let tabStyle = [
				`font-size:${data.titleFontSize}rpx`,
				`line-height:${data.titleLineHeight}rpx`,
				`width:${width}`,
			]

			let normalTabStyle = [
				...tabStyle,
				`color:${data.tag.color}`,
				`border-bottom:${data.tag.borderBottom}`
			].join(";")

			let activeTabStyle = [
				...tabStyle,
				`color:${data.activeTag.color}`,
				`border-bottom:${data.activeTag.borderBottom}`
			].join(";")

			let navStyle = [
				`margin: ${data.navMagrinTop}rpx 0 ${data.navMagrinBottom}rpx`
			].join(";")

			this.setData({
				normalTabStyle,
				activeTabStyle,
				navStyle
			})
		},
		_changePage(e) {
			let idx = e.type == 'tap'? e.target.dataset.type : e.detail.current
			if(idx == this.data.activeIndex) {
				return false
			}
			this.setData({
				activeIndex:idx
			})
		},
		_dropdownLoad(e){
			this.triggerEvent("dropdownLoad",{idx:e.currentTarget.dataset.idx})
		},
		changePage(idx) {
			this.setData({
				activeIndex: idx + ''
			})
		}
  }
})
