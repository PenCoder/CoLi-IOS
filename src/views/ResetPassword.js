import React from 'react';
import { ImageBackground, StyleSheet, KeyboardAvoidingView, ToastAndroid, Dimensions, Alert, SafeAreaView } from 'react-native';
import { Image, Avatar, Input, Overlay } from 'react-native-elements';
import { Card, H1, H3, Button, Text, H2, CardItem, Icon, View } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import defaultStyles from '../../styles';
import * as Animatable from 'react-native-animatable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';


// GLOBAL
GLOBAL = require('../../global');
// Screen Height and Width
const { height, width } = Dimensions.get('screen');

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            pwd: '',
            confirm: '',
            eye_icon: 'eye-off',
            isPassword: true,
            isLoading: true
        }
    }
    static navigationOptions = {
        header: null
    }

    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../media/images/new_blue_bg.jpg')}
                    style={{ flex: 1, backgroundColor: 'rgba(1, 87, 155,1.0)' }}
                >
                    <Spinner
                        visible={this.state.isLoading}
                        textContent={'Loading...'}
                        textStyle={{ color: '#fff' }}
                        cancelable={true}
                    />

                    <View
                        style={{ flex: 1 }}
                    >
                        <View style={{ height: 120, backgroundColor: 'white' }}>
                            <ImageBackground
                                style={{ flex: 1, paddingTop: 5, alignItems: 'center' }}
                                imageStyle={{ borderBottomRightRadius: 100 }}
                                source={require('../media/images/new_blue_bg.jpg')}
                            >
                                <Avatar
                                    rounded
                                    size={'large'}
                                    icon={{ name: 'shield', type: 'entypo' }}
                                    overlayContainerStyle={{ backgroundColor: 'rgba(250, 250, 250, 0.3)' }}
                                />
                                <H1 style={{ color: 'white', margin: 5 }}>RESET PASSWORD</H1>
                            </ImageBackground>

                        </View>

                        <View
                            style={{ backgroundColor: 'white', borderTopLeftRadius: 80, flex: 1, paddingVertical: 30 }}
                        >
                            <KeyboardAwareScrollView style={{ flex: 1 }}>
                                <View style={defaultStyles.form}
                                >

                                    <Input
                                        placeholder='Username'
                                        containerStyle={styles.input}
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        onChangeText={(txt) => this.onInputChange(txt, 'username')}
                                        leftIcon={{ name: 'user', type: 'font-awesome', color: 'grey' }}
                                    />

                                    <Input
                                        placeholder='New Password'
                                        containerStyle={styles.input}
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        onChangeText={(pass) => this.onInputChange(pass, 'pwd')}
                                        secureTextEntry={this.state.isPassword}
                                        leftIcon={{ name: 'shield', type: 'entypo', color: 'grey' }}
                                        rightIcon={<Icon name={this.state.eye_icon} onPress={() => this.togglePwd()} />}
                                    />
                                    <Input
                                        placeholder='Confirm Password'
                                        containerStyle={styles.input}
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        onChangeText={(pass) => this.onInputChange(pass, 'confirm')}
                                        secureTextEntry={this.state.isPassword}
                                        leftIcon={{ name: 'shield', type: 'entypo', color: 'grey' }}
                                        rightIcon={<Icon name={this.state.eye_icon} onPress={() => this.togglePwd()} />}
                                    />
                                </View>
                                <View>
                                    <Button
                                        style={styles.button}
                                        onPress={this.onResetPassword.bind(this)}
                                        info block
                                    >
                                        <Text>Submit</Text>
                                    </Button>
                                </View>
                                <CardItem style={{ marginVertical: 30 }}>
                                    <Icon name="corner-up-left" type="Feather" />
                                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}
                                        onPress={() => this.props.navigation.navigate('Login')}
                                    >
                                        Back to Login
                                        </Text>
                                </CardItem>

                            </KeyboardAwareScrollView>
                        </View>
                    </View>
                </ImageBackground>

            </SafeAreaView>
        )
    }

    onResetPassword1 = async () => {
        if (this.state.uid.trim() == '') {
            ToastAndroid.show('Please input username!', ToastAndroid.LONG);
        } else {
            try {
                // Loader
                this.setState({ isLoading: true })

                var data = new FormData();
                data.append('usnm', this.state.uid);
                data.append('for-got-pwd', 'fog-');
                // var response = await fetch('https://coli.com.gh/dashboard/mobile/user_account.php', {
                var response = await fetch('http://192.168.47.1/dashboard/mobile/user_account.php', {
                    method: 'POST',
                    body: data,
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                });
                var result = await response.json();

                if (result[0] == 'success') {
                    this.setState({
                        code: result[1],
                        isCodeSent: true
                    })
                } else {
                    Alert.alert('', JSON.stringify(result))
                }
            } catch (e) {
                ToastAndroid.show(e.message, ToastAndroid.LONG);
            } finally {
                this.setState({
                    isLoading: false
                })
            }

        }
    }

    cancelForgetPassword = () => {
        this.setState({
            isForgotPassword: false
        })
    }
    onInputChange = (value, name) => {
        switch (name) {
            case 'username':
                this.setState({ uid: value });
                break;
            case 'pwd':
                this.setState({ pwd: value });
                break;
            case 'confirm':
                this.setState({ confirm: value });
                break;
            default:
                break
        }
    }
    onResetPassword = async () => {

        var { uid, pwd, confirm } = this.state;
        this.setState({
            isLoading: true
        })
        try {
            if (uid.trim() !== '' && pwd.trim() !== '' && confirm.trim() !== '') {
                if (pwd !== confirm) {
                    ToastAndroid.show('Passwords do not match.', ToastAndroid.LONG);
                    return;
                }
                var data = new FormData();
                data.append('usnm', uid);
                data.append('pwd', pwd);
                data.append('res-et-pwd', 'res')
                // var response = await fetch('http://192.168.47.1/dashboard/mobile/user_account.php', {
                var response = await fetch('https://coli.com.gh/dashboard/mobile/user_account.php', {
                    method: 'POST',
                    body: data,
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                })
                var json = await response.json();

                // Check if User Exists
                if (json) {
                    if (json[0] === "success") {
                        Alert.alert('Successful', 'Password successfully reset.');
                        this.props.navigation.navigate('Login');

                    } else if (json[0] === "failed") {
                        Alert.alert('Failed', json[1]);
                    } else {
                        ToastAndroid.show(JSON.stringify(json), ToastAndroid.SHORT);
                    }
                }
                else {
                    ToastAndroid.show('No User found', ToastAndroid.SHORT);
                }
            }
            else if (uid.trim() == '') {
                ToastAndroid.show('Please Input Username!', ToastAndroid.LONG);
            }
            else if (pwd.trim() !== '') {
                ToastAndroid.show('Please Input New Password!', ToastAndroid.LONG);
            }
            else if (confirm.trim() !== '') {
                ToastAndroid.show('Please Input Confirm Password!', ToastAndroid.LONG);
            }
        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG)
        } finally {
            this.setState({
                isLoading: false
            })
        }
    }


    togglePwd = () => {
        this.setState(prevState => ({
            eye_icon: prevState.eye_icon === 'eye' ? 'eye-off' : 'eye',
            isPassword: !prevState.isPassword
        }))
    }
    goToRegister = () => {
        this.props.navigation.navigate('Register');
    }

    componentDidMount() {
        this.setState({ isLoading: false })
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
        color: 'grey',
        marginHorizontal: 25,
        marginVertical: -10
    },
    input: {
        width: '100%',
        borderWidth: 0,
        borderRadius: 30,
        backgroundColor: 'rgba(236, 239, 241,1.0)',
        paddingBottom: 5,
        alignSelf: 'center',
        margin: 5,
    },
    buttonContainer: {
        marginHorizontal: 20,
        marginTop: 30
    },
    button: {
        // backgroundColor: '#03A9F4',
        justifyContent: 'center',
        borderRadius: 30,
        marginHorizontal: 15
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