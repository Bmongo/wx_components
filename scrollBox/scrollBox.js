Component({
	properties:{
		footHeightForRPX:{
			type:Number,
			value:0
		},
		footHeight:{
			type:Number,
			value:0
		},
		lowerHeight:{
			type:Number,
			value:100
		},
		autoFoot:{
			type:Number,
			value:0,
			observer:function(n,o) {
				let h = this.data.svHeight - n
				this.setData({
					scrollViewHeight:h + 'px'
				})
			}
		},
		loading:{
			type:Boolean,
			value:false
		},
		none:{
			type:Boolean,
			value:false
		}
	},
	data:{
		svHeight:0
	},
	attached(){
		let sysinfo = wx.getSystemInfoSync();
		let selQuery = this.createSelectorQuery();
		selQuery.select("#scrollView").boundingClientRect()
		selQuery.selectViewport().scrollOffset()
		selQuery.exec(res => {
			if(this.data.footHeightForRPX != 0) {
				let rpx = sysinfo.screenHeight / 750
				this.data.svHeight = sysinfo.windowHeight - res[0].top - 10 - (rpx * this.data.footHeightForRPX)
			} else {
				this.data.svHeight = sysinfo.windowHeight - res[0].top - 10 - this.data.footHeight
			}
			this.setData({
				scrollViewHeight: sysinfo.windowHeight - res[0].top - 10 - this.data.footHeight + "px"
			})
			this.triggerEvent("getHeight",this.data.scrollViewHeight)
		})
	},
	methods:{
		_dropdownLoad() {
			this.triggerEvent("dropdownLoad")
		},
	}
})
