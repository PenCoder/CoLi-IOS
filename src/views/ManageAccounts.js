import React from 'react';
import { View, StyleSheet, ToastAndroid, Dimensions, FlatList, Alert } from 'react-native';
import { Text, CardItem, H1, Button, Icon as NIcon, H3 } from 'native-base';
import { Icon, ListItem, Divider, Avatar } from 'react-native-elements';
import defaultStyles from '../../styles';
import { inject, observer } from 'mobx-react';
import AsyncStorage from '@react-native-community/async-storage';

const { width } = Dimensions.get('screen');

@inject('globalProps')
@observer
export default class ManageAccounts extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }
    render() {
        this.GlobalProps = this.props.globalProps;
        const { additionalUsers } = this.GlobalProps;

        // alert(JSON.stringify(this.GlobalProps.additionalUsers));

        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(245, 245, 245,1.0)' }}>
                <CardItem style={{ width: width, }}
                >
                    <View style={{ marginHorizontal: 30, }}>
                        <H1 style={{ color: '#0288D1' }}>Manage Accounts</H1>
                    </View>
                </CardItem>

                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: 'rgba(236, 239, 241,1.0)', borderRadius: 20, flex: 1 }}>
                        <CardItem >
                            <Divider style={{ flex: 1, marginHorizontal: 5 }} />
                            <Button icon small light
                                onPress={() => this.props.navigation.navigate('AddAccount')}
                            >
                                <NIcon name="plus" type="FontAwesome" style={{ color: 'green' }} />
                            </Button>
                        </CardItem>

                        <FlatList
                            contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}
                            style={{ padding: 10, flex: 1 }}
                            data={additionalUsers}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <ListItem
                                    title={item['Name']}
                                    // titleStyle={{ color: '#0288D1', fontWeight: 'bold' }}
                                    subtitle={
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon name="timer" type="material-community" color="#bfbfbf" />
                                            <Text note style={{ marginLeft: 5 }}>{item['Due Date']}</Text>
                                        </View>
                                    }
                                    titleStyle={{ fontSize: 18, color: '#0288D1', }}
                                    subtitleStyle={{ fontSize: 14, fontWeight: 'bold' }}
                                    bottomDivider
                                    underlayColor='transparent'
                                    containerStyle={{ borderRadius: 10, margin: 2 }}
                                    leftAvatar={
                                        <Avatar
                                            size={'medium'} rounded
                                            icon={{ name: 'user', type: 'font-awesome' }}
                                            overlayContainerStyle={{ backgroundColor: 'rgba(98, 135, 181, 1)' }}
                                        />
                                    }
                                    rightElement={
                                        <Button icon light small
                                            onPress={() => this.removeUser(item)}
                                        >
                                            <NIcon name="minus" type="FontAwesome" style={{ color: 'red' }} />
                                        </Button>
                                    }
                                    onPress={() => this.viewProfile(item)}
                                />
                            }
                            ListHeaderComponent={
                                <CardItem bordered style={{ elevation: 2 }}>
                                    <Icon name='users' type='font-awesome' color='#0288D1' size={28} raised />
                                    <View>
                                        <H3>List of Accounts</H3>
                                        <Divider style={{}} />
                                    </View>
                                </CardItem>
                            }
                            ListEmptyComponent={
                                <View
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Text note style={{ fontSize: 24 }}>No User Accounts Added</Text>
                                </View>
                            }
                        />
                    </View>

                </View>
            </View>
        )
    }
    // View Selected User Account 
    viewProfile = (user) => {
        this.GlobalProps.updateProp('addedProfile', user);
        this.props.navigation.navigate('AddedProfile');
    }

    removeUser = (userAccount) => {
        Alert.alert(
            'Remove Account',
            'You are about to remove account. Press confirm to continue or cancel',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: async () => {
                        var allAccounts = this.GlobalProps.additionalUsers.filter(account => account !== userAccount);
                        await AsyncStorage.setItem('additional-users', JSON.stringify(allAccounts));
                        this.GlobalProps.updateProp('additionalUsers', allAccounts);
                    }
                }
            ]
        )
    }
    static navigationOptions = () => ({
        headerTitle: '',
        drawerIcon: () => <Icon type="feather" name='package' size={20} />,
        tabBarIcon: ({ tintColor }) => <Icon type="feather" name='package' size={20} color={tintColor} />,
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