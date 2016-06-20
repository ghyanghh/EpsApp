// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

//系统配置信息
.constant("EPSConfig", {
    "version": "1.0.1",//app version
    "name": "EPS For App",
    "api": "http://127.0.0.1:60001/Inspect"
})

.run(function ($ionicPlatform, $rootScope, $ionicPopup, $state, $ionicModal) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        };

        //监听路由事件 
        $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            debugger;
            if (!angular.fromJson(localStorage.getItem(localStorageKey.User)).IsLogin) {
                $ionicPopup.alert({
                    title: "提示",
                    template: "请先登陆！",
                    okText: "知道了"
                }).then(function () {
                    //创建模式层
                    $ionicModal.fromTemplateUrl('login.html', {
                        scope: $scope,
                        animation: 'slide-in-down',
                        hardwareBackButtonClose: false
                    }).then(function (modal) {
                        $scope.loginModal = modal;
                        $scope.loginModal.show().then(function () {
                        });
                    });

                    //阻止原来页面加载
                    event.defaultPrevented();
                })
            }
            //$location.path();//获取路由地址
            //$location.path('/login');//设置路由地址
        });
    });
})


.config(function ($stateProvider, $urlRouterProvider, EPSConfig) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
      })

    // Each tab has its own nav history stack:
    .state('tab.checkPlan', {
        url: '/checkPlan',
        views: {
            'tab-checkPlan': {
                templateUrl: 'templates/tab-checkPlan.html',
                controller: 'CheckPlanCtrl'
            }
        }
    })

    .state('tab.chats', {
        url: '/chats',
        views: {
            'tab-chats': {
                templateUrl: 'templates/tab-chats.html',
                controller: 'ChatsCtrl'
            }
        }
    })
      .state('tab.chat-detail', {
          url: '/chats/:chatId',
          views: {
              'tab-chats': {
                  templateUrl: 'templates/chat-detail.html',
                  controller: 'ChatDetailCtrl'
              }
          }
      })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/checkPlan');

    //本地存储key
    localStorageKey = {
        User: 'user'//用户信息
    }

    //登陆账户对象
    User = {
        IsLogin: false,
        PP: '',//通行证
        UserName: '',
        Password: '',
        IsRemeberAccount: false
    }

    //服务器返回对象
    SvrResponse = {
        result: -10000000,
        response: {},
        errmsg: ''
    }

    //客户端请求对象
    ClientRequest = {
        ts: '',
        key: '1',
        pp: '',
        request: {},
        ver: '1'//protocol version
    }
});
