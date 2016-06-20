angular.module('starter.services', [])

.factory('AccountSvr', function (EPSConfig) {
    return {
        Login: function (userName, password) {

            //��Ҫͬ��������jquery
            $.ajax({
                type: 'post',
                url: EPSConfig.api + "/Login",
                async: false,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",//json����
                data: JSON.stringify({ 'ts': '1', 'key': '2', 'pp': '3', 'v': '4', 'request': { 'account': userName, 'pass': password } }),
                success: function (res) {
                    SvrResponse.result = res.result;
                    SvrResponse.errmsg = res.errmsg;
                    SvrResponse.response = res.response;
                },
                error: function (res) {
                    SvrResponse.result = "-10000000";
                    SvrResponse.errmsg = "����������!";
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
