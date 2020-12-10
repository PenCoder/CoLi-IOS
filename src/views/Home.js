import React from 'react';
import { StyleSheet, TouchableNativeFeedback, ScrollView, Dimensions, Animated, Alert, SafeAreaView } from 'react-native';
import { CardItem, H3, Text, Button, View, Icon as NIcon } from 'native-base';
import { Icon, Avatar, ListItem, Divider, Overlay } from 'react-native-elements';

import defaultStyles from '../../styles';

import AsyncStorage from '@react-native-community/async-storage';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { RNToasty } from 'react-native-toasty';
import { observer, inject } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';

const { width } = Dimensions.get('screen');

// GLOBAL
var GLOBAL = require('../../global');

const packageNames = ['Regular', 'Basic', 'Standard', 'Business', 'Office', 'CoLiPlus'];

@inject('globalProps')
@observer
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        // Get GLOBAL user
        this.GlobalProps = this.props.globalProps;

        this.user = this.GlobalProps.user;
        this.data = 0;          //  Total Data in Credit
        this.outstanding = 0;   //  Outstanding data rolled over
        this.main_data = 0;     //  Actual data On current Subscription
        this.expiry = 0;        //  Time to expiry
        this.percentage = 0;    //  Percentage gauge of used data (Current subscribed Data)
        this.days = 0;
        this.time = 0;

        // SET GLOBAL SELECTED PACKAGE
        this.GlobalProps.updateProp('selectedPack', this.GlobalProps.pack);

        // DURATIONS 
        var validDays = parseInt(this.GlobalProps.pack['validity']);
        var remainingSec = parseInt(this.GlobalProps.user['Remaining Min']) * 60
        this.state = {
            user: this.GlobalProps.user,
            data: 0,
            outstanding: 0,
            main_data: 0,
            expiry: 0,
            percentage: 0,
            days: 0,
            time: 0,
            unit: '',
            duration: validDays,
            remainingSec: remainingSec,

            top_up: 0,

            isInProgress: false
        }
    }

    render() {
        const { topup_balance, pack } = this.props.globalProps;

        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(242, 245, 247,1.0)', paddingBottom: 10 }}>
                <Spinner
                    visible={this.state.isInProgress}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                    cancelable={true}
                />

                <View style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#fff', elevation: 3, borderBottomRightRadius: 35 }}>
                <Icon name="chevron-thin-left" raised type="entypo" color="grey" onPress={() => this.props.navigation.navigate('Welcome')} />
                    {/* <CardItem style={{ height: 70, borderBottomRightRadius: 50, left: -12, alignSelf: 'flex-start', paddingBottom: -15, elevation: 1,  }}>
                        <Text style={{ color: '#1565C0', fontSize: 28, fontWeight: 'bold' }}>C</Text>
                        <Text style={{ color: '#4CAF50', fontSize: 28, fontWeight: 'bold' }}>o</Text>
                        <Text style={{ color: '#FFC107', fontSize: 28, fontWeight: 'bold' }}>L</Text>
                        <Text style={{ color: '#D50000', fontSize: 28, fontWeight: 'bold' }}>i</Text>
                    </CardItem> */}
                    <Icon name='home' type='font-awesome' color='#0288D1' size={28} />
                    <H3 style={{ color: '#0288D1', fontWeight: 'bold', margin: 5 }}>Home</H3>
                </View>

                <ScrollView style={{ flex: 1, }}>
                    <View style={{ flex: 1 }}>

                        <View style={{ paddingTop: 20, borderRadius: 20, width: width }}>

                            <Avatar
                                rounded size={185}
                                containerStyle={{ flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', margin: 10 }}
                                overlayContainerStyle={{ backgroundColor: 'white', ...defaultStyles.shadow10 }}
                                onPress={() => this.props.navigation.navigate('Stats')}
                                ImageComponent={() =>
                                    <CountdownCircleTimer
                                        isPlaying isLinearGradient
                                        size={180}
                                        duration={this.state.duration * 86400}
                                        initialRemainingTime={this.state.remainingSec}
                                        colors={[
                                            ['#63c9b1', 0.3],
                                            ['#478794', 0.3],
                                            ['#2b6c9e', 0.4],
                                        ]}
                                    >
                                        {({ remainingTime, animatedColor }) => (
                                            <View style={{ alignItems: 'center' }}>
                                                <Text note style={{ fontSize: 16 }}>
                                                    Remaining
                                            </Text>
                                                <Animated.Text style={{ fontSize: 32, color: 'rgba(98, 135, 181, 1)', fontWeight: 'bold' }}>
                                                    {Math.floor(remainingTime / 86400)}
                                                </Animated.Text>
                                                <Text note style={{ fontSize: 24 }}>
                                                    Days
                                            </Text>
                                            </View>
                                        )}
                                    </CountdownCircleTimer>
                                }
                            />

                            <View
                                style={{ paddingHorizontal: 20, marginTop: 10 }}
                            >
                                <ListItem
                                    title={'Account Balance'}
                                    subtitle={'GH₵ ' + topup_balance}
                                    titleStyle={{ fontSize: 12, color: 'grey' }}
                                    subtitleStyle={{ fontSize: 20, fontWeight: 'bold', color: '#4CAF50' }}
                                    leftIcon={{ name: 'sack', type: 'material-community', color: '#4CAF50', raised: true }}
                                    // rightElement={
                                    //     <Button success small iconRight
                                    //         style={defaultStyles.shadow10}
                                    //         onPress={() => this.renewWithTopUp()}
                                    //         disabled={topup_balance < pack['Pack_Cost']}
                                    //     >
                                    //         <Text>Renew</Text>
                                    //     </Button>
                                    // }
                                    containerStyle={{}}
                                />
                            </View>
                            <Divider style={{ flex: 1 }} />

                            <TouchableNativeFeedback
                                useForeground
                                onPress={() => this.props.navigation.navigate('Stats')}
                            >
                                <CardItem
                                    style={{ justifyContent: 'space-between', margin: 20 }}
                                >
                                    <View style={{ alignItems: 'center' }}>
                                        <Text note>Your data balance</Text>
                                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1565C0' }}>{this.state.data}</Text>
                                    </View>
                                    <View
                                        style={{
                                            height: 70,
                                            width: 1,
                                            backgroundColor: 'grey',
                                            margin: 5
                                        }}
                                    />
                                    <View>
                                        <Button info small
                                            style={{ elevation: 10 }}
                                            onPress={() => this.props.navigation.navigate('Packages')}
                                        >
                                            <Text>Purchase</Text>
                                        </Button>
                                    </View>

                                </CardItem>
                            </TouchableNativeFeedback>

                        </View>

                        <View style={{ backgroundColor: 'rgba(236, 239, 241,1.0)', borderRadius: 20, paddingHorizontal: 10, width: width }}>

                            <View >
                                <ListItem
                                    title={'Timeline'}
                                    subtitle={this.days + ' days to expire'}
                                    titleStyle={{ fontSize: 12, color: 'grey' }}
                                    subtitleStyle={{ fontSize: 18, fontWeight: 'bold', }}
                                    bottomDivider
                                    rightIcon={{ name: 'chevron-right', type: 'font-awesome', size: 14, color: '#1565C0', raised: true }}
                                    leftElement={
                                        <View style={{ width: 5, height: '100%', backgroundColor: '#1565C0' }}></View>
                                    }
                                    onPress={() => this.props.navigation.navigate('Timeline')}
                                    containerStyle={{ margin: 10 }}
                                />
                                <Divider style={{ flex: 1 }} />
                                <ListItem
                                    title={'Current Package'}
                                    subtitle={this.GlobalProps.user['Plan Name']}
                                    titleStyle={{ fontSize: 12, color: 'grey' }}
                                    subtitleStyle={{ fontSize: 18, fontWeight: 'bold' }}
                                    bottomDivider
                                    rightIcon={{ name: 'chevron-right', type: 'font-awesome', size: 14, color: '#1565C0', raised: true }}
                                    leftElement={
                                        <View style={{ width: 5, height: '100%', backgroundColor: '#1565C0' }}></View>
                                    }
                                    onPress={this.onViewPackage.bind(this)}
                                    containerStyle={{ margin: 10 }}
                                />
                            </View>

                        </View>
                    </View>
                </ScrollView>

            </SafeAreaView>
        )
    }
    componentDidMount() {
        this.breakDowns()
        this.timeBreakDown();

        this.getTopUpBalance();
    }
    getTopUpBalance = async () => {
        try {
            var username = this.user.UserId;
            var data = new FormData();
            data.append('usnm', username);
            data.append('user-top-op', 'top__');
            var response = await fetch(`https://coli.com.gh/dashboard/mobile/user_payments.php?user-top-up=top&usnm=${username}`);

            var res = await response.text();
            // RNToasty.Info({
            //     title: res,
            //     fontFamily: 'Roboto',
            //     position: 'bottom'
            // })
            this.GlobalProps.updateProp('topup_balance', res);
            this.setState({ top_up: res });
        }
        catch (e) {
            RNToasty.Warn({
                title: e.message,
                fontFamily: 'Roboto',
                position: 'bottom'
            })
        }


    }
    // Go To Renew
    goToRenew = () => {
        this.GlobalProps.updateProp('selectedPack', this.GlobalProps.pack);
        const packageNames = [
            'Home',
            'Regular',
            'Basic',
            'Standard',
            'Business',
            'Office',
            'CoLiPlus',
            'CoLi Plus Mini',
            'CoLi Value',
            'CoLi Extra',
            'CoLi Office'
        ];

        if (packageNames.find(name => name.toLowerCase() == this.GlobalProps.selectedPack.Plan_name.toLowerCase())) {
            this.props.navigation.navigate('Payment')
        } else {
            alert('This package is currently not available for renewal.');
        }

    }
    // Renew With Top Up 
    renewWithTopUp = async () => {

        const { selectedPack, pack, topup_balance, user, activePacks } = this.props.globalProps;
        if (!activePacks.includes(pack['Plan_name'])) {
            RNToasty.Warn({
                title: 'Package not available for renewal',
                position: 'bottom',
                duration: 1
            })
        }
        else
            Alert.alert(
                "Confirm",
                `Confirm topup with balance for \nPackage: ${pack.Plan_name} \nCost: ${pack.Pack_Cost} \n or cancel`,
                [
                    { text: 'cancel', style: 'cancel' },
                    {
                        text: 'Confirm',
                        onPress: async () => {
                            // Start Loading Indicator 
                            this.setState({ isInProgress: true });

                            if (topup_balance >= pack['Pack_Cost']) {
                                this.setState({
                                    isInProgress: true
                                })
                                try {
                                    var formData = new FormData();
                                    formData.append('usnm', user.username);
                                    formData.append('phone', user.phone);
                                    formData.append('pack_cost', pack['Pack_Cost']);
                                    formData.append('pack', pack['Plan_name']);
                                    formData.append('renew-with-top-up', '_-_');

                                    var response = await fetch('https://coli.com.gh/dashboard/payments/topup_renewal.php', {
                                        method: 'POST',
                                        body: formData,
                                        header: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'multipart/form-data'
                                        }
                                    });
                                    var res = await response.text();
                                    if (res == 'success') {
                                        RNToasty.Success({
                                            title: 'Successfully renewed',
                                            position: 'bottom'
                                        });
                                        // Restart To Home 
                                        this.props.navigation.navigate('Router');
                                    } else if (res == 'failed') {
                                        alert('Could not renew account at the moment.')
                                    } else if (res == 'insufficient') {
                                        alert('Insufficent balance for renewal.')
                                    } else {
                                        alert(res);
                                    }
                                } catch (e) {
                                    RNToasty.Warn({
                                        title: e.message,
                                        position: 'bottom'
                                    })
                                } finally {
                                    this.setState({
                                        isInProgress: false
                                    })
                                }
                            }
                        }
                    }
                ]
            )

    }

    // View Package Details
    onViewPackage = () => {
        try {
            this.GlobalProps.updateProp('selectedPack', this.GlobalProps.pack);
            this.props.navigation.navigate('Package');
        } catch (e) {
            RNToasty.Warn({
                title: e.message,
                fontFamily: 'Roboto',
                position: 'bottom'
            });
        }
    }

    breakDowns = () => {
        if (this.GlobalProps.pack['Data_Transfer'].includes('N\/A')) {

            this.GlobalProps.updateProp('data', 'UNLIMITED');
            this.GlobalProps.updateProp('outstanding', 'UNLIMITED');
            this.GlobalProps.updateProp('main', 'UNLIMITED');
            this.GlobalProps.updateProp('percentage', 100);

            this.main_data = 'UNLIMITED';
            this.outstanding = 0;
            this.data = 'UNLIMITED';
            this.percentage = 100;
            this.unit = '';
        } else {

            var data = parseInt(this.user['Data Transfer']);
            var pack_data = this.GlobalProps.pack['Data_Transfer']
            var pack_data_bytes = pack_data * 1e6 * 1024;
            try {
                if (data > pack_data_bytes) {
                    var outstanding = data - pack_data_bytes; // Outstanding Data that was rolled over
                    var outStr = this.outstandingBreakDown(outstanding);
                    var dataStr = this.dataBreakDown(data);

                    this.main_data = (this.data - this.outstanding); // Get Main Data
                    this.data += dataStr;
                    this.outstanding += outStr;
                } else {
                    this.main_data = data;
                    var dataStr = this.dataBreakDown(data);
                    this.main_data = this.data //+ dataStr; // Get Main Data
                }

                this.percentage = (this.main_data / pack_data) * 100;

                //  Setting Global Props
                this.GlobalProps.updateProp('data', this.data);
                this.GlobalProps.updateProp('outstanding', this.outstanding);
                this.GlobalProps.updateProp('main', this.main_data);
                this.GlobalProps.updateProp('percentage', this.percentage);

            } catch (e) {
                RNToasty.Warn({
                    title: e.message,
                    fontFamily: 'Roboto',
                    position: 'bottom'
                });
            }
        }

        this.setState({
            main_data: this.main_data,
            outstanding: this.outstanding,
            percentage: this.percentage,
            unit: this.unit,
            data: this.data
        })
        // dataBreakDown(data, this)
    }
    dataBreakDown = (data) => {
        // var data = parseInt(this.user['Data Transfer']);
        var tb, gb, mb, kb, str;

        tb = Math.floor(data / (1e9 * (1024)));
        gb = Math.floor(data / (1e6 * (1024)));
        mb = Math.floor(data / (1e3 * (1024)));
        kb = Math.floor(data / (1024));
        if (tb >= 1) {
            this.data = tb;
            str = ' TB';
        }

        else if (gb >= 1) {
            this.data = gb;
            str = ' GB';
        }
        else if (mb >= 1) {
            this.data = mb;
            str = ' MB';
        }
        else {
            this.data = kb;
            str = ' KB';
        }
        this.unit = str;
        return str;
    }
    outstandingBreakDown = (data) => {

        if (this.GlobalProps.pack['Data_Transfer'].includes('N\/A')) {
            return;
        }
        var tb, gb, mb, kb, str;

        tb = Math.floor(data / (1e9 * (1024)));
        gb = Math.floor(data / (1e6 * (1024)));
        mb = Math.floor(data / (1e3 * (1024)));
        kb = Math.floor(data / (1024));
        if (tb >= 1) {
            this.outstanding = tb;
            str = ' TB';
        }
        else if (gb >= 1) {
            this.outstanding = gb;
            str = ' GB';
        }
        else if (mb >= 1) {
            this.outstanding = mb;
            str = ' MB';
        }
        else {
            this.outstanding = kb;
            str = ' KB';
        }
        return str;
    }
    // Calculate the remaining time to expiry
    timeBreakDown = () => {
        try {
            var due_date = this.GlobalProps.user['Expiry Date'];
            var expiry = new Date(due_date.replace(' ', 'T')).getTime();
            var now = new Date().getTime();
            this.expiry = expiry - now;
            this.GlobalProps.updateProp('time', this.expiry);
            if (this.expiry > 0) {
                this.days = Math.floor(this.expiry / (1000 * 60 * 60 * 24));
                this.GlobalProps.updateProp('days', this.days);
                this.time = this.expiry - (this.days * (1000 * 60 * 60 * 24));
                var validDays = parseInt(this.GlobalProps.pack['validity']);
                var remainingSec = parseInt(this.GlobalProps.user['Remaining Min']) * 60
                this.GlobalProps.updateProp('days_percent', Math.round((this.GlobalProps.days / validDays) * 100));

                this.setState({
                    duration: validDays,
                    remainingSec: remainingSec
                })
            } else {
                this.expiry = 0;
            }
        } catch (e) {
            RNToasty.Warn({
                title: e.message,
                fontFamily: 'Roboto',
                position: 'bottom'
            });
        }
    }

    static navigationOptions = () => ({
        tabBarLabel: 'Home',
        // drawerIcon: () => <Icon type="font-awesome" name='home' size={25} />,
        tabBarIcon: ({ tintColor }) => <Icon type="font-awesome" name='home' size={30} color={tintColor} raised />,
        headerTransparent: true,
        labelStyle: { color: 'red' }
    })
}

const styles = StyleSheet.create({
    balance_pad: {
        flexDirection: 'column',
        // paddingTop: 2,
        // paddingBottom: 2,
        // paddingLeft: 2,
        // paddingRight: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        elevation: 2
    },
    shadow10: {
        elevation: 10,

    }
})
