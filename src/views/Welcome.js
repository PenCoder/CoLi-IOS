import React from 'react';
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Image, Button, Icon, Avatar, Overlay } from 'react-native-elements';
import { Card, Form, Item, Label, H1, H3, Text, Toast, CardItem, Input } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import defaultStyles from '../../styles';
import { Chip } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { RNToasty } from 'react-native-toasty';

// GLOBAL
GLOBAL = require('../../global');

@inject('globalProps')
@observer
export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            pwd: '',
            isLoading: false
        }
        // Global State Provider 
        this.Global = this.props.globalProps;
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#275970' }}>
                <CardItem style={styles.logo}>
                    <Text style={{ color: '#1565C0', fontSize: 32, fontWeight: 'bold' }}>C</Text>
                    <Text style={{ color: '#4CAF50', fontSize: 32, fontWeight: 'bold' }}>o</Text>
                    <Text style={{ color: '#FFC107', fontSize: 32, fontWeight: 'bold' }}>L</Text>
                    <Text style={{ color: '#D50000', fontSize: 32, fontWeight: 'bold' }}>i</Text>
                </CardItem>
                <View style={{ flex: 1, padding: 20, paddingTop: 60, justifyContent: 'center' }}>

                    <View style={{ alignItems: 'center', margin: 50 }}>
                        <Chip
                            style={{ backgroundColor: 'rgba(233, 235, 230,0.3)', margin: 10, elevation: 2 }}
                            textStyle={{ color: 'white' }}
                            onPress={() => { }}
                        >
                            <H1 style={{ color: 'white', fontWeight: 'bold' }}>welcome</H1>
                        </Chip>
                    </View>
                    <View style={{ flex: 1, paddingTop: 50 }}>
                        <Button
                            title={'CoLi User'}
                            titleStyle={{ color: '#CFD8DC', fontSize: 24 }}
                            buttonStyle={[styles.button_rounded]}
                            type={'outline'}
                            icon={{ name: 'user-circle-o', type: 'font-awesome', color: '#CFD8DC' }}
                            onPress={() => this.openSection('Main')}
                        />
                        <Button
                            title={'CoLi Referrer'}
                            titleStyle={{ color: '#CFD8DC', fontSize: 24 }}
                            buttonStyle={styles.button_rounded}
                            type={'outline'}
                            icon={{ name: 'users', type: 'font-awesome', color: '#CFD8DC' }}
                            onPress={() => this.openSection('Referral')}
                        />
                    </View>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>

                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>

                        <Chip avatar={<Icon name="globe" type="font-awesome" color="white" />}
                            style={{ backgroundColor: 'rgba(233, 235, 230,0.3)', margin: 10 }}
                            textStyle={{ color: 'white' }}
                            onPress={() => this.props.navigation.navigate('WebViewer', { url: 'https://coli.com.gh' })}
                        >
                            www.coli.com.gh
                        </Chip>
                        <View style={{ flexDirection: 'row' }}>
                            <Avatar rounded
                                icon={{ name: "facebook", type: "font-awesome", color: "#1565C0", size: 24 }}
                                overlayContainerStyle={{ backgroundColor: 'white' }}
                                containerStyle={{ margin: 10 }}
                                onPress={() => this.props.navigation.navigate('WebViewer', { url: 'https://www.facebook.com/ColiLink' })}
                            />
                            <Avatar rounded
                                icon={{ name: "twitter", type: "font-awesome", color: "#03A9F4", size: 24 }}
                                overlayContainerStyle={{ backgroundColor: 'white' }}
                                containerStyle={{ margin: 10 }}
                                onPress={() => this.props.navigation.navigate('WebViewer', { url: 'https://twitter.com/CoLiLink' })}
                            />
                        </View>
                    </View>
                </View>
                
            </SafeAreaView>
        )
    }

    componentDidMount() {

    }

    // Auto Login When Not Logout
    autoLogin = async () => {
        try {
            // Fetch User info from Local store
            var storedUser = await AsyncStorage.getItem('user-store');
            var unStoredUser = await AsyncStorage.getItem('un-user-store');
            // Check if User has not logged out

            if (storedUser) {
                var userInfo = JSON.parse(storedUser);
                // Set Existing Value
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
                                this.Global.updateProp('packs', packs);
                                // GLOBAL.packs = packs;
                                this.Global.packs.map(plan => {
                                    if (
                                        plan['Plan_name'].toLowerCase() == this.Global.user['Plan Name'].toLowerCase()
                                    ) {
                                        this.Global.updateProp('pack', plan);
                                        // GLOBAL.pack = plan;
                                    }
                                });

                                this.props.navigation.navigate('Main');
                            })
                            .catch(e => {
                                alert(e.message);
                            });
                    }
                    else {
                        alert('Username or password invalid');
                    }

                } else {
                    RNToasty.Show({
                        title: 'No User found',
                        position: 'bottom',
                        duration: 1
                    });
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
            else { }

            this.setState({
                isLoggedIn: false,
            });
        }
        catch (e) {
            RNToasty.Show({
                title: e.message,
                position: 'bottom',
                duration: 1
            })
            this.setState({
                isLoggedIn: false,
            });
        }
    };

    openSection = (view) => {
        this.props.navigation.navigate(view);
    }
    openPackages = () => {
        this.props.navigation.navigate('Packages');
    }
    openLogin = () => {
        this.props.navigation.navigate('Auth');
    }
    openSubscribe = () => {
        if (Object.entries(this.Global.user) === 0) {
            RNToasty.Show({
                title: 'Logged In',
                position: 'bottom',
                duration: 1
            });
            // this.props.navigation.navigate('Subscribe');
        }
        this.props.navigation.navigate('Auth');
    }

    static navigationOptions = {
        header: null
    }
}

// Styles for this View
const styles = StyleSheet.create({
    logo: {
        height: 80,
        backgroundColor: 'transparent',
        borderBottomRightRadius: 60,
        top: -25,
        left: -15,
        alignSelf: 'flex-start',
        paddingBottom: -15,
        paddingRight: 30,
        ...defaultStyles.shadow5,
    },
    input_item: {
        // elevation: 5,
        borderRadius: 5,
        paddingHorizontal: 25,
        backgroundColor: 'rgba(250,250,250 ,0.2)',
        marginLeft: 0,
        borderColor: 'grey',
        borderWidth: 1
    },
    label: {
        color: 'rgba(207,216,220,1)',
        marginHorizontal: 25,
        marginVertical: -10
    },
    input: {
        color: 'white'//'rgba(207,216,220 ,1)'
    },
    buttonContainer: {
        marginHorizontal: 30,
        marginVertical: 30
    },
    button: {
        backgroundColor: '#8CAEBD',
        justifyContent: 'center'
    },
    button_rounded: {
        borderRadius: 30,
        margin: 10,
        borderColor: '#CFD8DC',
        backgroundColor: '#275970',
        ...defaultStyles.shadow5
    },
    elevate: {
        flex: 1,
        width: '90%',
        margin: 20,
        alignItems: 'center',
    },
    bold_heading: {
        color: 'white',
        fontSize: 54,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})