<template>
	<view class="center">
		<!-- <view :style="{ height: iStatusBarHeight + 'px'}" style="background-color: #000000;"></view> -->
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
		<view class="center-list">
			<view class="center-list-item border-bottom" @tap="goCollect">
				<view class="navigat-left">
					<tui-icon name="like-fill" :size="iconSize" color="blue"></tui-icon>
					<view class="list-text">我的收藏({{totalNum}})</view>
				</view>
				<view class="navigat-right">
					<switch class="navigat-switch" :checked="myCollectModelValue" @change="myCollectSwitchChange" />
				</view>				
			</view>
			<view class="center-list-item border-bottom" >
				<view class="navigat-left">
					<tui-icon name="setup-fill" :size="iconSize" color="blue"></tui-icon>
					<view class="list-text">列表模式</view>
				</view>
				<view class="navigat-right">
					<switch class="navigat-switch" :checked="collectModelValue" @change="collectSwitchChange" />
				</view>				
			</view>
			<view class="center-list-item border-bottom"  @tap="goLocal">
				<view class="navigat-left">
					<tui-icon name="video" :size="iconSize" color="blue"></tui-icon>
					<view class="list-text">本地视频</view>
				</view>
				<view class="navigat-right">
					<switch class="navigat-switch" :checked="localModelValue" @change="localSwitchChange"/>
				</view>				
			</view>
			<view class="center-list-item border-bottom" @tap="checkUpdate">
				<view class="navigat-left">
					<tui-icon name="refresh" :size="iconSize" color="blue"></tui-icon>
					<view class="list-text">检查更新</view>
				</view>
				<view class="navigat-right">
					<tui-icon class="navigat-arrow" name="refresh" :size="iconSize" color="blue"></tui-icon>
				</view>				
			</view>
			<view class="center-list-item border-bottom" @tap="goReport">
				<view class="navigat-left">
					<tui-icon name="feedback" :size="iconSize" color="blue"></tui-icon>
					<view class="list-text">意见反馈</view>
				</view>
				<view class="navigat-right">
					<tui-icon class="navigat-arrow" name="arrowright" :size="iconSize" color="blue"></tui-icon>
				</view>				
			</view>
			<view class="center-list-item border-bottom" @tap="navigateToPage('/pages/setting/apiSetting')">
				<view class="navigat-left">
					<tui-icon name="setup" :size="iconSize" color="blue"></tui-icon>
					<view class="list-text">IP管理</view>
				</view>
				<view class="navigat-right">
					<tui-icon class="navigat-arrow" name="arrowright" :size="iconSize" color="blue"></tui-icon>
				</view>				
			</view>
			<view class="center-list-item border-bottom" @tap="loginOut">
				<view class="navigat-left">
					<tui-icon name="exchange" :size="iconSize" color="blue"></tui-icon>
					<view class="list-text">退出登录</view>
				</view>
				<view class="navigat-right">
					<tui-icon class="navigat-arrow" name="arrowright" :size="iconSize" color="blue"></tui-icon>
				</view>				
			</view>
			<view class="center-list-item border-bottom" @tap="goTest">
				<view class="navigat-left">
					<tui-icon name="android" :size="iconSize" color="blue"></tui-icon>
					<view class="list-text">测试功能</view>
				</view>
				<view class="navigat-right">
					<tui-icon class="navigat-arrow" name="arrowright" :size="iconSize" color="blue"></tui-icon>
				</view>				
			</view>
		</view>
		
		<tui-footer :fixed="false" :copyright="copyright"  tui-footer-class="tui-custom"></tui-footer>
	</view>	
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	import tuiBadge from "@/components/badge/badge"
	import tuiFooter from "@/components/footer/footer"
	export default {
		components:{
			tuiIcon,
			tuiBadge,
			tuiFooter
		},
		data() {
			return {
				login: false,
				avatarUrl: '/static/noavatar.gif',
				userInfo: {id:'',avatarUrl:'',username:''},
				iStatusBarHeight:0,
				enablePageStatus:0,
				iconSize:16,
				totalNum:0,
				navigateFlag: false,
				localTotalNum:0,
				localModelValue:false,
				myCollectModelValue:false,
				collectModelValue:false,
				copyright:"Copyright © 2020."
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
	
	.tui-custom {
		margin-bottom: 1upx;
	}
	
	.center-list {
		flex-direction: column;
		background-color: #FFFFFF;
		width: 750upx;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		display: flex;
		flex-direction: row;
		padding: 0upx 20upx 0upx 30upx;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #ffffff;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		padding: 0upx 20upx 0upx 20upx;
		text-align: right;
	}
	
	.list-text2 {
			width: 120upx;
			font-size: 32upx;
			color: #00eb72;
		}

	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		display: flex;
	}
	.navigat-switch{
		display: flex;
		justify-content: center;
	}
	.navigat-left{
		width: 70%;
		display: flex;
	}
	.navigat-right{
		width: 30%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	page {
		background-color: #f8f8f8;
	}


	/* 解决头条小程序字体图标不显示问题，因为头条运行时自动插入了span标签，且有全局字体 */
	/* #ifdef MP-TOUTIAO */
	text :not(view) {
		font-family: texticons;
	}

	/* #endif */

	.center {
		flex: 1;
		flex-direction: column;
		background-color: #f8f8f8;
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
	.tui-icon-class{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.uni-switch-input{
		display: flex;
		justify-content: center;
		align-items: center;
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

	.go-login-navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
	}

	.login-title {
		height: 150upx;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: 20upx;
	}

	
</style>
