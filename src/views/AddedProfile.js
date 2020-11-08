import React from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, Dimensions, Alert, ToastAndroid } from 'react-native';
import { Text, Card, CardItem, Thumbnail, H3, H2, H1, Button } from 'native-base';
import { Avatar, Icon, Badge, ListItem } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation-stack';

import Geolocation from '@react-native-community/geolocation';

import defaultStyles from '../../styles';
import { inject, observer } from 'mobx-react';

const { width } = Dimensions.get('screen');

@inject('globalProps')
@observer
export default class AddedProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coords: {
                lng: 0,
                lat: 0
            }
        }
    }
    render() {
        this.GlobalProps = this.props.globalProps;
        const { addedProfile } = this.GlobalProps;
        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(245, 245, 245,1.0)' }}>
                <CardItem style={{ width: width, }}
                >
                    <View style={{ marginBottom: 10, marginLeft: 30 }}>
                        <H1 style={{ color: '#0288D1' }}>Profile</H1>
                    </View>
                </CardItem>

                <ScrollView style={{ marginTop: 10 }}>
                    <ListItem style={{ margin: 20, /* backgroundColor: 'rgba(1, 87, 155,1.0)' */ borderRadius: 10 }}
                        title={<Text style={{ color: '#0288D1', fontSize: 24, }}>{addedProfile['Name']}</Text>}
                        leftAvatar={
                            <Avatar
                                rounded
                                size={'medium'}
                                icon={{ name: 'user', type: 'font-awesome' }}
                                overlayContainerStyle={{ backgroundColor: '#0288D1' }}
                            />
                        }
                    />
                    <View style={{ borderRadius: 20, paddingTop: 20, paddingHorizontal: 10, width: width }}>
                        <View>
                            <ListItem
                                title={addedProfile['UserId']}
                                underlayColor={'none'}
                                containerStyle={{ marginHorizontal: 10 }}
                                bottomDivider topDivider chevron
                                leftAvatar={{
                                    icon: { name: 'user', type: 'font-awesome' },
                                    overlayContainerStyle: { backgroundColor: '#0288D1' }
                                }}
                            />
                            <ListItem
                                title={'Package: ' + addedProfile['Plan Name']}
                                containerStyle={{ marginHorizontal: 10 }}
                                bottomDivider topDivider chevron
                                leftAvatar={{
                                    icon: { name: 'package', type: 'feather' },
                                    overlayContainerStyle: { backgroundColor: '#0288D1' }
                                }}
                                onPress={() => this.props.navigation.navigate('Package')}
                            />
                            <ListItem
                                title={'Address: ' + addedProfile['Address']}
                                containerStyle={{ marginHorizontal: 10 }}
                                bottomDivider topDivider chevron
                                leftAvatar={{
                                    icon: { name: 'map-pin', type: 'feather' },
                                    overlayContainerStyle: { backgroundColor: '#0288D1' }
                                }}
                                userForeground
                            />
                            <ListItem
                                title={addedProfile['phone']}
                                bottomDivider topDivider chevron
                                leftAvatar={{
                                    icon: { name: 'phone', type: 'font-awesome' },
                                    overlayContainerStyle: { backgroundColor: '#0288D1' }
                                }}
                                containerStyle={{ marginHorizontal: 10 }}
                                userForeground
                            />
                            <ListItem
                                title={addedProfile['Email']}
                                containerStyle={{ marginHorizontal: 10 }}
                                bottomDivider topDivider chevron
                                leftAvatar={{
                                    icon: { name: 'mail', type: 'feather' },
                                    overlayContainerStyle: { backgroundColor: '#0288D1' }
                                }}
                            />
                            <View style={{ margin: 10 }}>
                                <Button block warning style={{ elevation: 10 }}
                                    onPress={() => this.renewAccount()}
                                >
                                    <Text>Renew</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
    renewAccount = () => {
        this.GlobalProps.packs.map(plan => {
            if (
                plan['Plan_name'].toLowerCase() == this.GlobalProps.addedProfile['Plan Name'].toLowerCase()
            ) {
                this.GlobalProps.updateProp('selectedPack', plan);
            }
        });
        this.props.navigation.navigate('AddedRenew');
    }
}
const styles = StyleSheet.create({

});