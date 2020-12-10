import React from 'react';
import { ScrollView, StyleSheet, ImageBackground, Dimensions, ToastAndroid, Alert } from 'react-native';
import { Text, Card, CardItem, Button, H1, H2, H3, View, Toast } from 'native-base';
import { Avatar, Badge, ListItem, Header, Overlay, Input, Icon, Divider } from 'react-native-elements';

// Default Styles
import defaultStyles from '../../styles';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { inject, observer } from 'mobx-react';
import { RNToasty } from 'react-native-toasty';
import Spinner from 'react-native-loading-spinner-overlay';

const { width } = Dimensions.get('window');

@inject('globalProps')
@observer

export default class Package extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRenew: false,
            momo: '',
            network: '',
            isInitiated: false,
            // invoice: '',
            invoice: '',
            isConfirm: false,
            isPaid: false,

            header: '',
            instructions: '',

            isInProgress: false
        }
    }
    render() {
        this.GlobalProps = this.props.globalProps;
        const { selectedPack, pack, topup_balance, user } = this.props.globalProps;

        return (
            <View style={{ flex: 1, backgroundColor: '#f0f3f5' }}>
                <Spinner
                    visible={this.state.isLoading}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                    cancelable={true}
                />
                <CardItem style={{ width: width, }}
                >
                    <View style={{ marginLeft: 20, marginTop: 50 }}>
                        <H1 style={{ color: '#0288D1' }}>{selectedPack['Plan_name']}</H1>
                        <Divider />
                    </View>
                </CardItem>

                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: '#f0f3f5' }}>

                        <View style={{ justifyContent: 'space-between', marginTop: 20 }}>
                            <ListItem
                                title={'Data'}
                                subtitle={selectedPack['Data_Transfer'] == 'N/A' ? 'UNLIMITED' : selectedPack['Data_Transfer'] + 'GB'}
                                titleStyle={{ fontSize: 14, color: 'grey' }}
                                subtitleStyle={{ fontSize: 22, fontWeight: 'bold', color: 'rgba(98, 135, 181, 1)' }}
                                containerStyle={{ borderRadius: 10, margin: 2 }}
                                leftElement={
                                    <View style={{ width: 5, height: '100%', backgroundColor: 'rgba(98, 135, 181, 1)' }}></View>
                                }
                            />
                            <ListItem
                                title={'Speed'}
                                subtitle={(parseInt(selectedPack['speed']) / 1024) + ' Mbps'}
                                titleStyle={{ fontSize: 14, color: 'grey' }}
                                subtitleStyle={{ fontSize: 22, fontWeight: 'bold', color: 'rgba(98, 135, 181, 1)' }}
                                containerStyle={{ borderRadius: 10, margin: 2 }}
                                leftElement={
                                    <View style={{ width: 5, height: '100%', backgroundColor: 'rgba(98, 135, 181, 1)' }}></View>
                                }
                            />
                            <ListItem
                                title={'Valid For'}
                                subtitle={selectedPack['validity']}
                                titleStyle={{ fontSize: 14, color: 'grey' }}
                                subtitleStyle={{ fontSize: 22, fontWeight: 'bold', color: 'rgba(98, 135, 181, 1)' }}
                                containerStyle={{ borderRadius: 10, margin: 2 }}
                                leftElement={
                                    <View style={{ width: 5, height: '100%', backgroundColor: 'rgba(98, 135, 181, 1)' }}></View>
                                }
                            />
                            <ListItem
                                title={'Cost'}
                                subtitle={'GH₵ ' + selectedPack['Pack_Cost']}
                                titleStyle={{ fontSize: 14, color: 'grey' }}
                                subtitleStyle={{ fontSize: 22, fontWeight: 'bold', color: 'rgba(98, 135, 181, 1)' }}
                                containerStyle={{ borderRadius: 10, margin: 2 }}
                                leftElement={
                                    <View style={{ width: 5, height: '100%', backgroundColor: 'rgba(98, 135, 181, 1)' }}></View>
                                }
                            />

                        </View>
                        <View style={{ backgroundColor: 'white' }}>
                            <Button iconLeft info block
                                style={{ justifyContent: 'center', margin: 10, ...defaultStyles.shadow10 }}
                                onPress={this.onSelectPackage.bind(this)}
                            >
                                <Text>Purchase Package</Text>
                            </Button>
                            {/* {
                                topup_balance <= selectedPack['Pack_Cost'] && */}
                            <View style={{ backgroundColor: 'rgba(236, 239, 241,1.0)', justifyContent: 'center', margin: 10 }}>
                                <Button block success
                                    style={{ ...defaultStyles.shadow10 }}
                                    onPress={this.renewWithTopUp.bind(this)}
                                    disabled={topup_balance < parseFloat(selectedPack['Pack_Cost'])}
                                >
                                    <Text>Renew with Balance (GH₵ {topup_balance})</Text>
                                </Button>
                            </View>
                            {/* } */}
                        </View>
                    </View>

                </ScrollView>
            </View>
        )
    }

    componentDidMount() {

    }
    onSelectPackage = () => {
        try {
            const { selectedPack, pack, topup_balance, user, activePacks } = this.props.globalProps;
            if (!activePacks.includes(selectedPack['Plan_name'])) {
                RNToasty.Warn({
                    title: 'Package not available for renewal',
                    position: 'bottom',
                    duration: 1
                })
            } else
                this.props.navigation.navigate('Payment');
        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }

    }
    onChangePackage = () => {
        this.props.navigation.navigate('Packages');
    }
    async onInitiatePayment() {
        try {
            var data = new FormData();
            data.append('mob-initiate-payment', '_-_');
            data.append('phone', this.GlobalProps.user['phone']);
            data.append('email', this.GlobalProps.user['Email']);
            data.append('wallet', this.state.momo);
            data.append('network', this.state.network);
            data.append('usnm', this.GlobalProps.user['UserId']);
            data.append('pack', this.GlobalProps.user['Plan Name']);
            data.append('voucher', '');
            data.append('amount', this.GlobalProps.selectedPack['Pack_Cost']);
            // var response = await fetch('http://192.168.47.1/dashboard/mobile/mob_checkout.php', {
            var response = await fetch('https://coli.com.gh/dashboard/mobile/mob_checkout.php', {
                method: 'POST',
                body: data,
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            });

            var content = await response.json();

            if (content[0] == 'success') {
                this.GlobalProps.updateProp('invoice', content[1] + '');
                // Local invoice store
                await AsyncStorage.setItem('invoice-store', this.GlobalProps.invoice);
                await AsyncStorage.setItem('selected-pack-store', this.GlobalProps.user['Plan Name']);
                this.setState({
                    isInitiated: true,
                    invoice: this.GlobalProps.invoice
                })
                if (this.state.network == 'mtn') {
                    var instruction_header = 'MTN Momo';
                    var instructions = '1. Dial *170# and Choose My Wallet (Option 6).\n' +
                        '2. Choose My Approvals(Option 3).\n' +
                        '3. Enter your MOMO pin to retrieve your pending approval list.\n' +
                        '4. Choose the transaction to approve.\n' +
                        '5. Click on the Confirm button, once you\'re done.\n' +
                        '6. Input your invoice ID and Submit';
                    this.setState({
                        header: instruction_header,
                        instructions: instructions
                    })
                } else {
                    this.setState({
                        instruction: 'instruction'
                    })
                }
            } else {
                ToastAndroid.show(content, ToastAndroid.LONG);
            }
        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }

    renewWithTopUp = async () => {
        const { selectedPack, pack, topup_balance, user, activePacks } = this.props.globalProps;
        if (!activePacks.includes(selectedPack['Plan_name'])) {
            RNToasty.Warn({
                title: 'Package not available for renewal',
                position: 'bottom',
                duration: 1
            })
        }
        else
            Alert.alert(
                "Confirm",
                `Confirm topup with balance for \nPackage: ${selectedPack.Plan_name} \nCost: ${selectedPack.Pack_Cost} \n or cancel`,
                [
                    { text: 'cancel', style: 'cancel' },
                    {
                        text: 'Confirm',
                        onPress: async () => {

                            const { selectedPack, pack, topup_balance, user } = this.props.globalProps;

                            if (topup_balance >= selectedPack['Pack_Cost']) {
                                this.setState({
                                    isInProgress: true
                                })
                                try {
                                    var formData = new FormData();
                                    formData.append('usnm', user.username);
                                    formData.append('phone', user.phone);
                                    formData.append('pack_cost', selectedPack['Pack_Cost']);
                                    formData.append('pack', selectedPack['Plan_name']);
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
                                        position: 'bottom',
                                        duration: 1
                                    })
                                } finally {
                                    this.setState({
                                        isInProgress: false
                                    })
                                }
                            } else {
                                RNToasty.Info({
                                    title: 'Insuffient balance',
                                    position: 'bottom',
                                    duration: 1
                                })
                            }
                        }
                    }
                ]
            )

    }


    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Package',
        headerTransparent: true,
        headerTitleStyle: {
            color: '#1565C0'
        }
    })
}

const styles = StyleSheet.create({
    input: {

    }
})