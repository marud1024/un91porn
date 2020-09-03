<template>
	<view>
		<view class="tip"></view>
		<view class="uni-form-item uni-column">
			<input type="text" class="uni-input" v-model="url" placeholder="91视频地址"/>
		</view>
		<view class="primary_view">
			<button class="primary" type="primary" @tap="go">go</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:""
			}
		},
		onShow(){
		},
		methods: {
			go(){
				var video = new Object()
				video.title = this.url
				video.link = this.url
				uni.navigateTo({
					url: '/pages/detail/detail?query=' + encodeURIComponent(JSON.stringify(video))
				});
			}
		}
	}
</script>

<style>
	page{
	}
	.tip{
		padding-top: 200upx;
	}
	.uni-form-item{
		padding-top: 30upx;
		display: flex;
		width: 750rpx;
		align-items: center;
		justify-content: center;
	}
	.uni-input{
		border: 1rpx #999 solid;
		font-size: 30upx;
		width: 80%;
		height: 78upx;
	}
	.primary_view{
		display: flex;
		width: 750rpx;
		align-items: center;
		justify-content: center;
	}
	.primary{
		margin-top: 50upx;
		font-size: 30upx;
		width: 280upx;
		height: 90upx;
		border-radius: 20;
	}
</style>
