import React from 'react';
import { ScrollView, StyleSheet, ToastAndroid, ImageBackground, SafeAreaView, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { Text, CardItem, Button, H1, H3, Thumbnail, View } from 'native-base';
import { Icon, ListItem, Input, Overlay, Avatar } from 'react-native-elements';

import { RadioButton, Chip } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { inject, observer } from 'mobx-react';


const { width, height } = Dimensions.get('window');
// List of Package Names
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

@inject('globalProps')
@observer
export default class AddedRenew extends React.Component {
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
        const { addedProfile, selectedPack } = this.GlobalProps;
        this.user = addedProfile;
        this.pack = selectedPack;

        if (packageNames.find(name => name.toLowerCase() == this.pack.Plan_name.toLowerCase())) {
            this.setState({
                name: this.user['Name'],
                username: this.user['UserId'],
                email: this.user['Email'],
                phone: this.user['phone'],
                amount: this.pack['Pack_Cost'],
                savedPlan: this.GlobalProps.selectedPack['Plan_name']
            });
        } else {
            alert('This package is currently not available for renewal. Select Another package.');
            this.props.navigation.goBack();
        }
    }

    inputChange = (e, name) => {
        const { text } = e.nativeEvent;
        this.setState({ [name]: text });
    }
    makePayment = () => {
        // Fetch Data Plans

        fetch('192.168.43.34/coli_dashboard/payments/mob_cli.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mob_cli: '_-_',
                mode: 'momo',
                name: this.user['Name'],
                phone: this.user['phone'],
                email: this.user['Email'],
                amount: this.pack['Pack_Cost'],
                network: this.network,
                wallet: this.wallet_phone,
                description: 'Payment for your ' + this.pack['Plan_name'] + ' package.',
                plan: this.pack['Plan_name']
            })
        })
            .catch(() => {
                ToastAndroid.show('User Info Incorrect!', ToastAndroid.SHORT);
            })
    }
    render() {
        this.GlobalProps = this.props.globalProps;
        const { selectedPack, addedProfile } = this.GlobalProps;

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
                                <H3>{addedProfile['Name']}</H3>
                                <H3>{selectedPack['Plan_name']}</H3>
                                <Text style={{ fontSize: 20, color: '#4FC3F7' }}>
                                    GH₵ {this.state.amount}
                                </Text>
                            </View>
                        </CardItem>
                        <ScrollView
                            nestedScrollEnabled={true}
                            style={{ flex: 1 }}
                        >
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
                                        <Text note style={{ color: '#f55a42' }}>Press question mark to view instructions (vodafone only)</Text>
                                    </View>
                                    :
                                    null
                                }

                                <CardItem bordered>
                                    <Text>Select Network</Text>
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
                            <H1 style={{ color: 'rgba(102, 187, 106,1.0)' }}>Amount: GHC {selectedPack['Pack_Cost']}</H1>
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
            ToastAndroid.show('Please Provide mobile money number!', ToastAndroid.LONG);
        } else if (network.trim() == '') {
            ToastAndroid.show('Please select the network operator', ToastAndroid.LONG);
        } else if (network == 'vodafone' && voucher.trim() == '') {
            ToastAndroid.show('Please provide the generated voucher code.', ToastAndroid.LONG);
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
                data.append('package', this.state.savedPlan);
                data.append('platform', 'MOBILE');
                data.append('voucher', voucher);
                data.append('purpose', 'RENEWAL');

                var body = {
                    "txt_ref": "",
                    "amount": amount,
                    "type": "mobile_money_ghana",
                    "currency": "GHS",
                    "voucher": voucher,
                    "email": email,
                    "phone_number": wallet,
                    "network": network,
                    "fullname": name,
                    "meta": {
                        "userId": username,
                        "platform": "MOBILE",
                        "pack": this.state.savedPlan,
                        "purpose": "RENEWAL"
                    }
                };



                // var response = await fetch('http://192.168.47.1/dashboard/mobile/mob_checkout.php', {
                // var response = await fetch('http://192.168.47.1/dashboard/payments/flutter_checkout.php', {
                var response = await fetch('https://coli.com.gh/dashboard/payments/flutter_checkout.php', {

                    method: 'POST',
                    body: data,
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // var content = await response.text();
                // alert(content);
                // return;
                var content = await response.json();
                if (content.status == 'success') {
                    var redirectUrl = content.meta.authorization.redirect;
                    this.props.navigation.navigate('WebViewer', { url: redirectUrl });
                } else {
                    ToastAndroid.show(JSON.stringify(content), ToastAndroid.LONG);
                }
            } catch (e) {
                ToastAndroid.show(e.message, ToastAndroid.LONG);
            }
            finally {
                this.setState({
                    isInProgress: false
                });
            }
        }

    }

    // Cancel Pending Invoice
    async onCancelPending() {
        try {
            // Remove Stored Invoice and Package
            await AsyncStorage.removeItem('invoice-store');
            await AsyncStorage.removeItem('selected-pack-store');
            this.setState({
                invoice: ''
            })
        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
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