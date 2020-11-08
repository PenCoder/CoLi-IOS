import React from 'react';
import { View, StyleSheet, ToastAndroid, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import { Input, Overlay, CheckBox } from 'react-native-elements';
import { Button, Text, Icon, CardItem } from 'native-base';


import { Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

// GLOBAL
GLOBAL = require('../../global');
// Screen Height and Width
const { height, width } = Dimensions.get('screen');


// interface State {
//     outerScrollViewScrollEnabled: boolean;
// }
export default class RefRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pwd: '',
            isPassword: true,
            eye_icon: 'eye-off',
            name: '',
            phone: '',
            referral: '',
            ref_username: '',

            isSubscriber: false,

            isLoading: false,
        }
    }

    togglePwd = () => {
        this.setState(prevState => ({
            eye_icon: prevState.eye_icon === 'eye' ? 'eye-off' : 'eye',
            isPassword: !prevState.isPassword
        }))
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../media/images/new_blue_bg.jpg')}
                    style={{ flex: 1, backgroundColor: 'rgba(1, 87, 155,1.0)' }}
                >
                    {/* Loading Indicator */}
                    {/* this.state.isLoading ? */}
                    <Overlay isVisible={this.state.isLoading}
                        overlayStyle={{ backgroundColor: 'transparent', elevation: 0 }}
                        containerStyle={{ backgroundColor: 'rgba(250, 250, 250, 0.7)' }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator
                                size='large'
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            />
                        </View>
                    </Overlay>

                    <SafeAreaView style={{ flex: 1 }}>
                        <ImageBackground
                            source={require('../media/images/new_blue_bg.jpg')}
                            style={{ flex: 1 }}
                        >

                            <CardItem style={{ alignSelf: 'center', flex: 1, borderRadius: 20, backgroundColor: 'transparent' }}>
                                <View
                                    style={{ ...styles.card }}
                                >
                                    <CardItem style={{ justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 36 }}>
                                            Sign Up
                                </Text>
                                    </CardItem>
                                    <ScrollView
                                        contentContainerStyle={{ flexGrow: 1 }}
                                        nestedScrollEnabled={true}
                                    >
                                        <CheckBox
                                            title={'CoLi Subscriber'}
                                            checked={this.state.isSubscriber}
                                            onPress={() => this.setState({ isSubscriber: !this.state.isSubscriber })}
                                        />
                                        {
                                            this.state.isSubscriber ?
                                                <View>
                                                    <Input
                                                        placeholder='Username'
                                                        containerStyle={styles.input}
                                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                                        onChangeText={(txt) => this.setState({ username: txt })}
                                                        value={this.state.username}
                                                        leftIcon={{ name: 'user', type: 'font-awesome' }}
                                                    />
                                                    <Input
                                                        placeholder='Referral Username'
                                                        containerStyle={styles.input}
                                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                                        onChangeText={(txt) => this.setState({ ref_username: txt })}
                                                        value={this.state.ref_username}
                                                        leftIcon={{ name: 'user', type: 'font-awesome' }}
                                                    />
                                                    <Input
                                                        placeholder='Password'
                                                        containerStyle={styles.input}
                                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                                        onChangeText={(pass) => this.setState({ pwd: pass })}
                                                        value={this.state.pwd}
                                                        secureTextEntry={this.state.isPassword}
                                                        leftIcon={{ name: 'shield', type: 'font-awesome', color: 'grey' }}
                                                        rightIcon={<Icon name={this.state.eye_icon} onPress={() => this.togglePwd()} />}
                                                    />
                                                </View>
                                                :
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Input
                                                        placeholder='Username'
                                                        containerStyle={styles.input}
                                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                                        onChangeText={(txt) => this.setState({ username: txt })}
                                                        value={this.state.username}
                                                        leftIcon={{ name: 'user', type: 'font-awesome' }}
                                                    />
                                                    <Input
                                                        placeholder='Password'
                                                        containerStyle={styles.input}
                                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                                        onChangeText={(pass) => this.setState({ pwd: pass })}
                                                        secureTextEntry={this.state.isPassword}
                                                        leftIcon={{ name: 'shield', type: 'font-awesome', color: 'grey' }}
                                                        rightIcon={<Icon name={this.state.eye_icon} onPress={() => this.togglePwd()} />}
                                                    />

                                                    <Input
                                                        placeholder='Full Name'
                                                        containerStyle={styles.input}
                                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                                        onChangeText={(txt) => this.setState({ name: txt })}
                                                        value={this.state.name}
                                                        leftIcon={{ name: 'user', type: 'font-awesome' }}
                                                    />
                                                    <Input
                                                        placeholder='Email'
                                                        containerStyle={styles.input}
                                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                                        onChangeText={(email) => this.setState({ email: email })}
                                                        leftIcon={{ name: 'email', type: 'entypo' }}
                                                    />
                                                    <Input
                                                        placeholder='Personal Contact'
                                                        containerStyle={styles.input}
                                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                                        onChangeText={(phone) => this.setState({ phone: phone })}
                                                        leftIcon={{ name: 'phone', type: 'font-awesome' }}
                                                    />
                                                </View>

                                        }

                                        <View style={styles.buttonContainer}>
                                            <Button
                                                style={styles.button}
                                                info
                                                onPress={this.submitForm.bind(this)}
                                            >
                                                <Text>Submit</Text>
                                            </Button>
                                        </View>
                                    </ScrollView>
                                </View>
                            </CardItem>
                        </ImageBackground>
                    </SafeAreaView>

                </ImageBackground>
            </SafeAreaView>
        )
    }
    componentDidMount() {

    }
    _refresh = () => {
        this.state = {
            username: '',
            pwd: '',
            isPassword: true,
            eye_icon: 'eye-off',
            name: '',
            phone: '',
            referral: '',
            ref_username: '',

            isSubscriber: false,

            isLoading: false,
        }
    }
    submitForm = async () => {
        //  Start Loading Indicator
        this.setState({
            isLoading: true
        })
        try {
            const formData = new FormData();
            if (this.state.isSubscriber) {
                const { username, ref_username, pwd } = this.state;
                if (username.trim() == '') {
                    ToastAndroid.show('Please fill in the username section', ToastAndroid.LONG);
                    return;
                }
                else if (ref_username.trim() == '') {
                    ToastAndroid.show('Please provide referral username', ToastAndroid.LONG);
                    return;
                }
                else if (pwd.trim() == '') {
                    ToastAndroid.show('Please provide password', ToastAndroid.LONG);
                    return;
                }
                // Set up form values
                formData.append('ref_subscriber_sign_up', '_-_');
                formData.append('rfusnm', ref_username);
                formData.append('usnm', username);
                formData.append('pwd', pwd);

                var response = await fetch('https://coli.com.gh/dashboard/mobile/referral_account.php', {
                    // var response = await fetch('http://192.168.47.1/dashboard/mobile/referral_account.php', {
                    method: 'POST',
                    body: formData,
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                });

                var content = await response.text();
                if (content.includes('username-existing')) {
                    ToastAndroid.show('Username already in use. Please pick another.', ToastAndroid.LONG);
                }
                else if (content.includes('email-existing')) {
                    ToastAndroid.show('Email has been registered. Please use another.', ToastAndroid.LONG);
                }
                else if (content.includes('invalid')) {
                    ToastAndroid.show('Username or password invalid', ToastAndroid.LONG);
                }
                else if (content == 'success') {
                    // Refresh State
                    this._refresh();

                    this.props.navigation.navigate('Completed');

                } else {
                    ToastAndroid.show(content, ToastAndroid.LONG);
                }

            } else {
                const { username, pwd, name, email, phone } = this.state;
                if (username.trim() == '') {
                    ToastAndroid.show('Please fill in the username section', ToastAndroid.LONG);
                    return;
                }
                else if (pwd.trim() == '') {
                    ToastAndroid.show('Please provide password', ToastAndroid.LONG);
                    return;
                } else if (name.trim() == '') {
                    ToastAndroid.show('Please provide your Full name', ToastAndroid.LONG);
                    return;
                } else if (email.trim() == '') {
                    ToastAndroid.show('Please provide your email address', ToastAndroid.LONG);
                    return;
                } else if (phone.trim() == '') {
                    ToastAndroid.show('Please provide your phone number', ToastAndroid.LONG);
                    return;
                }

                formData.append('ref_sign_up', 'sign-up');
                formData.append('rfusnm', username);
                formData.append('pwd', pwd);
                formData.append('name', name);
                formData.append('email', email);
                formData.append('phone', phone);

                var response = await fetch('https://coli.com.gh/dashboard/mobile/referral_account.php', {
                    // var response = await fetch('http://192.168.47.1/dashboard/mobile/referral_account.php', {
                    method: 'POST',
                    body: formData,
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                });
                var content = await response.text();
                if (content.includes('username-existing')) {
                    ToastAndroid.show('Username already in use. Please pick another.', ToastAndroid.LONG);
                }
                else if (content.includes('email-existing')) {
                    ToastAndroid.show('Email has been registered. Please use another.', ToastAndroid.LONG);
                }
                else if (content == 'success') {
                    this.props.navigation.navigate('Completed');
                } else {
                    ToastAndroid.show(content, ToastAndroid.LONG);
                }
            }
        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
        finally {
            this.setState({
                isLoading: false
            })
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '',
        headerLeft:
            <View style={{ marginHorizontal: 10 }}>
                <Icon type="Feather" name="chevron-left" style={{ margin: 10 }} onPress={() => navigation.goBack()} />
            </View>,
        headerTransparent: true

    })
}

