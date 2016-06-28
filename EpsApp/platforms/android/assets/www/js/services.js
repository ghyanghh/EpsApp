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
                data: JSON.stringify({ 'ts': new Date().format("yyyy-MM-dd HH:mm:ss"), 'key': '-1', 'pp': '', 'v': EPSConfig.protocolVersion, 'request': { 'account': userName, 'pass': password } }),
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
.factory('AddrSvr', function (EPSConfig) {
    return {
        //乡
        GetTowns: function (pp, pageIndex, rowCount) {
            //需要同步所以用jquery
            $.ajax({
                type: 'post',
                url: EPSConfig.api + "/GetTowns",
                async: false,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",//json发送
                data: JSON.stringify({
                    'ts': new Date().format("yyyy-MM-dd HH:mm:ss"), 'key': '-1', 'pp': pp, 'v': EPSConfig.protocolVersion, 'request': {
                        'pageindex': pageIndex, 'rowcount': rowCount
                    }
                }),
                success: function (res) {
                    SvrResponse.result = res.result;
                    SvrResponse.errmsg = res.errmsg;
                    SvrResponse.response = res.response;
                },
                error: function (res) {
                    SvrResponse.result = "-10000000";
                    SvrResponse.errmsg = "服务器错误!";
                    SvrResponse.response = {
                    };
                }
            });
            return SvrResponse;
        },
        //村
        GetVillages: function (townCode, pp, pageIndex, rowCount) {
            //需要同步所以用jquery
            $.ajax({
                type: 'post',
                url: EPSConfig.api + "/GetVillages",
                async: false,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",//json发送
                data: JSON.stringify({
                    'ts': new Date().format("yyyy-MM-dd HH:mm:ss"), 'key': '-1', 'pp': pp, 'v': EPSConfig.protocolVersion, 'request': { 'addresscode': townCode, 'pageindex': pageIndex, 'rowcount': rowCount }
                }),
                success: function (res) {
                    SvrResponse.result = res.result;
                    SvrResponse.errmsg = res.errmsg;
                    SvrResponse.response = res.response;
                },
                error: function (res) {
                    SvrResponse.result = "-10000000";
                    SvrResponse.errmsg = "服务器错误!";
                    SvrResponse.response = {
                    };
                }
            });
            return SvrResponse;
        }
    };
})
.factory('FarmerSvr', function (EPSConfig) {
    return {
        GetFarmers: function (villiageCode, pp, pageIndex, rowCount) {
            //需要同步所以用jquery
            $.ajax({
                type: 'post',
                url: EPSConfig.api + "/GetFarmers",
                async: false,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",//json发送
                data: JSON.stringify({
                    'ts': new Date().format("yyyy-MM-dd HH:mm:ss"), 'key': '-1', 'pp': pp, 'v': EPSConfig.protocolVersion, 'request': {
                        'addresscode': villiageCode, 'pageindex': pageIndex, 'rowcount': rowCount
                    }
                }),
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
        }
    };
});
