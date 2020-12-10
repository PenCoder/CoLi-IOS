import React from 'react';
import { ScrollView, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Text, CardItem, H1, H3, Button, View } from 'native-base';
import { Avatar, Icon } from 'react-native-elements';

// Default Styles
import defaultStyles from '../../styles';
import Moment from 'react-moment';
import { inject, observer } from 'mobx-react';
// GLOBAL
GLOBAL = require('../../global');

const { width } = Dimensions.get('screen');

@inject('globalProps')
@observer
export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        this.GlobalProps = this.props.globalProps;

        const { user } = this.GlobalProps;
        const due_date = user['Due Date'].split(' ');
        const reg_date = user['Regdate'].split(' ');
        return (
            <View style={{ ...defaultStyles.full, backgroundColor: 'rgba(236, 239, 241,1.0)', paddingTop: 70 }}>

                <ScrollView
                    contentContainerStyle={{ flexDirection: 'row' }}
                    style={{ paddingHorizontal: 10 }}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(236, 239, 241,1.0)' }}>
                        <CardItem style={{ flexDirection: 'column', marginVertical: 10 }}>
                            <CardItem bordered style={{ width: '100%' }}>
                                <Avatar
                                    rounded
                                    overlayContainerStyle={{ backgroundColor: '#66BB6A' }}
                                    icon={{ name: 'calendar', type: 'antdesign' }}
                                />
                                <H3> Last Renewal</H3>
                            </CardItem>
                            <CardItem bordered>
                                <Text note>Renewed On</Text>
                            </CardItem>
                            <CardItem bordered style={{ elevation: 5 }}>
                                <H1>{reg_date[0]}</H1>
                            </CardItem>

                            <Text note>at</Text>
                            <CardItem>
                                <H3>{reg_date[1] + reg_date[2]}</H3>
                            </CardItem>
                        </CardItem>

                        <CardItem style={{ flexDirection: 'column', marginVertical: 10 }}>
                            <CardItem bordered style={{ width: '100%' }}>
                                <Avatar
                                    rounded
                                    overlayContainerStyle={{ backgroundColor: 'rgba(21, 101, 192,1.0)' }}
                                    icon={{ name: 'calendar', type: 'antdesign' }}
                                />
                                <H3> Expiry</H3>
                            </CardItem>
                            <CardItem bordered>
                                <Text note>Expires on</Text>
                            </CardItem>
                            <CardItem bordered>
                                <H3>{due_date[0]}</H3>
                            </CardItem>
                            <CardItem bordered style={{ margin: 15, elevation: 5 }}>
                                <Moment fromNow element={H1} style={{ textTransform: 'uppercase' }}>
                                    {user['Expiry Date']}
                                </Moment>
                            </CardItem>
                        </CardItem>

                        <View style={{ flex: 1, justifyContent: 'flex-end', margin: 20 }}>
                            <Button rounded info block
                                onPress={() => this.props.navigation.navigate('Payment')}
                            >
                                <Text>Renew Package</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Timeline',
        headerTransparent: true,
        headerLeft: <Icon type="feather" name="arrow-left" raised color="#1565C0" onPress={() => navigation.goBack()} />,
        headerTitleStyle: {
            color: '#1565C0'
        }
    })
}

const styles = StyleSheet.create({
    pads: {
        margin: 5,
        borderRadius: 10,
        width: width * 0.8,
        elevation: 2
    }

})