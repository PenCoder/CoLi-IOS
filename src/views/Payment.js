import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, Dimensions, Alert } from 'react-native';
import { Text, CardItem, Button, H1, H3, View, Picker } from 'native-base';
import { Icon, Input, Overlay, Avatar, Divider } from 'react-native-elements';

import { RadioButton, Chip } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { RNToasty } from 'react-native-toasty';
import Spinner from 'react-native-loading-spinner-overlay';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';


const { width, height } = Dimensions.get('window');
// List of Package Names
const packageNames = [
    'CoLiPlus',
    'CoLi Plus Mini',
    'CoLi Value',
    'CoLi Extra',
    'CoLi Office'
];

@inject('globalProps')
@observer
export default class Payment extends React.Component {
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
            packs: [],

            isInitiated: false,
            header: '',
            instructions: '',

            packageSelected: {},

            isInProgress: false
        }
    }

    render() {
        this.GlobalProps = this.props.globalProps;
        const { selectedPack, topup_balance } = this.GlobalProps;

        return (
            true ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Dialog>
                        <Dialog.Title>Oops!</Dialog.Title>
                        <Dialog.Content>
                            <Text>Our payment system is currently under maintenance. You can make payments to our MoMo number:</Text>
                            <Text style={{ margin: 5 }}>0240390872</Text>
                            <Divider style={{ flex: 1 }} />
                            <Text note>NB: Please use your CoLi username as your reference.</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <DialogDefaultActions
                                actions={['ok']}
                                onActionPress={() => this.props.navigation.goBack()}
                            />
                        </Dialog.Actions>
                    </Dialog>
                </View>
                :
                <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(236, 239, 241,1.0)' }}>

                    <Spinner
                        visible={this.state.isLoading}
                        textContent={'Loading...'}
                        textStyle={{ color: '#fff' }}
                        cancelable={true}
                    />
                    <View style={{ flex: 1 }}>
                        <View
                            style={{ ...styles.card }}
                        >
                            <CardItem bordered style={{ justifyContent: 'center', elevation: 1, borderRadius: 10 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <H3>{this.state.savedPlan}</H3>
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

                                    <View style={styles.picker_container}>
                                        <Picker
                                            mode='modal' note
                                            placeholder=""
                                            style={{ width: undefined, borderWidth: 2, elevation: 2 }}
                                            iosIcon={<Icon name='arrow-down' />}
                                            selectedValue={this.state.packageSelected}
                                            onValueChange={this.onPackageChanged.bind(this)}
                                        >
                                            <Picker.Item label="Select Package"></Picker.Item>
                                            {
                                                this.state.packs.map((p, index) => {
                                                    return (
                                                        <Picker.Item label={p.Plan_name + ' - ' + p.Pack_Cost} value={p} key={index} />
                                                    );
                                                })
                                            }
                                        </Picker>
                                    </View>
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

                                    <View style={{ backgroundColor: 'rgba(236, 239, 241,1.0)', justifyContent: 'center', margin: 10 }}>
                                        <Button info block
                                            style={{ elevation: 10 }}
                                            onPress={this.onInitiatePayment.bind(this)}
                                        >
                                            <Text>Checkout</Text>
                                        </Button>
                                    </View>
                                    {/* {
                                    topup_balance <= selectedPack['Plan_name'] && */}
                                    <View style={{ backgroundColor: 'rgba(236, 239, 241,1.0)', justifyContent: 'center', margin: 10 }}>
                                        <Button block success
                                            style={{ elevation: 10 }}
                                            onPress={this.renewWithTopUp.bind(this)}
                                            disabled={topup_balance < parseFloat(selectedPack['Plan_name'])}
                                        >
                                            <Text>Renew with Balance (GH₵ {topup_balance})</Text>
                                        </Button>
                                    </View>
                                    {/* } */}
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

    componentDidMount() {
        const { user, selectedPack, activePacks } = this.GlobalProps;
        this.user = user;
        this.pack = selectedPack;



        if (activePacks.find(name => name.toLowerCase() == this.pack.Plan_name.toLowerCase())) {

            const filtered = this.GlobalProps.packs.filter(p => activePacks.find(n => n === p) !== null);

            this.setState({
                packageSelected: selectedPack,
                name: this.user['Name'],
                username: this.user['UserId'],
                email: this.user['Email'],
                phone: this.user['phone'],
                amount: this.pack['Pack_Cost'],
                savedPlan: this.GlobalProps.selectedPack['Plan_name'],
                packs: filtered
            });

        } else {
            alert('This package is currently not available for renewal.');
            this.props.navigation.goBack();
        }
    }
    // Renew With Top Up Balance 
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
                            }
                            else {
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
    inputChange = (e, name) => {
        const { text } = e.nativeEvent;
        this.setState({ [name]: text });
    }


    // On Package Changed 
    onPackageChanged = (pack) => {

        this.setState({
            packageSelected: pack,
            amount: pack['Pack_Cost'],
            savedPlan: pack['Plan_name']
        })
    }
    // Initiate Payment
    async onInitiatePayment() {

        const { name, username, wallet, phone, email, network, voucher, amount } = this.state;

        if (wallet.trim() == '') {
            RNToasty.Info({
                title: 'Please Provide mobile money number!',
                position: 'bottom'
            });
        } else if (network.trim() == '') {
            RNToasty.Info({
                title: 'Please select the network operator',
                position: 'bottom'
            });
        } else if (network == 'vodafone' && voucher.trim() == '') {
            RNToasty.Info({
                title: 'Please provide the generated voucher code.',
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
                data.append('package', this.state.savedPlan);
                data.append('platform', 'MOBILE');
                data.append('voucher', voucher);
                data.append('purpose', 'RENEWAL');




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

                var content = await response.json();
                if (content.status == 'success') {
                    var redirectUrl = content.meta.authorization.redirect;
                    this.props.navigation.navigate('WebViewer', { url: redirectUrl });
                } else {
                    alert()
                    RNToasty.Show({
                        title: content,
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
    picker_container: {
        flexDirection: 'row',
        borderWidth: 0,
        borderRadius: 30,
        backgroundColor: 'rgba(236, 239, 241,1.0)',
        margin: 10,
        paddingHorizontal: 20,
        elevation: 1
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
        marginHorizontal: 20,
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