import React from 'react';
import { StyleSheet, ToastAndroid, ImageBackground, Dimensions, FlatList, Alert } from 'react-native';
import { CardItem, H2, Text, H3, View, Button, Icon } from 'native-base';
import { ListItem, Badge, Overlay, ButtonGroup } from 'react-native-elements';
import codePush from 'react-native-code-push';

import defaultStyles from '../../styles';
import { ActivityIndicator } from 'react-native-paper';

const { width } = Dimensions.get('window');

// GLOBAL
GLOBAL = require('../../global');

export default class RefReferrals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            amount: 0,
            count: 0,
            pending: 0,
            paid: 0,
            claim: 0,
            isLoading: true,
        }
    }

    render() {
        const { pending, paid, claim, count } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(236, 239, 241,1.0)' }}>
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
                <ImageBackground
                    source={require('../media/images/new_blue_bg.jpg')}
                    style={{ width: width, alignSelf: 'center', borderRadius: 10, flex: 1 }}
                >
                    <View style={{ paddingTop: 20 }}>
                        {/* <View style={{backgroundColor: 'transparent'}}>
                            
                            <Badge
                                value={'Referral Code: ' + GLOBAL.referrer.refcode}
                                status='primary'
                                badgeStyle={{ padding: 15}}
                                textStyle={{fontSize: 18}}
                            />
                        </View> */}
                        <View style={{ marginHorizontal: 10, padding: 10, elevation: 2, borderRadius: 10, alignItems: 'center', backgroundColor: 'rgba(250, 250, 250,0.2)' }}>
                            <Text style={{ color: '#fff', fontSize: 20 }}>{'Referral Code: ' + GLOBAL.referrer.refcode}</Text>
                        </View>
                        <View style={{ margin: 10, elevation: 2, borderRadius: 10, alignItems: 'center', backgroundColor: 'rgba(250, 250, 250,0.2)' }}>
                            <Text style={{ color: '#fff' }}>Accumulated</Text>
                            <Text style={{ color: '#fff', fontSize: 50 }}>₵ {this.state.amount.toFixed(2)}</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, marginHorizontal: 10, backgroundColor: '#EFEFEF', borderTopStartRadius: 10, borderTopEndRadius: 10, elevation: 20 }}>
                        <FlatList
                            contentContainerStyle={{ elevation: 2, borderRadius: 10, marginTop: 10, backgroundColor: 'rgba(250, 250, 250, 1)' }}
                            style={{ flex: 1 }}
                            data={this.state.clients}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <ListItem
                                    title={item.fullname}
                                    rightTitle={item.payment == 'RECEIVED' ? 'Paid' : 'Pending'}
                                    bottomDivider topDivider
                                    containerStyle={{ borderRadius: 10, margin: 5, elevation: 1 }}
                                    rightIcon={item.payment == 'RECEIVED' ?
                                        { name: 'check-circle', type: 'font-awesome', color: '#66BB6A', size: 20 }
                                        :
                                        { name: 'clockcircle', type: 'antdesign', color: 'orange', size: 20 }
                                    }
                                    leftAvatar={{
                                        icon: { name: 'user', type: 'font-awesome' }
                                    }}
                                />
                            }
                            ListHeaderComponent={
                                <CardItem style={{ padding: 10, backgroundColor: 'transparent', justifyContent: 'space-between' }}>
                                    <H3 style={{ color: '#1565C0' }}>My Referrals</H3>
                                    {
                                        this.state.count >= 1 ?
                                            <Button
                                                icon={{ name: 'send-o', type: 'font-awesome', size: 20, color: 'white' }}
                                                onPress={() => this.onCheckOut()}
                                                iconLeft rounded success small
                                            >
                                                <Icon name="send-o" type="FontAwesome" />
                                                <Text>Checkout</Text>
                                            </Button>
                                            :
                                            <Badge
                                                value={'Pending Approval'}
                                                status={'primary'}
                                            />
                                    }
                                </CardItem>
                            }
                            ListEmptyComponent={
                                <View
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Text note style={{ fontSize: 24 }}>No records available</Text>
                                </View>
                            }
                        />
                    </View>
                    <CardItem style={{ justifyContent: 'space-between', elevation: 15 }}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                            <Badge status='warning' value="" />
                            <Text style={{ fontSize: 12 }}> {pending} Pending</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                            <Badge status='success' value="" />
                            <Text style={{ fontSize: 12 }}> {count} Paid</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                            <Badge status='primary' value="" />
                            <Text style={{ fontSize: 12 }}> {claim} Claimed</Text>
                        </View>
                    </CardItem>
                </ImageBackground>

            </View>

        )
    }
    componentDidMount() {
        // Check for Updates
        this._checkForUpdate();

        // Set Screen Props value
        this.fetchUsers();
        // Cut Loader
        this.setState({ isLoading: false })
    }
    // Fetch Users Referred
    fetchUsers = async () => {
        try {
            let data = new FormData();
            data.append('ref_get_users', '_-_');
            data.append('refcode', GLOBAL.referrer.refcode);

            var response = await fetch('https://coli.com.gh/dashboard/mobile/referral_account.php', {
                // var response = await fetch('http://192.168.47.1/dashboard/mobile/referral_account.php', {
                method: 'POST',
                body: data,
                header: {
                    'Accept': 'application/json',
                }
            });
            var users = await response.json();
            GLOBAL.refClients = users[1];
            // Get Paid Customers
            var received = GLOBAL.refClients.filter(function (client) {
                return client.payment == 'RECEIVED';
            })
            var pending = GLOBAL.refClients.filter(function (client) {
                return client.payment !== 'RECEIVED';
            })
            this.setState({
                clients: users[1],
                count: received.length,
                pending: pending.length,
                amount: (10 * received.length)
            });
        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }
    // Refresh 
    _refresh = () => {
        this.fetchUsers();
    }
    async onCheckOut() {
        try {
            // Start Loader
            this.setState({ isLoading: false })
            const { count } = this.state;
            var refcode = GLOBAL.referrer.refcode;
            var data = new FormData();
            data.append('count', count);
            data.append('refcode', refcode);
            data.append('ref_check_out', '_-_');

            var response = await fetch('https://coli.com.gh/dashboard/mobile/referral_account.php', {
                // var response = await fetch('http://192.168.47.1/dashboard/mobile/referral_account.php', {
                method: 'POST',
                body: data,
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            });
            var res = await response.text();
            if (res == "success") {
                ToastAndroid.show('Request pending approval', ToastAndroid.LONG);

                this._refresh();
            } else {
                Alert.alert('', res);
            }
        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        } finally {
            this.setState({
                isLoading: false
            })
        }
    }
    // Check For Updates
    async _checkForUpdate() {
        codePush.sync({
            updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE
        })
    }
    // Payment Request
    _paymentRequest() {
        try {

        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }
    static navigationOptions = () => ({
        title: 'Home',
        // headerTitle: 'Home',
        tabStyle: { fontSize: 20 },
        tabBarIcon: ({ tintColor }) => <Icon type="FontAwesome" name='home' size={25} color={tintColor} />,
        headerTransparent: true,
        // headerStyle: {
        //     backgroundColor: 'transparent'//'#0288D1'
        // },
        headerTitleStyle: {
            color: '#fff',
        }

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
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 10
    },
    oval: {
        width: 100,
        height: 100,
        borderRadius: 200,
        borderWidth: 2,
        borderBottomWidth: 2,
        borderTopWidth: 0,
        borderColor: 'black',
        alignSelf: 'center',
        transform: [
            { scaleX: 5 }
        ]
    },
    check_btn: {
        backgroundColor: 'rgba(102, 187, 106,1.0)',
        alignSelf: 'flex-end'
    }
})