# android/ios应用升级检测

#### android更新/ios检测提示/不支持热更新

#### 使用方式
引用组件
import versionUpgrade from "@/components/luo-version-upgrade/luo-version-upgrade.vue";
export default {
		components: {
			versionUpgrade
		},
}

使用组件
<!-- 更新检测 -->
<!-- #ifdef APP-PLUS -->
	<luo-version-upgrade version="1.0.1" url="http://static.tomatotc.com/__UNI__A71730C_0404173232.apk"></luo-version-upgrade> 
<!-- #endif -->


#### 属性说明
属性名			类型		默认值	说明
version			String	1.0.0	版本号
url				String	空		下载地址 .apk结尾地址
versionType		String	android	类型android/ios
describe		String	升级描述	升级描述--有新版本出现~为了给您带来更好的体验，我们建议您现在进行升级！
is_force		Boolean	false	是否强制更新 true/false