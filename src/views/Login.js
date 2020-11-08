import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Avatar, Input, Overlay, Button } from 'react-native-elements';
import { H1, H3, Text, H2, CardItem, Icon, View } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import defaultStyles from '../../styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import codePush from 'react-native-code-push';
import { RNToasty } from 'react-native-toasty';
import { inject, observer } from 'mobx-react';


// Screen Height and Width
const { height, width } = Dimensions.get('screen');

@inject('globalProps')
@observer
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      pwd: '',
      codeInput: '',
      code: '',
      isPassword: true,
      eye_icon: 'eye-off',
      isLoggedIn: true,

      isForgotPassword: false,
      isCodeSent: false,
    };

    // Global Props 
    this.Global = this.props.globalProps;
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          // source={require('../media/images/new_blue_bg.jpg')}
          style={{ flex: 1, backgroundColor: '#275970' }}>
          <Overlay
            isVisible={this.state.isLoggedIn}
            overlayStyle={{ backgroundColor: 'transparent', elevation: 0 }}
            containerStyle={{ backgroundColor: 'rgba(250, 250, 250, 0.9)' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator
                size="large"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
          </Overlay>

          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View
              style={{
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Avatar
                rounded
                size={120}
                icon={{
                  name: 'user',
                  type: 'font-awesome',
                  color: 'rgba(200, 200, 200,0.9)',
                }}
                overlayContainerStyle={{
                  backgroundColor: 'rgba(250, 250, 250, 0.05)',
                }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <KeyboardAwareScrollView style={{ flex: 1 }}>
                <View style={defaultStyles.form}>
                  <Input
                    placeholder="Username"
                    containerStyle={styles.input}
                    inputStyle={{ color: 'white' }}
                    placeholderTextColor={'rgba(200, 200, 200,1.0)'}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    autoCapitalize={'none'}
                    onChangeText={txt => this.onInputChange(txt, 'username')}
                    leftIcon={{
                      name: 'user',
                      type: 'font-awesome',
                      color: 'rgba(200, 200, 200,1.0)',
                    }}
                  />

                  <Input
                    placeholder="Password"
                    containerStyle={styles.input}
                    inputStyle={{ color: 'white' }}
                    placeholderTextColor={'rgba(200, 200, 200,1.0)'}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    autoCapitalize={'none'}
                    onChangeText={pass => this.onInputChange(pass, 'pwd')}
                    secureTextEntry={this.state.isPassword}
                    leftIcon={{
                      name: 'shield',
                      type: 'font-awesome',
                      color: 'rgba(200, 200, 200,1.0)',
                    }}
                    rightIcon={
                      <Icon
                        name={this.state.eye_icon}
                        style={{ color: 'rgba(200, 200, 200,1.0)' }}
                        onPress={() => this.togglePwd()}
                      />
                    }
                  />
                </View>
                <View>
                  <Button
                    title={'Sign In'}
                    titleStyle={{ color: '#CFD8DC', fontSize: 18 }}
                    buttonStyle={[styles.button_rounded]}
                    type={'outline'}
                    onPress={this.login.bind(this)}
                  />
                </View>
                <CardItem
                  style={{
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                  }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>OR</Text>
                </CardItem>
                <Button
                  title={'Register'}
                  titleStyle={{ color: '#CFD8DC', fontSize: 18 }}
                  buttonStyle={[styles.button_rounded]}
                  type={'outline'}
                  onPress={this.goToRegister.bind(this)}
                />

              </KeyboardAwareScrollView>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
  onForgotPassword = () => {
    this.setState({
      isForgotPassword: true,
    });
  };

  onSubmitForgotPassword = async () => {
    if (this.state.uid.trim() == '') {
      RNToasty.Info({
        title: 'Please input username!',
        fontFamily: 'Roboto',
        position: 'bottom'
      });
    } else {
      try {
        // Loader
        this.setState({ isLoggedIn: true });

        var data = new FormData();
        data.append('usnm', this.state.uid);
        data.append('for-got-pwd', 'fog-');
        var response = await fetch(
          'https://coli.com.gh/dashboard/mobile/user_account.php',
          {
            // var response = await fetch('http://192.168.47.1/dashboard/mobile/user_account.php', {
            method: 'POST',
            body: data,
            header: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        var result = await response.json();

        if (result[0] == 'success') {
          this.setState({
            code: result[1],
            isCodeSent: true,
          });
        } else if (result[0] == 'no-match') {
          RNToasty.Show({
            title: 'Please enter a valid username',
            fontFamily: 'Roboto',
            position: 'bottom'
          });
        }
      } catch (e) {
        RNToasty.Warn({
          title: e.message,
          fontFamily: 'Roboto',
          position: 'bottom'
        });
      } finally {
        this.setState({
          isLoggedIn: false,
        });
      }
    }
  };
  // Submitting Reset Code
  onSubmitCode = () => {
    const { code, codeInput } = this.state;
    if (codeInput.trim() == '') {
      RNToasty.Show({
        title: 'Please input code',
        fontFamily: 'Roboto',
        position: 'bottom'
      });
    } else {
      if (code == codeInput) {
        this.props.navigation.push('Reset');
        this.setState({
          isForgotPassword: false,
        });
      } else {
        RNToasty.Show({
          title: 'Codes do not match',
          fontFamily: 'Roboto',
          position: 'bottom'
        });
      }
    }
  };

  cancelForgetPassword = () => {
    this.setState({
      isForgotPassword: false,
    });
  };
  // On Input Change
  onInputChange = (value, name) => {
    switch (name) {
      case 'username':
        this.setState({ uid: value });
        break;
      case 'pwd':
        this.setState({ pwd: value });
        break;
      case 'code':
        this.setState({ codeInput: value });
        break;
      default:
        break;
    }
  };
  // Login Submit
  login = async () => {

    var { uid, pwd } = this.state;
    this.setState({
      isLoggedIn: true,
    });
    try {
      if (uid && pwd) {
        var data = new FormData();
        data.append('usnm', uid);
        data.append('pwd', pwd);
        data.append('user-sign-in', '_-_');
        var response = await fetch('http://api.coliserver.com/pmsapi.php?op=userinfo&Uid=' + uid);

        var json = await response.json();

        // Check if User Exists
        if (json) {
          if (typeof (json[0]['UserId']) !== 'undefined') {
            var user = json[0];
            if (pwd === user['Password']) {
              this.Global.updateProp('existing', true);
              this.Global.updateProp('user', user);
              this.Global.updateProp('userId', user['UserId']);

              fetch('http://api.coliserver.com/pmsapi.php?op=listpackage')
                .then(packResponse => packResponse.json())
                .then(async (packs) => {
                  this.Global.updateProp('packs', packs);
                  this.Global.packs.map(plan => {
                    if (
                      plan['Plan_name'].toLowerCase() == this.Global.user['Plan Name'].toLowerCase()
                    ) {
                      this.Global.updateProp('pack', plan);
                    }
                  });
                  // Store Local
                  var userInfo = [user.UserId, user['Plan Name']];
                  await AsyncStorage.setItem('user-store', JSON.stringify(userInfo));
                  // Additional Users
                  var additionalUsers = await AsyncStorage.getItem('additional-users');
                  if (additionalUsers) {
                    this.Global.updateProp('additionalUsers', JSON.parse(additionalUsers));
                  } else {
                    this.Global.updateProp('additionalUsers', []);
                  }
                  this.props.navigation.navigate('HomeStack');
                })
                .catch(e => {
                  RNToasty.Warn({
                    title: e.message,
                    fontFamily: 'Roboto',
                    position: 'bottom'
                  });
                });
            }
            else {
              RNToasty.Show({
                title: 'Username or password invalid.',
                fontFamily: 'Roboto',
                position: 'bottom'
              });
            }
          }
          else {
            var neResponse = await fetch('https://coli.com.gh/dashboard/mobile/user_account.php', {
              method: 'POST',
              body: data,
              header: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              }
            });
            var neText = await neResponse.text();
            if (neText.includes("non-existing")) {
              var neJson = JSON.parse(neText);
              var neUser = neJson[1];
            }
            RNToasty.Show({
              title: 'Username or password invalid',
              fontFamily: 'Roboto',
              position: 'bottom'
            });
          }

        } else {
          RNToasty.Show({
            title: 'No user found',
            fontFamily: 'Roboto',
            position: 'bottom'
          });
        }
      }
      else if (!uid) {
        RNToasty.Show({
          title: 'Please input username',
          fontFamily: 'Roboto',
          position: 'bottom'
        });
      }
      else if (!pwd) {
        RNToasty.Show({
          title: 'Please Input user password',
          fontFamily: 'Roboto',
          position: 'bottom'
        });
      }
    }
    catch (e) {
      RNToasty.Warn({
        title: e.message,
        fontFamily: 'Roboto',
        position: 'bottom'
      });
    }
    finally {
      this.setState({
        isLoggedIn: false,
      });
    }
  };
  // Auto Login When Not Logout
  autoLogin = async () => {
    try {
      // Fetch User info from Local store
      var storedUser = await AsyncStorage.getItem('user-store');
      var unStoredUser = await AsyncStorage.getItem('un-user-store');
      // Check if User has not logged out

      if (storedUser) {
        var userInfo = JSON.parse(storedUser);
        this.Global.updateProp('existing', true);
        var userId = userInfo[0];

        var response = await fetch('http://api.coliserver.com/pmsapi.php?op=userinfo&Uid=' + userId);
        var json = await response.json();

        // Check if User Exists
        if (json) {
          if (typeof (json[0]['UserId']) !== 'undefined') {
            var user = json[0];
            this.Global.updateProp('existing', true);
            this.Global.updateProp('user', user);
            this.Global.updateProp('userId', user['UserId']);

            fetch('http://api.coliserver.com/pmsapi.php?op=listpackage')
              .then(packResponse => packResponse.json())
              .then(async (packs) => {
                this.Global.updateProp('packs', packs);
                this.Global.packs.map(plan => {
                  if (
                    plan['Plan_name'].toLowerCase() == this.Global.user['Plan Name'].toLowerCase()
                  ) {
                    this.Global.updateProp('pack', plan);
                  }
                });
                // Additional Users
                var additionalUsers = await AsyncStorage.getItem('additional-users');
                if (additionalUsers) {
                  this.Global.updateProp('additionalUsers', JSON.parse(additionalUsers));
                } else {
                  this.Global.updateProp('additionalUsers', []);
                }

                this.props.navigation.navigate('HomeStack');
              })
              .catch(e => {
              });
          }

        } else {
          RNToasty.Info({
            title: 'No User found',
            fontFamily: 'Roboto',
            position: 'bottom'
          });
        }
      }
      else if (unStoredUser) {
        this.Global.updateProp('existing', false);
        var userInfo = JSON.parse(unStoredUser);
        this.Global.updateProp('user', userInfo[0]);
        this.Global.updateProp('pack', userInfo[1]);
        if (userInfo[2]) {
        }
        this.props.navigation.navigate('UnMain');
      }
      else { }

      this.setState({
        isLoggedIn: false,
      });
    }
    catch (e) {
      RNToasty.Warn({
        title: e.message,
        fontFamily: 'Roboto',
        position: 'bottom'
      });

      this.setState({
        isLoggedIn: false,
      });
    }
  };

  // Collect Packs
  fetchPackages = async () => {
    try {
      var response = await fetch('http://api.coliserver.com/pmsapi.php?op=listpackage');
      var packs = await response.json();
      this.Global.globalProps.updateProp('packs', packs)
    }
    catch (e) {
      RNToasty.Warn({
        title: e.message,
        fontFamily: 'Roboto',
        position: 'bottom'
      });
    }
  };
  // Toggle View Password
  togglePwd = () => {
    this.setState(prevState => ({
      eye_icon: prevState.eye_icon === 'eye' ? 'eye-off' : 'eye',
      isPassword: !prevState.isPassword,
    }));
  };
  // Go to New Registration
  goToRegister = () => {
    this.props.navigation.navigate('Register');
  };

  componentDidMount() {
    // Fetch Packages
    this.autoLogin();
  }
  // Check For Updates
  async _checkForUpdate() {
    codePush.sync({
      updateDialog: false,
      installMode: codePush.InstallMode.IMMEDIATE
    })
  }
}

// Styles for this View
const styles = StyleSheet.create({
  input_item: {
    width: '90%',
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: 'rgba(236, 239, 241,1.0)',
    paddingLeft: 20,
    paddingBottom: 5,
    margin: 5,
  },
  label: {
    color: 'grey',
    marginHorizontal: 25,
    marginVertical: -10,
  },
  input: {
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 30,
    borderColor: 'grey',
    backgroundColor: 'rgba(236, 239, 241,0.1)',
    paddingBottom: 5,
    alignSelf: 'center',
    margin: 5,
  },
  input_1: {
    width: '100%',
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: 'rgba(236, 239, 241,1.0)',
    paddingBottom: 5,
    alignSelf: 'center',
    margin: 5,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  button: {
    // backgroundColor: '#03A9F4',
    justifyContent: 'center',
    borderRadius: 30,
    marginHorizontal: 15,
  },
  button_rounded: {
    borderRadius: 30,
    margin: 10,
    borderColor: '#CFD8DC',
    backgroundColor: '#275970',
    elevation: 5
  },
  elevate: {
    width: '90%',
    margin: 20,
    alignItems: 'center',
  },
  card: {
    // marginHorizontal: 20,
    borderRadius: 50,
    backgroundColor: 'white',
    flex: 1,
  },
  float: {
    width: '100%',
    paddingVertical: 20,
    elevation: 5,
    alignSelf: 'center',
    marginBottom: 100,
  },
  behind: {
    width: width,
    height: height,
    position: 'absolute',
  },
  translucent_pane: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 10,
    backgroundColor: 'rgba(10, 10, 10,0.3)',
    borderRadius: 5,
  },
});
