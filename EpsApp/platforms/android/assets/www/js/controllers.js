angular.module('starter.controllers', [])

.controller('ContentController', function ($rootScope, $scope, $ionicModal, $ionicPopup, EPSConfig, AccountSvr) {
    //check
    var localUserInfo = angular.fromJson(localStorage.getItem(localStorageKey.User));
    localUserInfo = localUserInfo == null ? User : localUserInfo;
    if (!localUserInfo.IsLogin) {
        $ionicModal.fromTemplateUrl('login.html', {
            scope: $scope,
            animation: 'slide-in-down',
            hardwareBackButtonClose: false
        }).then(function (modal) {
            $scope.loginModal = modal;
            $scope.loginModal.show().then(function () {
            });
        });
    }
    //bind
    $scope.UserName = angular.fromJson(localStorage.getItem(localStorageKey.User)).UserName;
    $scope.AppVersion = EPSConfig.version;
    //method
    $scope.Fresh = function () {

    }
    $scope.ShowChangePwdView = function () { };
    $scope.Logout = function () {
        var resp = AccountSvr.Logout($scope.UserName);
        if (resp.result == 0) {
            localStorage.removeItem(localStorageKey.User);
            $ionicModal.fromTemplateUrl('login.html', {
                scope: $scope,
                animation: 'slide-in-down',
                hardwareBackButtonClose: false
            }).then(function (modal) {
                $scope.loginModal = modal;
                $scope.loginModal.show().then(function () {
                });
            });;
        }
        else {
            $ionicPopup.alert({
                title: 'error!',
                template: resp.errmsg
            });
        }
    }
})

.controller('CheckPlanCtrl', function ($scope, $ionicModal, $ionicPopover) {
    $scope.popover = $ionicPopover.fromTemplateUrl('checkPlan-search.html', {
        scope: $scope
    });

    // .fromTemplateUrl() 方法
    $ionicPopover.fromTemplateUrl('checkPlan-search.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });


    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    // 清除浮动框
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    // 在隐藏浮动框后执行
    $scope.$on('popover.hidden', function () {
        // 执行代码
    });
    // 移除浮动框后执行
    $scope.$on('popover.removed', function () {
        // 执行代码
    });
})

.controller('ChatsCtrl', function ($scope, $ionicModal) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function (e) {
    //});

})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})
.controller('AccountCtrl', function ($scope, AccountSvr, $ionicPopup, $ionicModal, $ionicLoading) {
    //remember account
    var localUserInfo = angular.fromJson(localStorage.getItem(localStorageKey.User));
    localUserInfo = localUserInfo == null ? User : localUserInfo;
    if (localUserInfo.IsRemeberAccount) {
        $scope.userName = angular.fromJson(localStorage.getItem(localStorageKey.User)).UserName;
        $scope.password = angular.fromJson(localStorage.getItem(localStorageKey.User)).Password;
        $scope.rememberAccount = true;
    }

    $scope.Login = function () {
        //check
        if ($scope.userName == '' || $scope.userName == undefined) {
            $ionicPopup.alert({
                title: '警告!',
                template: '请输入用户名！'
            });
            return;
        }
        if ($scope.password == '' || $scope.password == undefined) {
            $ionicPopup.alert({
                title: '警告!',
                template: '请输入密码！'
            });
            return;
        }

        //open loading
        $ionicLoading.show({ duration: 10000 });

        var resp = AccountSvr.Login($scope.userName, $scope.password);
        //test code 
        resp = {
            result: '0',
            response: { PP: '123123' },
            errmsg: ''
        };
        if (resp.result == '0') {
            User.IsLogin = true,
            User.PP = resp.response.PP;
            User.UserName = $scope.userName;
            User.Password = $scope.password;
            if ($scope.rememberAccount) {
                User.IsRemeberAccount = true;
            }
            localStorage.setItem(localStorageKey.User, angular.toJson(User))
            window.location.href = 'index.html';
        }
        else {
            $ionicPopup.alert({
                title: '警告!',
                template: resp.errmsg
            });
        }
        //close loading
        $ionicLoading.hide();
    };

});

