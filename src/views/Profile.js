import React from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, Dimensions, Alert, ToastAndroid } from 'react-native';
import { Text, Card, CardItem, Thumbnail, H3, H2, H1, Button } from 'native-base';
import { Avatar, Icon, Badge, ListItem } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation-stack';

import Geolocation from '@react-native-community/geolocation';

import defaultStyles from '../../styles';
import { inject, observer } from 'mobx-react';

const { width } = Dimensions.get('screen');

@inject('globalProps')
@observer
export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coords: {
                lng: 0,
                lat: 0
            }
        }
    }
    render() {
        this.GlobaProps = this.props.globalProps;
        const { user, data } = this.GlobaProps;
        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(245, 245, 245,1.0)' }}>
                <CardItem style={{ width: width, }}
                >
                    <View style={{ marginBottom: 10, marginLeft: 30 }}>
                        <H1 style={{ color: '#0288D1' }}>Profile</H1>
                    </View>
                </CardItem>

                <ScrollView style={{ marginTop: 10 }}>
                    <ListItem style={{ margin: 20, /* backgroundColor: 'rgba(1, 87, 155,1.0)' */ borderRadius: 10 }}
                        title={<Text style={{ color: '#0288D1', fontSize: 24, }}>{user['Name']}</Text>}
                        leftAvatar={
                            <Avatar
                                rounded
                                size={'medium'}
                                icon={{ name: 'user', type: 'font-awesome' }}
                                overlayContainerStyle={{ backgroundColor: '#0288D1' }}
                            />
                        }
                    />
                    <View style={{ borderRadius: 20, paddingTop: 20, paddingHorizontal: 10, width: width }}>
                        <View>
                            <ListItem
                                title={user['UserId']}
                                underlayColor={'none'}
                                containerStyle={{ ...defaultStyles.pads }}
                                bottomDivider topDivider chevron
                                leftAvatar={{
                                    icon: { name: 'user', type: 'font-awesome' },
                                    overlayContainerStyle: { backgroundColor: '#0288D1' }
                                }}
                            />
                            <ListItem
                                title={'Package: ' + user['Plan Name']}
                                subtitle={
                                    <View style={{ flexDirection: 'row', padding: 5 }}>
                                        {/* <Icon name='clipboard-notes' type='foundation' color='green' size={18}/> */}
                                        <Text note>{data} of data remaining</Text>
                                    </View>
                                }
                                containerStyle={{ ...defaultStyles.pads }}
                                bottomDivider topDivider chevron
                                leftAvatar={{
                                    icon: { name: 'package', type: 'feather' },
                                    overlayContainerStyle: { backgroundColor: '#0288D1' }
                                }}
                                onPress={() => this.props.navigation.navigate('Package')}
                            />
                            <ListItem
                                title={'Address: ' + user['Address']}
                                subtitle={
                                    <View style={{ flexDirection: 'row', padding: 5 }}>
                                        <Icon name='pin' type='entypo' color='red' size={18} />
                                        <Text note>You can pin your installation location.</Text>
                                    </View>
                                }
                                containerStyle={{ ...defaultStyles.pads }}
                                bottomDivider topDivider chevron
                                leftAvatar={{
                                    icon: { name: 'map-pin', type: 'feather' },
                                    overlayContainerStyle: { backgroundColor: '#0288D1' }
                                }}
                                userForeground
                                onPress={() => this.trackLocation()}
                            />
                            <ListItem
                                title={user['phone']}
                                bottomDivider topDivider chevron
                                leftAvatar={{
                                    icon: { name: 'phone', type: 'font-awesome' },
                                    overlayContainerStyle: { backgroundColor: '#0288D1' }
                                }}
                                containerStyle={{ ...defaultStyles.pads }}
                                userForeground
                            />
                            <ListItem
                                title={user['Email']}
                                containerStyle={{ ...defaultStyles.pads }}
                                bottomDivider topDivider chevron
                                leftAvatar={{
                                    icon: { name: 'mail', type: 'feather' },
                                    overlayContainerStyle: { backgroundColor: '#0288D1' }
                                }}
                            />
                        </View>
                    </View>

                </ScrollView>
            </View>
        )
    }

    trackLocation = () => {

        try {
            Alert.alert(
                'Pin Your Location',
                'Update installation location',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Update Location', onPress: async () => {
                            // Get the coordinates of current location
                            this.setCoordinates();

                            var response = await fetch('https://coli.com.gh/dashboard/mobile/mob_jobs.php', {
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    "lat": this.state.coords.lat,
                                    "lng": this.state.coords.lng,
                                    'mob_add_loc': 'loc-in',
                                    "user": { username: this.GlobaProps.user['UserId'], id: this.GlobaProps.userid },
                                    "staff": 'self',

                                })
                            });
                            var res = await response.text();
                            ToastAndroid.show(res, ToastAndroid.LONG);

                            this.setCoordinates.bind();
                        }
                    },
                ]
            )
        }
        catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }

    // Set Coordinates
    setCoordinates = () => {
        try {
            Geolocation.getCurrentPosition(
                async (position) => {
                    // Set Coordintes
                    this.setState({
                        coords: {
                            lng: position.coords.longitude,
                            lat: position.coords.latitude
                        }
                    })
                },
                error => ToastAndroid.show(error.message, ToastAndroid.LONG),
                { enableHighAccuracy: true, timeout: 3000, maximumAge: 1000 }
            )
        }
        catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }
    // static navigationOptions = ({navigation}) => ({
    //     title: 'Profile',
    //     drawerIcon: () => <Icon type="font-awesome" name='user' size={20} />,
    // })
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '',
        drawerIcon: () => <Icon type="antdesign" name='profile' size={25} />,
        tabBarIcon: ({ tintColor }) => <Icon type="font-awesome" name='user' size={25} color={tintColor} />,
        headerTransparent: true,
        // headerLeft: 
        //     <View style={{marginHorizontal: 10}}>
        //         <Icon type="feather" name="menu" color="white" style={{margin: 10}} onPress={() => navigation.openDrawer()} />
        //     </View>,
        // headerTitleStyle: { ...defaultStyles.white_shadow }

    })
}
const styles = StyleSheet.create({

});