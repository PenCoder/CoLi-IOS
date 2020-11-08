import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { Text, CardItem, Button, H1, H3, View, H2 } from 'native-base';
import { Icon, Input, Overlay, Avatar, Divider } from 'react-native-elements';

import { RadioButton, Chip } from 'react-native-paper';
import { RNToasty } from 'react-native-toasty';
import { inject, observer } from 'mobx-react';

// const Flutterwave = require('flutterwave-node-v3');
// GLOBAL
GLOBAL = require('../../global');

const { width, height } = Dimensions.get('window');
// List of Package Names

@inject('globalProps')
@observer
export default class TopUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            username: '',
            email: '',
            phone: '',
            wallet: '',
            network: '',
            amount: '',
            voucher: '',
            invoice: '',
            savedPlan: '',

            isInitiated: false,
            header: '',
            instructions: '',

            isInProgress: false
        }
    }
    componentDidMount() {
        const { user, pack } = this.GlobalProps;
        this.user = user;
        this.pack = pack;

        this.setState({
            name: this.user['Name'],
            username: this.user['UserId'],
            email: this.user['Email'],
            phone: this.user['phone'],
            savedPlan: this.GlobalProps.selectedPack['Plan_name']
        });
    }

    inputChange = (e, name) => {
        const { text } = e.nativeEvent;
        this.setState({ [name]: text });
    }

    render() {
        this.GlobalProps = this.props.globalProps;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(236, 239, 241,1.0)' }}>

                <Overlay
                    isVisible={this.state.isInProgress}
                    overlayStyle={{ backgroundColor: 'transparent', elevation: 0 }}
                    containerStyle={{ backgroundColor: 'rgba(250, 250, 250, 0.9)' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator
                            size="large"
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        />
                    </View>
                </Overlay>
                <View style={{ flex: 1 }}>
                    <View
                        style={{ ...styles.card }}
                    >
                        {/* <View style={{alignItems: 'center', ...styles.triangle}}/> */}
                        <CardItem bordered style={{ justifyContent: 'center', elevation: 1, borderRadius: 10 }}>
                            <View style={{ alignItems: 'center' }}>
                                <H2 style={{ color: '#0288D1', fontWeight: 'bold' }}>Top Up</H2>
                                <Text style={{ color: '#0288D1', fontWeight: 'bold' }}>GHS {this.GlobalProps.topup_balance}</Text>
                            </View>
                        </CardItem>
                        <ScrollView
                            nestedScrollEnabled={true}
                            style={{ flex: 1 }}
                        >
                            <CardItem style={{ justifyContent: 'center' }}>
                                <Avatar rounded
                                    size={'large'}
                                    icon={{ name: 'sack', type: 'material-community' }}
                                    containerStyle={{ elevation: 10 }}
                                    overlayContainerStyle={{ backgroundColor: 'rgba(98, 135, 181, 1)' }}
                                />
                            </CardItem>
                            <View style={{ flexDirection: 'column' }}>
                                <Input
                                    placeholder='MoMo Number'
                                    containerStyle={styles.input}
                                    inputContainerStyle={styles.input_container}
                                    onChangeText={(phone) => this.setState({ wallet: phone })}
                                    value={this.state.wallet}
                                    leftIcon={{ name: 'phone', type: 'entypo' }}
                                    keyboardType='number-pad'
                                />
                                <Input
                                    placeholder='Amount'
                                    containerStyle={styles.input}
                                    inputContainerStyle={styles.input_container}
                                    onChangeText={(amount) => this.setState({ amount })}
                                    value={this.state.amount}
                                    leftIcon={<Text>GH₵</Text>}
                                    keyboardType='number-pad'
                                />
                                <Input
                                    placeholder='Voucher Code (Vodafone only)'
                                    containerStyle={styles.input}
                                    inputContainerStyle={styles.input_container}
                                    onChangeText={(txt) => this.setState({ voucher: txt })}
                                    value={this.state.voucher}
                                    keyboardType='number-pad'
                                    disabled={this.state.network !== 'VODAFONE'}
                                    rightIcon={
                                        <Avatar icon={{ name: "question-circle-o", type: "font-awesome" }}
                                            rounded
                                            disabled={this.state.network !== 'VODAFONE'}
                                            color="#0D47A1"
                                            onPress={() =>
                                                Alert.alert('Generating Voucher Code',
                                                    '(1) Dial *110#, select option 4. Make Payments. \n' +
                                                    '(2) Then select option 4. Generate Voucher. \n' +
                                                    '(3) Follow the prompt to generate Voucher Code.'
                                                )
                                            }
                                        />
                                    }
                                />
                                {this.state.network == 'VODAFONE' ?
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Text style={{ color: 'blue' }}>Press question mark to view instructions (vodafone only)</Text>
                                    </View>
                                    :
                                    null
                                }

                                <CardItem bordered>
                                    <Divider style={{ flex: 1, margin: 5 }} />
                                    <Text style={{ color: '#0288D1' }}>Select Network</Text>
                                </CardItem>
                                <CardItem style={{ flex: 1, flexWrap: 'wrap' }}>
                                    <RadioButton.Group
                                        onValueChange={value => this.setState({ network: value })}
                                        value={this.state.network}
                                    >
                                        <View style={{ flexDirection: 'row', margin: 10 }}>
                                            <Avatar size='small' source={require('../media/images/network-logos/mtn-momo-logo.jpg')} />
                                            <Chip
                                                avatar={<RadioButton
                                                    value={'MTN'}
                                                    color={'#0D47A1'}
                                                />}>mtn</Chip>
                                        </View>
                                        <View style={{ flexDirection: 'row', margin: 10 }}>
                                            <Avatar size='small' source={require('../media/images/network-logos/vodafone-cash-logo.jpg')} />
                                            <Chip
                                                avatar={
                                                    <RadioButton
                                                        value={'VODAFONE'}
                                                        color={'#0D47A1'}
                                                    />}>vodafone</Chip>
                                        </View>
                                        <View style={{ flexDirection: 'row', margin: 10 }}>
                                            <Avatar size='small' source={require('../media/images/network-logos/airtelmoney.png')} />
                                            <Chip
                                                avatar={<RadioButton
                                                    value={'AIRTEL'}
                                                    color={'#0D47A1'}
                                                />}>airtel</Chip>
                                        </View>
                                        <View style={{ flexDirection: 'row', margin: 10 }}>
                                            <Avatar size='small' source={require('../media/images/network-logos/tigocash.jpg')} />
                                            <Chip
                                                avatar={<RadioButton
                                                    value={'TIGO'}
                                                    color={'#0D47A1'}
                                                />}>tigo</Chip>
                                        </View>
                                    </RadioButton.Group>
                                </CardItem>

                                <View style={styles.buttonContainer}>
                                    <Button
                                        success rounded block
                                        onPress={this.onInitiatePayment.bind(this)}
                                    >
                                        <Text>Checkout</Text>
                                    </Button>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                {/* Payment Instructions */}
                <Overlay
                    isVisible={this.state.isInitiated}
                    onBackdropPress={() => this.setState({ isInitiated: false })}
                >
                    <View style={{ flex: 1 }}>
                        <CardItem bordered style={{ borderRadius: 10 }}>
                            <H1 style={{ color: 'rgba(102, 187, 106,1.0)' }}>Amount: GHC {GLOBAL.selectedPack['Pack_Cost']}</H1>
                        </CardItem>
                        <CardItem>
                            <H3 style={{ textTransform: 'uppercase' }}>{this.state.header}</H3>
                        </CardItem>
                        <CardItem>
                            <Text note style={{ fontStyle: 'italic' }}>Follow the step by step process to complete payment.</Text>
                        </CardItem>
                        <CardItem>
                            <Text>{this.state.instructions}</Text>
                        </CardItem>

                        <CardItem style={{ alignItems: 'flex-end' }}>
                            <Button
                                onPress={() => this.setState({ isInitiated: false })}
                                info rounded
                            >
                                <Text>Close</Text>
                            </Button>
                        </CardItem>
                    </View>
                </Overlay>
            </SafeAreaView>
        )
    }
    // Initiate Payment
    async onInitiatePayment() {
        const { name, username, wallet, phone, email, network, voucher, amount } = this.state;

        if (wallet.trim() == '') {
            RNToasty.Info({
                title: 'Input  momo number.',
                position: 'bottom'
            });
        } else if (amount.trim() == '') {
            RNToasty.Info({
                title: 'Please input amount',
                position: 'bottom'
            })
        } else if (parseInt(amount.trim()) <= 0) {
            RNToasty.Info({
                title: 'Amount must be 1 cedi or more.',
                position: 'bottom'
            })
        } else if (network.trim() == '') {
            RNToasty.Info({
                title: 'Please select the network operator.',
                position: 'bottom'
            });
        } else if (network == 'vodafone' && voucher.trim() == '') {
            RNToasty.Info({
                title: 'Please provide voucher code.',
                position: 'bottom'
            });
        }
        else {
            this.setState({
                isInProgress: true
            });

            try {

                var data = new FormData();
                data.append('init-pay', '_-_');
                data.append('name', name);
                data.append('phone', phone);
                data.append('email', email);
                data.append('wallet', wallet);
                data.append('network', network);
                data.append('usnm', username);
                data.append('cost', amount);
                data.append('package', '');
                data.append('platform', 'MOBILE');
                data.append('voucher', voucher);
                data.append('purpose', 'TOP_UP');


                var response = await fetch('https://coli.com.gh/dashboard/payments/flutter_checkout.php', {
                    method: 'POST',
                    body: data,
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                });

                var content = await response.json();
                if (content.status == 'success') {
                    var redirectUrl = content.meta.authorization.redirect;
                    this.props.navigation.navigate('WebViewer', { url: redirectUrl });
                } else {
                    RNToasty.Info({
                        title: JSON.stringify(content),
                        position: 'bottom'
                    });
                }
            } catch (e) {
                RNToasty.Warn({
                    title: e.message,
                    position: 'bottom'
                });
            }
            finally {
                this.setState({
                    isInProgress: false
                });
            }
        }

    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '',
        headerTransparent: true,
        headerLeft: <Icon type="feather" name="arrow-left" onPress={() => navigation.goBack()} />
    })
}

