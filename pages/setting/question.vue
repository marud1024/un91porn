<template>
	<view class="container">
		<view>
			<block v-for="(item,index) in dataList" :key="index">
				<tui-collapse :index="index" :current="current" :disabled="item.disabled" @click="change3">
					<template v-slot:title>
						<tui-list-cell :hover="!item.disabled">{{item.name}}</tui-list-cell>
					</template>
					<template v-slot:content>
						<view class="tui-content">{{item.intro}}</view>
					</template>
				</tui-collapse>
			</block>
		</view>
	</view>
</template>

<script>
	import tuiCollapse from "@/components/tui-collapse/tui-collapse"
	import tuiListCell from "@/components/list-cell/list-cell"
	export default {
		components: {
			tuiCollapse,
			tuiListCell
		},
		data() {
			return {
				dataList: [
					{
						name: "更新",
						intro: "最新版会放在github上,不能正常使用去这找，地址：github.com/marud1024/1024",
						current: 0,
						disabled: false
					},
					{
						name: "播放慢",
						intro: "自己去找vpn！只要你的加速器给力，视频播放是不会慢的！！！",
						current: 1,
						disabled: false
					},
					{
						name: "下载",
						intro: "下载的视频保存在手机appDownload目录",
						current: -1,
						disabled: false
					},
					{
						name: "登录、注册、收藏",
						intro: "不与官网同步数据",
						current: -1,
						disabled: false
					},
					{
						name: "其它问题、建议",
						intro: "去这提：github.com/marud1024/1024",
						current: -1,
						disabled: false
					}
				],
				//手风琴效果
				current: -1,
				current2: -1
			}
		},
		methods: {
			change3(e) {
				//可关闭自身
				this.current = this.current == e.index ? -1 : e.index
			}
		}
	}
</script>

<style>
.container {
		padding: 20rpx 0 120rpx 0;
		box-sizing: border-box;
	}

	.tui-title {
		padding: 40rpx 30rpx 20rpx;
		box-sizing: border-box;
		font-size: 32rpx;
	}

	.tui-content {
		padding: 20rpx 30rpx;
		background: #fff;
		color: #555;
		font-size: 26rpx;
	}
</style>
