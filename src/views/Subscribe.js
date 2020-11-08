import React from 'react';
import { View, ImageBackground, StyleSheet, KeyboardAvoidingView, ToastAndroid, ScrollView } from 'react-native';
import { Image, Avatar, ListItem, Header, Icon } from 'react-native-elements';
import { Card, Form, Item, Label, H1, H3, Button, Text, Input } from 'native-base';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import defaultStyles from '../../styles';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Global } from '@jest/types';

// GLOBAL
GLOBAL = require('../../global');

// Packages 
const packageNames = ['CoLi Plus Mini', 'CoLi Value', 'CoLiPlus', 'CoLi Extra', 'CoLi Office'];

export default class Subscribe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: '',
            pwd: '',
            email: '',
            isPassword: true,
            eye_icon: 'eye-off',
            registered: false,
            packs: GLOBAL.packs
        }
    }

    static navigationOptions = {
        header: null
    }

    render() {

        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    leftComponent={<Icon type="feather" color={'#fff'} name="chevron-left" size={24} onPress={() => this.props.navigation.goBack()} />}
                    centerComponent={{ text: 'Subscribe', style: { color: 'white', fontSize: 20 } }}
                    placement="left"
                    backgroundColor={'#1976D2'}
                    containerStyle={{ height: 60, paddingTop: 0 }}
                />
                <ProgressSteps
                    activeStepIconBorderColor={'#03A9F4'}
                    activeLabelColor={'#03A9F4'}
                >
                    <ProgressStep label="User Sign Up">
                        <View>
                            {
                                this.state.registered ?
                                    <View style={defaultStyles.card}>
                                        <KeyboardAwareScrollView
                                            style={{ ...defaultStyles.full, ...styles.card }}
                                        >
                                            <View style={{ ...styles.elevate }}>
                                                <View>
                                                    <H1>
                                                        Sign in
                                                        </H1>
                                                </View>
                                            </View>

                                            <Form style={defaultStyles.form}>
                                                <Item floatingLabel style={{ ...styles.input_item }}>
                                                    <Label style={styles.label}>Username or Email</Label>
                                                    <Input
                                                        onChangeText={(txt) => this.setState({ uid: txt })}
                                                    />
                                                </Item>
                                                <Item floatingLabel style={{ ...styles.input_item }}>
                                                    <Label style={styles.label}>Password</Label>
                                                    <Input
                                                        onChangeText={(pass) => this.setState({ pwd: pass })}
                                                        secureTextEntry={this.state.isPassword}
                                                    />
                                                    <Icon name={this.state.eye_icon} onPress={() => this.togglePwd()} />
                                                </Item>
                                            </Form>

                                            <View style={styles.buttonContainer}>
                                                <Button style={styles.button}
                                                    onPress={this.signin.bind(this)}
                                                >
                                                    <Text>Sign in</Text>
                                                </Button>
                                            </View>

                                            <View style={styles.buttonContainer}>
                                                <Text style={{ color: 'blue' }} onPress={this.toggleRegister.bind(this)}>New here? Go to register</Text>
                                            </View>


                                        </KeyboardAwareScrollView>
                                    </View>
                                    :
                                    <View style={defaultStyles.card}>
                                        <KeyboardAwareScrollView
                                            style={{ ...defaultStyles.full, ...styles.card }}
                                        >
                                            <View style={{ ...styles.elevate }}>
                                                {/* <View style={defaultStyles.ovalShadow}> 
                                                        <Image source={{ uri: 'http://localhost:8081/src/media/images/coli-logo.png' }}
                                                            style={defaultStyles.logo}
                                                        />
                                                        {/* <H1 style={{fontSize: 36, color: 'white'}}>CoLi</H1> 
                                                    </View>
                                                    */}

                                                <View>
                                                    <H1 style={{ color: 'green' }}>
                                                        Register New
                                                        </H1>
                                                </View>
                                            </View>

                                            <Form>
                                                <Item floatingLabel style={{ ...styles.input_item }}>
                                                    <Label style={styles.label}>Email</Label>
                                                    <Input
                                                        onChangeText={(txt) => this.setState({ email: txt })}
                                                    />
                                                </Item>
                                                <Item floatingLabel style={{ ...styles.input_item }}>
                                                    <Label style={styles.label}>Username</Label>
                                                    <Input
                                                        onChangeText={(txt) => this.setState({ uid: txt })}
                                                    />
                                                </Item>
                                                <Item floatingLabel style={{ ...styles.input_item }}>
                                                    <Label style={styles.label}>Password</Label>
                                                    <Input
                                                        onChangeText={(pass) => this.setState({ pwd: pass })}
                                                        secureTextEntry
                                                    />
                                                    <Icon name={this.state.eye_icon} onPress={() => this.togglePwd()} />
                                                </Item>
                                            </Form>
                                            <View style={styles.buttonContainer}>
                                                <Button style={styles.button}
                                                    rounded primary
                                                // onPress={ this.signup.bind(this) }
                                                >
                                                    <Text>Sign Up</Text>
                                                </Button>
                                            </View>

                                            <View style={styles.buttonContainer}>
                                                <Text style={{ color: 'blue' }} onPress={this.toggleRegister.bind(this)}>Already registered? Click here to Log in</Text>
                                            </View>


                                        </KeyboardAwareScrollView>
                                    </View>

                            }
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Select Package">
                        <View style={{ ...defaultStyles.card }}>
                            <ScrollView
                                contentContainerStyle={defaultStyles.scroll}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            >
                                {
                                    this.state.packs.map((pack, index) => {
                                        return (
                                            <ListItem
                                                key={index}
                                                title={pack['Plan_name']}
                                                subtitle={pack['Data_Transfer'] + " for " + pack['validity']}
                                                topDivider
                                                bottomDivider
                                                chevron
                                                titleStyle={{ fontSize: 24 }}
                                                subtitleStyle={{ color: 'rgba(139,195,74 ,1)' }}
                                                containerStyle={{ borderBottomStartRadius: 10, borderBottomEndRadius: 10, borderTopEndRadius: 10, marginTop: 10, marginHorizontal: 10, elevation: 5 }}
                                                leftIcon={//{name: 'package', type: 'feather', color: 'rgba(139,195,74 ,1)', raised: true, reverse: true}
                                                    <Avatar rounded title={pack['Plan_name'][0]} size="medium"
                                                        overlayContainerStyle={{ backgroundColor: 'green' }}
                                                    />
                                                }
                                                onPress={() => this.props.navigation.navigate('Package')}
                                            />
                                        );
                                    })
                                }
                            </ScrollView>

                        </View>
                    </ProgressStep>
                    {/* Personal Data */}
                    <ProgressStep label="Personal Details">
                        <Card style={{ alignItems: 'center' }}>

                        </Card>
                    </ProgressStep>
                    <ProgressStep label="Third Step">
                        <View style={{ alignItems: 'center' }}>
                            <Text>This is the content within step 3!</Text>
                        </View>
                    </ProgressStep>
                </ProgressSteps>
            </View>
        )
    }

    componentDidMount() {
        // Get Available Packages 
        this.fetchPackages();
    }
    // Collect Packs
    fetchPackages = async () => {
        var packs = [];
        try {
            var response = await fetch('http://api.coliserver.com/pmsapi.php?op=listpackage');
            packs = await response.json();

            var packages = packs.filter((pack) => {
                return packageNames.find(name => name == pack['Plan_name']);
            })
            GLOBAL.packs = packages;
            this.setState({ packs: packages })

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
    toggleRegister = () => {
        this.setState(prevState => ({
            uid: '',
            pwd: '',
            email: '',
            registered: !prevState.registered
        }));
    }
    goToRegister = () => {
        this.props.navigation.navigate('Register');
    }
    signup = () => {
        const { uid, pwd, email } = this.state;
        fetch('https://coli.com.gh/dashboard/mobile/user_account.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: uid,
                pwd: pwd,
                mob_sign_up: 'sign-up'
            }).then(res => res.json())
                .then(json => {

                }),
        });
    }
    signin = async () => {
        const { uid, pwd, email } = this.state;

        try {
            var response = await fetch('https://coli.com.gh/dashboard/mobile/user_account.php', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "username": uid, "pwd": pwd, 'mob_sign_in': 'log-in' })
            });

            var json = await response.text();
            ToastAndroid.show(json, ToastAndroid.LONG);
            GLOBAL.user = JSON.parse(json);

            var packs = '';
            if (json.includes('UserId')) {

                var packages = GLOBAL.pacs;
                packages.map((plan, index) => {
                    if (plan['Plan_name'].toLowerCase() == GLOBAL.user[0]['Plan Name'].toLowerCase()) {
                        GLOBAL.pack = plan;
                    }
                });

                this.props.navigation.navigate('Main');
            }
        }
        catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG)
        }
    }
    login = async (user) => {

        try {
        }
        catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG)
        }
    }
}

// Styles for this View
const styles = StyleSheet.create({
    input_item: {
        borderWidth: 0,
        borderRadius: 30,
        backgroundColor: 'rgba(158, 158, 158,0.2)',
        paddingLeft: 20,
        paddingBottom: 5,
        margin: 5,
        alignSelf: 'center'
    },
    label: {
        color: 'grey',
        marginHorizontal: 25,
        marginVertical: -10
    },
    input: {
        color: 'white'//'rgba(207,216,220 ,1)'
    },
    buttonContainer: {
        marginHorizontal: 20,
        marginTop: 30
    },
    button: {
        //backgroundColor: '#8CAEBD',
        justifyContent: 'center'
    },
    elevate: {
        flex: 1,
        width: '90%',
        margin: 20,
        alignItems: 'center',
    },
    card: {
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'white'
    }
})