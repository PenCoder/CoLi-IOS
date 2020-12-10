import React from 'react';
import {StyleSheet, TouchableNativeFeedback, ToastAndroid, ScrollView, ImageBackground, Dimensions} from 'react-native';
import { Card, CardItem, H1, H2, H3, Text, H4, Container, StyleProvider, Badge, Button, View } from 'native-base';
import {Icon, Avatar, ListItem, Image} from 'react-native-elements';
import codePush from 'react-native-code-push'

import defaultStyles from '../../styles';

import AsyncStorage from '@react-native-community/async-storage';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

const {width, height} = Dimensions.get('screen');

// GLOBAL
GLOBAL = require('../../global');

const packageNames = ['Regular', 'Basic', 'Standard', 'Business', 'Office', 'CoLiPlus'];

export default class UnHome extends React.Component {
    constructor(props){
        super(props);
        // Get GLOBAL user
        this.user = GLOBAL.user;
        

        // SET GLOBAL SELECTED PACKAGE
        GLOBAL.selectedPack = GLOBAL.pack;

        this.state = {
            user: GLOBAL.user,
            data: 0,
            outstanding: 0,
            main_data: 0,
            expiry: 0,
            percentage: 0,
            days: 0,
            time: 0
        }
    }
    
    render() {
        return(
            <View style={{flex: 1, backgroundColor: 'rgba(236, 239, 241,1.0)'}}>
                <ImageBackground
                    source={require('../media/images/new_blue_bg.jpg')}
                    style={{width: width, alignSelf: 'center', borderRadius: 10}}
                    imageStyle={{borderBottomLeftRadius: 80, borderBottomRightRadius: 80}}
                >
                    <View style={{height: 150, paddingTop: 20}}>
                        <View header style={{...defaultStyles.horizontalCenter, justifyContent: 'space-between'}}>
                            <View>
                                <Avatar
                                    rounded
                                    size={'medium'}
                                    overlayContainerStyle={{backgroundColor: 'white'}}
                                    icon={{name: 'home', type: 'font-awesome', color: '#0288D1'}}
                                />
                            </View>
                            <View style={{marginTop: 30}}>
                                <H1 style={{color: 'white'}}>Home</H1>
                            </View>
                        </View>

                        
                    </View>
                    
                </ImageBackground>
                
                <ScrollView
                    style={{marginTop: 0}}
                >
                    <View style={{alignSelf: 'center'}}>
                        <View>
                            <CardItem style={{margin: 20, backgroundColor: 'rgba(1, 87, 155,1.0)', justifyContent: 'center', borderRadius: 10, elevation: 5}}
                                onPress={()=> this.props.navigation.navigate('Profile')}
                            >
                                <H1 style={{color: 'white'}}>Welcome {this.user['fullname']}!</H1>
                            </CardItem>
                            <View style={{backgroundColor: 'rgba(236, 239, 241,1.0)', borderRadius: 20, width: width}}>
                                <View style={{...styles.card}}>
                                    
                                    <View style={styles.buttonContainer}>
                                        <Button 
                                            style={defaultStyles.button_rounded}
                                            info
                                            onPress={() => this.props.navigation.navigate('Payment')}
                                        >
                                            <Text>Make Payment</Text>
                                        </Button>
                                    </View>
                                    <View>
                                        <View >
                                            
                                            <ListItem
                                                title={'Current Package'} 
                                                subtitle={GLOBAL.pack.Plan_name}
                                                // titleStyle={{color: 'white', fontSize: 18}}
                                                // subtitleStyle={{color: 'white'}}
                                                bottomDivider
                                                topDivider
                                                rightIcon={{name: 'chevron-right', type: 'font-awesome', size: 14}}
                                                containerStyle={{...defaultStyles.pads, /*backgroundColor: '#4FC3F7'*/}}
                                                underlayColor='transparent'
                                                // leftAvatar={{
                                                //     icon: {name: 'dropbox', type: 'font-awesome'},
                                                //     size: 40,
                                                //     rounded: true,
                                                //     // overlayContainerStyle: {backgroundColor: '#4FC3F7'}
                                                // }}
                                                onPress={this.onViewPackage.bind(this)}
                                            />
                                        </View>
                                    </View>
                                </View>
                                
                            </View>
                        
                        </View>
                    </View>
                </ScrollView>
                
            </View>
            
        )
    }
    componentDidMount() {
        // Check for Updates
        this._checkForUpdate();
    }
    // Check For Updates
    async _checkForUpdate(){
        codePush.sync({
            updateDialog: false,
            installMode: codePush.InstallMode.IMMEDIATE
        })
    }
    // View Package Details
    onViewPackage = () => {
        try{
            GLOBAL.selectedPack = GLOBAL.pack;
            this.props.navigation.navigate('Package');
        }catch(e){
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }
    getPackages = async () => {
        try{
            // var response = await fetch('http://197.251.252.211/pmsapi.php?op=listpackage');
            var response = await fetch('http://m.coli.com.gh/pmsapi.php?op=listpackage');
            var packages = await response.json();

            var packs = JSON.stringify(packages);
            await AsyncStorage.setItem('packs-store', packs);
            
            var packages = JSON.parse(packs);

            packs = GLOBAL.packs.filter((pack) => {
                return packageNames.find(name => name == pack['Plan_name']);
            })
            GLOBAL.packs = packs;
            this.setState({ packs })

        }catch(e){
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }

    static navigationOptions = ({navigation}) => ({
        tabBarLabel: 'Home',
        drawerIcon: () => <Icon type="font-awesome" name='home' size={25} />,
        tabBarIcon: ({tintColor}) => <Icon type="font-awesome" name='home' size={25} color={tintColor} />,
        headerTransparent: true,
        // headerLeft: 
        //     <View style={{marginHorizontal: 10}}>
        //         <Icon type="feather" name="menu" color="white" style={{margin: 10}} onPress={() => navigation.openDrawer()} />
        //     </View>,
        labelStyle: {color: 'red'}
        // headerStyle: {
        //     backgroundColor: 'transparent'//'#0288D1'
        // },
        // headerTitleStyle: { ...defaultStyles.white_shadow
        //     // color: '#fff',
        // }
    
    })
}

const styles = StyleSheet.create({
    bg_main: {
        backgroundColor: '#D3DFDD'
    },
    container_1: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        margin: 1
    },
    spaced: {
        justifyContent: 'space-between'
    },
    item: {
        ...defaultStyles.transparent,
        width: 150
    },
    m_20Right: {
        marginRight: 5,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    m_20Left: {
        margin: 0,
        borderRadius: 20,
        borderRadius: 5,
        backgroundColor: 'white',
        width: 120,
        alignItems: 'center'
    },
    trans_green: {
        // backgroundColor: 'rgba(76,175,80,0.5)'
    },
    trans_blue: {
        
    },
    trans_violet: {
        backgroundColor: 'rgba(94,53,177 ,0.5)'
    },
    float: {
        width: '100%',
        alignSelf: 'center'
    },
    behind: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute'
    },
    front: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute'
    },
    card: {
        // marginHorizontal: 20, 
        borderRadius: 20,
        flex: 1
    },
    float: {
        width: '100%',
        elevation: 5,
        alignSelf: 'center'
    },
    pads: {
        margin: 15, 
        borderRadius: 10
    },
    white_shadow: {
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 0},
        textShadowRadius: 10
    },
    button: {
        // backgroundColor: '#03A9F4',
        justifyContent: 'center',
        borderRadius: 30,
        elevation: 10
    },
})