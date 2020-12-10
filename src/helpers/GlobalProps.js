import { observable, action } from "mobx";

export class GlobalProps {
    constructor() { }

    @observable existing = false;
    @observable user = {};
    @observable userId = {};
    @observable pack = {};
    @observable selectedPack = {};
    @observable packs = [];
    @observable activePacks = [];
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
    @observable addedProfile = {};
    @observable topup_balance = '';

    @action updateProp = (prop, value) => {
        this[prop] = value;
    }

    @action getActivePacks = async () => {
        try {
            var response = await fetch('http://api.coliserver.com/pmsapi.php?op=listpackage');
            packs = await response.json();

            var body = new FormData();
            body.append('mob-get-active-packs', 'active');
            var activeResponse = await fetch(
                'https://coli.com.gh/php/packages.php',
                {
                    body: body,
                    method: 'POST',
                    header: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            var activeNames = await activeResponse.json();
            console.log(JSON.stringify(activeNames))

            var packages = packs.filter((pack) => {
                return activeNames.find(name => name == pack['Plan_name']);
            });
            this.updateProp('packs', packages);
            this.updateProp('activePacks', activeNames);

        } catch (e) {

        }
    }

    @action signIn = async (data) => {
        // try {
        //     if (uid && pwd) {
        //       var data = new FormData();
        //       data.append('usnm', uid);
        //       data.append('pwd', pwd);
        //       data.append('user-sign-in', '_-_');
        //       var response = await fetch('http://api.coliserver.com/pmsapi.php?op=userinfo&Uid=' + uid);

        //       var json = await response.json();

        //       // Check if User Exists
        //       if (json) {
        //         if (typeof (json[0]['UserId']) !== 'undefined') {
        //           var user = json[0];
        //           if (pwd === user['Password']) {
        //             this.Global.updateProp('existing', true);
        //             this.Global.updateProp('user', user);
        //             this.Global.updateProp('userId', user['UserId']);

        //             fetch('http://api.coliserver.com/pmsapi.php?op=listpackage')
        //               .then(packResponse => packResponse.json())
        //               .then(async (packs) => {
        //                 // this.Global.updateProp('packs', packs);
        //                 packs.map(plan => {
        //                   if (
        //                     plan['Plan_name'].toLowerCase() == this.Global.user['Plan Name'].toLowerCase()
        //                   ) {
        //                     this.Global.updateProp('pack', plan);
        //                   }
        //                 });
        //                 // Store Local
        //                 var userInfo = [user.UserId, user['Plan Name']];
        //                 await AsyncStorage.setItem('user-store', JSON.stringify(userInfo));
        //                 // Additional Users
        //                 var additionalUsers = await AsyncStorage.getItem('additional-users');
        //                 if (additionalUsers) {
        //                   this.Global.updateProp('additionalUsers', JSON.parse(additionalUsers));
        //                 } else {
        //                   this.Global.updateProp('additionalUsers', []);
        //                 }
        //                 this.props.navigation.navigate('HomeStack');
        //               })
        //               .catch(e => {
        //                 RNToasty.Warn({
        //                   title: e.message,
        //                   fontFamily: 'Roboto',
        //                   position: 'bottom'
        //                 });
        //               });
        //           }
        //           else {
        //             RNToasty.Show({
        //               title: 'Username or password invalid.',
        //               fontFamily: 'Roboto',
        //               position: 'bottom'
        //             });
        //           }
        //         }
        //         else {
        //           var neResponse = await fetch('https://coli.com.gh/dashboard/mobile/user_account.php', {
        //             method: 'POST',
        //             body: data,
        //             header: {
        //               Accept: 'application/json',
        //               'Content-Type': 'multipart/form-data',
        //             }
        //           });
        //           var neText = await neResponse.text();
        //           if (neText.includes("non-existing")) {
        //             var neJson = JSON.parse(neText);
        //             var neUser = neJson[1];
        //           }
        //           RNToasty.Show({
        //             title: 'Username or password invalid',
        //             fontFamily: 'Roboto',
        //             position: 'bottom'
        //           });
        //         }

        //       } else {
        //         RNToasty.Show({
        //           title: 'No user found',
        //           fontFamily: 'Roboto',
        //           position: 'bottom'
        //         });
        //       }
        //     }
        //     else if (!uid) {
        //       RNToasty.Show({
        //         title: 'Please input username',
        //         fontFamily: 'Roboto',
        //         position: 'bottom'
        //       });
        //     }
        //     else if (!pwd) {
        //       RNToasty.Show({
        //         title: 'Please Input user password',
        //         fontFamily: 'Roboto',
        //         position: 'bottom'
        //       });
        //     }
        //   }
        //   catch (e) {
        //     RNToasty.Warn({
        //       title: e.message,
        //       fontFamily: 'Roboto',
        //       position: 'bottom'
        //     });
        //   }
    }
}