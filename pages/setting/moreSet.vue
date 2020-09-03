<template>
	<view class="container">
		<tui-list-view title="" class="tui-list-view">
			<tui-list-cell  :arrow="false" class="tui-list">
				<tui-icon name="setup" :size="iconSize" color="#0055ff"></tui-icon>
				<view class="tui-list-cell-name">开启播放页右滑返回上一级</view>
				<view class="tui-right">
					<switch class="navigat-switch" color="#0055ff" style="transform:scale(0.7)" 
						:checked="slipRightModelValue" @change="slipRightSwitchChange" />
				</view>
			</tui-list-cell>
			<tui-list-cell  @tap="navigateToPage('/pages/setting/apiSetting')" :arrow="true" class="tui-list">
				<tui-icon name="setup" :size="iconSize" color="#0055ff"></tui-icon>
				<view class="tui-list-cell-name">91地址切换</view>
			</tui-list-cell>
			<!-- <tui-list-cell  :arrow="false" class="tui-list">
				<tui-icon name="setup" :size="iconSize" color="#0055ff"></tui-icon>
				<view class="tui-list-cell-name">开启视频分页</view>
				<view class="tui-right">
					<switch class="navigat-switch" color="#0055ff" style="transform:scale(0.7)" 
						:checked="enablePageStatus" @change="enablePageStatusSwitchChange" />
				</view>
			</tui-list-cell> -->
			<tui-list-cell  @tap="navigateToPage('/pages/setting/videoParse')" :arrow="true" class="tui-list">
				<tui-icon name="setup" :size="iconSize" color="#0055ff"></tui-icon>
				<view class="tui-list-cell-name">单视频解析</view>
			</tui-list-cell>
			<tui-list-cell  :arrow="false" class="tui-list">
				<tui-icon name="setup" :size="iconSize" color="#0055ff"></tui-icon>
				<view class="tui-list-cell-name">开启测试</view>
				<view class="tui-right">
					<switch class="navigat-switch" color="#0055ff" style="transform:scale(0.7)" 
						:checked="enableApiTest" @change="enableApiTestSwitchChange" />
				</view>
			</tui-list-cell>
		</tui-list-view>
		<!--内容部分-->
	</view>
</template>

<script>
	import tuiListView from "@/components/list-view/list-view"
	import tuiListCell from "@/components/list-cell/list-cell"
	import tuiIcon from "@/components/icon/icon"
	import tuiTag from "@/components/tag/tag"
	import tuiBadge from "@/components/badge/badge"
	import tuiFooter from "@/components/footer/footer"
	export default {
		components: {
			tuiListView,
			tuiListCell,
			tuiIcon,
			tuiFooter,
			tuiTag,
			tuiBadge
		},
		data() {
				return {
					iconSize:24,
					slipRightModelValue:false,
					enablePageStatus:false,
					enableApiTest:false
				}
			},
			onLoad(event) {
			},
			onShow(){
				let slipRightModelValue = uni.getStorageSync('slipRightModelValue');
				this.slipRightModelValue = (slipRightModelValue=='1')
				let enablePageStatus = uni.getStorageSync('enablePage');
				this.enablePageStatus = (enablePageStatus=='1') 
				this.enableApiTest = (uni.getStorageSync('enableApiTest')=='1') 
			},
			methods: {
				enableApiTestSwitchChange(e){
					if (e.detail.value) {
						getApp().globalData.apiUrl = getApp().globalData.apiUrl+'/test'
						uni.setStorageSync('enableApiTest', "1");
					}else{
						uni.removeStorageSync('enableApiTest')
					}
					this.enableApiTest =  e.detail.value
					console.log('enableApiTestSwitchChange ', e.detail.value)
				},
				enablePageStatusSwitchChange(e){
					if (e.detail.value) {
						uni.setStorageSync('enablePage', "1");
					}else{
						uni.removeStorageSync('enablePage')
					}
					this.enablePageStatus =  e.detail.value
					console.log('enablePageStatusSwitchChange ', e.detail.value)
				},
				slipRightSwitchChange(e){
					if (e.detail.value) {
						uni.setStorageSync('slipRightModelValue', "1");
					}else{
						uni.removeStorageSync('slipRightModelValue')
					}
					this.slipRightModelValue =  e.detail.value
					console.log('slipRightSwitchChange ', e.detail.value)
				},
				navigateToPage(path){
					uni.navigateTo({
						url: path
					});
				},
				goTest(){
					uni.navigateTo({
						url: '/pages/test/test'
					});
				},
				goReport(){
					uni.navigateTo({
						url: '/pages/info/report'
					});
				},
				checkUpdate(){
					console.log('App checkUpdate');
					// #ifdef APP-NVUE
					plus.screen.lockOrientation('portrait-primary');
					console.log("appid: " + plus.runtime.appid);
					console.log("version: " + plus.runtime.version);
					let appid = plus.runtime.appid;
					
					var domModule = weex.requireModule('dom');
					domModule.addRule('fontFace', {
						'fontFamily': "texticons",
						'src': "url('./static/text-icon.ttf')"
					});
					// #endif
				}
			},
			mounted() {
			}
		}
</script>

<style>
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-list-view {
		padding-top: 10upx !important
	}

	.tui-list-cell-name {
		padding-left: 20upx;
		vertical-align: middle;
		line-height: 30upx;
	}

	.tui-list::after {
		left: 94upx !important
	}

	.tui-right {
		margin-left: auto;
		margin-right: 34upx;
		font-size: 26upx;
		line-height: 1;
		color: #999;
	}

	.logo {
		height: 40upx;
		width: 40upx;
	}

	.tui-flex {
		display: flex;
		align-items: center;
	}

	.tui-msg-box {
		display: flex;
		align-items: center;
	}

	.tui-msg-pic {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		display: block;
		margin-right: 24upx;
	}

	.tui-msg-item {
		max-width: 500upx;
		min-height: 80upx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.tui-msg-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 34upx;
		line-height: 1;
		color: #262b3a;
	}

	.tui-msg-content {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 26upx;
		line-height: 1;
		color: #9397a4;
	}

	.tui-msg-right {
		max-width: 120upx;
		height: 88upx;
		margin-left: auto;
		text-align: right;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.tui-msg-right.tui-right-dot {
		height: 76upx;
		padding-bottom: 10upx;

	}

	.tui-msg-time {
		width: 100%;
		font-size: 24upx;
		line-height: 24upx;
		color: #9397a4;
	}

	.tui-badge {
		width: auto
	}

	.tui-msg::after {
		left: 154upx !important
	}
	
	
	.logo {
		width: 750upx;
		height: 240upx;
		background-color: #007AFF;
		display: flex;
		flex-direction: row;
	}
	
	.logo-hover {
		opacity: 0.8;
	}
	
	.logo-img {
		width: 180upx;
		height: 180upx;
		border-radius: 50%;
	}
	.logo-img-view{
		width: 260upx;
		height: 240upx;
		border: 0rpx #007AFF solid ;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.logo-title {
		border: 0rpx #00EB72 solid ;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}
	
	.user-name {
		font-size: 38upx;
		border: 0rpx #000000 solid;
		height: 110upx;
		display: flex;
		color: #ffffff;
		justify-content: center;
		align-items: flex-end;
		padding-left: 40upx;
	}
	
	.user-id{
		height: 100upx;
		padding-left: 40upx;
		font-size: 28upx;
		color: #ffffff;
		border: 0rpx #2F85FC solid ;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
