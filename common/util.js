import CryptoJS from './crypto-js.js'

function friendlyDate(timestamp) {
	var formats = {
		'year': '%n% 年前',
		'month': '%n% 月前',
		'day': '%n% 天前',
		'hour': '%n% 小时前',
		'minute': '%n% 分钟前',
		'second': '%n% 秒前',
	};

	var now = Date.now();
	var seconds = Math.floor((now - timestamp) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	var months = Math.floor(days / 30);
	var years = Math.floor(months / 12);

	var diffType = '';
	var diffValue = 0;
	if (years > 0) {
		diffType = 'year';
		diffValue = years;
	} else {
		if (months > 0) {
			diffType = 'month';
			diffValue = months;
		} else {
			if (days > 0) {
				diffType = 'day';
				diffValue = days;
			} else {
				if (hours > 0) {
					diffType = 'hour';
					diffValue = hours;
				} else {
					if (minutes > 0) {
						diffType = 'minute';
						diffValue = minutes;
					} else {
						diffType = 'second';
						diffValue = seconds === 0 ? (seconds = 1) : seconds;
					}
				}
			}
		}
	}
	return formats[diffType].replace('%n%', diffValue);
}
function encrypt(msg) {
	  var key = CryptoJS.enc.Base64.parse('ZGIyMTM5NTYxYzlmZTA2OA==');
	     var iv = CryptoJS.enc.Base64.parse('ZGIyMTM5NTYxYzlmZTA2OA==');
        return CryptoJS.AES.encrypt(msg, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        }).ciphertext.toString();
    }
function decrypt(cipherText) {
	  var key = CryptoJS.enc.Base64.parse('ZGIyMTM5NTYxYzlmZTA2OA==');
	     var iv = CryptoJS.enc.Base64.parse('ZGIyMTM5NTYxYzlmZTA2OA==');
        // 拿到字符串类型的密文需要先将其用Hex方法parse一下
        var cipherTextHexStr = CryptoJS.enc.Hex.parse(cipherText);
        // 将密文转为Base64的字符串
        // 只有Base64类型的字符串密文才能对其进行解密
        var cipherTextBase64Str = CryptoJS.enc.Base64.stringify(cipherTextHexStr);
        var decrypted = CryptoJS.AES.decrypt(cipherTextBase64Str, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
function getFileSize(fileByte){
		var fileSizeByte = fileByte;
		var fileSizeMsg = "";
		if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
		else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
		else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
		else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
		else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
		else fileSizeMsg = "文件超过1TB";
		return fileSizeMsg;
	}
export {
	friendlyDate,encrypt,decrypt,getFileSize
}
