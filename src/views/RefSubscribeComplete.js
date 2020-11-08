import React from 'react';
import {StyleSheet, ToastAndroid, ScrollView, SafeAreaView, ImageBackground} from 'react-native';
import {Icon} from 'react-native-elements';
import {Text, H1, View, Button} from 'native-base';

import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// GLOBAL
GLOBAL = require('../../global');
// Screen Height and Width
const {height, width} = Dimensions.get('screen');


export default class RefSubscribeComplete extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: GLOBAL.subusername,
            wallet: '',
            isPay: false,
            voucher: '',
            network: ''
        }
    }
    
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ImageBackground
                    source={require('../media/images/new_blue_bg.jpg')}
                    style={{flex: 1, paddingTop: 10}}
                >
                    <View>
                        <View style={{alignItems: 'center'}}>
                            <Icon
                                size={40}
                                name={'checkcircleo'}
                                type={'antdesign'}
                                color={'rgba(66, 165, 245,1.0)'}
                            />
                            <H1 style={{flexWrap: 'wrap', textAlign: 'center', color: '#fff', margin: 10, fontWeight: 'bold'}}>REQUEST SUBMITTED</H1>

                            <Text style={{color: 'rgba(227, 242, 253,1.0)', textAlign: 'center', marginHorizontal: 40}}>You will receive a confirmation email and SMS.</Text>
                        </View>
                        
                        <View>
                            <Button
                                bordered light
                                iconLeft
                                style={{borderRadius: 20, justifyContent: 'center', marginHorizontal: 70}}
                                onPress={() => this.props.navigation.navigate('Auth')}
                            >
                                <Icon name="corner-down-left" type="feather" color="white"/>
                                <Text>Back to Login</Text>
                            </Button>
                        </View>
                        
                    </View>
                    
                    <View
                        style={{flex: 1, paddingBottom: 0, paddingLeft: 0, paddingTop: 0, marginTop: -30}}
                    >
                        <Svg width={width} height={90}
                            style={{marginTop: 20}}
                        >
                            <Path
                                d="M10 100 Q 90 30, 190 80 T 420 80"
                                fill='none'
                                stroke='white'
                                strokeWidth={70}
                            />
                        </Svg>
                        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                            {/* <View>
                                <ListItem
                                    title="You can make payment right away. Fill in the form and submit!"
                                    containerStyle={{marginHorizontal: 20, backgroundColor: 'rgba(232, 245, 233, 0.5)'}}
                                    topDivider bottomDivider
                                    leftIcon={<Icon name="wallet" type="entypo" size={40} color="rgba(102, 187, 106,1.0)" />}
                                    rightElement={
                                        <Switch
                                            onValueChange= {this.togglePay}
                                            value={this.state.isPay}
                                        />
                                    }
                                />
                                <View>
                                    {
                                        this.state.isPay ? 
                                        <CardItem style={{marginHorizontal: 20, elevation: 2, flexDirection: 'column'}}>
                                            <Input 
                                                placeholder='Username'
                                                onChangeText={(txt) => this.onChangeText(txt, 'username')}
                                                value={this.state.username}
                                            />
                                            <Input 
                                                placeholder='Mobile Wallet Number'
                                                onChangeText={(txt) => this.setState({wallet: text})}
                                                keyboardType='numeric'
                                                value={this.state.wallet}
                                            />
                                            <Input 
                                                placeholder='Voucher Code (Vodafone only)'
                                                onChangeText={(txt) => this.setState({voucher: text})}
                                                keyboardType='numeric'
                                                value={this.state.voucher}
                                            />

                                        <CardItem style={{flexWrap: 'wrap'}}>
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
                                            
                                        </CardItem>
                                            <Button
                                                info iconLeft
                                                style={{borderRadius: 20, justifyContent: 'center', margin: 10}}
                                                onPress={() => this.onSubmitPay()}
                                            >
                                                <Text>Submit</Text>
                                            </Button>
                                        </CardItem>
                                        :
                                        null
                                    }
                                    
                                </View>

                            </View>
                         */}
                        </ScrollView>
                    
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
    
    togglePay = (value) => {
        this.setState({isPay: value})
    }
    async onSubmitPay(){
        try{
            const {username, wallet, voucher, network} = this.state;
            if(username.trim() ===''){
                ToastAndroid.show('Please provide username', ToastAndroid.LONG);
            }else if(wallet.trim() === ''){
                ToastAndroid.show('Please provide Mobile wallet number', ToastAndroid.LONG);
            }else if(network.trim() === ''){
                ToastAndroid.show('Please provide Mobile wallet number', ToastAndroid.LONG);
            }else{
                var data = new FormData();
                data.append('usnm', username);
                data.append('wallet', wallet);
                data.append('voucher', voucher);
                data.append('network', network);
                data.append('phone', GLOBAL.subphone);
                data.append('ref-subscriber-pay', '_-_');

            }
            
        }catch(e){

        }
    }
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Completed',
        // headerTransparent: true,
        headerLeft: 
            <View style={{marginHorizontal: 10}}>
                <Icon type="Feather" name="chevron-left" style={{margin: 10}} onPress={() => navigation.goBack()} />
            </View>,
        // headerTitleStyle: { ...defaultStyles.white_shadow }
    
    })
}