// Styles for this View
const styles = StyleSheet.create({
    input_item: {
        width: '100%',
        borderWidth: 0,
        borderRadius: 30,
        backgroundColor: 'rgba(236, 239, 241,1.0)',
        paddingLeft: 20,
        paddingBottom: 5,
        alignSelf: 'center',
    },
    label: {
        color: 'grey',
        marginVertical: -10
    },
    input: {
        borderWidth: 0,
        borderRadius: 30,
        // backgroundColor: 'rgba(236, 239, 241,1.0)', 
        paddingBottom: 5,
        alignSelf: 'center',
        margin: 10,
        elevation: 15,
        backgroundColor: 'white'
    },
    buttonContainer: {
        marginHorizontal: 0,
        marginTop: 30
    },
    button: {
        // backgroundColor: '#03A9F4',
        justifyContent: 'center',
        borderRadius: 30,
        elevation: 10
    },
    elevate: {
        width: '90%',
        margin: 20,
        alignItems: 'center',
    },
    card: {
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        flex: 1
    },
    float: {
        width: '100%',
        elevation: 5,
        alignSelf: 'center'
    },
    behind: {
        width: width,
        height: height,
        position: 'absolute'
    },
    progressBtn: {
        elevation: 5,
        backgroundColor: '#4FC3F7',
        borderRadius: 25,
        paddingHorizontal: 20
    },
    progressBtnText: {
        color: 'white'
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 20,
        borderRightWidth: 200,
        borderTopWidth: 500,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#03A9F4',
        borderBottomRightRadius: 100,
        position: 'absolute'
    }
})