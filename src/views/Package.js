import React from 'react';
import { ScrollView, StyleSheet, ImageBackground, Dimensions, ToastAndroid, Alert } from 'react-native';
import { Text, Card, CardItem, Button, H1, H2, H3, View, Toast } from 'native-base';
import { Avatar, Badge, ListItem, Header, Overlay, Input, Icon, Divider } from 'react-native-elements';

// Default Styles
import defaultStyles from '../../styles';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { inject, observer } from 'mobx-react';

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
            instructions: ''
        }
    }
    render() {
        this.GlobalProps = this.props.globalProps;
        const { selectedPack, pack } = this.GlobalProps;

        return (
            <View style={{ flex: 1, backgroundColor: '#f0f3f5' }}>
                <CardItem style={{ width: width, }}
                >
                    <View style={{ marginLeft: 20, marginTop: 50 }}>
                        <H1 style={{ color: '#0288D1' }}>{pack['Plan_name']}</H1>
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
                            <Button
                                iconLeft rounded info block
                                style={{ justifyContent: 'center', margin: 10 }}
                                onPress={this.onSelectPackage.bind(this)}
                            >
                                <Text>Renew Package</Text>
                            </Button>
                            {
                                selectedPack.Plan_name == pack.Plan_name ?
                                    <Button
                                        iconLeft rounded light block
                                        style={{ justifyContent: 'center', margin: 10 }}
                                        onPress={this.onChangePackage.bind(this)}
                                    >
                                        <Text>View More {'>>'}</Text>
                                    </Button>
                                    :
                                    null
                            }
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