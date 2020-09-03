<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			plus.sqlite.executeSql({
				name: 'video',
				sql: 'CREATE TABLE IF NOT EXISTS video ( "id" INTEGER PRIMARY KEY AUTOINCREMENT, "create_date" VARCHAR(100), "ext_info" VARCHAR (1000), "source_url" VARCHAR (255), "image_url" VARCHAR (255), "link" VARCHAR (255), "title" VARCHAR (255), "owner_id" VARCHAR (255), "video_key" VARCHAR (255) UNIQUE, "vid" VARCHAR (255), "vuid" VARCHAR (255), "view_num" INT (11), "collecte_num" INT (11), "sort" INT (11), "comment_num" INT (11), "user_id" INT (20))',
				success: function(e) {
					
				},
				fail: function(e) {
					console.log(e)
				}
			});
			if (
				plus.sqlite.isOpenDatabase({
					name: 'video',
					path: '_doc/marud1024.db',
				})
			) {
			} else {
				plus.sqlite.openDatabase({
					name: 'video',
					path: '_doc/marud1024.db',
					success: function(e) {
						console.log('openDatabase success')
					},
					fail: function(e) {
						console.log(e)
					}
				});
			}
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary');
			let appVersion = plus.runtime.versionCode
			uni.request({
				url: 'https://raw.githubusercontent.com/marud1024/1024/master/version.json', //检查更新的服务器地址
				data: {},
				success: (res) => {
					if (res.statusCode == 200) {
						if (res.data.version > appVersion) {
							console.log('版本检查,appVersion:'+appVersion+",version"+res.data.version);
							uni.showModal({
								title: '更新提示',
								cancelText:'取消',
								confirmText:'下载',
								content: res.data.content,
								success: (showResult) => {
									if (showResult.confirm) {
										plus.runtime.openURL(res.data.url);
									}
								}
							})
						}
					}
				},
				fail: (err) => {
					console.log(err);
				}
			})
			
			var domModule = weex.requireModule('dom');
			domModule.addRule('fontFace', {
				'fontFamily': "texticons",
				'src': "url('./static/text-icon.ttf')"
			});
			
			var environment = plus.android.importClass("android.os.Environment");
			var flag = environment.getExternalStorageState() === environment.MEDIA_MOUNTED;
			var sdRoot = environment.getExternalStorageDirectory();
			var File = plus.android.importClass("java.io.File");
			
			var dirPath = sdRoot + "/" + getApp().globalData.downloadDir + "/" + getApp().globalData.imageDir;
			var downloadDir = new File(dirPath);
			if(!downloadDir.exists()){
				var res = downloadDir.mkdirs();
				console.log("downloadDir mkdirs:"+res);
			}else{
				console.log("downloadDir is exists");
			}
			// #endif
			
			let apiUrl = uni.getStorageSync('apiUrl');
			if (apiUrl != '') {
				getApp().globalData.apiUrl= apiUrl 
			}
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			apiUrl: 'http://627.workarea8.live',
			downloadDir:'appDownload',
			imageDir:'imageDir',
			randomIp:'',
			localModel:false,//本地模式
			myCollectModel:false,//收藏模式
			collectModel:false//首页模式
		}
	}
</script>

<style>
	/*每个页面公共css*/
</style>
