import React from 'react';
import { StyleSheet, TouchableNativeFeedback, ScrollView, Dimensions, Animated } from 'react-native';
import { CardItem, H3, Text, Button, View, Icon as NIcon, H1 } from 'native-base';
import { Icon, Avatar, ListItem, Divider } from 'react-native-elements';

import defaultStyles from '../../styles';

import AsyncStorage from '@react-native-community/async-storage';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { RNToasty } from 'react-native-toasty';
import { observer, inject } from 'mobx-react';
import { LineChart } from 'react-native-chart-kit';
import { FAB } from 'react-native-paper';

const { width } = Dimensions.get('screen');

// GLOBAL
var GLOBAL = require('../../global');

const packageNames = ['Regular', 'Basic', 'Standard', 'Business', 'Office', 'CoLiPlus'];

@inject('globalProps')
@observer
export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fabOpen: false
        }
        this.lineData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    data: [40, 30, 55, 20, 61, 43],
                    strokeWidth: 2
                }
            ]
        }
    }

    render() {
        const { fabOpen } = this.state;
        return (

            <View style={{ flex: 1, backgroundColor: 'rgba(242, 245, 247,1.0)', paddingBottom: 10 }}>
                <ScrollView>
                    <CardItem style={{ justifyContent: 'center' }}>
                        <H1>₵2,100</H1>
                    </CardItem>
                    <CardItem style={{ justifyContent: 'center' }}>
                        <LineChart
                            data={this.lineData}
                            width={width * 0.95} height={260}
                            yAxisLabel={'₵'}
                            chartConfig={{
                                backgroundColor: 'red',
                                backgroundGradientFrom: 'white',
                                // backgroundGradientTo: 'black',
                                fillShadowGradient: 'white',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </CardItem>

                    <CardItem style={{ marginTop: 20 }}>
                        <H3>Status</H3>
                    </CardItem>

                    <ListItem
                        title={'WALLET'}
                        subtitle={'Available Balance'}
                        titleStyle={{ color: 'grey', fontSize: 14 }}
                        rightTitle={
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'grey' }}>₵20,680</Text>
                                <Divider />
                            </View>
                        }
                        subtitleStyle={{ fontWeight: 'bold', fontSize: 18, color: '#282a2b' }}
                        bottomDivider
                        leftAvatar={{
                            icon: { name: 'sack', type: 'material-community' },
                            overlayContainerStyle: { backgroundColor: '#4CAF50' }
                        }}

                    />
                    <ListItem
                        title={'PURCHASED'}
                        subtitle={'Data Sold'}
                        titleStyle={{ color: 'grey', fontSize: 14 }}
                        rightTitle={
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'grey' }}>₵500</Text>
                                <Divider />
                            </View>
                        }
                        subtitleStyle={{ fontWeight: 'bold', fontSize: 18, color: '#282a2b' }}
                        rightTitleStyle={{ fontWeight: 'bold', fontSize: 18 }}
                        bottomDivider
                        leftAvatar={{
                            icon: { name: 'area-graph', type: 'entypo' },
                            overlayContainerStyle: { backgroundColor: '#1565C0' }
                        }}
                        onPress={() => this.props.navigation.navigate('SalesReport')}
                    />
                    <ListItem
                        title={'INSTALLATION'}
                        subtitle={'Total Installations'}
                        titleStyle={{ color: 'grey' }}
                        rightTitle={
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'grey' }}>₵4,680</Text>
                                <Divider />
                            </View>
                        }
                        subtitleStyle={{ fontWeight: 'bold', fontSize: 18, color: '#282a2b' }}
                        rightTitleStyle={{ fontWeight: 'bold', fontSize: 18 }}
                        bottomDivider
                        leftAvatar={{
                            icon: { name: 'wallet', type: 'entypo' },
                            overlayContainerStyle: { backgroundColor: '#D50000' }
                        }}

                    />
                </ScrollView>

                <FAB.Group
                    open={fabOpen}
                    icon={fabOpen ? 'close' : 'star'}
                    color={'#4CAF50'}
                    fabStyle={{ backgroundColor: 'white' }}
                    actions={[
                        { icon: 'plus', color: '#338fa3', label: 'Add New', onPress: () => { this.props.navigation.navigate('Register') } }
                    ]}
                    onStateChange={this.fabStateChanged.bind(this)}
                />
            </View>
        )
    }
    componentDidMount() {

    }

    fabStateChanged = ({ open }) => this.setState({ fabOpen: open })

    static navigationOptions = () => ({
        tabBarLabel: 'Home',
        headerLeft: null,
    })
}

const styles = StyleSheet.create({
    balance_pad: {
        flexDirection: 'column',
        // paddingTop: 2,
        // paddingBottom: 2,
        // paddingLeft: 2,
        // paddingRight: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        elevation: 2
    }
})
