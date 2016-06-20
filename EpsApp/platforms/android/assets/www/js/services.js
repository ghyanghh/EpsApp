angular.module('starter.services', [])

.factory('AccountSvr', function (EPSConfig) {
    return {
        Login: function (userName, password) {

            //需要同步所以用jquery
            $.ajax({
                type: 'post',
                url: EPSConfig.api + "/Login",
                async: false,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",//json发送
                data: JSON.stringify({ 'ts': '1', 'key': '2', 'pp': '3', 'v': '4', 'request': { 'account': userName, 'pass': password } }),
                success: function (res) {
                    SvrResponse.result = res.result;
                    SvrResponse.errmsg = res.errmsg;
                    SvrResponse.response = res.response;
                },
                error: function (res) {
                    SvrResponse.result = "-10000000";
                    SvrResponse.errmsg = "服务器错误!";
                    SvrResponse.response = {};
                }
            });
            return SvrResponse;
        },
        Logout: function (userName) {
            //???
            SvrResponse.result = '0';
            SvrResponse.errmsg = '';
            SvrResponse.response = '';

            return SvrResponse;
        }
    };
})

;
