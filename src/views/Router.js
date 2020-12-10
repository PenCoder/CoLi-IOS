import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { RNToasty } from 'react-native-toasty';
import { inject, observer } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';

@inject('globalProps')
@observer
export default class Router extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }

        this.Global = this.props.globalProps;
    }
    render() {
        return (
            <Spinner
                visible={this.state.isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#fff' }}
                cancelable={true}
            />
        )
    }
    componentDidMount() {
        this.autoLogin();
    }
    autoLogin = async () => {
        // Start Loader 
        try {
            // Fetch User info from Local store
            var storedUser = await AsyncStorage.getItem('user-store');
            var unStoredUser = await AsyncStorage.getItem('un-user-store');
            // Check if User has not logged out

            if (storedUser) {
                var userInfo = JSON.parse(storedUser);
                this.Global.updateProp('existing', true);
                // GLOBAL.existing = true;
                var userId = userInfo[0];

                var response = await fetch('http://api.coliserver.com/pmsapi.php?op=userinfo&Uid=' + userId);
                var json = await response.json();

                // Check if User Exists
                if (json) {
                    if (typeof (json[0]['UserId']) !== 'undefined') {
                        var user = json[0];
                        this.Global.updateProp('existing', true);
                        this.Global.updateProp('user', user);
                        this.Global.updateProp('userId', user['UserId']);
                        // GLOBAL.existing = true;
                        // GLOBAL.user = user;
                        // GLOBAL.userId = user['UserId'];

                        fetch('http://api.coliserver.com/pmsapi.php?op=listpackage')
                            .then(packResponse => packResponse.json())
                            .then(async (packs) => {
                                // this.Global.updateProp('packs', packs);
                                // GLOBAL.packs = packs;
                                packs.map(plan => {
                                    if (
                                        plan['Plan_name'].toLowerCase() == this.Global.user['Plan Name'].toLowerCase()
                                    ) {
                                        this.Global.updateProp('pack', plan);
                                        // GLOBAL.pack = plan;
                                    }
                                });
                                // Additional Users
                                // await AsyncStorage.removeItem('additional-users')
                                var additionalUsers = await AsyncStorage.getItem('additional-users');

                                if (additionalUsers) {
                                    this.Global.updateProp('additionalUsers', JSON.parse(additionalUsers));
                                    // GLOBAL.additionalUsers = JSON.parse(additionalUsers);
                                } else {
                                    this.Global.updateProp('additionalUsers', []);
                                    // GLOBAL.additionalUsers = [];
                                }

                                this.props.navigation.navigate('HomeStack');
                            })
                            .catch(e => {
                                alert(e.message);
                            });
                    }
                }
            }
            else if (unStoredUser) {
                this.Global.updateProp('existing', false);
                // GLOBAL.existing = false;
                var userInfo = JSON.parse(unStoredUser);
                this.Global.updateProp('user', userInfo[0]);
                this.Global.updateProp('pack', userInfo[1]);
                // GLOBAL.user = userInfo[0];
                // GLOBAL.pack = userInfo[1];
                if (userInfo[2]) {
                    // GLOBAL.packs;
                }
                this.props.navigation.navigate('UnMain');
            }
            // Go To Login 
            this.props.navigation.navigate('Auth');
        } catch (e) {
            this.props.navigation.navigate('Auth');
        }
        finally {
            this.setState({
                isLoading: false,
            });
        }
    }
}