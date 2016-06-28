(function ($) {

 
    //数组中包含元素
    $.fn.Contains = function (e) {
        for (i = 0; i < this.length && this[i] != e; i++);
        return !(i == this.length);
    }
    //数组中查找元素位置
    $.fn.indexOf = function (e) {
        for (i = 0; i < this.length && this[i] != e; i++);
        return i;
    }

    //获取url参数
    $.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    //含数组对象转换为mvc可反序列化类型 {prm:"", model:[{id:""},{id:""}]} => {prm:"", model[0].id:"",model[1].id:""}
    $.array2param = function (obj) {
        var res = {};
        for (var key in obj) {
            if ($.isArray(obj[key])) {
                $(obj[key]).each(function (i, e) {
                    for (var m in e) {
                        res[key + "[" + i + "]." + m] = e[m];
                    }
                });
            } else {
                res[key] = obj[key];
            }
        }
        return res;
    }
})(jQuery);


Date.prototype.format = function (format) {
    if (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(),    //day
            "h+": this.getHours(),   //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
            "S": this.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    }
}
String.prototype.formatDate = function (format) {
    var value = this;
    if (/^\/Date/.test(value)) {
        value = value.replace(/^\//, "new ").replace(/\/$/, "");
        eval("value = " + value);
    }
    return value.format(format);
}
String.prototype.replaceAll = function (s1, s2, igCase) {
    if (igCase) {
        return this.replace(new RegExp(s1, "gmi"), s2);
    }
    else {
        return this.replace(new RegExp(s1, "gm"), s2);
    }
}
String.prototype.padLeft = function (totalWidth, paddingChar) {
    if (paddingChar != null) {
        return this.padHelper(totalWidth, paddingChar, false);
    } else {
        return this.padHelper(totalWidth, ' ', false);
    }
}
String.prototype.padRight = function (totalWidth, paddingChar) {
    if (paddingChar != null) {
        return this.padHelper(totalWidth, paddingChar, true);
    } else {
        return this.padHelper(totalWidth, ' ', true);
    }

}
String.prototype.padHelper = function (totalWidth, paddingChar, isRightPadded) {

    if (this.length < totalWidth) {
        var paddingString = new String();
        for (i = 1; i <= (totalWidth - this.length) ; i++) {
            paddingString += paddingChar;
        }

        if (isRightPadded) {
            return (this + paddingString);
        } else {
            return (paddingString + this);
        }
    } else {
        return this;
    }
}
String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
    return true;
}
String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true;
    else
        return false;
    return true;
}