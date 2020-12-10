import React from 'react';
import { StyleSheet, View, Image, ScrollView, ImageBackground, Alert } from 'react-native';
import { Container, Header, Body, Content, CardItem, Text } from 'native-base';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Icon, Avatar, ListItem } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation-stack';
import { fromLeft, fadeIn } from 'react-navigation-transitions';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { createDrawerNavigator, DrawerItems, DrawerNavigatorItems } from 'react-navigation-drawer';
import SafeAreaView from 'react-native-safe-area-view';

import codePush from 'react-native-code-push';

import { MenuProvider, Menu, MenuOptions, MenuTrigger, MenuOption } from 'react-native-popup-menu';

import Home from './src/views/Home';
import Login from './src/views/Login';
import Register from './src/views/Register';
import Welcome from './src/views/Welcome';
import Packages from './src/views/Packages';
import Package from './src/views/Package';
import Profile from './src/views/Profile';
import Subscribe from './src/views/Subscribe';
// import {DrawerNavBar} from './src/components/DrawerNavBar';
import defaultStyles from './styles';
import Stats from './src/views/Stats';
import Payment from './src/views/Payment';
import Timeline from './src/views/Timeline';
import Settings from './src/views/Settings';
import Support from './src/views/Support';

import AsyncStorage from '@react-native-community/async-storage';
import RefLogin from './src/views/RefLogin';
import RefRegister from './src/views/RefRegister';
import RefCompleted from './src/views/RefCompleted';
import RefHome from './src/views/RefHome';
import RefReferrals from './src/views/RefReferrals';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import RefSubscribe from './src/views/RefSubscribe';
import RefProfile from './src/views/RefProfile';
import RefSubscribeComplete from './src/views/RefSubscribeComplete';
import Splash from './src/views/Splash';
import UnHome from './src/views/UnHome';
import UnPackage from './src/views/UnPackage';
import UnPackages from './src/views/UnPackages';
import UnPayment from './src/views/UnPayment';
import ResetPassword from './src/views/ResetPassword';
import WebViewer from './src/views/WebViewer';
import Router from './src/views/Router';
import AddAccount from './src/views/AddAccount';
import ManageAccounts from './src/views/ManageAccounts';
import Purchase from './src/views/Purchase';
import TopUp from './src/views/TopUp';

import { Provider } from 'mobx-react';
import { GlobalProps } from './src/helpers/GlobalProps';
import AddedProfile from './src/views/AddedProfile';
import AddedRenew from './src/views/AddedRenew';

// GLobal Props
GLOBAL = require('./global');

// Drawer Navigation Component
const DrawerNavBar = (props) => (
  <ScrollView>
    <SafeAreaView>
      <CardItem
        style={{ backgroundColor: 'rgba(236, 239, 241,1.0)' }}
        source={require('./src/media/images/blue-gradient-bg.png')}
      >

        <Image
          source={require('./src/media/images/coli-logo.png')}
          style={{ height: 60, width: 120 }}
        />
        {/* </View> */}
      </CardItem>

      <View>
        <ListItem
          title={GLOBAL.user['Name']}
          subtitle={GLOBAL.user['UserId']}
          containerStyle={{ backgroundColor: 'transparent' }}
          topDivider bottomDivider
          leftAvatar={{
            icon: { name: 'user', type: 'font-awesome' },
            rounded: true
          }}
        />
        <DrawerNavigatorItems  {...props} />
      </View>
    </SafeAreaView>
  </ScrollView>
)

// Profile Stack
const ProfileStack = createStackNavigator(
  {
    Profile: Profile
  }
)
// Logout
const Logout = (props) => {
  Alert.alert(
    'Confirm Logout',
    'Are you sure you want to logout?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes', onPress: async () => {
          try {
            var keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);

            props.navigate('Login');
          } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
          }
        }
      }
    ]
  )
}

// Drawer Navigator
const Main = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => <Icon type="font-awesome" name='home' size={25} color={tintColor} />
      }
    },
    Packages: Packages,
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => <Icon type="antdesign" name='profile' size={25} color={tintColor} />
      }
    },
    Payment: Payment,
    Support: Support,
    Settings: Settings,
    Logout: {
      screen: Logout,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => <Icon type="antdesign" name='logout' size={25} color={tintColor} />
      }
    }
  },
  {
    // initialRouteName: 'Profile',
    contentComponent: DrawerNavBar,
    // drawerOpenRoute: 'DrawerOpen',
    // drawerCloseRoute: 'DrawerClose',
    // drawerToggleRoute: 'DrawerToggle'
  }
)

