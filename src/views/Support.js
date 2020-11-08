import React from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, Dimensions, ToastAndroid, FlatList, Linking, Image } from 'react-native';
import { Text, CardItem, H3, H1, Textarea, Button } from 'native-base';
import { Avatar, Icon, ListItem, Overlay, Input } from 'react-native-elements';

import Geolocation from '@react-native-community/geolocation';

import defaultStyles from '../../styles';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
// GLOBAL
GLOBAL = require('../../global');

const { width } = Dimensions.get('screen');

export default class Support extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMakeCall: false,
            isCreateEmail: false,
            email: GLOBAL.user['Email'],
            esubject: '',
            ebody: ''
        }
    }
    phoneNumbers = [
        { id: '1', number: '0302328828' },
        { id: '2', number: '0302309961' },
        { id: '3', number: '0501682670' }
    ];

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(245, 245, 245,1.0)' }}>
                <CardItem style={{ width: width, }}
                >
                    <View style={{ marginBottom: 10, }}>
                        <H1 style={{ color: '#0288D1' }}>Support</H1>
                    </View>
                </CardItem>

                <CardItem style={{ justifyContent: 'center' }}>
                    <Avatar rounded
                        icon={{ name: "facebook", type: "font-awesome", size: 24, reverse: true }}
                        overlayContainerStyle={{ backgroundColor: '#1565C0' }}
                        containerStyle={{ margin: 10, elevation: 10 }}
                        onPress={() => this.props.navigation.navigate('WebViewer', { url: 'https://www.facebook.com/ColiLink' })}
                    />

                    <Avatar rounded
                        icon={{ name: "twitter", type: "font-awesome", size: 24 }}
                        overlayContainerStyle={{ backgroundColor: '#03A9F4' }}
                        containerStyle={{ margin: 10, elevation: 10 }}
                        onPress={() => this.props.navigation.navigate('WebViewer', { url: 'https://twitter.com/CoLiLink' })}
                    />

                    <Avatar rounded
                        icon={{ name: "phone", type: "font-awesome", size: 24 }}
                        overlayContainerStyle={{ backgroundColor: '#EC407A' }}
                        containerStyle={{ margin: 10, elevation: 10 }}
                        onPress={() => this.setState({ isMakeCall: true })}
                    />
                </CardItem>

                <View style={{ flex: 1 }}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{ flex: 1 }}
                        region={{
                            latitude: 5.537661,
                            longitude: -0.263908,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: 5.537661, longitude: -0.263908, }}
                        >
                            <Callout>
                                <Text>CoLi Link Ghana Ltd</Text>
                            </Callout>
                        </Marker>
                    </MapView>
                </View>
                {/* Call Pop View */}
                <Overlay
                    isVisible={this.state.isMakeCall}
                    onBackdropPress={() => this.setState({ isMakeCall: false })}
                >
                    <CardItem style={{ flex: 1 }}>
                        <FlatList
                            data={this.phoneNumbers}
                            ListHeaderComponent={
                                <View style={{ alignItems: 'center' }}>
                                    <Avatar
                                        size={'large'}
                                        icon={{ name: 'old-phone', type: 'entypo' }}
                                        rounded
                                        overlayContainerStyle={{ backgroundColor: '#0288D1' }}
                                    />
                                    <Text>List of Contacts</Text>
                                    <Text note style={{ textAlign: 'center' }}>Select number to reach our customer care</Text>
                                </View>
                            }
                            renderItem={({ item }) =>
                                <ListItem
                                    title={item.number}
                                    bottomDivider topDivider
                                    leftAvatar={{
                                        icon: { name: 'phone', type: 'font-awesome' },
                                        overlayContainerStyle: { backgroundColor: '#0288D1' }
                                    }}
                                    onPress={() => this.makeCall(item.number)}
                                />
                            }
                            keyExtractor={item => item.id}
                        />
                    </CardItem>
                </Overlay>
                {/* Create Email */}
                <Overlay isVisible={this.state.isCreateEmail}
                    onBackdropPress={() => this.setState({ isCreateEmail: false })}
                >
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <CardItem style={{ justifyContent: 'center' }}>
                            <H3>Compose Mail</H3>
                        </CardItem>
                        {/* <Input
                            placeholder='From'
                            value={this.state.email}
                            onChangeText={(text)=> this.setState({email: text})}
                        /> */}
                        <Input
                            placeholder='To'
                            value='support@coli.com.gh'
                            disabled={true}
                        />
                        <Input
                            placeholder='Subject'
                            value={this.state.subject}
                            onChangeText={(text) => this.setState({ esubject: text })}
                        />
                        <Textarea
                            rowSpan={5} bordered
                            placeholder="Message"
                            value={this.state.ebody}
                            onChangeText={(text) => this.setState({ ebody: text })}
                        />
                        <CardItem style={{ justifyContent: 'space-between' }}>
                            <Button success rounded
                                onPress={() => this.linkApp('Email')}
                            >
                                <Text>Send</Text>
                            </Button>
                            <Button light rounded
                                onPress={() => this.setState({ isCreateEmail: false })}
                            >
                                <Text>Cancel</Text>
                            </Button>
                        </CardItem>
                    </View>
                </Overlay>
            </View>
        )
    }

    componentDidCatch(error, errorInfo) {
        alert(error);
        // this.props.navigation.goBack();
    }

    async makeCall(number) {
        try {
            let phone = '';
            // Check Platform
            if (Platform.OS === 'android') {
                phone = 'tel:${' + number + '}';
            }
            else {
                phone = 'telprompt:${' + number + '}';
            }
            // Make call
            Linking.openURL(phone);
        }
        catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }
    async linkApp(appname) {
        try {
            let url = '';
            switch (appname) {
                case 'Facebook':
                    url = 'fb://page/ColiLink';
                    break;
                case 'WhatsApp':
                    url = '';
                    break;
                case 'Instagram':
                    url = '';
                    break;
                default:
                    return;
            }

            // Linking.openURL(url).catch(() => ToastAndroid.show('App not installed', ToastAndroid.LONG));
            this.props.navigation.navigate('WebViewer', { url: url });
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
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '',
        drawerIcon: () => <Icon type="font-awesome" name='comments' size={25} />,
        tabBarIcon: ({ tintColor }) => <Icon type="font-awesome" name='comments' size={30} color={tintColor} />,
        headerTransparent: true,
        headerLeft:
            <View style={{ marginHorizontal: 10 }}>
                <Icon type="feather" name="chevron-left" color='white' style={{ margin: 10 }} onPress={() => navigation.goBack()} />
            </View>,
        // headerTitleStyle: { ...defaultStyles.white_shadow }

    })
}
