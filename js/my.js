function $(id) {
    return document.getElementById(id);
}
// 中文、字母、数字、_ - 4-20

var regs = {
    userNameReg: /^(([\u4e00-\u9fa5])|[a-zA-Z0-9-_]){4,20}$/,
    pwdReg: /^.{6,20}$/,
    numReg: /\d/,
    strReg: /[a-zA-Z]/,
    tsReg: /[^\u4e00-\u9fa5a-zA-Z0-9]/
}
window.onload = function() {
    // 用户名字母、数字、_、-、中文  \u4e00-\u9fa5  4-20
    // box   常规 box  出错的时候  box error  正确的时候  box right
    // tip   常规 tip hide  出错的时候  tip error  默认的时候  tip default
    var userName = $("userName");
    var pwd = $("pwd");
    var pwd2 = $("pwd2");
    var email = $("email");
    var mobile = $("mobile");
    var ck = $("ck");
    var btn = $("btn");

    userName.onkeyup = userName.onfocus = userName.onblur = function(evt) {
        var e = evt || window.event;
        checkUserName(e);
    }

    function checkUserName(_e) {
        var type;
        if (_e) {
            type = _e.type;
        }
        var value = userName.value;
        var box = userName.parentNode;
        var tip = box.nextElementSibling;
        var span = tip.lastElementChild;
        if (type == "focus") {
            if (value == "") {
                box.className = "box";
                tip.className = "tip default";
                span.innerHTML = "支持汉字、字母、数字、“-”“_”的组合，4-20个字符";
                return false;
            }
        }
        if (type == "blur") {
            if (value == "") {
                box.className = "box";
                tip.className = "tip hide";
                return false; //不继续往下走
            }
        }

        if (value == "") {
            box.className = "box error";
            tip.className = "tip error";
            span.innerHTML = "用户名不能为空";
            return false;
        } else if (regs.userNameReg.test(value)) {
            box.className = "box right";
            tip.className = "tip hide";
            return true;
        } else {
            box.className = "box error";
            tip.className = "tip error";
            span.innerHTML = "格式错误，仅支持汉字、字母、数字、“-”“_”的组合";
            return false;
        }
    }
    pwd.onkeyup = pwd.onfocus = pwd.onblur = function(evt) {
        var e = evt || window.event;
        checkPwd(e);
    }

    function checkPwd(_e) {
        var type;
        if (_e) {
            type = _e.type;
        }
        var value = pwd.value;
        var box = pwd.parentNode;
        var tip = box.nextElementSibling;
        var span = tip.lastElementChild;
        if (type == "focus") {
            if (value == "") {
                box.className = "box";
                tip.className = "tip default";
                span.innerHTML = "建议使用字母、数字和符号两种以上的组合,6-20个字符";
                return false;
            }
        }
        if (type == "blur") {
            if (value == "") {
                box.className = "box";
                tip.className = "tip hide";
                return false;
            }
        }

        if (value == "") {
            box.className = "box error";
            tip.className = "tip error";
            span.innerHTML = "密码不能为空";
            return false;
        } else if (regs.pwdReg.test(value)) {
            box.className = "box right";
            var level = getPwdLevel(value);
            switch (level) {
                case 1:
                    tip.className = "tip ruo";
                    break;
                case 2:
                    tip.className = "tip zhong";
                    break;
                case 3:
                    tip.className = "tip qiang";
                    break;
            }
            return true;
            // 弱  中  强
            // 字母、数字、特殊字符
            // level 1弱 2中  3强
            // tip ruo zhong qiang
            // jkj343?
            // tip.className = ""
        } else {
            box.className = "box error";
            tip.className = "tip error";
            span.innerHTML = "密码长度应在6-20个字符之间";
            return false;
        }
    }
    pwd2.onkeyup = pwd2.onfocus = pwd2.onblur = function(evt) {
        var e = evt || window.event;
        checkPwd2(e);
    }

    function checkPwd2(_e) {
        var type;
        if (_e) {
            type = _e.type;
        }
        var value1 = pwd.value;
        var value = pwd2.value;
        var box = pwd2.parentNode;
        var tip = box.nextElementSibling;
        var span = tip.lastElementChild;
        if (type == "focus") {
            if (value == "") {
                box.className = "box";
                tip.className = "tip default";
                span.innerHTML = "请再次输入密码";
                return false;
            }
        }
        if (value == "") {
            box.className = "box error";
            tip.className = "tip error";
            span.innerHTML = "请再次输入密码";
            return false;
        } else if (value1 == value) {
            box.className = "box right";
            tip.className = "tip hide";
            return true;
        } else {
            box.className = "box error";
            tip.className = "tip error";
            span.innerHTML = "两次密码不一致";
            return false;
        }
    }
    btn.onclick = function() {
        var box = ck.parentNode;
        var tip = box.nextElementSibling;
        var span = tip.lastElementChild;
        if (ck.checked) {
            if (checkUserName() && checkPwd() && checkPwd2()) {
                alert("可以注册");
            } else {
                return false;
            }
        } else {
            tip.className = "tip error";
            span.innerHTML = "请同意协议";
            return false;
        }
    }
    ck.onclick = function() {
        var box = ck.parentNode;
        var tip = box.nextElementSibling;
        var span = tip.lastElementChild;
        if (ck.checked) {
            tip.className = "tip hide";
        }
    }
}

function getPwdLevel(pwd) {
    var level = 0;
    var numReg = true,
        strReg = true,
        tsReg = true;
    for (var i = 0; i < pwd.length; i++) {
        if (numReg && regs.numReg.test(pwd[i])) {
            level++;
            numReg = false;
            continue;
        }
        if (strReg && regs.strReg.test(pwd[i])) {
            level++;
            strReg = false;
            continue;
        }
        if (tsReg && regs.tsReg.test(pwd[i])) {
            level++;
            tsReg = false;
        }
    }
    return level;
}