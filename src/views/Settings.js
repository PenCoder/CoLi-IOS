import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, CardItem, H1, Button } from 'native-base';
import { Icon, ListItem, Avatar, Divider } from 'react-native-elements';
import codePush from 'react-native-code-push';

const { width } = Dimensions.get('screen');

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(245, 245, 245,1.0)' }}>
                <CardItem style={{ width: width, }}
                >
                    <View style={{ marginBottom: 10, }}>
                        <H1 style={{ color: '#0288D1' }}>Settings</H1>
                    </View>
                </CardItem>
                <View
                    style={{ width: width }}
                >
                </View>
                <ScrollView>

                    <Divider style={{ flex: 1, marginLeft: 60 }} />
                    <ListItem
                        title='My Profile'
                        subtitle='Main Account Details'
                        titleStyle={{ fontSize: 20, color: 'rgba(98, 135, 181, 1)', fontWeight: 'bold' }}
                        bottomDivider
                        leftIcon={{ name: 'user', type: 'font-awesome', color: 'rgba(98, 135, 181, 1)', raised: true }}
                        rightIcon={{ name: 'chevron-right', type: 'font-awesome', size: 14, color: 'grey' }}
                        onPress={() => this.props.navigation.navigate('Profile')}
                    />
                    <Divider style={{ flex: 1 }} />
                    <ListItem
                        title='Manage Accounts'
                        subtitle='Manage other user accounts'
                        titleStyle={{ fontSize: 20, color: 'rgba(98, 135, 181, 1)', fontWeight: 'bold' }}
                        bottomDivider
                        leftIcon={{ name: 'users', type: 'font-awesome', color: 'rgba(98, 135, 181, 1)', raised: true }}
                        rightIcon={{ name: 'chevron-right', type: 'font-awesome', size: 14, color: 'grey' }}
                        onPress={() => this.props.navigation.navigate('ManageAccounts')}
                    />

                    <CardItem style={{ marginTop: 20, alignSelf: 'center', flexDirection: 'column' }}>
                        <View style={{ width: width, paddingHorizontal: 20 }}>
                            <Button
                                info small rounded iconLeft block
                                leftAvatar={{
                                    icon: { name: 'update', type: 'material' },
                                }}
                                onPress={() => this._checkUpdate()}
                            >
                                <Text>Check for Updates</Text>
                            </Button>
                        </View>
                    </CardItem>
                </ScrollView>
            </View>
        )
    }

    // Check Updates
    _checkUpdate() {
        codePush.sync({
            updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE
        })
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Settings',
        drawerIcon: () => <Icon type="antdesign" name='setting' size={25} />,
        tabBarIcon: ({ tintColor }) => <Icon type="antdesign" name='setting' size={30} color={tintColor} />,
        headerTransparent: true,
        headerLeft:
            <View style={{ marginHorizontal: 10 }}>
                <Icon type="feather" name="chevron-left" color='white' style={{ margin: 10 }} onPress={() => navigation.goBack()} />
            </View>,
        // headerTitleStyle: { ...defaultStyles.white_shadow }

    })
}
