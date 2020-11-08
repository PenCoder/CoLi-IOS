import React from 'react';
import {View, ScrollView, StyleSheet, ImageBackground, Dimensions, ToastAndroid} from 'react-native';
import {H1} from 'native-base';
import { Avatar, Icon, ListItem, Input, Button } from 'react-native-elements';


import AsyncStorage from '@react-native-community/async-storage';
// GLOBAL
GLOBAL = require('../../global');

const {width} = Dimensions.get('screen');

export default class RefProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditPwd: false,
            isPassword: true,
            eye_icon: 'eye-slash',
            oldPwd: '',
            newPwd: '',
            confirmPwd: '',
        }
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <ImageBackground
                    source={require('../media/images/new_blue_bg.jpg')}
                    style={{width: width, borderRadius: 10, flex: 1}}
                >
                    <ImageBackground 
                        style={{paddingTop: 20, width: width, alignItems: 'center'}}
                        source={require('../media/images/new_blue_bg.jpg')}
                    >
                        <View>
                            <View style={{marginBottom: 10}}>
                                <H1 style={{color: 'white'}}>Profile</H1>
                            </View>
                            <View>
                                <Avatar
                                    rounded
                                    size={'large'}
                                    overlayContainerStyle={{backgroundColor: 'white'}}
                                    icon={{name: 'user', type: 'font-awesome', color: '#0288D1'}}
                                />
                            </View>
                        </View>
                    </ImageBackground>

                    <View style={{flex: 1, backgroundColor: '#EFEFEF', borderTopStartRadius: 30, elevation: 20}}>
                        <ScrollView 
                            style={{flex: 1}}
                        >
                            <ListItem
                                title={GLOBAL.referrer.fullname}
                                subtitle={GLOBAL.referrer.username}
                                
                                containerStyle={{margin: 10}}
                                leftIcon={{name: 'user', color: 'rgba(66, 165, 245,1.0)', type: 'entypo'}}
                            />
                            <ListItem
                                title={GLOBAL.referrer.email}
                                containerStyle={{margin: 10}}
                                leftIcon={{name: 'mail', color: 'rgba(66, 165, 245,1.0)', type: 'entypo'}}
                            />
                            <ListItem
                                title={GLOBAL.referrer.phone}
                                containerStyle={{margin: 10}}
                                leftIcon={{name: 'phone', color: 'rgba(66, 165, 245,1.0)', type: 'entypo'}}
                            />

                            <ListItem
                                title={'Edit Password'}
                                containerStyle={{ margin: 10}}
                                underlayColor='transparent'
                                bottomDivider
                                rightIcon={
                                    <Icon name="edit" type='antdesign' color='rgba(66, 165, 245,1.0)' />
                                }
                                onPress={this.onEditPassword.bind(this)}
                                // leftIcon={{name: 'phone', color: 'rgba(66, 165, 245,1.0)', type: 'entypo'}}
                            />
                            {
                                this.state.isEditPwd ?
                                <View style={{backgroundColor: 'white', marginHorizontal: 10}}>
                                    <Input
                                        placeholder='Old Password'
                                        // placeholderTextColor={'#ECEFF1'}
                                        // containerStyle={styles.input}
                                        onChangeText={(pass) => this.setState({oldPwd: pass})}
                                        value={this.state.oldPwd}
                                        secureTextEntry={this.state.isPassword}
                                        leftIcon={{name: 'shield', type: 'font-awesome'}}
                                        rightIcon={<Icon name={this.state.eye_icon} type="font-awesome" style={{color: '#ECEFF1'}} onPress={() => this.togglePwd()} />}
                                    />
                                    <Input
                                        placeholder='New Password'
                                        // placeholderTextColor={'#ECEFF1'}
                                        // containerStyle={styles.input}
                                        onChangeText={(pass) => this.setState({newPwd: pass})}
                                        value={this.state.newPwd}
                                        secureTextEntry={this.state.isPassword}
                                        leftIcon={{name: 'shield', type: 'font-awesome'}}
                                        rightIcon={<Icon name={this.state.eye_icon} type="font-awesome" style={{color: '#ECEFF1'}} onPress={() => this.togglePwd()} />}
                                    />
                                    <Input
                                        placeholder='Confirm Password'
                                        // placeholderTextColor={'#ECEFF1'}
                                        // containerStyle={styles.input}
                                        onChangeText={(pass) => this.setState({confirmPwd: pass})}
                                        value={this.state.confirmPwd}
                                        secureTextEntry={this.state.isPassword}
                                        leftIcon={{name: 'shield', type: 'font-awesome'}}
                                        rightIcon={<Icon name={this.state.eye_icon} type="font-awesome" style={{color: '#ECEFF1'}} onPress={() => this.togglePwd()} />}
                                    />

                                    <Button
                                        title='Submit'
                                        buttonStyle={{margin: 10}}
                                        onPress={this.onSubmitPassword.bind(this)}
                                    />
                                </View>
                                : 
                                null
                            }

                            <ListItem
                                title={'Logout'}
                                containerStyle={{ margin: 10}}
                                underlayColor='transparent'
                                bottomDivider
                                leftIcon={
                                    <Icon name="sign-out" type='font-awesome' color='rgba(240, 98, 146,1.0)' />
                                }
                                onPress={this.onLogout.bind(this)}
                            />

                        </ScrollView>
                        
                    </View>
                </ImageBackground>
            </View>
        )
    }
    onEditPassword(){
        this.setState({
            isEditPwd: !this.state.isEditPwd
        })
    }
    async onSubmitPassword(){
        try{
            const {oldPwd, newPwd, confirmPwd} = this.state;
        if(oldPwd.trim() == ''){
            ToastAndroid.show('Please Provide old password', ToastAndroid.LONG);
        }
        else if(newPwd.trim() == ''){
            ToastAndroid.show('Please Provide new password', ToastAndroid.LONG);
        }
        else if(confirmPwd.trim() == ''){
            ToastAndroid.show('Please Provide confirm password', ToastAndroid.LONG);
        }else if(newPwd !== confirmPwd){
            ToastAndroid.show('Passwords do not match.', ToastAndroid.LONG);
        }else if(newPwd.length < 5){
            ToastAndroid.show('Password should be 5 or more characters.', ToastAndroid.LONG);
        }else{
            var data = new FormData();
            data.append('ref_update_pwd', '_-_');
            data.append('old', oldPwd);
            data.append('new', newPwd);
            data.append('refcode', GLOBAL.referrer.refcode)

            var response = await fetch('https://coli.com.gh/dashboard/mobile/referral_account.php', {
            // var response = await fetch('http://192.168.47.1/dashboard/mobile/referral_account.php', {
                method: 'POST',
                body: data,
                header: {
                    'Accept': 'application/json',
                }
            });
            var content = await response.text();
            if(content == 'success'){
                ToastAndroid.show('Password Successfully Updated.', ToastAndroid.LONG);
                setTimeout(() => {
                    this.props.navigation.goBack();
                }, 2000);
            }else{
                ToastAndroid.show(content, ToastAndroid.LONG);
            }
        }
        }catch (e){
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
        
    }

    async onLogout(){
        try{
            await AsyncStorage.removeItem('referrer-store');
            this.props.navigation.navigate('Auth');
        }catch(e){
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }
    togglePwd = () => {
        this.setState(prevState => ({
            eye_icon: prevState.eye_icon === 'eye' ? 'eye-slash' : 'eye',
            isPassword: !prevState.isPassword
        }))
    }
    static navigationOptions = ({navigation}) => ({
        title: 'Profile',
        tabBarIcon: ({tintColor}) => <Icon type="font-awesome" name='user' size={25} color={tintColor} />,
        headerTransparent: true,
        headerLeft: 
            <View style={{marginHorizontal: 10}}>
                <Icon type="feather" name="menu" color="white" style={{margin: 10}} onPress={() => navigation.openDrawer()} />
            </View>,
    
    })
}
