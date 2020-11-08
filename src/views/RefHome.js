import React from 'react';
import {
  StyleSheet,
  ToastAndroid,
  ImageBackground,
  Dimensions,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import { CardItem, H2, Text, H3, View, Button, Icon } from 'native-base';
import { ListItem, Badge, Overlay, ButtonGroup } from 'react-native-elements';
import codePush from 'react-native-code-push';

import defaultStyles from '../../styles';
import { ActivityIndicator } from 'react-native-paper';

const { width } = Dimensions.get('window');

// GLOBAL
GLOBAL = require('../../global');

export default class RefHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      amount: 0,
      count: 0,
      pendingCount: 0,
      pending: 0,
      paid: 0,
      claim: 0,
      awaiting: true,
      requestPending: false,
      isLoading: true,

      selectedFilter: -1,
    };
  }

  render() {
    const {
      clients,
      amount,
      pending,
      requestPending,
      paid,
      claim,
      count,
      selectedFilter,
      isLoading,
    } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(247, 249, 250, 1)' }}>
        <Overlay
          isVisible={isLoading}
          overlayStyle={{ backgroundColor: 'transparent', elevation: 0 }}
          containerStyle={{ backgroundColor: 'rgba(250, 250, 250, 0.7)' }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator
              size="large"
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            />
          </View>
        </Overlay>
        <CardItem style={{ elevation: 5 }}>
          <Text style={{ fontSize: 20 }}>Referral Code: </Text>
          <Text style={{ fontSize: 20 }} note>
            {GLOBAL.referrer.refcode}
          </Text>
        </CardItem>
        <ImageBackground
          // source={require('../media/images/new_blue_bg.jpg')}
          style={{
            width: width,
            alignSelf: 'center',
            borderRadius: 10,
            flex: 1,
          }}>
          <ImageBackground
            source={require('../media/images/new_blue_bg.jpg')}
            style={{ margin: 10, elevation: 20, borderRadius: 10 }}
            imageStyle={{ borderRadius: 10 }}>
            <View
              style={{
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
                backgroundColor: 'rgba(1, 81, 172,0.3)',
              }}>
              <Text style={{ color: '#fff', margin: 5 }}>
                Your current cash balance is
              </Text>
              <Text style={{ color: '#fff', fontSize: 50, margin: 5 }}>
                ₵ {amount.toFixed(2)}
              </Text>
              <Text
                style={{ color: '#fff', marginHorizontal: 30, margin: 5 }}
                note>
                This is the amount of paid referrals that has not been withdrawn
              </Text>
            </View>
          </ImageBackground>
          <CardItem
            style={{
              justifyContent: 'space-between',
              margin: 5,
              flexDirection: 'column',
              paddingLeft: 0,
            }}>
            <ButtonGroup
              // onPress={this._filterReferrals.bind(this)}
              selectedIndex={selectedFilter}
              buttonStyle={{ borderRadius: 20 }}
              selectedButtonStyle={{ backgroundColor: 'rgba(176, 190, 197,0.7)' }}
              innerBorderStyle={{ width: 0 }}
              containerStyle={{
                padding: 10,
                marginLeft: 0,
                marginRight: 0,
                borderWidth: 0,
              }}
              buttons={[
                {
                  element: () => (
                    <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                      <Badge status="warning" value="" />
                      <Text style={{ fontSize: 16 }}> {pending} Pending</Text>
                    </View>
                  ),
                },
                {
                  element: () => (
                    <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                      <Badge status="success" value="" />
                      <Text style={{ fontSize: 16 }}> {count} Paid</Text>
                    </View>
                  ),
                },
                {
                  element: () => (
                    <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                      <Badge status="primary" value="" />
                      <Text style={{ fontSize: 16 }}>
                        ₵ {claim * 15} Withdrawn
                      </Text>
                    </View>
                  ),
                },
              ]}
            />
          </CardItem>

          <View style={{ flex: 1 }}>
            <>
              {/* 
            <FlatList
              contentContainerStyle={{
                borderRadius: 10,
                marginTop: 10,
                marginHorizontal: 10,
                elevation: 10,
              }}
              style={{ flex: 1 }}
              data={clients}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={this._refresh.bind(this)}
                />
              }
              renderItem={({ item }) => (
                <ListItem
                  title={item.fullname}
                  rightTitle={item.payment == 'RECEIVED' ? 'Paid' : 'Pending'}
                  bottomDivider
                  topDivider
                  rightIcon={
                    item.payment == 'RECEIVED'
                      ? {
                        name: 'check-circle',
                        type: 'font-awesome',
                        color: '#66BB6A',
                        size: 20,
                      }
                      : {
                        name: 'clockcircle',
                        type: 'antdesign',
                        color: 'orange',
                        size: 20,
                      }
                  }
                  leftAvatar={{
                    icon: { name: 'user', type: 'font-awesome' },
                  }}
                />
              )}
              ListHeaderComponent={
                <View>
                  <CardItem style={{ justifyContent: 'space-between' }}>
                    <H3 style={{ color: '#1565C0' }}>My Referrals</H3>
                    {count >= 5 ? (
                    <>
                      <Button
                        icon={{
                          name: 'send-o',
                          type: 'font-awesome',
                          size: 20,
                          color: 'white',
                        }}
                        onPress={() => this.onCheckOut()}
                        iconLeft
                        rounded
                        primary
                        small>
                        <Icon name="send-o" type="FontAwesome" />
                        <Text>Checkout</Text>
                      </Button>
                    </>
                    ) : null}
                  </CardItem>
                  {requestPending ? (
                    <CardItem bordered>
                      <Text note>You have pending request for approval.</Text>
                      <Text
                        note
                        style={{ color: 'blue', textDecorationLine: 'underline' }}
                        onPress={this.cancelRequest.bind(this)}>
                        Cancel
                      </Text>
                    </CardItem>
                  ) : null}
                </View>
              }
              ListEmptyComponent={
                <CardItem style={{ flex: 1, alignItems: 'center' }}>
                  <Text note style={{ fontSize: 24 }}>
                    No records available
                  </Text>
                </CardItem>
              }
            />
             */}
            </>
            <ListItem
              title={'Balance'}
              subtitle={'Balance available.'}
              rightIcon={
                count >= 5 ? (
                  <>
                    <Button
                      onPress={() => this.onCheckOut()}
                      iconRight rounded info small
                      style={{ elevation: 10 }}>
                      <Text>Checkout</Text>
                    </Button>
                  </>
                ) : <Text>₵ {(count - claim) * 15}</Text>
              }
              leftAvatar={{
                icon: { name: 'check-all', type: 'material-community' },
              }}
              containerStyle={{ margin: 5, borderRadius: 10 }}
            />
            <ListItem
              title={'Paid Referrals'}
              rightTitle={'₵' + (count * 15)}
              rightIcon={{
                name: 'check-circle',
                type: 'font-awesome',
                color: 'blue',
                size: 20,
              }}
              leftAvatar={{
                icon: { name: 'sack', type: 'material-community' },
              }}
              containerStyle={{ margin: 5, borderRadius: 10 }}
            />
            <ListItem
              title={'Pending Payment'}
              rightTitle={pending}
              rightIcon={{
                name: 'clockcircle',
                type: 'antdesign',
                color: 'orange',
                size: 20,
              }}
              leftAvatar={{
                icon: { name: 'account-clock', type: 'material-community' },
              }}
              containerStyle={{ margin: 5, borderRadius: 10 }}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
  componentDidMount() {
    // Check for Updates
    this._checkForUpdate();

    // Set Screen Props value
    this.fetchUsers();
    // Cut Loader
    this.setState({ isLoading: false });
  }
  // Filter List of Referrals
  _filterReferrals = index => {
    if (this.state.selectedFilter == index) {
      this.setState({
        selectedFilter: -1,
        clients: GLOBAL.refClients,
      });
    } else
      switch (index) {
        case 0:
          var clients = GLOBAL.refClients.filter(
            ref => ref.payment !== 'RECEIVED',
          );
          this.setState({
            selectedFilter: index,
            clients: clients,
          });
          break;
        case 1:
          var clients = GLOBAL.refClients.filter(
            ref => ref.payment == 'RECEIVED',
          );
          this.setState({
            selectedFilter: index,
            clients: clients,
          });
          break;
        case 2:
          // var clients = GLOBAL.refClients.filter((ref) => ref.status == 'CLOSED');
          this.setState({
            selectedFilter: -1,
            clients: GLOBAL.refClients,
          });
          break;
        default:
          break;
      }
  };
  // Fetch Users Referred
  fetchUsers = async () => {
    try {
      let data = new FormData();
      data.append('ref_get_users', '_-_');
      data.append('refcode', GLOBAL.referrer.refcode);

      var response = await fetch(
        'https://coli.com.gh/dashboard/mobile/referral_account.php',
        {
          // var response = await fetch('http://192.168.47.1/dashboard/mobile/referral_account.php', {
          method: 'POST',
          body: data,
          header: {
            Accept: 'application/json',
          },
        },
      );
      var users = await response.json();
      if (users[0] == 'success') {
        GLOBAL.refClients = users[1];
        // Get Paid Customers
        var received = GLOBAL.refClients.filter(function (client) {
          return client.payment == 'RECEIVED';
        });
        var pending = GLOBAL.refClients.filter(function (client) {
          return client.payment !== 'RECEIVED';
        });
        // Pending Requests
        var pendingRequest = users[2].status == 'PENDING';
        this.setState({
          clients: users[1],
          count: received.length,
          pending: pending.length,
          amount: 15 * received.length,
          requestPending: pendingRequest,
          requestId: users[2].id,
          claim: users[2].claimed,
        });
      } else {
        ToastAndroid.show(
          'Error loading items. Please try again later',
          ToastAndroid.LONG,
        );
      }
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    }
  };
  // Refresh
  _refresh = () => {
    this.fetchUsers();
    this.setState({ isLoading: false });
  };
  async onCheckOut() {
    try {
      Alert.alert('CONFIRM CHECKOUT', 'Press ok to continue checkout', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            // Start Loader
            this.setState({ isLoading: false });
            const { count } = this.state;
            var refcode = GLOBAL.referrer.refcode;
            var refname = GLOBAL.referrer.fullname;
            var checkoutamount = (this.state.count - this.state.claim) * 15;
            var data = new FormData();
            data.append('count', count);
            data.append('refcode', refcode);
            data.append('refname', refname);
            data.append('amount', checkoutamount);
            data.append('ref_check_out', '_-_');

            var response = await fetch(
              'https://coli.com.gh/dashboard/mobile/referral_account.php',
              {
                // var response = await fetch('http://192.168.47.1/dashboard/mobile/referral_account.php', {
                method: 'POST',
                body: data,
                header: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                },
              },
            );
            var res = await response.json();
            if (res[0] == 'success') {
              ToastAndroid.show('Request pending approval', ToastAndroid.LONG);

              this.setState({ requestid: res[1] });
              // Refresh
              this._refresh();
            } else if (res[0] == 'failed') {
              Alert.alert('', res[1]);
            } else {
              Alert.alert('', JSON.stringify(res));
            }
          },
        }
      ]);
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }
  async cancelRequest() {
    try {
      // Start Loader
      this.setState({ isLoading: false });
      const { requestId } = this.state;
      var refcode = GLOBAL.referrer.refcode;

      var data = new FormData();
      data.append('id', requestId);
      data.append('refcode', refcode);
      data.append('ref_cancel_req', '_-_');

      var response = await fetch(
        'https://coli.com.gh/dashboard/mobile/referral_account.php',
        {
          // var response = await fetch('http://192.168.47.1/dashboard/mobile/referral_account.php', {
          method: 'POST',
          body: data,
          header: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      var res = await response.text();
      if (res == 'success') {
        ToastAndroid.show('Request successfully cancelled', ToastAndroid.LONG);

        this._refresh();
      } else {
        Alert.alert('', res);
      }
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  // Check For Updates
  async _checkForUpdate() {
    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  }
  // Payment Request
  _paymentRequest() {
    try {
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    }
  }
  static navigationOptions = () => ({
    title: 'Home',
    // headerTitle: 'Home',
    tabStyle: { fontSize: 20 },
    tabBarIcon: ({ tintColor }) => (
      <Icon
        type="FontAwesome"
        name="home"
        size={25}
        style={{ color: tintColor }}
      />
    ),
    headerTransparent: true,
    // headerStyle: {
    //     backgroundColor: 'transparent'//'#0288D1'
    // },
    headerTitleStyle: {
      color: '#fff',
    },
  });
}

const styles = StyleSheet.create({
  bg_main: {
    backgroundColor: '#D3DFDD',
  },
  container_1: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    margin: 1,
  },
  spaced: {
    justifyContent: 'space-between',
  },
  item: {
    ...defaultStyles.transparent,
    width: 150,
  },
  m_20Right: {
    marginRight: 5,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  m_20Left: {
    margin: 0,
    borderRadius: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    width: 120,
    alignItems: 'center',
  },
  trans_green: {
    // backgroundColor: 'rgba(76,175,80,0.5)'
  },
  trans_blue: {},
  trans_violet: {
    backgroundColor: 'rgba(94,53,177 ,0.5)',
  },
  float: {
    width: '100%',
    alignSelf: 'center',
  },
  behind: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
  },
  front: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
  },
  card: {
    // marginHorizontal: 20,
    borderRadius: 20,
    flex: 1,
  },
  float: {
    width: '100%',
    elevation: 5,
    alignSelf: 'center',
  },
  pads: {
    margin: 15,
    borderRadius: 10,
  },
  white_shadow: {
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 10,
  },
  oval: {
    width: 100,
    height: 100,
    borderRadius: 200,
    borderWidth: 2,
    borderBottomWidth: 2,
    borderTopWidth: 0,
    borderColor: 'black',
    alignSelf: 'center',
    transform: [{ scaleX: 5 }],
  },
  check_btn: {
    backgroundColor: 'rgba(102, 187, 106,1.0)',
    alignSelf: 'flex-end',
  },
});
