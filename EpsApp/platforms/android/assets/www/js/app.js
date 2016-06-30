// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
//系统信息
.constant("EPSConfig", {
    "version": "1.0.1",//app version
    "name": "EPS For App",
    "api": "http://127.0.0.1:60001/Inspect",
    "protocolVersion": "0.5"//协议版本
})
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('top');//android默认tab会在上面，这样可以统一使tab在最下面。
    $ionicConfigProvider.navBar.alignTitle('center');//设置nav title剧中
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');


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
    .state('tab.farmerInfo', {
        url: '/farmerInfo',
        views: {
            'tab-farmerInfo': {
                templateUrl: 'templates/tab-farmerInfo.html',
                controller: 'FarmerInfoCtrl'
            }
        }
    })
    .state('tab.signIn', {
        url: '/signIn',
        views: {
            'tab-signIn': {
                templateUrl: 'templates/tab-signIn.html',
                controller: 'SignInCtrl'
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
    })
     //首页
     .state('index', {
         url: '/',
         cache: false,
         templateUrl: 'templates/farmers.html',
         controller: 'SelectFarmerCtrl'
     })
    .state('farmers', {
        url: '/farmers',
        templateUrl: 'templates/farmers.html',
        cache: false,
        controller: 'SelectFarmerCtrl'
    })
    //---------------------------------巡查报告--------------------------------
    .state('tab.checkRpt', {
        url: '/checkRpt',
        views: {
            'tab-checkRpt': {
                templateUrl: 'templates/tab-checkRpt.html',
                controller: 'CheckRptMasterCtrl'
            }
        }
    })
   .state('tab.addCheckRpt', {
       url: '/addCheckRpt',
       views: {
           'tab-checkRpt': {
               templateUrl: 'templates/tab-addCheckRpt.html',
               controller: 'AddCheckRptCtrl'
           }
       }
   })
     .state('tab.editCheckRpt', {
       url: '/editCheckRpt',
       views: {
           'tab-checkRpt': {
               templateUrl: 'templates/tab-editCheckRpt.html',
               controller: 'EditCheckRptCtrl'
           }
       }
   })
   .state('tab.checkRptDetail', {
       url: '/checkRptDetail/:jobId',
            views: {
                'tab-checkRpt': {
                    templateUrl: 'templates/tab-checkRptDetail.html',
                    controller: 'CheckRptDetailCtrl'
                }
            }
   })
  //---------------------------------/巡查报告--------------------------------
  //---------------------------------设备维修--------------------------------
     .state('tab.eqRepair', {
         url: '/eqRepair',
         views: {
             'tab-eqRepair': {
                 templateUrl: 'templates/tab-eqRepair.html',
                 controller: 'EqRepairCtrl'
             }
         }
     })
         .state('tab.addEqRepair', {
             url: '/addEqRepair',
             views: {
                 'tab-eqRepair': {
                     templateUrl: 'templates/tab-addEqRepair.html',
                     controller: 'AddEqRepairCtrl'
                 }
             }
         })
   .state('tab.eqRepairDetail', {
       url: '/eqRepairDetail/:id',
       views: {
           'tab-eqRepair': {
               templateUrl: 'templates/tab-eqRepairDetail.html',
               controller: 'EqRepairDetailCtrl'
           }
       }
   })
 //---------------------------------/设备维修--------------------------------
     .state('tab.alarm', {
         url: '/alarm',
         views: {
             'tab-alarm': {
                 templateUrl: 'templates/tab-alarm.html',
                 controller: 'AlarmCtrl'
             }
         }
     })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

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

        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }

        //监听路由事件 
        $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
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

        //隐藏启动画面
        navigator.splashscreen.hide();
    });
});




