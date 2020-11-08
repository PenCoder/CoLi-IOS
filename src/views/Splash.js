import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { H1, CardItem, View, H3, Text } from 'native-base';


import * as Animatable from 'react-native-animatable';

// GLOBAL
GLOBAL = require('../../global');

export default class Splash extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('WelcomeStack');
        }, 1000);
    }
    zoomInBG = {
        0: {
            scale: 0.1,
            transform: [
                { translate: [0, 2, -2] }
            ]
        },
        0.5: {
            scale: 0.5,
            transform: [
                { translate: [0, 1, -1] }
            ]
        },
        1: {
            scale: 1,
            transform: [
                { translate: [0, 0, -0] }
            ]
        }
    }
    render() {
        return (
            <View
                style={{ flex: 1, backgroundColor: '#275970' }}
            >
                {/* <Animatable.Image
                    style={{ position: 'absolute', resizeMode: 'contain' }}
                    source={require('../media/images/new_blue_bg.jpg')}
                /> */}
                <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(39, 89, 112,0.5)' }}>
                    <View style={{ flex: 1 }}>
                        <Animatable.View animation={'fadeIn'} duration={1000} style={{ flex: 1, justifyContent: 'center' }}>
                            <CardItem style={{ backgroundColor: 'transparent', elevation: 10, borderRadius: 10 }}>
                                <Text style={{ color: '#1565C0', fontSize: 70, fontWeight: 'bold' }}>C</Text>
                                <Text style={{ color: '#4CAF50', fontSize: 70, fontWeight: 'bold' }}>o</Text>
                                <Text style={{ color: '#FFC107', fontSize: 70, fontWeight: 'bold' }}>L</Text>
                                <Text style={{ color: '#D50000', fontSize: 70, fontWeight: 'bold' }}>i</Text>
                            </CardItem>
                        </Animatable.View>
                    </View>
                    <CardItem style={{ backgroundColor: 'transparent' }}>
                        <H3 style={{ color: 'white', fontWeight: 'bold' }}>Data is yours</H3>
                    </CardItem>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    zoomInBG: {
        transform: [
            { translateX: 20 },
            { skewX: '45deg' }
        ]
    }
})
