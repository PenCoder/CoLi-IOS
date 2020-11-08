import React from 'react';
import {View, ScrollView, StyleSheet, ToastAndroid, Image, ImageBackground, Dimensions, FlatList} from 'react-native';
import {Text, Card, CardItem, Thumbnail, H1, H2, H3, Accordion} from 'native-base';
import { Avatar, Icon, Badge, ListItem, Header } from 'react-native-elements';
import AsyncStorage  from '@react-native-community/async-storage';

import CollapsibleToolbar from 'react-native-collapsible-toolbar';

// Default Styles
import defaultStyles from '../../styles';
// GLOBAL
GLOBAL = require('../../global');

const {width} = Dimensions.get('screen');

const packageNames = ['Home', 'Regular', 'Basic', 'Standard', 'Business', 'Office', 'CoLiPlus'];

export default class UnPackages extends React.Component {
    constructor(props) {
        super(props);

        // this.fetchPackages.bind(this);
        
        this.state = {
            packs: []
        }
    }
    getPackages = async () => {
        var packs = [];
        try{
            if(GLOBAL.existing){
                var userStored = await AsyncStorage.getItem('user-store');
                var userInfo = JSON.parse(userStored);
                if(userInfo){
                    packs = userInfo[2];
                }else{
                    var response = await fetch('http://m.coli.com.gh/pmsapi.php?op=listpackage');
                    packs = await response.json();

                    var userToStore = [GLOBAL.user, GLOBAL.pack, packs];
                    await AsyncStorage.setItem('user-store', JSON.stringify(userToStore));
                }
                var packages = packs.filter((pack) => {
                    return packageNames.find(name => name == pack['Plan_name']);
                })
                GLOBAL.packs = packages;
                this.setState({ packs: packages })
            }
            else{
                var userStored = await AsyncStorage.getItem('un-user-store');
                var userInfo = JSON.parse(userStored);
                if(userInfo){
                    packs = userInfo[2];
                }else{
                    var response = await fetch('http://m.coli.com.gh/pmsapi.php?op=listpackage');
                    packs = await response.json();

                    var userToStore = [GLOBAL.user, GLOBAL.pack, packs];
                    await AsyncStorage.setItem('un-user-store', JSON.stringify(userToStore));
                }
                var packages = packs.filter((pack) => {
                    return packageNames.find(name => name == pack['Plan_name']);
                })
                GLOBAL.packs = packages;
                this.setState({ packs: packages })
            }

        }catch(e){
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }
    componentDidMount(){
        this.getPackages();
    }
    render() {
        const {packs} = this.state;
        
        return(
            <View style={{...defaultStyles.full}}>
                <ImageBackground
                    source={require('../media/images/new_blue_bg.jpg')}
                    style={{width: width, alignItems: 'center', borderRadius: 10}}
                    imageStyle={{borderBottomLeftRadius: 70, borderBottomRightRadius: 70}}
                >
                    <View>
                        <View style={{marginBottom: 10, alignItems: 'center'}}>
                            <H1 style={{color: 'white'}}>Packages</H1>
                        </View>
                        <View style={{marginBottom: 10, alignItems: 'center'}}>
                            <Avatar
                                rounded
                                size={'large'}
                                overlayContainerStyle={{backgroundColor: 'white'}}
                                icon={{name: 'package', type: 'feather', color: '#0288D1'}}
                            />
                        </View>
                    </View>
                </ImageBackground>

                <View
                    style={{flex: 1}}
                >
                    {/* <View style={{height: 200}}></View> */}

                    <View style={{backgroundColor: 'rgba(236, 239, 241,1.0)', borderRadius: 20, flex: 1}}>
                        <CardItem style={{justifyContent: 'center'}}>
                            <H3>List of Packages</H3>
                        </CardItem>
                        <FlatList
                            contentContainerStyle={{backgroundColor: 'rgba(250, 250, 250, 1)'}}
                            style={{padding: 10, flex: 1}}
                            data={packs}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => 
                                <ListItem
                                    title={item['Plan_name']} 
                                    titleStyle={{color: '#0288D1'}}
                                    subtitle={item['Data_Transfer'] + 'GB'}
                                    bottomDivider chevron
                                    containerStyle={{borderRadius: 10}}
                                    leftAvatar={{
                                        icon: {name: 'package', type: 'feather'},
                                        size: 40,
                                        rounded: true,
                                        overlayContainerStyle: {backgroundColor: '#0288D1'}
                                    }}
                                    onPress={() => this.viewPackage(item)}
                                />
                            }
                            ListEmptyComponent={
                                <View 
                                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                                >
                                    <Text note style={{fontSize: 24}}>No records available</Text>
                                </View>
                            }
                        />
                    </View>
                
                </View>
            </View>
        )
    }
    // View Selected Package Details
    viewPackage(pack){
        GLOBAL.selectedPack = pack;
        this.props.navigation.push('Package');
    }
    static navigationOptions = ({navigation}) => ({
        headerTitle: '',
        drawerIcon: () => <Icon type="feather" name='package' size={20} />,
        tabBarIcon: ({tintColor}) => <Icon type="feather" name='package' size={20} color={tintColor} />,
        headerTransparent: true,
        // headerStyle: {
        //     backgroundColor: 'transparent'//'#0288D1'
        // },
        headerTitleStyle: { ...styles.white_shadow
            // color: '#fff',
        }
    
    })
}

const styles = StyleSheet.create({
    pads: {
        margin: 5, 
        borderRadius: 10,
        borderWidth: 0.7
    },
    white_shadow: {
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 0},
        textShadowRadius: 10,
        fontSize: 16
    }
})