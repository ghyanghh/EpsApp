angular.module('starter.controllers', ['ionic', 'ionic-datepicker'])
.controller('IndexController', function ($scope, $state, AccountSvr, $ionicModal, $ionicPopup, EPSConfig) {
    //check
    var localUserInfo = angular.fromJson(localStorage.getItem(localStorageKey.User));
    localUserInfo = localUserInfo == null ? User : localUserInfo;
    if (!localUserInfo.IsLogin) {
        $ionicModal.fromTemplateUrl('login.html', {
            scope: $scope,
            animation: 'slide-in-down',
            hardwareBackButtonClose: false
        }).then(function (modal) {
            modal.show().then(function () {
            });
        });
    }

    //bind
    $scope.UserName = localUserInfo.UserName;
    $scope.AppVersion = EPSConfig.version;

    //method
    $scope.GoToFarmerLst = function () {

        $state.go('farmers', {}, { reload: true });
    };
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
            });
        }
        else {
            $ionicPopup.alert({
                title: 'error!',
                template: resp.errmsg
            });
        }
    };
    $scope.GoToHome = function () {
        $state.go('index');
        //window.location.href = "index.html";
    }

})
.controller('CheckController', function ($rootScope, $scope, $ionicModal, $ionicPopup, EPSConfig, AccountSvr, $state) {

    //bind
    //login info
    $scope.UserName = angular.fromJson(localStorage.getItem(localStorageKey.User)).UserName;
    $scope.AppVersion = EPSConfig.version;
    //farmer info


    //method
    $scope.Fresh = function () {

    }
    $scope.ShowChangePwdView = function () { };
    $scope.GoToHome = function () {
        $state.go('index');
        //window.location.href = "index.html";
    }

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
            });
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
    $scope.InspectTypeData = [
        { text: "全部", value: "0" },
        { text: "日常巡查", value: "1" },
        { text: "预警处理", value: "2" }
    ];
    $scope.Status = [
        { text: "全部", value: "0" },
        { text: "未处理", value: "1" },
        { text: "处理中", value: "2" },
        { text: "已处理", value: "3" },
    ];
    $scope.SelectedInspectTypeValue = '0';
    $scope.SelectedStatusValue = '0';

    $scope.serverSideChange = function (item) {
        console.log("Selected Serverside, text:", item.text, "value:", item.value);
    };

    $ionicModal.fromTemplateUrl('/templates/checkPlanSearch.html', {
        scope: $scope,
        animation: 'slide-in-down',
        hardwareBackButtonClose: false
    }).then(function (modal) {
        $scope.searchModal = modal;
    });

    //$scope.$on('modal.removed', function () {
    //    //exe search
    //});
    // /search define

    $scope.ShowSearch = function () {
        $scope.searchModal.show();
    }
    $scope.HideSearch = function () {
        $scope.searchModal.hide();
    }

    //datePicker
    $scope.StartDate = new Date();
    $scope.EndDate = new Date();
    $scope.StartDateCallback = function (val) {
        if (val) {
            $scope.StartDate = val;
        }
    };
    $scope.EndDateCallback = function (val) {
        if (val) {
            $scope.EndDate = val;
        }
    };
    // /datePicker
})
.controller('SignInCtrl', function ($scope) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function (e) {
    //});

    //define
    $scope.Data = {
        SignData: []
    }
    //init

    //test code
    $scope.Data.SignData.push({
        SignDate: '2016-06-24',
        Inspector: '张三'
    });
    $scope.Data.SignData.push({
        SignDate: '2016-06-23',
        Inspector: '李四'
    });
    $scope.Data.SignData.push({
        SignDate: '2016-06-22',
        Inspector: '王五'
    });
    //method

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

})
.controller('SelectFarmerCtrl', function ($scope, $ionicPopup, $state, $ionicModal, $ionicLoading, AddrSvr, FarmerSvr, $rootScope) {
    //define
    $scope.Data = {
        Town: {},
        Village: {},
        Farmer: {}
    }
    $scope.Sel = {
        Town: null,
        Village: null,
        Farmer: null
    }
    var localUserInfo = angular.fromJson(localStorage.getItem(localStorageKey.User));
    localUserInfo = localUserInfo == null ? User : localUserInfo;

    //init
    //Towns
    var respTown = AddrSvr.GetTowns(localUserInfo.PP, 1, 1000);
    //test code 
    respTown = {
        result: '0',
        response: { recordcount: 2, data: [{ addresscode: '001', name: 'town1' }, { addresscode: '002', name: 'town2' }] },
        errmsg: ''
    };
    if (respTown.result == '0') {
        $scope.Data.Town = respTown.response.data;
    }
    else {
        $ionicPopup.alert({
            title: '警告!',
            template: respTown.errmsg
        });
    }

    //method
    //village
    $scope.SetVillages = function (townCode, pageIndex, pageSize) {
        var respVillage = AddrSvr.GetVillages(townCode, localUserInfo.PP, pageIndex, pageSize);
        //test code 
        resp = {
            result: '0',
            response: { recordcount: 2, data: [{ addresscode: '001', name: 'village1' }, { addresscode: '002', name: 'village2' }] },
            errmsg: ''
        };
        if (resp.result == '0') {
            $scope.Data.Village = resp.response.data;
        }
        else {
            $ionicPopup.alert({
                title: '警告!',
                template: resp.errmsg
            });
        }
    };
    //farmer
    $scope.SetFarmers = function (villageCode, pageIndex, pageSize) {
        var resp = AddrSvr.GetVillages(villageCode, localUserInfo.PP, pageIndex, pageSize);
        //test code 
        resp = {
            result: '0',
            response: { recordcount: 2, data: [{ farmerid: '001', farmername: 'farmer1', telephone: '110' }, { farmerid: '002', farmername: 'farmer2', telephone: '120' }] },
            errmsg: ''
        };
        if (resp.result == '0') {
            $scope.Data.Farmer = resp.response.data;
        }
        else {
            $ionicPopup.alert({
                title: '警告!',
                template: resp.errmsg
            });
        }
    };

    //event
    $scope.ChangeTown = function () {
        //clear
        $scope.Data.Farmer = {};
        $scope.Data.Village = {};

        $scope.SetVillages($scope.Sel.Town.addresscode, 1, 1000);
    }
    $scope.ChangeVillage = function () {
        //clear
        $scope.Data.Farmer = {};

        $scope.SetFarmers($scope.Sel.Village.addresscode, 1, 1000);
    }
    $scope.Ok = function () {
        debugger;

        if ($scope.Sel.Farmer == null) {
            $ionicPopup.alert({
                title: '警告!',
                template: '请选择农户'
            });
            return
        }
        $rootScope.farmerId = $scope.Sel.Farmer.farmerid;
        window.location.href = '#/tab/farmerInfo';


        //$state.go('#/tab/farmerInfo', { farmerId: $scope.Sel.Farmer.farmerid }, { reload: true });
    };
    $scope.Cancel = function () {
        $state.go('index');
    }
})
.controller('FarmerInfoCtrl', function ($scope, $rootScope) {
    console.log($rootScope.farmerId);

    //define
    $scope.Data = {
        FarmerInfo: { name: '', tel: '', addr: '', farmerNo: '' },
    }

    //init
    //获取农户信息???
    //test code
    $scope.Data.FarmerInfo.name = 'zhang san';
    $scope.Data.FarmerInfo.tel = '110';
    $scope.Data.FarmerInfo.addr = 'hang zhou';
    $scope.Data.FarmerInfo.farmerNo = '12345';

    //method

})
//报告单-主信息
.controller('CheckRptMasterCtrl', function ($scope, $rootScope, $ionicActionSheet, $ionicPopup) {
    //$rootScope.farmerId;

    //弹出菜单
    $scope.showActionSheet = function (jobId) {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: '编辑' },//可以修改样式
              { text: '删除' }
            ],
            //destructiveText: '删除',
            //titleText: 'Modify your album',
            cancelText: '取消',
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                if (index == 0) {//编辑

                }
                else if (index == 1) {//删除
                    $ionicPopup.confirm({
                        title: '提示',
                        template: '确认删除?'
                    }).then(function (res) {
                        if (res) {
                            $.each($scope.Data.rpts, function (index, value) {
                                if (value.JobId == jobId) {
                                    $scope.Data.rpts.splice(index, 1);
                                }
                            });
                        }
                    });
                }
            }
        });
    }
    //define
    $scope.Data = {
        rpts: []
    }
    //init
    //获取报告单
    //test code
    $scope.Data.rpts.push({
        JobId: '001',
        JobStatus: '完成',
        InspectDate: '2016-06-24',
        Inspector: '张三'
    });
    $scope.Data.rpts.push({
        JobId: '002',
        JobStatus: '完成',
        InspectDate: '2016-06-23',
        Inspector: '李四'
    });
    $scope.Data.rpts.push({
        JobId: '003',
        JobStatus: '完成',
        InspectDate: '2016-06-23',
        Inspector: '李四'
    });
    $scope.Data.rpts.push({
        JobId: '004',
        JobStatus: '完成',
        InspectDate: '2016-06-23',
        Inspector: '李四'
    });
    $scope.Data.rpts.push({
        JobId: '005',
        JobStatus: '完成',
        InspectDate: '2016-06-23',
        Inspector: '李四'
    });
    //method

})
//报告单-新增
.controller('AddCheckRptCtrl', function ($scope, $rootScope, $ionicPopup) {
    //define
    $scope.InspectResultData = {
        InspectResult: '',
        Remark: '',
        Pic1: '',
        Pic2: '',
        Pic3: ''
    }
    $scope.InspectResultData = {
        InspectResult: '',
        Remark: '',
        Pic1: '',
        Pic2: '',
        Pic3: ''
    }

    //???后台获取报告单信息、设备信息

    //???test code
    $scope.Data.InspectRes.push({
        InspectResult: '正常',
        Remark: '',
        Pic1: 'http://www.runoob.com/try/demo_source/venkman.jpg',
        Pic2: 'http://www.runoob.com/try/demo_source/siamese-dream.jpg',
        Pic3: 'http://www.runoob.com/try/demo_source/venkman.jpg',
    });
    $scope.Data.Maintance.push({
        DevicePartType: '水泵',
        BeginStatus: '损坏',
        FinalStatus: '正常',
        RepairStatus: '修好',
        Reason: '不明',
        Pic1: 'http://www.runoob.com/try/demo_source/venkman.jpg',
        Pic2: 'http://www.runoob.com/try/demo_source/siamese-dream.jpg',
        Pic3: 'http://www.runoob.com/try/demo_source/venkman.jpg',
    });
    $scope.Data.Maintance.push({
        DevicePartType: '气泵',
        BeginStatus: '损坏',
        FinalStatus: '正常',
        RepairStatus: '修好',
        Reason: '使用不当',
        Pic1: 'http://www.runoob.com/try/demo_source/venkman.jpg',
        Pic2: 'http://www.runoob.com/try/demo_source/siamese-dream.jpg',
        Pic3: 'http://www.runoob.com/try/demo_source/venkman.jpg',
    });
})
//报告单-详细信息
.controller('CheckRptDetailCtrl', function ($scope, $rootScope, $stateParams) {
    $scope.JobId = $stateParams.jobId;

    //define
    $scope.Data = {
        InspectRes: [],//巡查结果

    }

    //???后台获取报告单信息

    //???test code
    $scope.Data.InspectRes.push({
        InspectResult: '正常',
        Remark: '',
        Pic1: 'http://www.runoob.com/try/demo_source/venkman.jpg',
        Pic2: 'http://www.runoob.com/try/demo_source/siamese-dream.jpg',
        Pic3: 'http://www.runoob.com/try/demo_source/venkman.jpg',
    });
   
})
//设备维修单-主信息
.controller('EqRepairCtrl', function ($scope, $rootScope, $ionicActionSheet, $ionicPopup) {

    //弹出菜单
    $scope.showActionSheet = function (id) {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: '编辑' },//可以修改样式
              { text: '删除' }
            ],
            //destructiveText: '删除',
            //titleText: 'Modify your album',
            cancelText: '取消',
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                if (index == 0) {//编辑

                }
                else if (index == 1) {//删除
                    $ionicPopup.confirm({
                        title: '提示',
                        template: '确认删除?'
                    }).then(function (res) {
                        if (res) {
                            $.each($scope.Data.EqRepair, function (index, value) {
                                if (value.id == id) {
                                    $scope.Data.EqRepair.splice(index, 1);
                                }
                            });
                        }
                    });
                }
            }
        });
    }
    //define
    $scope.Data = {
        EqRepair: []
    }
    //init
    //test code
    $scope.Data.EqRepair.push({
        Id: '001',
        Status: '完成',
        Date: '2016-06-24',
        Inspector: '张三'
    });
    $scope.Data.EqRepair.push({
        Id: '002',
        Status: '未完成',
        Date: '2016-06-23',
        Inspector: '张三'
    });
    $scope.Data.EqRepair.push({
        Id: '003',
        Status: '完成',
        Date: '2016-06-22',
        Inspector: '张三'
    });
    $scope.Data.EqRepair.push({
        Id: '004',
        Status: '完成',
        Date: '2016-06-21',
        Inspector: '张三'
    });
    //method

})
//设备维修单-新增
.controller('AddEqRepairCtrl', function ($scope, $rootScope, $ionicPopup) {
    //define
    $scope.InspectResultData = {
        InspectResult: '',
        Remark: '',
        Pic1: '',
        Pic2: '',
        Pic3: ''
    }
    $scope.InspectResultData = {
        InspectResult: '',
        Remark: '',
        Pic1: '',
        Pic2: '',
        Pic3: ''
    }

    //???后台获取报告单信息、设备信息

    //???test code
    $scope.Data.InspectRes.push({
        InspectResult: '正常',
        Remark: '',
        Pic1: 'http://www.runoob.com/try/demo_source/venkman.jpg',
        Pic2: 'http://www.runoob.com/try/demo_source/siamese-dream.jpg',
        Pic3: 'http://www.runoob.com/try/demo_source/venkman.jpg',
    });
    $scope.Data.Maintance.push({
        DevicePartType: '水泵',
        BeginStatus: '损坏',
        FinalStatus: '正常',
        RepairStatus: '修好',
        Reason: '不明',
        Pic1: 'http://www.runoob.com/try/demo_source/venkman.jpg',
        Pic2: 'http://www.runoob.com/try/demo_source/siamese-dream.jpg',
        Pic3: 'http://www.runoob.com/try/demo_source/venkman.jpg',
    });
    $scope.Data.Maintance.push({
        DevicePartType: '气泵',
        BeginStatus: '损坏',
        FinalStatus: '正常',
        RepairStatus: '修好',
        Reason: '使用不当',
        Pic1: 'http://www.runoob.com/try/demo_source/venkman.jpg',
        Pic2: 'http://www.runoob.com/try/demo_source/siamese-dream.jpg',
        Pic3: 'http://www.runoob.com/try/demo_source/venkman.jpg',
    });
})
//设备维修单-详细信息
.controller('EqRepairDetailCtrl', function ($scope, $rootScope, $stateParams) {
    $scope.JobId = $stateParams.id;

    //define
    $scope.Data = {
        Maintance: []//设备结果
    }

    //???后台获取设备信息

    //???test code
    $scope.Data.Maintance.push({
        DevicePartType: '水泵',
        BeginStatus: '损坏',
        FinalStatus: '正常',
        RepairStatus: '修好',
        Reason: '不明',
        Pic1: 'http://www.runoob.com/try/demo_source/venkman.jpg',
        Pic2: 'http://www.runoob.com/try/demo_source/siamese-dream.jpg',
        Pic3: 'http://www.runoob.com/try/demo_source/venkman.jpg',
    });
    $scope.Data.Maintance.push({
        DevicePartType: '气泵',
        BeginStatus: '损坏',
        FinalStatus: '正常',
        RepairStatus: '修好',
        Reason: '使用不当',
        Pic1: 'http://www.runoob.com/try/demo_source/venkman.jpg',
        Pic2: 'http://www.runoob.com/try/demo_source/siamese-dream.jpg',
        Pic3: 'http://www.runoob.com/try/demo_source/venkman.jpg',
    });
})
.controller('AlarmCtrl', function ($scope, $rootScope, $ionicActionSheet) {

    //define


    //init

    //test code

    //method

})

