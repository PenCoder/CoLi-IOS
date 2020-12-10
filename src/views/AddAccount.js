import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { CardItem, H1, Text, Button, View } from 'native-base';
import { Icon, Avatar, Input, Divider, Overlay } from 'react-native-elements';

import defaultStyles from '../../styles';

import AsyncStorage from '@react-native-community/async-storage';
import { RNToasty } from 'react-native-toasty'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { observer, inject } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';

const { width } = Dimensions.get('screen');

@inject('globalProps')
@observer
export default class AddAccount extends React.Component {
    constructor(props) {
        super(props);
        // Set Global Props 
        this.GlobalProps = this.props.globalProps;
        // Get GLOBAL user
        this.user = this.GlobalProps.user;

        this.state = {
            username: '',
            pwd: '',
            isLoading: false
        }
    }

    render() {
        return (

            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Spinner
                    visible={this.state.isLoading}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                    cancelable={true}
                />

                <CardItem style={{ width: width, }}>
                    <View style={{ margin: 10, marginLeft: 30 }}>
                        <H1 style={{ color: '#0288D1' }}>Additional Accounts</H1>
                        <Text note>Provide user details for the additional accounts to be added.</Text>
                    </View>
                </CardItem>

                <View
                    style={{ margin: 10, alignItems: 'center' }}
                >
                    <Avatar
                        rounded
                        size={'large'}
                        icon={{ name: 'user', type: 'font-awesome' }}
                    />
                </View>

                <KeyboardAwareScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <CardItem style={defaultStyles.transparent}>
                            <Input
                                containerStyle={styles.input}
                                inputContainerStyle={styles.input_container}
                                placeholder={'Username'}
                                autoCompleteType={'name'}
                                value={this.state.username}
                                onChangeText={username => this.setState({ username })}
                            />
                        </CardItem>
                        <CardItem style={defaultStyles.transparent}>
                            <Input
                                containerStyle={styles.input}
                                inputContainerStyle={styles.input_container}
                                placeholder={'Password'}
                                autoCompleteType={'password'}
                                onChangeText={pwd => this.setState({ pwd })}
                            />
                        </CardItem>

                        <CardItem >
                            <Divider style={{ flex: 1, marginHorizontal: 5 }} />
                        </CardItem>
                        <CardItem style={defaultStyles.transparent}>
                            <View style={{ flex: 1, margin: 20 }}>
                                <Button info block rounded
                                    onPress={this.onSubmitDetails.bind(this)}>
                                    <Text>Submit</Text>
                                </Button>
                            </View>
                        </CardItem>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
    componentDidMount() {

    }
    onSubmitDetails = async () => {
        const { username, pwd } = this.state;
        var addedUsers = this.GlobalProps.additionalUsers;

        if (addedUsers.find(u => u.UserId.toLowerCase() === username.toLowerCase())) {
            RNToasty.Info({
                title: 'User already exists.',
                fontFamily: 'Roboto',
                position: 'bottom'
            });
            return;
        }
        if (username.trim() == '') {
            RNToasty.Info({
                title: 'Please provide username',
                fontFamily: 'Roboto',
                position: 'bottom'
            });
        }
        else if (pwd.trim() == '') {
            RNToasty.Info({
                title: 'Please provide password',
                fontFamily: 'Roboto',
                position: 'bottom'
            });
        }
        else if (this.user['UserId'].toLowerCase() === username.toLowerCase()) {
            RNToasty.Info({
                title: 'User already exists.',
                fontFamily: 'Roboto',
                position: 'bottom'
            });
        }
        else {
            this.setState({ isLoading: true })
            try {
                var response = await fetch('http://api.coliserver.com/pmsapi.php?op=userinfo&Uid=' + username);
                var json = await response.json();
                // Check if User Exists
                if (json && json.length > 0) {
                    if (typeof (json[0]['UserId']) !== 'undefined') {
                        var user = json[0];
                        if (user['Password'] === pwd) {
                            // Get New Index 
                            var index = this.GlobalProps.additionalUsers.length;
                            var addedUsers = this.GlobalProps.additionalUsers;
                            addedUsers[index] = user;
                            await AsyncStorage.setItem('additional-users', JSON.stringify(addedUsers));
                            this.GlobalProps.updateProp('additionalUsers', addedUsers);

                            // Go Back To Managed Accounts 
                            this.props.navigation.navigate('ManageAccounts');
                        } else {
                            RNToasty.Show({
                                title: 'Username or password invalid',
                                fontFamily: 'Roboto',
                                position: 'bottom'
                            });
                        }
                    } else {
                        RNToasty.Show({
                            title: 'Username or password invalid.',
                            fontFamily: 'Roboto',
                            position: 'bottom'
                        });
                    }
                } else {
                    RNToasty.Show({
                        title: 'Username or password invalid.',
                        fontFamily: 'Roboto',
                        position: 'bottom'
                    });
                }
            } catch (e) {
                alert(e.message)
                RNToasty.Warn({
                    title: e.message,
                    fontFamily: 'Roboto',
                    position: 'bottom'
                });
            } finally {
                this.setState({ isLoading: false })
            }
        }
    }

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
    horizontal_pad: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    input: {
        borderRadius: 30,
        paddingBottom: 5,
        alignSelf: 'center'
    },
    input_container: {
        borderRadius: 30,
        backgroundColor: 'rgba(236, 239, 241,1.0)',
        borderBottomWidth: 0,
        paddingHorizontal: 15
    },
    input_rnd: {
        borderBottomColor: 'rgba(200, 200, 200, 1)',
        borderRadius: 25,
        elevation: 1,
        paddingHorizontal: 15
    },
    spaced: {
        justifyContent: 'space-between'
    },
    item: {
        ...defaultStyles.transparent,
        width: 150
    },
    m_20Right: {
        marginRight: 5,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    m_20Left: {
        margin: 0,
        borderRadius: 20,
        borderRadius: 5,
        backgroundColor: 'white',
        width: 120,
        alignItems: 'center'
    },
    trans_green: {
        // backgroundColor: 'rgba(76,175,80,0.5)'
    },
    trans_blue: {
    },
    trans_violet: {
        backgroundColor: 'rgba(94,53,177 ,0.5)'
    },
    float: {
        width: '100%',
        alignSelf: 'center'
    },
    behind: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute'
    },
    front: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute'
    },
    card: {
        // marginHorizontal: 20, 
        borderRadius: 20,
        flex: 1
    },
    float: {
        width: '100%',
        elevation: 5,
        alignSelf: 'center'
    },
    pads: {
        margin: 15,
        borderRadius: 10
    },
    white_shadow: {
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 10
    },
    button: {
        // backgroundColor: '#03A9F4',
        justifyContent: 'center',
        borderRadius: 30,
        elevation: 10
    },
    bottom: {
        bottom: 0
    }
})