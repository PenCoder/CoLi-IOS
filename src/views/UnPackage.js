import React from 'react';
import {ScrollView, StyleSheet, ImageBackground, Dimensions, ToastAndroid, Alert} from 'react-native';
import {Text, Card, CardItem, Button, H1, H2, H3, View, Icon, Toast} from 'native-base';
import { Avatar, Badge, ListItem, Header, Overlay, Input } from 'react-native-elements';

// Default Styles
import defaultStyles from '../../styles';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
// GLOBAL
GLOBAL = require('../../global');

const {width} = Dimensions.get('window');

export default class UnPackage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pack: GLOBAL.selectedPack,
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
        const {pack} = this.state;
        return(
            <View style={{flex: 1, backgroundColor: '#f0f3f5'}}>
                <ImageBackground 
                    style={{paddingTop: 20, width: width, alignItems: 'center'}}
                    source={require('../media/images/new_blue_bg.jpg')}
                >
                    <View>
                        <View style={{marginBottom: 10}}>
                            <H1 style={{color: 'white'}}>Package</H1>
                        </View>
                        <View>
                            <Avatar
                                rounded
                                size={'large'}
                                overlayContainerStyle={{backgroundColor: 'white'}}
                                icon={{name: 'package', type: 'feather', color: '#0288D1'}}
                            />
                        </View>
                    </View>
                </ImageBackground>

                <ScrollView>
                    <View style={{flex: 1, backgroundColor: '#f0f3f5'}}>
                        <CardItem style={{justifyContent: 'center'}}>
                            <H1 style={{color: '#03A9F4'}}>{pack['Plan_name']}</H1>
                        </CardItem>
                        
                        <View style={{justifyContent: 'space-between', marginTop: 20}}>
                            <ListItem
                                title={<H2>{pack['Data_Transfer'] == 'N/A' ? 'UNLIMITED' : pack['Data_Transfer'] + 'GB'}</H2>}
                                subtitle={<Text note>data</Text>}
                                topDivider bottomDivider
                                leftAvatar={{
                                    size: 'medium',
                                    overlayContainerStyle: {backgroundColor: '#4FC3F7'},
                                    icon: {name: 'database', type: 'feather', color: 'white'}
                                }}
                            />
                            <ListItem
                                title={'GH₵ ' + pack['Pack_Cost']}
                                topDivider bottomDivider
                                leftAvatar={{
                                    size: 'medium',
                                    overlayContainerStyle: {backgroundColor: '#4FC3F7'},
                                    title: '₵',
                                    // icon: {name: 'dollar', type: 'foundation', color: 'white'}
                                }}
                            />
                            <ListItem
                                title={pack['validity']}
                                topDivider bottomDivider
                                leftAvatar={{
                                    size: 'medium',
                                    overlayContainerStyle: {backgroundColor: '#4FC3F7'},
                                    icon: {name: 'hourglass', type: 'antdesign', color: 'white'}
                                }}
                            />
                            
                        </View>
                        <View style={{backgroundColor: 'white'}}>
                            
                            {
                                GLOBAL.selectedPack.Plan_name == GLOBAL.pack.Plan_name ? 
                                <>
                                    <Button
                                        iconLeft rounded primary
                                        style={{justifyContent: 'center', margin: 10}}
                                        onPress={this.onSelectPackage.bind(this)}
                                    >
                                        <Text>Select Package</Text>
                                    </Button>
                                    <Button
                                        iconLeft rounded info
                                        style={{justifyContent: 'center', margin: 10}}
                                        onPress={this.onChangePackage.bind(this)}
                                    >
                                        <Text>View Other Packages</Text>
                                    </Button>
                                </>
                                :
                                null
                            }
                            
                            
                            {/* Initiate Payment */}
                            <Overlay
                                isVisible={this.state.isRenew}
                                onBackdropPress={() => this.setState({isRenew: false})}
                            >
                                {
                                    this.state.isInitiated ? 
                                    
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
                                                title='Confirm'
                                            />
                                        </CardItem>
                                    </View>
                                    
                                    :
                                    
                                    <View>
                                        <CardItem>
                                            <H3>Provide Mobile Wallet Details</H3>
                                        </CardItem>
                                        <Input 
                                            placeholder='Mobile Money Number'
                                            containerStyle={styles.input}
                                            onChangeText={(text) => this.setState({momo: text})}
                                            keyboardType='number-pad'
                                            value={this.state.momo}
                                        />
                                        <View>
                                            <CardItem style={styles.input}>
                                                <RadioButton
                                                    value={'mtn'}
                                                    color={'#4FC3F7'}
                                                    status={this.state.network == 'mtn' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({network: 'mtn'})}
                                                />
                                                <Text>MTN</Text>
                                            </CardItem>
                                            <CardItem style={styles.input}>
                                                <RadioButton
                                                    value={'vodafone'}
                                                    color={'#4FC3F7'}
                                                    status={this.state.network == 'vodafone' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({network: 'vodafone'})}
                                                />
                                                <Text>Vodafone</Text>
                                            </CardItem>
                                            <CardItem style={styles.input}>
                                                <RadioButton
                                                    value={'airteltigo'}
                                                    color={'#4FC3F7'}
                                                    status={this.state.network == 'airteltigo' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({network: 'airteltigo'})}
                                                />
                                                <Text>AirtelTigo</Text>
                                            </CardItem>
                                            
                                            <CardItem style={{justifyContent: 'space-between'}}>
                                                <Button
                                                    success
                                                    onPress={() => this.onInitiatePayment()}
                                                >
                                                    <Text>Submit</Text>
                                                </Button>
                                                <Button
                                                    bordered
                                                    onPress={() => this.setState({isRenew: false})}
                                                >
                                                    <Text>Cancel</Text>
                                                </Button>
                                            </CardItem>
                                        </View>
                                    
                                    </View>
                            
                                }
                                
                            </Overlay>
                            
                            {/* Confirm Payment */}
                            <Overlay
                                isVisible={this.state.isConfirm}
                                onBackdropPress={() => this.setState({
                                    isConfirm: false,
                                    isInitiated: false
                                })}
                            >
                                    <View>
                                        <CardItem>
                                            <H3>Confirm Payment to Renew Account</H3>
                                        </CardItem>
                                        <Input
                                            placeholder='Invoice ID'
                                            containerStyle={styles.input}
                                            onChangeText={(text) => this.setState({invoice: text})}
                                            value={this.state.invoice}
                                        />
                                        <CardItem style={{justifyContent: 'space-between'}}>
                                            <Button
                                                success
                                                onPress={() => this.onConfirmPayment()}
                                            >
                                                <Text>Submit</Text>
                                            </Button>
                                            <Button
                                                bordered info
                                                onPress={() => this.setState({isConfirm: false})}
                                            >
                                                <Text>Cancel</Text>
                                            </Button>
                                        </CardItem>
                                    </View>
                            </Overlay>
                            
                        </View>
                    </View>
                    
                </ScrollView>
            </View>
        )
    }

    componentDidMount() {
    
    }
    onSelectPackage =() => {
        try{
            if(GLOBAL.selectedPack == GLOBAL.pack){
                this.props.navigation.navigate('Payment');
            }else {
                Alert.alert(
                    'Change Package',
                    'Do you want to change your current package?',
                    [
                        
                        {text: 'Yes', onPress: () => {
                            this.props.navigation.navigate('Payment');
                        }},
                        {text: 'No', style: 'cancel'}
                    ]
                )
            }
        }catch(e){
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
        
    }
    onChangePackage = () => {
        this.props.navigation.push('Packages');
    }
    async onInitiatePayment(){
        try{
            var data = new FormData();
            data.append('mob-initiate-payment', '_-_');
            data.append('phone', GLOBAL.user['phone']);
            data.append('email', GLOBAL.user['Email']);
            data.append('wallet', this.state.momo);
            data.append('network', this.state.network);
            data.append('usnm', GLOBAL.user['UserId']);
            data.append('pack', GLOBAL.user['Plan Name']);
            data.append('voucher', '');
            data.append('amount', GLOBAL.selectedPack['Pack_Cost']);
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
            
            if(content[0] == 'success'){
                GLOBAL.invoice = content[1] + '';
                // Local invoice store
                await AsyncStorage.setItem('invoice-store', GLOBAL.invoice);
                await AsyncStorage.setItem('selected-pack-store', GLOBAL.user['Plan Name']);
                this.setState({
                    isInitiated: true,
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
                    this.setState({
                        header: instruction_header,
                        instructions: instructions
                    })
                }else{
                    this.setState({
                        instruction: 'instruction'
                    })
                }
            }else{
                ToastAndroid.show(content, ToastAndroid.LONG);
            }
        }catch(e){
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }
    // Confirm Payment
    async onConfirmPayment(){
        try{
            var data = new FormData();
            if(this.state.invoice.trim() == ''){
                ToastAndroid.show('Please provide invoice ID', ToastAndroid.LONG);
            }else{
                data.append('mob-confirm-payment', '_-_');
                data.append('invoice', GLOBAL.invoice);
                data.append('pack', GLOBAL.selectedPack['Plan_name']);
                data.append('usnm', GLOBAL.user['UserId']);

                var response = await fetch('http://192.168.47.1/dashboard/mobiles/mob_checkout.php', {
                // var response = await fetch('https://coli.com.gh/dashboard/mobiles/mob_checkout.php', {
                    method: 'POST',
                    body: data,
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }  
                });
            
                var content = await response.text();
                if(content.includes('awaiting')){
                    ToastAndroid.show('Awaiting payment. Make payment from mobile money wallet.', ToastAndroid.LONG);
                }
                else if(content.includes('renewed')){
                    this.setState({
                        isPaid: true
                    });
                    ToastAndroid.show('Account Renewed', ToastAndroid.LONG);
                    await AsyncStorage.removeItem('invoice-store');
                }else{
                    ToastAndroid.show('Request failed. Please try again', ToastAndroid.LONG);
                }
            }
        }catch(e){
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }
    static navigationOptions = ({navigation}) => ({
        headerTitle: '',
        // drawerIcon: () => <Icon type="feather" name='package' size={20} />,
        headerTransparent: true,
        headerLeft: 
            <View style={{marginHorizontal: 10}}>
                <Icon type="Feather" name="chevron-left" style={{margin: 10, color: 'white'}} onPress={() => navigation.goBack()} />
            </View>,
        // headerStyle: {
        //     backgroundColor: 'transparent'//'#0288D1'
        // },
        headerTitleStyle: { 
            color: '#fff',
        }
    })
}

const styles = StyleSheet.create({
    input: {

    }
})