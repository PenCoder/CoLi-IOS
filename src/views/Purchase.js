import React from 'react';
import { View, StyleSheet, ToastAndroid, Dimensions, FlatList } from 'react-native';
import { Text, CardItem, H1 } from 'native-base';
import { Icon, ListItem } from 'react-native-elements';


const { width } = Dimensions.get('screen');

// const packageNames = ['Home', 'Regular', 'Basic', 'Standard', 'Business', 'Office', 'CoLiPlus'];
const packageNames = ['CoLi Plus Mini', 'CoLi Value', 'CoLiPlus', 'CoLi Extra', 'CoLi Office'];

export default class Purchase extends React.Component {
    constructor(props) {
        super(props);

        // this.fetchPackages.bind(this);
        this.state = {
            packs: []
        }
    }


    render() {
        const { packs } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(245, 245, 245,1.0)' }}>
                <CardItem style={{ width: width, }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="opencart" type="font-awesome" color="#0288D1" raised />
                        <H1 style={{ color: '#0288D1' }}>Purchase</H1>
                    </View>
                </CardItem>

                <View style={{ flex: 1 }}>

                    <View style={{ backgroundColor: 'rgba(236, 239, 241,1.0)', borderRadius: 20, flex: 1, padding: 10 }}>

                        <ListItem
                            title={'Package'}
                            subtitle={
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="package" type="feather" color="#bfbfbf" />
                                    <Text note style={{ marginLeft: 5 }}>Unlimited fixed internet packages.</Text>
                                </View>
                            }
                            titleStyle={{ fontSize: 24, color: '#0288D1', fontWeight: 'bold' }}
                            subtitleStyle={{ fontSize: 14 }}
                            rightIcon={{ name: 'chevron-right', type: 'font-awesome', size: 14, color: '#bfbfbf' }}
                            containerStyle={{ borderRadius: 5, margin: 5 }}
                            leftElement={
                                <View style={{ width: 5, height: '100%', backgroundColor: 'rgba(98, 135, 181, 1)' }}></View>
                            }
                            onPress={this.checkPackages.bind(this)}
                        />
                        <ListItem
                            title={'Top Up'}
                            subtitle={
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="sack" type="material-community" color="#bfbfbf" />
                                    <Text note style={{ marginLeft: 5 }}>Top up you account balance.</Text>
                                </View>
                            }
                            titleStyle={{ fontSize: 24, color: '#0288D1', fontWeight: 'bold' }}
                            subtitleStyle={{ fontSize: 14 }}
                            rightIcon={{ name: 'chevron-right', type: 'font-awesome', size: 14, color: '#bfbfbf' }}
                            containerStyle={{ borderRadius: 5, margin: 5 }}
                            leftElement={
                                <View style={{ width: 5, height: '100%', backgroundColor: 'rgba(98, 135, 181, 1)' }}></View>
                            }
                            onPress={() => this.props.navigation.navigate('TopUp')}
                        />
                    </View>
                </View>
            </View>
        )
    }
    // View Selected Package Details
    checkPackages() {
        this.props.navigation.push('Packages');
    }
    static navigationOptions = () => ({
        headerTitle: '',
        drawerIcon: () => <Icon type="feather" name='package' size={20} />,
        tabBarIcon: ({ tintColor }) => <Icon type="font-awesome" name='opencart' size={30} color={tintColor} />,
        headerTransparent: true,
        headerTitleStyle: {
            ...styles.white_shadow
            // color: '#fff',
        }

    })
}

const styles = StyleSheet.create({
    pads: {
        margin: 5,
        borderRadius: 10,
        borderWidth: 0.7
    },
    white_shadow: {
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 10,
        fontSize: 16
    }
})