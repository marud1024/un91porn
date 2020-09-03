<template>
	<view class="container">
		<view class="logo" @tap="goLogin">
			<!-- login ? userInfo.avatarUrl :avatarUrl -->
			<view class="logo-img-view"><image class="logo-img" :src="avatarUrl"></image></view>
			<view class="logo-title" :hover-class="!login ? 'logo-hover' : ''" @tap="goLogin">
				<view class="user-name">
					Hi，{{login ? userInfo.username : '您未登录'}}
				</view>
				<view class="user-id" v-if="login">
					id:{{userInfo.id}}
				</view>
			</view>
		</view>
		
		<tui-list-view title="" class="tui-list-view">
			<tui-list-cell  @tap="goCollect" :arrow="true" class="tui-list">
				<tui-icon name="like-fill" :size="iconSize" color="#ed3f14"></tui-icon>
				<view class="tui-list-cell-name">我的收藏</view>
				<tui-tag size="small" type="light-green" shape="circle">{{totalNum}}</tui-tag>
				<view class="tui-right">
					<switch class="navigat-switch" :checked="myCollectModelValue" @change="myCollectSwitchChange" />
				</view>
			</tui-list-cell>
			
			<tui-list-cell  :arrow="false" class="tui-list">
				<tui-icon name="shop-fill" :size="iconSize" color="#00aa00"></tui-icon>
				<view class="tui-list-cell-name">列表模式</view>
				<view class="tui-right">
					<switch class="navigat-switch" :checked="collectModelValue" @change="collectSwitchChange" />
				</view>
			</tui-list-cell>
			
			<tui-list-cell  :arrow="true" @tap="goLocal" class="tui-list">
				<tui-icon name="video" :size="iconSize" color="#0055ff"></tui-icon>
				<view class="tui-list-cell-name">本地视频</view>
				<view class="tui-right">
					<switch class="navigat-switch" :checked="localModelValue" @change="localSwitchChange"/>
				</view>
			</tui-list-cell>
			
			<tui-list-cell  @tap="checkUpdate" :arrow="false" class="tui-list">
				<tui-icon name="refresh" :size="iconSize" color="#ff7900"></tui-icon>
				<text class="tui-list-cell-name">检查更新</text>
				<view class="tui-right">
					<tui-icon name="refresh" :size="iconSize" color="#ed3f14"></tui-icon>
				</view>
			</tui-list-cell>
			<tui-list-cell  @tap="goReport" :arrow="true" class="tui-list">
				<tui-icon name="feedback" :size="iconSize" color="#5677fc"></tui-icon>
				<view class="tui-list-cell-name">意见反馈</view>
			</tui-list-cell>
			<tui-list-cell  @tap="navigateToPage('/pages/setting/apiSetting')" :arrow="true" class="tui-list">
				<tui-icon name="setup" :size="iconSize" color="#55ff00"></tui-icon>
				<view class="tui-list-cell-name">IP管理</view>
			</tui-list-cell>
			<tui-list-cell  @tap="loginOut" :arrow="false" class="tui-list">
				<tui-icon name="exchange" :size="iconSize" color="#ff5500"></tui-icon>
				<view class="tui-list-cell-name">退出登录</view>
			</tui-list-cell>
			<tui-list-cell  @tap="goTest" :arrow="false" class="tui-list">
				<tui-icon name="android" :size="iconSize" color="#aaaa00"></tui-icon>
				<view class="tui-list-cell-name">测试功能</view>
			</tui-list-cell>
			
		</tui-list-view>
		<!--内容部分-->
		<tui-footer :fixed="false" :copyright="copyright"  tui-footer-class="tui-custom"></tui-footer>
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
					login: false,
					avatarUrl: '/static/mine_def_touxiang_3x.png',
					userInfo: {id:'',avatarUrl:'',username:''},
					iStatusBarHeight:0,
					enablePageStatus:0,
					iconSize:24,
					totalNum:0,
					navigateFlag: false,
					localTotalNum:0,
					localModelValue:false,
					myCollectModelValue:false,
					collectModelValue:false,
					copyright:"Copyright © 2020 隔壁老魏."
				}
			},
			onLoad(event) {
				this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
				uni.setNavigationBarTitle({
					title: "个人中心"
				});
			},
			onShow(){
				console.log('onShow');
				let userInfo = uni.getStorageSync('userInfo');
				console.log(userInfo);
				if (userInfo!='') {
					this.login = true;
					this.userInfo=JSON.parse(userInfo)
				}
				this.getTotalCollectVideoNum()
				//this.listFiles()
				this.localModelValue = getApp().globalData.localModel
				this.collectModelValue = getApp().globalData.collectModel
				this.myCollectModelValue = getApp().globalData.myCollectModel
			},
			methods: {
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
				myCollectSwitchChange(e) {
					getApp().globalData.myCollectModel = e.detail.value
					this.myCollectModelValue =  e.detail.value
					console.log('myCollectSwitchChange ', e.detail.value)
				},
				localSwitchChange(e) {
					getApp().globalData.localModel = e.detail.value
					this.localModelValue =  e.detail.value
					console.log('localSwitchChange ', e.detail.value)
				},
				collectSwitchChange(e) {
					getApp().globalData.collectModel = e.detail.value
					this.collectModelValue =  e.detail.value
					console.log('collectSwitchChange ', e.detail.value)
				},
				listFiles(){
					//  参考地址 https://ask.dcloud.net.cn/article/809
					var environment = plus.android.importClass("android.os.Environment");
					var flag = environment.getExternalStorageState() === environment.MEDIA_MOUNTED;
					var sdRoot = environment.getExternalStorageDirectory();
					var File = plus.android.importClass("java.io.File");
					var dirPath = sdRoot + "/" + getApp().globalData.downloadDir;
					var fd = new File(dirPath);
					var files = plus.android.invoke(fd,"listFiles");
					var totalNum=0;
					for(var i=files.length-1; i>=0; i--){
					    var file = files[i];
						if(plus.android.invoke(file,"isDirectory")){  
						    // 文件夹  
						}else{  
							// 文件
							totalNum++;
						}  
						
					}
					this.localTotalNum = totalNum;
				},
				getUserId(){
					let userInfo = uni.getStorageSync('userInfo');
					let userId = ''
					if (userInfo!='') {
						let userInfoJson=JSON.parse(userInfo)
						userId = userInfoJson.id;
					}
					return userId;
				},
				getTotalCollectVideoNum(){
					uni.request({
					    url: getApp().globalData.apiUrl+'/video/getTotalCollectVideoNum',
					    data: {
							userId:this.getUserId()
					    },
					    success: (res) => {
					       this.totalNum=res.data.totalNum
					    }
					});
				},
				checkUpdate(){
					console.log('App checkUpdate');
					// #ifdef APP-NVUE
					plus.screen.lockOrientation('portrait-primary');
					console.log("appid: " + plus.runtime.appid);
					console.log("version: " + plus.runtime.version);
					let appid = plus.runtime.appid;
					if (appid && appid.toLocaleLowerCase() != "hbuilder") {
						uni.request({
							url: 'https://uniapp.dcloud.io/update', //检查更新的服务器地址
							data: {
								appid: plus.runtime.appid,
								version: plus.runtime.version
							},
							success: (res) => {
								console.log('success', res);
								if (res.statusCode == 200 && res.data.isUpdate) {
									let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
									// 提醒用户更新
									uni.showModal({
										title: '更新提示',
										content: res.data.note ? res.data.note : '是否选择更新',
										success: (showResult) => {
											if (showResult.confirm) {
												plus.runtime.openURL(openUrl);
											}
										}
									})
								}
							}
						})
					}
					
					var domModule = weex.requireModule('dom');
					domModule.addRule('fontFace', {
						'fontFamily': "texticons",
						'src': "url('./static/text-icon.ttf')"
					});
					// #endif
				},
				enablePage(){
					let enablePageInfo = uni.getStorageSync('enablePage');
					if (enablePageInfo === '1') {
						this.enablePageStatus = 0
						uni.removeStorageSync('enablePage')
					}else{
						this.enablePageStatus = 1
						uni.setStorageSync('enablePage', "1");
					}
				},
				getPageStatus(){
					let enablePageInfo = uni.getStorageSync('enablePage');
					if (enablePageInfo === '1') {
						this.enablePageStatus = 1
					}
				},
				loginOut(){
					uni.removeStorageSync('userInfo')
					this.userInfo = {};
					this.login = false;
					uni.showToast({
						title:'退出成功'
					})
					this.totalNum=0
				},
				goLogin() {
					if (this.navigateFlag) {
						return;
					}
					this.navigateFlag = true;
					if (!this.login) {
						uni.navigateTo({
							url: '/pages/info/login'
						});
					}
					setTimeout(() => {
						this.navigateFlag = false;
					}, 200)
					
				},
				goLocal() {
					if (this.navigateFlag) {
						return;
					}
					this.navigateFlag = true;
					uni.navigateTo({
						url: '/pages/info/local'
					});
					setTimeout(() => {
						this.navigateFlag = false;
					}, 200)
				},
				goDownload() {
					uni.navigateTo({
						url: '/pages/info/download'
					});
				},
				goCollect(){
					if (this.navigateFlag) {
						return;
					}
					this.navigateFlag = true;
					if (this.login) {
						uni.navigateTo({
							url: '/pages/info/mycollect2'
						});
					}else{
						uni.showModal({
						    title: '提示',
						    content: '登录后可以查看收藏',
							cancelText:'取消',
							confirmText:'登录',
						    success: function (res) {
						        if (res.confirm) {
						            uni.navigateTo({
						            	url:'/pages/info/login'
						            })
						        }
						    }
						});
					}
					setTimeout(() => {
						this.navigateFlag = false;
					}, 200)
					
				}
			},
			mounted() {
				this.getPageStatus()
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
