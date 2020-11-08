import React from 'react';
import { ImageBackground, StyleSheet, ToastAndroid, Dimensions, SafeAreaView, ActivityIndicator } from 'react-native';
import { Input, Overlay, Avatar, Button } from 'react-native-elements';
import { H3, Text, CardItem, Icon, View } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import defaultStyles from '../../styles';

// GLOBAL
GLOBAL = require('../../global');
// Screen Height and Width
const { height, width } = Dimensions.get('screen');

export default class RefLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pwd: '',
            isPassword: true,
            eye_icon: 'eye-off',
            isLoggedIn: true,

        }
    }
    static navigationOptions = {
        header: null
    }

    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    // source={require('../media/images/new_blue_bg.jpg')}
                    style={{ flex: 1, backgroundColor: '#275970' }}
                >
                    {/* this.state.isLoggedIn ?  */}
                    <Overlay isVisible={this.state.isLoggedIn}
                        overlayStyle={{ backgroundColor: 'transparent', elevation: 0 }}
                        containerStyle={{ backgroundColor: 'rgba(250, 250, 250, 0.7)' }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator
                                size='large'
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            />
                        </View>
                    </Overlay>

                    <View style={{ flex: 1 }}>

                        <View style={{ alignItems: 'center', margin: 20 }}>
                            <Text style={{ color: 'white', fontSize: 36, fontWeight: 'bold' }}>CoLi Referrer</Text>
                        </View>

                        <View
                            style={{
                                height: 100,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Avatar
                                rounded
                                size={100}
                                icon={{
                                    name: 'user',
                                    type: 'font-awesome',
                                    color: 'rgba(200, 200, 200,0.9)',
                                }}
                                overlayContainerStyle={{
                                    backgroundColor: 'rgba(250, 250, 250, 0.05)',
                                }}
                            />
                        </View>
                        <View
                            style={{ flex: 1, margin: 20 }}
                        >
                            <View style={defaultStyles.form}>

                                <Input
                                    placeholder='Username'
                                    placeholderTextColor={'#ECEFF1'}
                                    containerStyle={styles.input}
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    inputStyle={{ color: '#fff' }}
                                    onChangeText={(txt) => this.setState({ username: txt })}
                                    autoCapitalize={'none'}
                                    leftIcon={{ name: 'user', type: 'font-awesome', color: '#ECEFF1' }}
                                />

                                <Input
                                    placeholder='Password'
                                    placeholderTextColor={'#ECEFF1'}
                                    containerStyle={styles.input}
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    inputStyle={{ color: '#fff' }}
                                    onChangeText={(pass) => this.setState({ pwd: pass })}
                                    autoCapitalize={'none'}
                                    secureTextEntry={this.state.isPassword}
                                    leftIcon={{ name: 'shield', type: 'font-awesome', color: '#ECEFF1' }}
                                    rightIcon={<Icon name={this.state.eye_icon} style={{ color: '#ECEFF1' }} onPress={() => this.togglePwd()} />}
                                />
                            </View>
                            <View style={{ marginVertical: 30 }}>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        title={'Sign In'}
                                        titleStyle={{ color: '#CFD8DC', fontSize: 18 }}
                                        buttonStyle={[styles.button_rounded]}
                                        type={'outline'}
                                        onPress={this.login.bind(this)}
                                    />
                                </View>
                                <CardItem style={{ justifyContent: 'center', backgroundColor: 'transparent' }}>
                                    <H3 style={{ color: 'white' }}>OR</H3>
                                </CardItem>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        title={'Sign Up'}
                                        titleStyle={{ color: '#CFD8DC', fontSize: 18 }}
                                        buttonStyle={[styles.button_rounded]}
                                        type={'outline'}
                                        onPress={this.goToRegister.bind(this)}
                                    />
                                </View>

                            </View>

                        </View>
                    </View>

                </ImageBackground>
            </SafeAreaView>
        )
    }
    // Login Method
    login = async () => {
        // Start Loading Indicator
        this.setState({
            isLoggedIn: true
        })
        var { username, pwd } = this.state;
        try {
            if (username && pwd) {

                var data = new FormData();
                data.append('ref_log_in', '-_-');
                data.append('rfusnm', username);
                data.append('pwd', pwd);

                // var response = await fetch('https://coli.com.gh/dashboard/mobile/referral_account.php', {
                var response = await fetch('http://192.168.47.1/dashboard/mobile/referral_account.php', {
                    method: 'POST',
                    body: data,
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                });
                var json = await response.json();

                // Check if User Exists
                if (json) {
                    if ((json[0] === 'success')) {
                        GLOBAL.referrer = json[1];
                        // Store User info in local store
                        await AsyncStorage.setItem('referrer-store', JSON.stringify(GLOBAL.referrer));

                        this.props.navigation.navigate('Home');
                    }
                    else if (json[0] === 'not-activated') {
                        ToastAndroid.show('Account not activated. Please check activation email.', ToastAndroid.LONG);
                    } else if (json[0] === 'not-existing') {
                        ToastAndroid.show('Username or password invalid.', ToastAndroid.LONG);
                    }
                    else {
                        ToastAndroid.show(JSON.stringify(json[1]), ToastAndroid.LONG);
                    }
                }

                else {
                    ToastAndroid.show('No User found', ToastAndroid.LONG);
                }
            }
            else if (!username) {
                ToastAndroid.show('Please Input Username!', ToastAndroid.LONG);
            }
            else if (!pwd) {
                ToastAndroid.show('Please Input User Password!', ToastAndroid.LONG);
            }
        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG)
        }
        finally {
            // Close Loading Indicator
            this.setState({
                isLoggedIn: false
            })
        }

    }
    // Auto Login When Not Logout
    autoLogin = async () => {
        try {

            var stored = await AsyncStorage.getItem('referrer-store');
            if (stored) {
                GLOBAL.referrer = JSON.parse(stored);
                // Navigate to Home
                this.props.navigation.navigate('Home');
            } else {
                this.setState({
                    isLoggedIn: false
                })
            }
        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }

    togglePwd = () => {
        this.setState(prevState => ({
            eye_icon: prevState.eye_icon === 'eye' ? 'eye-off' : 'eye',
            isPassword: !prevState.isPassword
        }))
    }
    // Register New If Not Registered
    goToRegister = () => {
        this.props.navigation.navigate('Register');
    }

    componentDidMount() {
        try {
            this.autoLogin();
        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }

}

// Styles for this View
const styles = StyleSheet.create({
    input_item: {
        width: '90%',
        borderWidth: 0,
        borderRadius: 30,
        backgroundColor: 'rgba(236, 239, 241,1.0)',
        paddingLeft: 20,
        paddingBottom: 5,
        margin: 5
    },
    label: {
        color: '#ECEFF1',
        marginHorizontal: 25,
        marginVertical: -10
    },
    input: {
        width: '100%',
        borderWidth: 0.5,
        borderRadius: 30,
        borderColor: 'grey',
        backgroundColor: 'rgba(236, 239, 241,0.1)',
        paddingBottom: 5,
        alignSelf: 'center',
        margin: 5,
    },
    buttonContainer: {
        marginHorizontal: 20
    },
    button: {
        // backgroundColor: '#03A9F4',
        justifyContent: 'center',
        borderRadius: 30
    },
    button_rounded: {
        borderRadius: 30,
        margin: 10,
        borderColor: '#CFD8DC',
        backgroundColor: '#275970',
        elevation: 5
    },
    elevate: {
        width: '90%',
        margin: 20,
        alignItems: 'center',
    },
    card: {
        // marginHorizontal: 20, 
        borderRadius: 50,
        backgroundColor: 'white',
        flex: 1
    },
    float: {
        width: '100%',
        paddingVertical: 20,
        elevation: 5,
        alignSelf: 'center',
        marginBottom: 100
    },
    behind: {
        width: width,
        height: height,
        position: 'absolute'
    },
    translucent_pane: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        // margin: 10, 
        backgroundColor: 'rgba(10, 10, 10,0.3)',
        borderRadius: 5
    }
})