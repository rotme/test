
//#region 常用信息提醒(type:success,warning,error)
function msgInfo(text) {
    sweetAlert({
        title: "消息提醒",
        text: text,
        confirmButtonText: "确定"
    });
}
//--type success warning error 带提醒按钮的提醒
function msgInfo(text, type) {
    sweetAlert({
        title: "消息提醒",
        text: text,
        type: type,
        confirmButtonText: "确定"
    });
}


//提醒并且跳转
function msgInfoUrl(text, url, type) {
    sweetAlert({
        title: "消息提醒",
        text: text,
        type: type,
        confirmButtonText: "确定"
    }, function (o) {
        location.href = url;
    });
}


function msgInfoConfirm(text, ok, no, url) {
    sweetAlert({
        title: "消息提醒",
        text: text,
        type: "warning",
        confirmButtonText: ok,
        cancelButtonText: no,
        showCancelButton: true,
        closeOnConfirm: false
    }, function (o) {
        if (o) {
            location.href = url;
        }
    });
}

function msgInfoConfirmCall(text, ok, no, callfunc) {
    sweetAlert({
        title: "消息提醒",
        text: text,
        type: "warning",
        confirmButtonText: ok,
        cancelButtonText: no,
        showCancelButton: true,
        closeOnConfirm: true
    }, function (o) {
        if (o) {
            callfunc();
        }
    });
}

//无按钮弹框
function infoNoBut(txt) {
    swal({
        title: txt,
        showConfirmButton: false
    });
}


function Utf16to8(str) { //二维码编码前把字符串转换成UTF-8
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
$.request = function (name) {
    var search = location.search.slice(1);
    var arr = search.split("&");
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split("=");
        if (ar[0] == name) {
            if (unescape(ar[1]) == 'undefined') {
                return "";
            } else {
                return unescape(ar[1]);
            }
        }
    }
    return "";
}

function isPhone(phone) {
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
    if (phone == undefined || phone == "" || phone == 'undefined') {
        return false;
    }
    else {
        var r = phone.match(reg);
        if (r == null) {
            return false;
        }
    }
    return true;
}
function isCardNo(code) {
    if (code.length != 18 &&code.length != 15) {
        return false;
    }
    //身份证号合法性验证
    //支持15位和18位身份证号
    //支持地址编码、出生日期、校验位验证
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    var row = true;
    var msg = "验证成功";

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
        row = false;
    } else if (!city[code.substr(0, 2)]) {
        row = false;
    } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            if (parity[sum % 11] != code[17].toUpperCase()) {
                row = false;
            }
        }
    }
    return row;
}
