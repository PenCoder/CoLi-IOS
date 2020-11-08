import React from 'react';
import { View, StyleSheet, ToastAndroid, ScrollView, SafeAreaView, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { Avatar, Input, Overlay, PricingCard, ListItem, CheckBox, Icon } from 'react-native-elements';
import { H3, Button, Text, CardItem, Picker, H1 } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import defaultStyles from '../../styles';

import { Dimensions } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { RadioButton } from 'react-native-paper';

const communities = require('../assets/communities.json');

// GLOBAL
GLOBAL = require('../../global');
// Screen Height and Width
const { height, width } = Dimensions.get('screen');

// List of Packages to display
const packageNames = [
    'Home',
    'Regular',
    'Basic',
    'Standard',
    'Business',
    'Office',
    'CoLiPlus'
];

// interface State {
//     outerScrollViewScrollEnabled: boolean;
// }
export default class RefSubscribe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packs: [],
            username: '',
            pwd: '',
            isPassword: true,
            eye_icon: 'eye-off',
            address: '',
            landmark: '',
            // name: '',
            fname: '',
            lname: '',
            phone: '',
            email: '',
            community: '',
            city: '',
            region: '',
            referral: '',

            packageChecked: '',
            id_mode: '',
            id_number: '',
            isError: false,
            outerScrollViewScrollEnabled: true,

            isOverlay: false,
            isViewTerms: false,
            pack: {},

            isSuccess: false,

            isLoading: false
        }

        // Formdata to be submitted
        this.formData = new FormData();
    }
    static navigationOptions = {
        header: null
    }


    render() {

        const { packageChecked, id_mode } = this.state;
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../media/images/new_blue_bg.jpg')}
                    style={{ flex: 1, backgroundColor: 'rgba(1, 87, 155,1.0)' }}
                >

                    {/* this.state.isLoading ? */}
                    <Overlay isVisible={this.state.isLoading}
                        overlayStyle={{ backgroundColor: 'transparent', elevation: 0 }}
                        containerStyle={{ backgroundColor: 'rgba(250, 250, 250, 0.7)' }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator
                                size='large'
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            />
                        </View>
                    </Overlay>

                    <SafeAreaView style={{ flex: 1 }}>
                        <ImageBackground
                            source={require('../media/images/new_blue_bg.jpg')}
                            style={{ flex: 1 }}
                        >
                            <CardItem style={{ justifyContent: 'center', backgroundColor: 'transparent' }}>
                                <H1 style={{ color: 'white', margin: 5, fontSize: 32 }}>SUBSCRIBE</H1>
                            </CardItem>

                            <View style={{ flex: 1 }}>
                                <ImageBackground
                                    style={{ alignSelf: 'center', flex: 1, borderRadius: 20 }}
                                    imageStyle={{ borderTopLeftRadius: 20 }}
                                    source={require('../media/images/network.jpg')}
                                >
                                    <View
                                        style={{ flex: 1, backgroundColor: 'rgba(240, 240, 240, 1)', borderRadius: 20 }}
                                    >

                                        <ProgressSteps
                                            activeStepIconBorderColor={'#0288D1'}
                                            activeLabelColor={'#0288D1'}
                                            completedStepIconColor={'#01579B'}
                                            completedProgressBarColor={'#01579B'}
                                        >
                                            <ProgressStep label="User"
                                                nextBtnStyle={styles.progressBtn}
                                                nextBtnTextStyle={styles.progressBtnText}
                                                onNext={this.onUserInfoNext}
                                                errors={this.state.isError}
                                            >
                                                <View style={{ flex: 1 }}>

                                                    <CardItem style={{ flexDirection: 'column', backgroundColor: 'transparent' }}>
                                                        <Input
                                                            placeholder='Username'
                                                            containerStyle={styles.input}
                                                            inputContainerStyle={{ borderBottomWidth: 0 }}
                                                            onChangeText={(txt) => this.onChangeText(txt, 'username')}
                                                            value={this.state.username}
                                                            leftIcon={{ name: 'user', type: 'font-awesome' }}
                                                        />
                                                        <Input
                                                            placeholder='Password'
                                                            containerStyle={styles.input}
                                                            inputContainerStyle={{ borderBottomWidth: 0 }}
                                                            onChangeText={(txt) => this.onChangeText(txt, 'pwd')}
                                                            value={this.state.pwd}
                                                            leftIcon={{ name: 'lock', type: 'font-awesome' }}
                                                        />

                                                        <Input
                                                            placeholder='First Name'
                                                            containerStyle={styles.input}
                                                            inputContainerStyle={{ borderBottomWidth: 0 }}
                                                            onChangeText={(txt) => this.onChangeText(txt, 'fname')}
                                                            value={this.state.fname}
                                                            leftIcon={{ name: 'user', type: 'font-awesome' }}
                                                        />
                                                        <Input
                                                            placeholder='Last Name'
                                                            containerStyle={styles.input}
                                                            inputContainerStyle={{ borderBottomWidth: 0 }}
                                                            onChangeText={(txt) => this.onChangeText(txt, 'lname')}
                                                            value={this.state.lname}
                                                            leftIcon={{ name: 'user', type: 'font-awesome' }}
                                                        />
                                                    </CardItem>

                                                </View>
                                            </ProgressStep>
                                            <ProgressStep label="Personal"
                                                nextBtnStyle={styles.progressBtn}
                                                nextBtnTextStyle={styles.progressBtnText}
                                                previousBtnStyle={styles.progressBtn}
                                                previousBtnTextStyle={styles.progressBtnText}
                                                onNext={this.onPersonalInfoNext}
                                                errors={this.state.isError}
                                            >
                                                <CardItem style={{ flexDirection: 'column', backgroundColor: 'transparent' }}>

                                                    <Input
                                                        placeholder='Address'
                                                        containerStyle={styles.input}
                                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                                        onChangeText={(txt) => this.onChangeText(txt, 'address')}
                                                        value={this.state.address}
                                                        leftIcon={{ name: 'map-marker', type: 'font-awesome' }}
                                                    />
                                                    <Input
                                                        placeholder='Landmark'
                                                        containerStyle={styles.input}
                                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                                        onChangeText={(txt) => this.onChangeText(txt, 'landmark')}
                                                        value={this.state.landmark}
                                                    />
                                                    <Input
                                                        placeholder='Email'
                                                        containerStyle={styles.input}
                                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                                        onChangeText={(txt) => this.onChangeText(txt, 'email')}
                                                        value={this.state.email}
                                                        leftIcon={{ name: 'email', type: 'entypo' }}
                                                    />
                                                    <Input
                                                        placeholder='Personal Contact'
                                                        containerStyle={styles.input}
                                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                                        onChangeText={(txt) => this.onChangeText(txt, 'phone')}
                                                        value={this.state.phone}
                                                        leftIcon={{ name: 'phone', type: 'font-awesome' }}
                                                    />

                                                    <Input
                                                        placeholder='City/Town'
                                                        containerStyle={{ ...styles.input }}
                                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                                        onChangeText={(txt) => this.onChangeText(txt, 'city')}
                                                        value={this.state.city}
                                                    />

                                                    <CardItem
                                                        style={{ ...styles.input }}
                                                    >
                                                        <Picker
                                                            mode='modal'
                                                            note
                                                            placeholder=""
                                                            placeholderStyle={{ color: "#bfc6ea" }}
                                                            placeholderIconColor="#007aff"
                                                            style={{ width: undefined, borderWidth: 2 }}
                                                            iosIcon={<Icon name='arrow-down' />}
                                                            selectedValue={this.state.region}
                                                            onValueChange={this.onRegionChanged.bind(this)}
                                                        >
                                                            <Picker.Item label="Select Region"></Picker.Item>
                                                            <Picker.Item label="Accra" value='Greater Accra' />
                                                        </Picker>
                                                    </CardItem>
                                                    <CardItem
                                                        style={{ ...styles.input, marginBottom: 50 }}
                                                    >
                                                        <Picker
                                                            mode='modal'
                                                            note
                                                            iosIcon={<Icon name='chevron-down' type='FontAwesome' />}
                                                            selectedValue={this.state.community}
                                                            onValueChange={this.onCommunityChanged.bind(this)}
                                                        >
                                                            <Picker.Item label="Select Community" />
                                                            {
                                                                communities.map((community, index) => {
                                                                    return (
                                                                        <Picker.Item key={index} label={community.name} value={community.name} />
                                                                    )
                                                                })
                                                            }
                                                        </Picker>
                                                    </CardItem>
                                                </CardItem>
                                            </ProgressStep>
                                            <ProgressStep label="Packages"
                                                nextBtnStyle={styles.progressBtn}
                                                nextBtnTextStyle={styles.progressBtnText}
                                                previousBtnStyle={styles.progressBtn}
                                                previousBtnTextStyle={styles.progressBtnText}
                                                onNext={this.onPackageNext}
                                                errors={this.state.isError}
                                            >
                                                <CardItem style={{ flexDirection: 'column', backgroundColor: 'transparent', alignItems: 'stretch' }}>
                                                    {
                                                        this.state.packs.map((pack, index) => {
                                                            return (
                                                                <ListItem
                                                                    key={index}
                                                                    title={pack['Plan_name']}
                                                                    bottomDivider
                                                                    containerStyle={{ borderRadius: 5 }}
                                                                    underlayColor={'transparent'}
                                                                    leftAvatar={
                                                                        <Avatar
                                                                            rounded
                                                                            title={pack['Plan_name'][0]}
                                                                            size="small"
                                                                            overlayContainerStyle={{ backgroundColor: '#4FC3F7' }}
                                                                        />
                                                                    }
                                                                    rightIcon={
                                                                        <RadioButton
                                                                            value={pack['Plan_name']}
                                                                            color={'#4FC3F7'}
                                                                            status={packageChecked == pack['Plan_name'] ? 'checked' : 'unchecked'}
                                                                            onPress={() => { this.setPackageChecked(pack['Plan_name']) }}
                                                                        />
                                                                    }
                                                                    onPress={() => this._viewPackage(pack)}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </CardItem>
                                                <Overlay isVisible={this.state.isOverlay}
                                                    onBackdropPress={this.closeOverlay.bind(this)}
                                                >
                                                    <PricingCard
                                                        title={this.state.pack['Plan_name']}
                                                        titleStyle={{ fontSize: 20 }}
                                                        price={'GH¢' + this.state.pack['Pack_Cost']}
                                                        pricingStyle={{ fontSize: 18 }}
                                                        info={[
                                                            this.state.pack['Data_Transfer'] === 'N/A' ? 'Unlimited' : this.state.pack['Data_Transfer'] + 'GB',
                                                            '20mbps Bandwidth',
                                                            this.state.pack['validity']
                                                        ]}
                                                        button={{ title: 'Select Package' }}
                                                        onButtonPress={() => {
                                                            this.setPackageChecked(this.state.pack['Plan_name'])
                                                        }}
                                                    />
                                                </Overlay>
                                            </ProgressStep>
                                            <ProgressStep label="Identification"
                                                nextBtnStyle={styles.progressBtn}
                                                nextBtnTextStyle={styles.progressBtnText}
                                                previousBtnStyle={styles.progressBtn}
                                                previousBtnTextStyle={styles.progressBtnText}
                                                onNext={this.onIdentificationNext}
                                                errors={this.state.isError}
                                            >
                                                <View style={defaultStyles.form}>
                                                    <Text>Mode of Identification</Text>
                                                    <CardItem style={styles.input}>
                                                        <RadioButton
                                                            value={'voters'}
                                                            status={id_mode == 'voters' ? 'checked' : 'unchecked'}
                                                            onPress={() => { this.onChangeText('voters', 'id_mode') }}
                                                        />
                                                        <Text>Voters Id</Text>
                                                    </CardItem>
                                                    <CardItem style={styles.input}>
                                                        <RadioButton
                                                            value={'licence'}
                                                            status={id_mode == 'licence' ? 'checked' : 'unchecked'}
                                                            onPress={() => { this.onChangeText('licence', 'id_mode') }}
                                                        />
                                                        <Text>Driver's Licence</Text>
                                                    </CardItem>
                                                    <CardItem style={styles.input}>
                                                        <RadioButton
                                                            value={'national'}
                                                            status={id_mode == 'national' ? 'checked' : 'unchecked'}
                                                            onPress={() => { this.onChangeText('national', 'id_mode') }}
                                                        />
                                                        <Text>National ID</Text>
                                                    </CardItem>
                                                    <CardItem style={styles.input}>
                                                        <RadioButton
                                                            value={'ssnit'}
                                                            status={id_mode == 'ssnit' ? 'checked' : 'unchecked'}
                                                            onPress={() => { this.onChangeText('ssnit', 'id_mode') }}
                                                        />
                                                        <Text>SSNIT</Text>
                                                    </CardItem>
                                                    <CardItem style={{ marginBottom: 40 }}>
                                                        <Input
                                                            placeholder='ID Number'
                                                            containerStyle={styles.input}
                                                            inputContainerStyle={{ borderBottomWidth: 0 }}
                                                            onChangeText={(txt) => this.onChangeText(txt, 'id_number')}
                                                            value={this.state.id_number}
                                                        />
                                                    </CardItem>
                                                </View>

                                            </ProgressStep>

                                            <ProgressStep label="Final"
                                                nextBtnStyle={styles.progressBtn}
                                                nextBtnTextStyle={styles.progressBtnText}
                                                previousBtnStyle={styles.progressBtn}
                                                previousBtnTextStyle={styles.progressBtnText}
                                                onSubmit={this.onSubmit}
                                            >

                                                <View style={styles.buttonContainer}>
                                                    <Text>
                                                        Click Submit to Complete.
                                                        </Text>

                                                    <Overlay
                                                        isVisible={this.state.isSuccess}
                                                        onBackdropPress={this.closeSuccess.bind(this)}
                                                    >
                                                        <CardItem>
                                                            <Icon
                                                                name='check'
                                                                type='font-awesome'
                                                                color='#66BB6A'
                                                                size={36}
                                                            />
                                                        </CardItem>
                                                    </Overlay>
                                                    {/* <Button 
                                                            success
                                                            style={styles.button}
                                                            onPress={ this.signup.bind(this) }
                                                        >
                                                            <Text>Sign Up</Text>
                                                        </Button> */}
                                                </View>
                                            </ProgressStep>
                                        </ProgressSteps>

                                    </View>
                                </ImageBackground>
                            </View>
                        </ImageBackground>
                    </SafeAreaView>

                </ImageBackground>
            </SafeAreaView>
        )
    }
    _refresh = () => {
        this.setState({
            packs: [],
            username: '',
            pwd: '',
            isPassword: true,
            eye_icon: 'eye-off',
            address: '',
            landmark: '',
            // name: '',
            fname: '',
            lname: '',
            phone: '',
            email: '',
            community: '',
            city: '',
            region: '',
            referral: '',

            packageChecked: '',
            id_mode: '',
            id_number: '',
            isError: false,
            outerScrollViewScrollEnabled: true,

            isOverlay: false,
            isViewTerms: false,
            pack: {},

            isSuccess: false,

            isLoading: false
        })
    }
    componentDidMount() {
        this.getPackages();
    }

    // Collect Packs
    fetchPackages = async () => {

        var packs = await AsyncStorage.getItem('packs-store');
        if (!packs) {
            var response = await fetch('http://api.coliserver.com/pmsapi.php?op=listpackage');
            packs = await response.json();
        }
        packs.map((plan) => {
            if (plan['Plan_name'].toLowerCase() == GLOBAL.user[0]['Plan Name'].toLowerCase()) {
                GLOBAL.pack = plan;
            }
        });
    }
    togglePwd = () => {
        this.setState(prevState => ({
            eye_icon: prevState.eye_icon === 'eye' ? 'eye-off' : 'eye',
            isPassword: !prevState.isPassword
        }));
    }
    // When UserInfo Next Button is Pressed 
    onUserInfoNext = () => {

        const { username, fname, lname, pwd } = this.state;
        if (username.trim() == '') {
            this.setState({ isError: true })
            ToastAndroid.show('No username provided!', ToastAndroid.LONG);
        } else if (pwd.trim() == '') {
            this.setState({ isError: true })
            ToastAndroid.show('Please provide password!', ToastAndroid.LONG);
        } else if (fname.trim() == '') {
            this.setState({ isError: true })
            ToastAndroid.show('Please provide the first name of subscriber.', ToastAndroid.LONG);
        } else if (lname.trim() == '') {
            this.setState({ isError: true })
            ToastAndroid.show('Please provide the last name of subscriber.', ToastAndroid.LONG);
        } else {
            this.setState({ isError: false });
            // Append Username and password to formdata
            this.formData.append('usnm', this.state.username);
            this.formData.append('pwd', this.state.pwd);
            this.formData.append('fname', fname);
            this.formData.append('lname', lname);

            // Global Subscriber Username
            GLOBAL.subusername = this.state.username;
        }
    }
    // Next on Personal Info
    onPersonalInfoNext = () => {
        const { address, landmark, email, phone, city, region, community } = this.state;
        if (address.trim() == '') {
            this.setState({ isError: true })
            ToastAndroid.show('Please provide the address of subscriber.', ToastAndroid.LONG);
        } else if (landmark.trim() == '') {
            this.setState({ isError: true })
            ToastAndroid.show('Please state a close landmark.', ToastAndroid.LONG);
        } else if (phone.trim() == '') {
            this.setState({ isError: true })
            ToastAndroid.show('Please phone number of subscriber must be provide.', ToastAndroid.LONG);
        } else if (city.trim() == '') {
            this.setState({ isError: true })
            ToastAndroid.show('Please provide city of address.', ToastAndroid.LONG);
        } else if (region.trim() == '') {
            this.setState({ isError: true })
            ToastAndroid.show('Please specify region.', ToastAndroid.LONG);
        } else if (community.trim() == '') {
            this.setState({ isError: true })
            ToastAndroid.show('Please Select community.', ToastAndroid.LONG);
        } else {
            // Global Subscriber Phone
            GLOBAL.subphone = phone;
            // Append to form data
            this.formData.append('address', address);
            this.formData.append('landmark', landmark);
            this.formData.append('email', email);
            this.formData.append('phone', phone);
            this.formData.append('city', city);
            this.formData.append('region', region);
            this.formData.append('community', community);

            this.setState({ isError: false })
        }
    }
    // Next on Package
    onPackageNext = () => {
        const { packageChecked } = this.state;
        if (packageChecked.trim() == '') {
            this.setState({ isError: true })
            ToastAndroid.show('Please select package.', ToastAndroid.LONG);
        } else {
            this.setState({ isError: false });
            this.formData.append('package', packageChecked);

            GLOBAL.subpack = packageChecked;
        }
    }
    // Next on Identification
    onIdentificationNext = () => {
        const { id_mode, id_number } = this.state;
        if (id_mode.trim() == '') {
            this.setState({ isError: true })
            ToastAndroid.show('Select mode of identification.', ToastAndroid.LONG);
        } else if (id_number.trim() == '') {
            this.setState({ isError: true })
            ToastAndroid.show('Provide ID number.', ToastAndroid.LONG);
        } else {
            this.setState({ isError: false });
            this.formData.append('id_mode', id_mode);
            this.formData.append('id_number', id_number);
        }
    }
    // On Submit Form
    onSubmit = async () => {
        if (!this.state.isError) {
            // Start Loading Indicator
            this.setState({
                isLoading: true
            })
            try {
                this.formData.append('ref-submit-form', '_-_');
                this.formData.append('refcode', GLOBAL.referrer.refcode);

                var response = await fetch('https://coli.com.gh/dashboard/mobile/mob_subscribe.php', {
                    // var response = await fetch('http://192.168.47.1/dashboard/mobile/mob_subscribe.php', {
                    body: this.formData,
                    method: 'POST',
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                });
                var content = await response.text();
                if (content.includes('username-existing')) {
                    ToastAndroid.show('Username exists. Please input another.', ToastAndroid.LONG);
                } else if (content.includes('success')) {
                    Alert.alert("Application Submitted successfully.");
                    // Refresh Page
                    this._refresh();
                    // this.setState({
                    //     isSuccess: true
                    // });
                } else {
                    ToastAndroid.show(content, ToastAndroid.LONG);
                }
            } catch (e) {
                ToastAndroid.show(e.message, ToastAndroid.LONG);
            } finally {
                // End Loading Indicator
                this.setState({
                    isLoading: false
                })
            }

        }
        else {
            ToastAndroid.show('Please provide appropriate info.', ToastAndroid.LONG);
        }
    }
    onChangeText = (text, prop) => {
        switch (prop) {
            case 'fname':
                this.setState({ fname: text });
                break;
            case 'lname':
                this.setState({ lname: text });
                break;
            case 'pwd':
                this.setState({ pwd: text });
                break;
            case 'username':
                this.setState({ username: text })
                break;
            case 'address':
                this.setState({ address: text })
                break;
            case 'landmark':
                this.setState({ landmark: text })
                break;
            case 'id_number':
                this.setState({ id_number: text })
                break;
            case 'email':
                this.setState({ email: text })
                break;
            case 'phone':
                this.setState({ phone: text })
                break;
            case 'city':
                this.setState({ city: text })
                break;
            case 'id_mode':
                this.setState({ id_mode: text })
                break;
            default:
                break;
        }
    }
    setPackageChecked = (checked) => {
        this.setState({
            packageChecked: checked,
            isOverlay: false
        });
    }
    closeOverlay = () => {
        this.setState({ isOverlay: false })
    }
    closeSuccess = () => {
        this.setState({ isSuccess: false });
        this.forceUpdate();
    }
    onCommunityChanged = (community) => {
        this.setState({
            community: community
        })
    }
    onRegionChanged = (region) => {
        this.setState({
            region: region
        })
    }

    // Pop Pack Details View
    _viewPackage = (pack) => {
        this.setState({
            isOverlay: true,
            pack: pack
        })
    }

    innerUnScroll = () => this.setState({ outerScrollViewScrollEnabled: false });
    innerScroll = () => this.setState({ outerScrollViewScrollEnabled: true });
    // Fetch Packages from Server
    getPackages = async () => {
        var packs = await AsyncStorage.getItem('packs-store');
        try {
            if (!packs) {
                var response = await fetch('http://api.coliserver.com/pmsapi.php?op=listpackage');
                var packages = await response.json();

                packs = JSON.stringify(packages);
                await AsyncStorage.setItem('packs-store', packs);
            }
            var packages = JSON.parse(packs);

            packs = packages.filter((pack) => {
                return packageNames.find(name => name == pack['Plan_name']);
            })
            GLOBAL.packs = packs;
            this.setState({ packs })

        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Subscribe',
        tabBarIcon: ({ tintColor }) => <Icon type="foundation" name='clipboard-pencil' size={25} color={tintColor} />,

        headerLeft:
            <View style={{ marginHorizontal: 10 }}>
                <Icon type="Feather" name="chevron-left" style={{ margin: 10 }} onPress={() => navigation.goBack()} />
            </View>,
        // headerTitleStyle: { ...defaultStyles.white_shadow }

    })
}

// Styles for this View
const styles = StyleSheet.create({
    input_item: {
        width: '100%',
        borderWidth: 0,
        borderRadius: 30,
        backgroundColor: 'rgba(236, 239, 241,1.0)',
        paddingLeft: 20,
        paddingBottom: 5,
        alignSelf: 'center',
    },
    label: {
        color: 'grey',
        marginVertical: -10
    },
    input: {
        borderWidth: 0,
        borderRadius: 30,
        // backgroundColor: 'rgba(236, 239, 241,1.0)', 
        paddingBottom: 5,
        alignSelf: 'center',
        margin: 10,
        backgroundColor: 'white'
    },
    buttonContainer: {
        marginHorizontal: 20,
        marginTop: 30
    },
    button: {
        // backgroundColor: '#03A9F4',
        justifyContent: 'center',
        borderRadius: 30,
        marginHorizontal: 15
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
        flex: 1
    },
    float: {
        width: '100%',
        elevation: 5,
        alignSelf: 'center'
    },
    behind: {
        width: width,
        height: height,
        position: 'absolute'
    },
    progressBtn: {
        elevation: 5,
        backgroundColor: '#4FC3F7',
        borderRadius: 25,
        paddingHorizontal: 20
    },
    progressBtnText: {
        color: 'white'
    }
})