const MainTabNav = createBottomTabNavigator(
  {
    Home: Home,
    Purchase: Purchase,
    Settings: Settings,
    Support: Support,
  },
  {
    tabBarOptions: {
      activeTintColor: 'rgba(98, 135, 181, 1)',
      inactiveTintColor: '#a8b0b3',
      labelStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
  }
)

const MainStack = createStackNavigator(
  {
    Main: {
      screen: MainTabNav,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '',
        headerTransparent: true,
        headerRight:
          <View style={{ marginRight: 15 }}>
            <Menu>
              <MenuTrigger>
                <View style={{ right: -15 }}>
                  <Icon raised name="user-circle-o" type="font-awesome" color="rgba(98, 135, 181, 1)" />
                </View>
              </MenuTrigger>
              <MenuOptions>

                <MenuOption onSelect={() => navigation.navigate('Profile')}>
                  <CardItem bordered>
                    <Avatar
                      rounded
                      size={'small'}
                      overlayContainerStyle={{ backgroundColor: 'rgba(98, 135, 181, 1)' }}
                      icon={{ name: 'user', type: 'font-awesome' }}
                    />
                    <Text note style={{ marginLeft: 10, color: '#722F37' }}>Profile</Text>
                  </CardItem>
                </MenuOption>

                <MenuOption onSelect={() => navigation.navigate('Packages')}>
                  <CardItem bordered>
                    <Avatar
                      rounded
                      size={'small'}
                      overlayContainerStyle={{ backgroundColor: 'rgba(98, 135, 181, 1)' }}
                      icon={{ name: 'package', type: 'feather' }}
                    />
                    <Text note style={{ marginLeft: 10, color: '#722F37' }}>Packages</Text>
                  </CardItem>
                </MenuOption>

                <MenuOption onSelect={() => navigation.navigate('ManageAccounts')}>
                  <CardItem bordered>
                    <Avatar
                      rounded
                      size={'small'}
                      overlayContainerStyle={{ backgroundColor: 'rgba(98, 135, 181, 1)' }}
                      icon={{ name: 'users', type: 'font-awesome' }}
                    />
                    <Text note style={{ marginLeft: 10, color: '#722F37' }}>Manage Accounts</Text>
                  </CardItem>
                </MenuOption>

                <MenuOption onSelect={() => Logout(navigation)}>
                  <CardItem bordered>
                    <Avatar
                      rounded
                      size={'small'}
                      overlayContainerStyle={{ backgroundColor: '#db7fa6' }}
                      icon={{ name: 'logout', type: 'antdesign' }}
                    />
                    <Text style={{ color: '#db7fa6', marginLeft: 10 }}>Logout</Text>
                  </CardItem>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>,
      })
    },
    // Packages: Packages,
    Stats: Stats,
    Package: Package,
    Packages: Packages,
    Profile: Profile,
    Payment: Payment,
    Timeline: Timeline,
    Logout: Logout,
    AddAccount: AddAccount,
    ManageAccounts: ManageAccounts,
    AddedProfile: AddedProfile,
    AddedRenew: AddedRenew,
    TopUp: TopUp
  }, {
}
)
// Non Existing User
const UnStack = createStackNavigator(
  {
    Home: {
      screen: UnHome,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '',
        headerTransparent: true,
        headerRight:
          <View style={{ marginRight: 15 }}>
            <Menu>
              <MenuTrigger><Icon name="user-circle-o" type="font-awesome" color="white" raised /></MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => Logout(navigation)}>
                  <CardItem>
                    <Icon name="logout" type="antdesign" />
                    <Text>Logout</Text>
                  </CardItem>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>,
      })
    },
    Packages: UnPackages,
    Package: UnPackage,
    Payment: UnPayment
  },
  {
    transitionConfig: () => fromLeft()
  }
)

// Referral Bottom Navigator
const RefMainNav = createBottomTabNavigator(
  {
    Home: { screen: RefHome },
    Subscribe: RefSubscribe,
    Profile: RefProfile
  },
  {
    initialRouteName: 'Home'
  }
)
// CoLi User Authentication Screens
const Auth = createStackNavigator(
  {
    Login: Login,
    Reset: ResetPassword,
    Register: Register
  },
  {
    transitionConfig: () => fromLeft(),
    headerMode: 'none'
  }
)
// Referral Authentication Screens
const RefAuth = createStackNavigator(
  {
    Login: RefLogin,
    Register: RefRegister,
  },
  {
    transitionConfig: () => fromLeft()
  }
)
// CoLi User Screens
const MainApp = createSwitchNavigator(
  {
    Router: Router,
    Auth: Auth,
    HomeStack: MainStack,
    UnMain: UnStack
  }
);
// CoLi Referrer Screens
const RefMain = createSwitchNavigator(
  {
    Auth: RefAuth,
    Completed: RefCompleted,
    Home: RefMainNav,
    Referral: RefReferrals,
    Sub_Completed: RefSubscribeComplete
  },
  {
    transitionConfig: () => fromLeft(),
    initialRouteName: 'Auth'
  }
)
// Welcome Screen 
const WelcomeStack = createStackNavigator(
  {
    Welcome: Welcome,
    Register: Register,
    Main: MainApp,
    Referral: RefMain,
    WebViewer: WebViewer,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Welcome',
    navigationOptions: {
      headerStyle: { backgroundColor: '#FFFF00' },
      headerTintColor: 'white',
      gesturesEnabled: false
    },
    cardStyle: {
      backgroundColor: '#275970',
      elevation: 0
    }
  }
)
// Starting From Splash Screen to Welcome
const IntroSwitch = createSwitchNavigator(
  {
    Splash: Splash,
    WelcomeStack: WelcomeStack
  }
)

const AppContainer = createAppContainer(IntroSwitch);

// Code Push Options
const options = {
  updateDialog: false,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
  rollbackRetryOptions: {
    delayInHours: 1 / 60,
    maxRetryAttempts: 3
  }
}

const globalProps = new GlobalProps();
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    // Load Packages 
    await globalProps.getActivePacks();

    codePush.sync(options);
  }
  render() {
    return (
      <Provider globalProps={globalProps}>
        <MenuProvider>
          <AppContainer />
        </MenuProvider>
      </Provider>
    )
  }
}

export default App = codePush(options)(App);