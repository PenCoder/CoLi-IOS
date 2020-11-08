import React from 'react';
import {View, ScrollView, StyleSheet, ToastAndroid, ImageBackground, SafeAreaView, Dimensions, Alert, Switch, ActivityIndicator} from 'react-native';
import {Text, CardItem, Button, H1, H3, Thumbnail} from 'native-base';
import { Icon, ListItem, Input, Overlay } from 'react-native-elements';

import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
// GLOBAL
GLOBAL = require('../../global');

const {width, height} = Dimensions.get('window');
// List of Package Names
const packageNames = ['home', 'Regular', 'Basic', 'Standard', 'Business', 'Office', 'CoLiPlus'];

export default class UnPayment extends React.Component {
    constructor(props){
        super(props);
        this.user = GLOBAL.user;
        this.pack = GLOBAL.selectedPack
        this.state = {
            name: this.user.fullname,
            username: this.user.p_username,
            email: this.user.email,
            phone: this.user.p_phone,
            wallet: '',
            network: '',
            amount: GLOBAL.installationCost,
            voucher: '', 
            invoice: '',

            isLoading: false,

            isInitiated: false,
            header: '',
            instructions: '',

            isAddPackage: false
        }
    }
    componentDidMount () {
        if(packageNames.find(name => name.toLowerCase() == this.pack.Plan_name.toLowerCase())){
            this.checkStoredInvoice();
        }else{
            // Alert.alert('Non-Renewable', 'This package is currently not available for renewal.');
            Alert.alert(GLOBAL.selectedPack.Plan_name.toLowerCase())
            this.props.navigation.goBack();
        }
    }
    async checkStoredInvoice() {
        try{
            var invoice = await AsyncStorage.getItem('invoice-store');
            if(invoice){
                GLOBAL.invoice = invoice;
                this.setState({
                    invoice
                })
            }
        }catch(e){
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }
    inputChange = (e, name) => {
        const {text} = e.nativeEvent;
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
                name: this.user.fullname,
                phone: this.user.p_phone,
                email: this.user.email,
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
    render(){
        return(
            <SafeAreaView style={{flex: 1}}>
                <ImageBackground
                    source={require('../media/images/new_blue_bg.jpg')}
                    style={{flex: 1, backgroundColor: 'rgba(236, 239, 241,1.0)'}}
                >
                    <Overlay isVisible={this.state.isLoading} 
                        overlayStyle={{backgroundColor: 'transparent', elevation: 0}} 
                        containerStyle={{backgroundColor: 'rgba(250, 250, 250, 0.7)'}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <ActivityIndicator
                                size='large'
                                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                            />
                        </View>
                    </Overlay>

                    <CardItem style={{alignSelf: 'center', flex: 1, borderRadius: 20, backgroundColor: 'transparent'}}>
                        <View
                            style={{...styles.card, backgroundColor: 'rgba(236, 239, 241,1.0)'}}
                        >
                            {/* <View style={{alignItems: 'center', ...styles.triangle}}/> */}
                            <CardItem style={{justifyContent: 'center', elevation: 2, borderRadius: 10}}>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text note style={{fontSize: 18}}>Installation Cost: GHC 149.00</Text>
                                </View>
                            </CardItem>
                            <ScrollView
                                contentContainerStyle={{flexGrow: 1}}
                                nestedScrollEnabled={true}
                            >
                                {
                                    // Pending Invoice
                                    this.state.invoice.trim() !== '' ?
                                    <View>
                                        <ListItem
                                            title='You have a pending invoice. Please complete payment and confirm payment.'
                                            containerStyle={{backgroundColor: 'rgba(225, 245, 254,1.0)'}}
                                            leftIcon={{name: 'info-circle', type: 'font-awesome', color: 'rgba(79, 195, 247,1.0)', size: 30}}
                                        />
                                        <CardItem>
                                            <Button
                                                iconLeft rounded info
                                                style={{justifyContent: 'center', margin: 10}}
                                                onPress={() => this.onConfirmPayment()}
                                            >
                                                <Text>Confirm</Text>
                                            </Button>
                                            <Button
                                                iconLeft rounded light
                                                style={{justifyContent: 'center', margin: 10}}
                                                onPress={() => this.onCancelPending()}
                                            >
                                                <Text>Cancel</Text>
                                            </Button>


                                        </CardItem>
                                    </View>
                                    :
                                    null
                                }
                                <View style={{flexDirection: 'column'}}>
                                    <CardItem style={{margin: 10}}>
                                        <H3 style={{color: '#0D47A1'}}>Payment Details</H3>
                                    </CardItem>
                                    <Input
                                        placeholder='Mobile Wallet Number'
                                        containerStyle={styles.input}
                                        inputContainerStyle={{borderBottomWidth: 0}}
                                        onChangeText={(phone) => this.setState({wallet: phone})}
                                        value={this.state.wallet}
                                        leftIcon={{name: 'wallet', type: 'entypo'}}
                                        keyboardType='number-pad'
                                    />
                                    <Input
                                        placeholder='Voucher Code (Vodafone only)'
                                        containerStyle={styles.input}
                                        inputContainerStyle={{borderBottomWidth: 0}}
                                        onChangeText={(txt) => this.setState({voucher: txt})}
                                        value={this.state.voucher}
                                        keyboardType='number-pad'
                                        disabled={this.state.network !== 'vodafone'}
                                        rightIcon={
                                            <Icon name="question-circle-o" type="font-awesome"
                                                disabled={this.state.network !== 'vodafone'}
                                                color="#0D47A1"
                                                onPress={() => 
                                                    Alert.alert('Generating Voucher Code', 
                                                        'Dial *110#, select option 4. Make Payments, then option 4. Generate Voucher and follow the prompt to generate Voucher Code'
                                                    )
                                                }
                                            />
                                        }
                                    />
                                    
                                    <CardItem bordered>
                                        <Text>Select Network</Text>
                                    </CardItem>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', margin: 10}}>
                                        <View style={styles.input, {flexDirection: 'row', margin: 2, alignItems: 'center'}}>
                                            <RadioButton
                                                value={'mtn'}
                                                color={'#4FC3F7'}
                                                status={this.state.network == 'mtn' ? 'checked' : 'unchecked'}
                                                onPress={() => this.setState({network: 'mtn'})}
                                            />
                                            <Thumbnail square small source={require('../media/images/network-logos/mtn-momo-logo.jpg')} />
                                        </View>
                                        <View style={styles.input, {flexDirection: 'row', margin: 2, alignItems: 'center'}}>
                                            <RadioButton
                                                value={'vodafone'}
                                                color={'#4FC3F7'}
                                                status={this.state.network == 'vodafone' ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    this.setState({network: 'vodafone'})
                                                    Alert.alert('Generating Voucher Code', 
                                                        'Dial *110#, select option 4. Make Payments, then option 4. Generate Voucher and follow the prompt to generate Voucher Code'
                                                    )
                                                }}
                                            />
                                            <Thumbnail square small source={require('../media/images/network-logos/vodafone-cash-logo.jpg')} />
                                        </View>
                                        <View style={styles.input, {flexDirection: 'row', margin: 2, alignItems: 'center'}}>
                                            <RadioButton
                                                value={'airteltigo'}
                                                color={'#4FC3F7'}
                                                status={this.state.network == 'airtel' ? 'checked' : 'unchecked'}
                                                onPress={() => this.setState({network: 'airtel'})}
                                            />
                                            <Thumbnail square small source={require('../media/images/network-logos/airtelmoney.png')} />
                                        </View>
                                        <View style={styles.input, {flexDirection: 'row', margin: 2, alignItems: 'center'}}>
                                            <RadioButton
                                                value={'airteltigo'}
                                                color={'#4FC3F7'}
                                                status={this.state.network == 'tigo' ? 'checked' : 'unchecked'}
                                                onPress={() => this.setState({network: 'tigo'})}
                                            />
                                            <Thumbnail square small source={require('../media/images/network-logos/tigocash.jpg')} />
                                        </View>
                                    </View>
                                </View>
                                
                                <ListItem
                                    title="Add Package Cost"
                                    rightElement={
                                        <Switch
                                            value={this.state.isAddPackage}
                                            onValueChange={this.switchAddPackageCost.bind(this)}
                                        />
                                    }
                                />
                                {
                                    this.state.isAddPackage ? 
                                        <CardItem style={{justifyContent: 'space-between', elevation: 2, borderRadius: 10}}>
                                            <Text>Package Cost:</Text>
                                            <Text note style={{fontSize: 18}}> GHC {GLOBAL.selectedPack['Pack_Cost']}</Text>
                                        </CardItem>
                                        :
                                        null
                                }
                                <CardItem style={{justifyContent: 'space-between', elevation: 2, borderRadius: 10}}>
                                    <H3>Total: </H3>
                                    <Text note style={{fontSize: 18}}>GHC {this.state.amount}</Text>
                                </CardItem>
                            </ScrollView> 
                            <View style={styles.buttonContainer}>
                                <Button 
                                    style={styles.button}
                                    success
                                    onPress={this.onInitiatePayment.bind(this)}
                                >
                                    <Text>Submit</Text>
                                </Button>
                            </View>
                        </View> 
                    </CardItem>
                </ImageBackground> 
                {/* Payment Instructions */}
                <Overlay
                    isVisible={this.state.isInitiated}
                    // onBackdropPress={() => this.setState({isInitiated: false})}
                >
                    <View style={{flex: 1}}>
                        <CardItem bordered style={{borderRadius: 10}}>
                            <H1 style={{color: 'rgba(102, 187, 106,1.0)'}}>Amount: GHC {GLOBAL.selectedPack['Pack_Cost']}</H1>
                        </CardItem>
                        <CardItem>
                            <H3 style={{textTransform: 'uppercase'}}>{this.state.header}</H3>
                        </CardItem>
                        <CardItem>
                            <Text note style={{fontStyle: 'italic'}}>Follow the step by step process to complete payment.</Text>
                        </CardItem>
                        <CardItem>
                            <Text>{this.state.instructions}</Text>
                        </CardItem>

                        <CardItem style={{alignItems: 'flex-end'}}>
                            <Button
                                onPress={() => this.setState({isInitiated: false})}
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
    switchAddPackageCost = (value) => {
        var total = 149;
        if(value){
            total += parseInt(GLOBAL.selectedPack['Pack_Cost']);
        }
        this.setState({
            isAddPackage: value,
            amount: total
        })
    }
    // Initiate Payment
    async onInitiatePayment(){

        const {name, username, wallet, phone, email, network, voucher, amount} = this.state;
        
        if(wallet.trim() == ''){
            ToastAndroid.show('Please Provide mobile money number!', ToastAndroid.LONG);
        }else if(network.trim() == ''){
            ToastAndroid.show('Please select the network operator', ToastAndroid.LONG);
        }else if( network == 'vodafone' && voucher.trim() == ''){
            ToastAndroid.show('Please provide the generated voucher code.', ToastAndroid.LONG);
        }
        else{
            this.setState({
                isLoading: true
            })
            try{
                var data = new FormData();
                data.append('mob-initiate-payment', '_-_');
                data.append('name', name);
                data.append('phone', phone);
                data.append('email', email);
                data.append('wallet', wallet);
                data.append('network', network);
                data.append('usnm', username);
                data.append('amount', amount);
                // data.append('pack', GLOBAL.user['Plan Name']);
                data.append('voucher', voucher);
                
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
                this.setState({
                    isLoading: false
                })
                if(content[0] == 'success'){
                    
                    GLOBAL.invoice = content[1] + '';
                    
                    // Local invoice store
                    await AsyncStorage.setItem('invoice-store', GLOBAL.invoice);
                    
                    this.setState({
                        invoice: GLOBAL.invoice
                    })
                    
                    if(this.state.network == 'mtn'){
                        var instruction_header = 'MTN Momo';
                        var instructions = '1. Dial *170# and Choose My Wallet (Option 6).\n' +
                                            '2. Choose My Approvals(Option 3).\n' +
                                            '3. Enter your MOMO pin to retrieve your pending approval list.\n' +
                                            '4. Choose the transaction to approve.\n' +
                                            '5. Click on the Confirm button, once you\'re done.\n' +
                                            '6. Input your invoice ID and Submit';
                        // Display Instructions
                        this.setState({
                            header: instruction_header,
                            instructions: instructions,
                            isInitiated: true
                        })
                    }else if (this.state.network == 'airteltigo'){
                        ToastAndroid.show('ATIgo', ToastAndroid.LONG);
                        var instruction_header = 'AirtelTigo Cash';
                        var instructions = '1. Dial *110*4*3# on your AirtelTigo number to authorize the payment.' +
                                            '2. Click on the Confirm button, once you\'re done.';
                        // Display instructions
                        this.setState({
                            header: instruction_header,
                            instructions: instructions,
                            isInitiated: true
                        })
                        
                    }
                    else{
                        ToastAndroid.show('Awaiting Payment', ToastAndroid.LONG);
                    }
                }else{
                    ToastAndroid.show(JSON.stringify(content), ToastAndroid.LONG);
                }
            }catch(e){
                ToastAndroid.show(e.message, ToastAndroid.LONG);
            }finally{
                this.setState({
                    isLoading: false
                })
            }
        }
        
    }
    async onConfirmPayment(){
        try{
            var data = new FormData();
            if(this.state.invoice.trim() == ''){
                ToastAndroid.show('Please provide invoice ID', ToastAndroid.LONG);
            }else{
                // Start Loader
                this.setState({
                    isLoading: true
                })
                data.append('mob-confirm-payment', '_-_');
                data.append('invoice', GLOBAL.invoice);
                data.append('pack', GLOBAL.selectedPack['Plan_name']);
                data.append('usnm', GLOBAL.user.p_username);
                data.append('email', GLOBAL.user.email);
                data.append('phone', GLOBAL.user.p_phone);
                data.append('purpose', 'INSTALLATION');

                // var response = await fetch('http://192.168.47.1/dashboard/mobile/mob_checkout.php', {
                var response = await fetch('https://coli.com.gh/dashboard/mobile/mob_checkout.php', {
                    method: 'POST',
                    body: data,
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }  
                });
                
                var content = await response.text();
                
                // End Loader
                this.setState({
                    isLoading: false
                })
                if(content.includes('awaiting')){
                    ToastAndroid.show('Awaiting payment. Make payment from mobile money wallet.', ToastAndroid.LONG);
                }
                else if(content.includes('success')){
                    this.setState({
                        isPaid: true
                    });
                    Alert.alert('Success', 'Payment successfully confirmed.');
                    // Remove Stored Invoice and Package
                    await AsyncStorage.removeItem('invoice-store');

                    this.props.navigation.navigate('Auth');

                }else{
                    ToastAndroid.show('Request failed. Please try again', ToastAndroid.LONG);
                }
            }
        }catch(e){
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }finally{
            this.setState({
                isLoading: false
            })
        }
    }
    // Cancel Pending Invoice
    async onCancelPending(){
        try{
            // Remove Stored Invoice and Package
            await AsyncStorage.removeItem('invoice-store');
            await AsyncStorage.removeItem('selecte-pack-store');
            this.setState({
                invoice: ''
            })
        }catch(e){
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }
    static navigationOptions = ({navigation}) => ({
        headerTitle: '',
        headerTransparent: true,
        headerLeft: <Icon type="feather" name="arrow-left" color="#fff" onPress={() => navigation.goBack()}/>
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
        borderWidth: 0, 
        borderRadius: 30, 
        // backgroundColor: 'rgba(236, 239, 241,1.0)', 
        paddingBottom: 5,
        alignSelf: 'center',
        margin: 10,
        // elevation: 5, 
        backgroundColor: 'white'
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
        borderRadius: 20, 
        flex: 1
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