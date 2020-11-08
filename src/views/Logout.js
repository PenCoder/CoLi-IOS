import React from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { RNToasty } from 'react-native-toasty';


export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  static navigationOptions = {
    header: null
  }
  logout = async () => {

  }

  render() {

    const { navigate } = this.props.navigation;
    return (
      Alert.alert(
        'Confirm Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Yes', onPress: async () => {
              try {
                await AsyncStorage.removeItem('user-store');
                await AsyncStorage.removeItem('pack-store');

                navigate('Login');
              } catch (e) {
                RNToasty.Warn({
                  title: e.message,
                  fontFamily: 'Roboto',
                  position: 'bottom'
                });
              }
            }
          },
          { text: 'Cancel', style: 'cancel' }
        ]
      )
    )
  }
}

