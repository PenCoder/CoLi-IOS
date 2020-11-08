import React from 'react';
import { StyleSheet, ToastAndroid, ScrollView, SafeAreaView, ImageBackground, Alert, FlatList } from 'react-native';
import { Avatar, Input, Overlay, PricingCard, ListItem, CheckBox, Icon, Divider } from 'react-native-elements';
import { H3, Button, Text, CardItem, Picker, H1, View } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import defaultStyles from '../../styles';

import { Dimensions } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { RadioButton, ActivityIndicator, Chip, TextInput } from 'react-native-paper';
import PDFView from 'react-native-view-pdf';

const communities = require('../assets/communities.json');

// GLOBAL
GLOBAL = require('../../global');
// Screen Height and Width
const { height, width } = Dimensions.get('screen');

// List of Packages to display
const packageNames = ['CoLi Plus Mini', 'CoLi Value', 'CoLiPlus', 'CoLi Extra', 'CoLi Office'];

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
            occupation: '',
            // name: '',
            fname: '',
            lname: '',
            phone: '',
            email: '',
            community: '',
            city: '',
            region: '',
            referral: '',
            refcode: '',
            other: '',
            isAccept: false,

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

                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <CardItem style={{ justifyContent: 'center', backgroundColor: 'transparent' }}>
                        <H1 style={{ color: '#0288D1', margin: 5, fontSize: 32 }}>SUBSCRIBE</H1>
                    </CardItem>
                    <ScrollView style={{ flex: 1 }}>
                        <View
                            style={{ flex: 1, backgroundColor: 'rgba(242, 245, 247,1.0)', borderRadius: 20 }}
                        >
                            <View style={{ flex: 1 }}>
                                <CardItem bordered style={{ paddingLeft: 15 }}>
                                    <Icon
                                        name="user"
                                        type="font-awesome"
                                        color="green"
                                    />
                                    <CardItem>
                                        <H3>User Info</H3>
                                    </CardItem>

                                </CardItem>

                                <CardItem style={{ flexDirection: 'column', backgroundColor: 'transparent' }}>

                                    <Input
                                        placeholder='Username'
                                        containerStyle={styles.input}
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        onChangeText={(txt) => this.onChangeText(txt, 'username')}
                                        value={this.state.username}
                                    />
                                    <Input
                                        placeholder='Password'
                                        containerStyle={styles.input}
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        onChangeText={(txt) => this.onChangeText(txt, 'pwd')}
                                        value={this.state.pwd}
                                        secureTextEntry={this.state.isPassword}
                                        rightIcon={<Icon
                                            type={'material-community'}
                                            name={this.state.eye_icon}
                                            style={{ color: 'rgba(200, 200, 200,1.0)' }}
                                            onPress={() => this.togglePwd()}
                                        />}
                                    />

                                    <Input
                                        placeholder='First Name'
                                        containerStyle={styles.input}
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        onChangeText={(txt) => this.onChangeText(txt, 'fname')}
                                        value={this.state.fname}
                                    />
                                    {/* <Input
                                        placeholder='Last Name'
                                        containerStyle={styles.input}
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        onChangeText={(txt) => this.onChangeText(txt, 'lname')}
                                        value={this.state.lname}
                                    /> */}
                                </CardItem>

                            </View>


                            <CardItem style={{ flexDirection: 'column', backgroundColor: 'transparent' }}>
                                <Input
                                    placeholder='Address'
                                    containerStyle={styles.input}
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    onChangeText={(txt) => this.onChangeText(txt, 'address')}
                                    value={this.state.address}
                                />
                                <Input
                                    placeholder='Occupation'
                                    containerStyle={styles.input}
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    onChangeText={(txt) => this.onChangeText(txt, 'occupation')}
                                    value={this.state.occupation}
                                />
                                <Input
                                    placeholder='Email'
                                    containerStyle={styles.input}
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    onChangeText={(txt) => this.onChangeText(txt, 'email')}
                                    value={this.state.email}
                                />
                                <Input
                                    placeholder='Personal Contact'
                                    containerStyle={styles.input}
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    onChangeText={(txt) => this.onChangeText(txt, 'phone')}
                                    value={this.state.phone}
                                />

                                <Input
                                    placeholder='City/Town'
                                    containerStyle={{ ...styles.input }}
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    onChangeText={(txt) => this.onChangeText(txt, 'city')}
                                    value={this.state.city}
                                />


                            </CardItem>
                            <CardItem style={{ flexDirection: 'column', backgroundColor: 'transparent' }}>
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
                                    style={{ ...styles.input }}
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
                                <CardItem style={{ ...styles.input }}>
                                    <Picker
                                        mode='modal' note
                                        placeholder=""
                                        style={{ width: undefined, borderWidth: 2, elevation: 2 }}
                                        iosIcon={<Icon name='arrow-down' />}
                                        selectedValue={this.state.packageChecked}
                                        onValueChange={this.setPackageChecked.bind(this)}
                                    >
                                        <Picker.Item label="Select Package"></Picker.Item>
                                        {
                                            this.state.packs.map((p, index) => {
                                                return (
                                                    <Picker.Item label={p.Plan_name + ' - ' + p.Pack_Cost} value={p.Plan_name} key={index} />
                                                );
                                            })
                                        }
                                    </Picker>

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
                                </CardItem>
                            </CardItem>

                            <View style={defaultStyles.form}>
                                <CardItem bordered style={defaultStyles.transparent}>
                                    <Divider style={{ flex: 1, margin: 5 }} />
                                    <Text style={{ color: '#0288D1' }}>Mode of Identification</Text>
                                </CardItem>

                                <CardItem style={{ flex: 1, flexWrap: 'wrap' }}>
                                    <RadioButton.Group
                                        onValueChange={value => this.onChangeText(value, 'id_mode')}
                                        value={this.state.id_mode}
                                    >
                                        <View style={{ flexDirection: 'row', margin: 10 }}>
                                            <Chip
                                                avatar={<RadioButton
                                                    value={'voters'}
                                                    color={'#0D47A1'}
                                                />}>Voter's ID</Chip>
                                        </View>
                                        <View style={{ flexDirection: 'row', margin: 10 }}>
                                            <Chip
                                                avatar={
                                                    <RadioButton
                                                        value={'licence'}
                                                        color={'#0D47A1'}
                                                    />}>Driver's Licence</Chip>
                                        </View>
                                        <View style={{ flexDirection: 'row', margin: 10 }}>
                                            <Chip
                                                avatar={<RadioButton
                                                    value={'national'}
                                                    color={'#0D47A1'}
                                                />}>National Card</Chip>
                                        </View>
                                        <View style={{ flexDirection: 'row', margin: 10 }}>
                                            <Chip
                                                avatar={<RadioButton
                                                    value={'ssnit'}
                                                    color={'#0D47A1'}
                                                />}>SSNIT</Chip>
                                        </View>
                                    </RadioButton.Group>
                                </CardItem>

                                <Input
                                    placeholder='ID Number'
                                    containerStyle={styles.input}
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    onChangeText={(txt) => this.onChangeText(txt, 'id_number')}
                                    value={this.state.id_number}
                                />

                            </View>


                            <View style={defaultStyles.form}>
                                <>
                                    <CardItem bordered style={defaultStyles.transparent}>
                                        <Divider style={{ flex: 1, margin: 5 }} />
                                        <Text style={{ color: '#0288D1' }}>How did you hear about us?</Text>
                                    </CardItem>

                                    <CardItem
                                        style={{ ...styles.input }}
                                    >
                                        <Picker
                                            mode='modal'
                                            note
                                            placeholder="Referral"
                                            placeholderStyle={{ color: "#bfc6ea" }}
                                            placeholderIconColor="#007aff"
                                            style={{ width: undefined }}
                                            iosIcon={<Icon name='arrow-down' />}
                                            selectedValue={this.state.referral}
                                            onValueChange={this.onRefChanged.bind(this)}
                                        >
                                            <Picker.Item label="Family / Friend" value='Family / Friend' />
                                            <Picker.Item label="Coli Staff" value='Coli Staff' />
                                            <Picker.Item label="Customer" value='Customer' />
                                            <Picker.Item label="Sales Person" value='Sales Person' />
                                            <Picker.Item label="Social Media" value='Social Media' />
                                            <Picker.Item label="TV ad" value='TV Ad' />
                                            <Picker.Item label="Search Engine" value='Search Engine' />
                                            <Picker.Item label="Bill Board" value='Bill Board' />
                                            <Picker.Item label="Referrer" value='Referrer' />
                                            <Picker.Item label="Other" value='Other' />
                                        </Picker>
                                    </CardItem>

                                </>
                                <Input
                                    placeholder='Name / Username (if person)'
                                    containerStyle={{ ...styles.input }}
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    onChangeText={(txt) => this.onChangeText(txt, 'other')}
                                    value={this.state.other}
                                />

                                {
                                    this.state.referral == 'Referrer' ?
                                        <Input
                                            placeholder='Referrer Code (if referrer'
                                            containerStyle={{ ...styles.input }}
                                            inputContainerStyle={{ borderBottomWidth: 0 }}
                                            onChangeText={(txt) => this.onChangeText(txt, 'refcode')}
                                            value={this.state.refcode}
                                        />
                                        :
                                        null
                                }
                                <CheckBox
                                    title={
                                        'I accept the terms and conditions for signing up to this service, and hereby confirm I have read the privacy policy.'
                                    }
                                    checked={this.state.isAccept}
                                    onPress={() => this.setState({ isAccept: !this.state.isAccept })}
                                />

                                <View style={{ backgroundColor: 'rgba(236, 239, 241,1.0)', justifyContent: 'center', margin: 10 }}>
                                    <Button info block small onPress={this.viewTerms.bind(this)}>
                                        <Text>View Terms and Agreement</Text>
                                    </Button>
                                </View>

                                <View style={{ backgroundColor: 'rgba(236, 239, 241,1.0)', justifyContent: 'center', margin: 10 }}>
                                    <Button success block
                                        style={{ elevation: 10 }}
                                        onPress={this.onSubmit.bind(this)}
                                    >
                                        <Text>Submit</Text>
                                    </Button>
                                </View>
                                <Overlay
                                    isVisible={this.state.isViewTerms}
                                    onBackdropPress={() => this.setState({ isViewTerms: false })}
                                    fullScreen
                                >
                                    <View style={{ flex: 1 }}>
                                        <PDFView
                                            style={{ flex: 1 }}
                                            resource={'https://coli.com.gh/files/terms_and_conditions.pdf'}
                                            resourceType={'url'}
                                        />
                                        <CardItem style={{ alignItems: 'flex-end' }}>
                                            <Button rounded light onPress={() => this.setState({ isViewTerms: false })}>
                                                <Text>close</Text>
                                            </Button>
                                        </CardItem>
                                    </View>
                                </Overlay>
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

                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>

        )
    }
    componentDidMount() {
        this.getPackages();
    }

    signup = async () => {

        var { username, pwd } = this.state;
        try {
            if (username && pwd) {
                var response = await fetch('http://api.coliserver.com/pmsapi.php?op=userinfo&Uid=' + username)
                var json = await response.json();
                if (json) {
                    GLOBAL.user = json;

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

                    this.props.navigation.navigate('Main');
                }
                else {
                    ToastAndroid.show('No json', ToastAndroid.SHORT);
                }
            }
            else if (!username) {
                ToastAndroid.show('Please Input Username!', ToastAndroid.SHORT);
            }
            else if (!pwd) {
                ToastAndroid.show('Please Input User Password!', ToastAndroid.SHORT);
            }
        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.SHORT)
        }
    }

    togglePwd = () => {
        this.setState(prevState => ({
            eye_icon: prevState.eye_icon === 'eye' ? 'eye-off' : 'eye',
            isPassword: !prevState.isPassword
        }));
    }
    viewTerms = () => {
        this.setState({ isViewTerms: true })
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
        const { address, occupation, email, phone, city, region, community } = this.state;
        if (address.trim() == '') {
            this.setState({ isError: true })
            ToastAndroid.show('Please provide the address of subscriber.', ToastAndroid.LONG);
        } else if (occupation.trim() == '') {
            this.setState({ isError: true })
            ToastAndroid.show('Please state your occupation.', ToastAndroid.LONG);
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
            this.formData.append('occupation', occupation);
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
    onSubmit = () => {
        this.onUserInfoNext();
        this.onPersonalInfoNext();
        this.onPackageNext();
        this.onIdentificationNext();
        if (this.state.isError) {
            return;
        }
        return;
        const { referral, isAccept } = this.state;
        if (referral.trim == '') {
            ToastAndroid.show('Please Select Referral Option', ToastAndroid.LONG);
        } else if (!isAccept) {
            ToastAndroid.show('Please agree to Terms and Conditions before proceed', ToastAndroid.LONG);
        } else {
            this.formData.append('refcode', this.state.refcode);
            this.formData.append('referral', referral);
            this.formData.append('other', this.state.other);

            this.subscribeSubmit();
        }
    }
    subscribeSubmit = async () => {
        if (!this.state.isError) {
            this.setState({
                isLoading: true
            })
            try {
                this.formData.append('submit-form', '_-_');
                this.formData.append('staff', 'self-mobile');

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

                    // this.setState({
                    //     isSuccess: true
                    // });
                } else {
                    Alert.alert('Content', content);
                }
            } catch (e) {
                ToastAndroid.show(e.message, ToastAndroid.LONG);
            } finally {
                this.setState({
                    isLoading: false
                })
            }
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
            case 'other':
                this.setState({ other: text })
                break;
            case 'refcode':
                this.setState({ refcode: text })
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
    // On Package Changed 
    onPackageChanged = (pack) => {

        this.setState({
            packageSelected: pack,
            amount: pack['Pack_Cost'],
            savedPlan: pack['Plan_name']
        })
    }
    onCommunityChanged = (community) => {
        this.setState({
            community: community
        })
    }
    onRefChanged = (ref) => {
        this.setState({
            referral: ref
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

    // Fetch Packages from Server
    getPackages = async () => {
        try {
            var response = await fetch('http://api.coliserver.com/pmsapi.php?op=listpackage');
            var packages = await response.json();

            var packs = packages.filter((pack) => {
                return packageNames.find(name => name == pack['Plan_name']);
            })
            GLOBAL.packs = packs;
            this.setState({ packs })

        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '',
        headerTransparent: true,
        headerLeft: <Icon type="feather" name="arrow-left" raised color="#1565C0" onPress={() => navigation.goBack()} />,

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
        borderRadius: 5,
        paddingBottom: 5,
        alignSelf: 'center',
        margin: 8,
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