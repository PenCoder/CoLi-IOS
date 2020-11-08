import React from 'react';
import { StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { Card, CardItem, H2, Text, H3, H1, View } from 'native-base';
import { Icon, Avatar, ListItem } from 'react-native-elements';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { createStackNavigator } from 'react-navigation-stack';

import { PieChart } from 'react-native-chart-kit';

import defaultStyles from '../../styles';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

const { width } = Dimensions.get('screen');

@inject('globalProps')
@observer
export default class Stats extends React.Component {
    constructor(props) {
        super(props);
        // Set Global Props 

    }

    render() {
        this.GlobalProps = this.props.globalProps;

        this.user = this.GlobalProps.user;
        this.data = this.GlobalProps.data;

        const { main } = toJS(this.props.globalProps);
        return (
            <View style={{ ...defaultStyles.full, backgroundColor: 'rgba(236, 239, 241,1.0)' }}>

                <View
                    style={{ width: width, alignSelf: 'center' }}
                >
                </View>
                <ScrollView
                    style={{ flex: 1, marginTop: 50 }}
                >
                    <View style={{ flex: 1, margin: 10 }}>
                        <View style={{ flexDirection: 'column', marginVertical: 10 }}>
                            <CardItem >
                                <Text note style={{ fontWeight: 'bold' }}>My Plan:</Text>
                            </CardItem>
                            <CardItem bordered >
                                <H2 style={{ color: '#2b6c9e', fontWeight: 'bold' }}>{this.GlobalProps.user['Plan Name']} ({this.GlobalProps.pack['Data_Transfer'] == 'N/A' ? 'UNLIMITED' : this.GlobalProps.pack['Data_Transfer']})</H2>
                            </CardItem>
                            <CardItem style={{ justifyContent: 'space-between' }}>

                                <AnimatedCircularProgress
                                    size={150}
                                    width={10}
                                    backgroundWidth={20}
                                    fill={this.GlobalProps.percentage}
                                    tintColor="#63c9b1"
                                    delay={0}
                                    backgroundColor="#ddd"
                                >
                                    {
                                        (fill) => (
                                            <>
                                                <Text>{main === 'UNLIMITED' ? main : main + 'GB'}</Text>
                                                <Text note style={{ color: 'green' }}>({this.GlobalProps.percentage}%)</Text>
                                                <Text note style={{ textAlign: 'center' }}>actual data.</Text>
                                            </>
                                        )
                                    }
                                </AnimatedCircularProgress>

                                <AnimatedCircularProgress
                                    size={150}
                                    width={10}
                                    backgroundWidth={20}
                                    fill={this.GlobalProps.days_percent}
                                    tintColor="#2b6c9e"
                                    delay={0}
                                    backgroundColor="#ddd"
                                >
                                    {
                                        (fill) => (
                                            <>
                                                <H2>{this.GlobalProps.days} Days</H2>
                                                <Text note style={{ color: '#2b6c9e' }}>({this.GlobalProps.days_percent}%)</Text>
                                                <Text note style={{ textAlign: 'center' }}>days left.</Text>
                                            </>
                                        )
                                    }
                                </AnimatedCircularProgress>


                            </CardItem>
                            <CardItem cardBody style={{ justifyContent: 'space-between' }}>
                                <View style={[styles.container, styles.w_50]}>
                                    <ListItem
                                        title={<H2>{this.data}</H2>}
                                        subtitle={<Text note>Data Remaining</Text>}
                                    />
                                </View>
                                <View style={styles.w_1} />
                                <View style={[styles.container, styles.w_50]}>
                                    <ListItem
                                        title={<H2>{this.GlobalProps.days} days</H2>}
                                        subtitle={<Text note>Remaining</Text>}
                                    />
                                </View>
                            </CardItem>
                        </View>
                        <CardItem bordered cardBody style={{ justifyContent: 'space-between' }}>
                            <View style={[styles.container, styles.w_50]}>
                                <ListItem
                                    title={main === 'UNLIMITED' ? main : main + 'GB'}
                                    subtitle="main data"
                                    // leftIcon={{name: 'package', type: 'feather', color: 'rgba(139,195,74,1.0)'}}
                                    leftAvatar={{
                                        icon: { name: 'package', type: 'feather' },
                                        overlayContainerStyle: { backgroundColor: '#63c9b1' }
                                    }}
                                />
                            </View>
                            <View style={styles.w_1} />
                            <View style={[styles.container, styles.w_50]}>
                                <ListItem
                                    title="Last Renewal"
                                    subtitle={this.user['Regdate']}
                                    leftAvatar={{
                                        icon: { name: 'ios-calendar', type: 'ionicon' },
                                        overlayContainerStyle: { backgroundColor: '#2b6c9e' }
                                    }}
                                />
                            </View>
                        </CardItem>

                        <CardItem bordered cardBody style={{ justifyContent: 'space-between' }}>
                            <View style={[styles.container, styles.w_50]}>
                                <ListItem
                                    title={this.GlobalProps.outstanding}
                                    subtitle="outstanding data"
                                    // leftIcon={{name: 'package', type: 'feather', color: '#63c9b1' raised: true}}
                                    leftAvatar={{
                                        icon: { name: 'package', type: 'feather' },
                                        overlayContainerStyle: { backgroundColor: '#63c9b1' }
                                    }}
                                />
                            </View>
                            <View style={styles.w_1} />
                            <View style={[styles.container, styles.w_50]}>
                                <ListItem
                                    title="Due Date"
                                    subtitle={this.user['Expiry Date']}
                                    leftAvatar={{
                                        icon: { name: 'ios-calendar', type: 'ionicon' },
                                        overlayContainerStyle: { backgroundColor: '#2b6c9e' }
                                    }}
                                />
                            </View>
                        </CardItem>
                    </View>

                </ScrollView>
            </View>
        )
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'My Data Stats',
        // drawerIcon: () => <Icon type="feather" name='package' size={20} />,
        headerTransparent: true,
        headerLeft: <Icon type="feather" name="arrow-left" raised color="#1565C0" onPress={() => navigation.goBack()} />,
        headerTitleStyle: {
            color: '#1565C0'
        }
    })
}
const styles = StyleSheet.create({
    bg_main: {
        backgroundColor: '#D3DFDD'
    },
    container_1: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        margin: 1
    },
    w_50: {
        width: "47%"
    },
    b_right: {
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
    w_1: {
        borderRightWidth: 1,
        borderColor: '#c1c1c1',
        height: '70%',
        marginHorizontal: 5
    }
})