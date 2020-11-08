import React from 'react';
import {View, StyleSheet, SafeAreaView, ImageBackground} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {Text, CardItem, H1} from 'native-base';

import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// GLOBAL
GLOBAL = require('../../global');
// Screen Height and Width
const {height, width} = Dimensions.get('screen');


export default class RefCompleted extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
        }
    }
    
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ImageBackground
                    source={require('../media/images/new_blue_bg.jpg')}
                    style={{flex: 1, paddingTop: 50}}
                >
                    <View>
                    <View style={{alignItems: 'center'}}>
                        <Icon
                            size={40}
                            name={'checkcircleo'}
                            type={'antdesign'}
                            color={'rgba(66, 165, 245,1.0)'}
                        />
                        <H1 style={{flexWrap: 'wrap', textAlign: 'center', color: '#fff', margin: 20, fontWeight: 'bold'}}>REQUEST SUBMITTED</H1>

                        <Text style={{color: 'rgba(227, 242, 253,1.0)', textAlign: 'center', marginHorizontal: 40}}>You will receive a confirmation email once request is approved.</Text>
                    </View>
                    
                    <View style={{...styles.buttonContainer}}>
                            <Button 
                                title='BACK TO LOGIN'
                                type='outline'
                                icon={{name: 'corner-down-left', type: 'feather'}}
                                buttonStyle={styles.button}
                                
                                onPress={() => this.props.navigation.navigate('Auth')}
                            >
                                <Text>Back to Login</Text>
                            </Button>
                        </View>
                    </View>
                    
                    <View
                        style={{flex: 1, paddingBottom: 0, paddingLeft: 0, paddingTop: 0}}
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
                        <CardItem style={{flex: 1}}>

                        </CardItem>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
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
        margin: 5,
        elevation: 5, 
        backgroundColor: 'white'
    },
    buttonContainer: {
        marginHorizontal: 20, 
        marginTop: 30
    },
    button: {
        // backgroundColor: '#03A9F4',
        justifyContent: 'center',
        borderRadius: 30,
        marginHorizontal: 5
    },
    elevate: {
        width: '90%',
        margin: 20,
        alignItems: 'center',
    },
    card: {
        // marginHorizontal: 20, 
        borderRadius: 50, 
        backgroundColor: 'white',
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