// Styles for this View
const styles = StyleSheet.create({
    input_item: {
        width: '100%',
        borderWidth: 0,
        borderRadius: 30,
        backgroundColor: 'rgba(236, 239, 241,1.0)',
        paddingLeft: 20,
        paddingBottom: 5,
        alignSelf: 'center',
    },
    label: {
        color: 'grey',
        marginVertical: -10
    },
    input: {
        borderRadius: 30,
        paddingBottom: 5,
        alignSelf: 'center',
        margin: 10
    },
    input_container: {
        borderRadius: 30,
        backgroundColor: 'rgba(236, 239, 241,1.0)',
        borderBottomWidth: 0,
        paddingHorizontal: 8
    },
    buttonContainer: {
        marginHorizontal: 0,
        marginTop: 30
    },
    button: {
        // backgroundColor: '#03A9F4',
        justifyContent: 'center',
        borderRadius: 30,
        elevation: 10
    },
    elevate: {
        width: '90%',
        margin: 20,
        alignItems: 'center',
    },
    card: {
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        flex: 1,
    },
    float: {
        width: '100%',
        elevation: 5,
        alignSelf: 'center'
    },
    behind: {
        width: width,
        height: height,
        position: 'absolute'
    },
    progressBtn: {
        elevation: 5,
        backgroundColor: '#4FC3F7',
        borderRadius: 25,
        paddingHorizontal: 20
    },
    progressBtnText: {
        color: 'white'
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 20,
        borderRightWidth: 200,
        borderTopWidth: 500,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#03A9F4',
        borderBottomRightRadius: 100,
        position: 'absolute'
    }
})