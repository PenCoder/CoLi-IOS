import { observable } from "mobx"
import { Toast } from "native-base";
import { ToastAndroid } from "react-native";

module.exports = {
    existing: false,
    user: {},
    userId: {},
    pack: {},
    selectedPack: {},
    packs: [],
    data: {},
    outstanding: '',
    main: {},
    time: 0,
    days: 0,
    percentage: 0,
    userid: '',
    days_percent: 0.0,

    referrer: {},
    refcode: '',
    refClients: [],
    subusername: '',
    subpack: '',
    subphone: '',

    invoice: '',
    installationCost: 149,

    additionalUsers: [],
    topup_balance: ''
}


// export var existing = false;
// export var user = {};
// export var userId = '';
// export var pack = {};
// export var selectedPack = {};
// export var packs = [];
// export var data = {};
// export var outstanding = '';
// export var main = {};
// export var time = 0;
// export var days = 0;
// export var percentage = 0;
// export var userid = '';
// export var days_percent = 0.0;

// export var referrer = {};
// export var refcode = '';
// export var refClients = [];
// export var subusername = '';
// export var subpack = '';
// export var subphone = '';

// export var invoice = '';
// export var installationCost = 149

export class GlobalProps {
    constructor() { }

    @observable existing = false;
    @observable user = {};
    @observable userId = {};
    @observable pack = {};
    @observable selectedPack = {};
    @observable packs = [];
    @observable data = {};
    @observable outstanding = '';
    @observable main = {};
    @observable time = 0;
    @observable days = 0;
    @observable percentage = 0;
    @observable userid = '';
    @observable days_percent = 0.0;

    @observable referrer = {};
    @observable refcode = '';
    @observable refClients = [];
    @observable subusername = '';
    @observable subpack = '';
    @observable subphone = '';

    @observable invoice = '';
    @observable installationCost = 149;

    @observable additionalUsers = [];
    @observable topup_balance = ''
    // @observable user = null;
    // @observable package = {};
    // @observable daysRemaining = 0;
    // @observable percentageData = 0;
    // @observable dataRemaining = 0;

    // @action getUserInfo = () => {

    // }

    // @action refreshUser = async () => {
    //     if (user) {
    //         try {
    //             var userId = user['UserId'];

    //             var response = await fetch('http://api.coliserver.com/pmsapi.php?op=userinfo&Uid=' + userId);
    //             var json = await response.json();
    //             if (json[0].UserId) {
    //                 user = json[0];
    //             }
    //         } catch (e) {
    //             ToastAndroid.show(e.message, ToastAndroid.LONG);
    //         }
    //     }
    // }

    // @action autoLogin = async () => {
    //     try {
    //         // Fetch User info from Local store
    //         var storedUser = await AsyncStorage.getItem('user-store');
    //         var unStoredUser = await AsyncStorage.getItem('un-user-store');
    //         // Check if User has not logged out

    //         if (storedUser) {
    //             var userInfo = JSON.parse(storedUser);
    //             GLOBAL.existing = true;
    //             var userId = userInfo[0];

    //             var response = await fetch('http://api.coliserver.com/pmsapi.php?op=userinfo&Uid=' + userId);
    //             var json = await response.json();

    //             // Check if User Exists
    //             if (json) {
    //                 if (typeof (json[0]['UserId']) !== 'undefined') {
    //                     var user = json[0];
    //                     GLOBAL.existing = true;
    //                     GLOBAL.user = user;
    //                     GLOBAL.userId = user['UserId'];

    //                     fetch('http://api.coliserver.com/pmsapi.php?op=listpackage')
    //                         .then(packResponse => packResponse.json())
    //                         .then(async (packs) => {
    //                             GLOBAL.packs = packs;
    //                             GLOBAL.packs.map(plan => {
    //                                 if (
    //                                     plan['Plan_name'].toLowerCase() ==
    //                                     GLOBAL.user['Plan Name'].toLowerCase()
    //                                 ) {
    //                                     GLOBAL.pack = plan;
    //                                 }
    //                             });

    //                             this.props.navigation.navigate('Main');
    //                         })
    //                         .catch(e => {
    //                             alert(e.message);
    //                         });
    //                 }
    //                 else {
    //                     alert('Username or password invalid');
    //                 }

    //             } else {
    //                 ToastAndroid.show('No User found', ToastAndroid.SHORT);
    //             }
    //         }
    //         else if (unStoredUser) {
    //             GLOBAL.existing = false;
    //             var userInfo = JSON.parse(unStoredUser);
    //             GLOBAL.user = userInfo[0];
    //             GLOBAL.pack = userInfo[1];
    //             if (userInfo[2]) {
    //                 GLOBAL.packs;
    //             }
    //             this.props.navigation.navigate('UnMain');
    //         }
    //         else { }

    //         this.setState({
    //             isLoggedIn: false,
    //         });
    //     }
    //     catch (e) {
    //         ToastAndroid.show(e.message, ToastAndroid.LONG);

    //         this.setState({
    //             isLoggedIn: false,
    //         });
    //     }
    // }
}