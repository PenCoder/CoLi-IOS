import React from 'react';
import { View, StyleSheet, ToastAndroid, Dimensions, FlatList, RefreshControl } from 'react-native';
import { Text, CardItem, H1, Button } from 'native-base';
import { Icon, ListItem } from 'react-native-elements';
import { Chip } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import defaultStyles from '../../styles';


const { width } = Dimensions.get('screen');

// const packageNames = ['Home', 'Regular', 'Basic', 'Standard', 'Business', 'Office', 'CoLiPlus'];
const packageNames = ['CoLi Plus Mini', 'CoLi Value', 'CoLiPlus', 'CoLi Extra', 'CoLi Office'];

@inject('globalProps')
@observer
export default class Packages extends React.Component {
    constructor(props) {
        super(props);

        // this.fetchPackages.bind(this);
        this.state = {
            packs: [],
            isRefreshing: false
        }
    }


    render() {
        // SET GLOBAL PROPS 
        this.GlobalProps = this.props.globalProps;

        const { packs, isRefreshing } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(245, 245, 245,1.0)' }}>
                <CardItem style={{ width: width, }}
                >
                    <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="package" type="feather" color="#0288D1" raised />
                        <H1 style={{ color: '#0288D1' }}>Packages</H1>
                    </View>
                </CardItem>

                <View style={{ flex: 1 }}>

                    <View style={{ backgroundColor: 'rgba(236, 239, 241,1.0)', borderRadius: 20, flex: 1 }}>

                        <FlatList
                            contentContainerStyle={{ backgroundColor: 'rgba(236, 239, 241,1.0)' }}
                            style={{ padding: 10, flex: 1 }}
                            data={packs}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <ListItem
                                    title={item['Plan_name']}
                                    subtitle={
                                        <CardItem style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
                                            <Chip
                                                style={{ flexWrap: 'wrap' }}
                                                textStyle={{ color: 'white' }}
                                                onPress={() => { this.viewPackage(item) }}

                                            >
                                                <Text style={{ fontWeight: 'bold' }}>GH₵ {item['Pack_Cost']}</Text>
                                            </Chip>
                                        </CardItem>
                                    }
                                    titleStyle={{ fontSize: 18, color: '#0288D1', }}
                                    subtitleStyle={{ fontSize: 14, }}
                                    rightElement={
                                        <View>
                                            <Button info small
                                                style={{ ...defaultStyles.shadow10 }}
                                                onPress={() => {
                                                    this.goToRenew(item)
                                                }}
                                            >
                                                <Text>Select</Text>
                                            </Button>
                                        </View>
                                    }
                                    containerStyle={{ borderRadius: 5, margin: 5 }}
                                    leftElement={
                                        <View style={{ width: 5, height: '100%', backgroundColor: 'rgba(98, 135, 181, 1)' }}></View>
                                    }
                                    onPress={() => this.viewPackage(item)}
                                />
                            }
                            ListEmptyComponent={
                                <View
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Text note style={{ fontSize: 24 }}>No records available</Text>
                                </View>
                            }
                            refreshControl={
                                <RefreshControl
                                    onRefresh={this.onRefresh}
                                    refreshing={isRefreshing}
                                />
                            }
                        />
                    </View>
                </View>
            </View>
        )
    }

    async componentDidMount() {
        await this.getPackages();
    }
    // Refresh Packages 
    onRefresh = async () => {
        this.setState({ isRefreshing: true })
        await this.getPackages();
        this.setState({ isRefreshing: false })
    }

    // Get Packages 
    getPackages = async () => {
        var packs = [];
        try {
            // var response = await fetch('http://api.coliserver.com/pmsapi.php?op=listpackage');
            // packs = await response.json();

            // var body = new FormData();
            // body.append('mob-get-active-packs');
            // var activeResponse = await fetch(
            //     'https://coli.com.gh/php/packages.php',
            //     {
            //         body: body,
            //         method: 'POST',
            //         header: {
            //             Accept: 'application/json',
            //             'Content-Type': 'multipart/form-data',
            //         },
            //     }
            // );
            // var activeNames = await activeResponse.json();

            // var packages = packs.filter((pack) => {
            //     return activeNames.find(name => name == pack['Plan_name']);
            // });
            // this.GlobalProps.updateProp('packs', packages);
            // this.GlobalProps.updateProp('activePacks', activeNames);

            await this.props.globalProps.getActivePacks();
            this.setState({ packs: this.props.globalProps.packs });

        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    }

    // Go To Renew
    goToRenew = (pack) => {
        this.GlobalProps.updateProp('selectedPack', pack);
        this.props.navigation.navigate('Payment');
    }
    // View Selected Package Details
    viewPackage(pack) {
        this.GlobalProps.updateProp('selectedPack', pack);
        this.props.navigation.push('Package');
    }
    static navigationOptions = () => ({
        headerTitle: '',
        drawerIcon: () => <Icon type="feather" name='package' size={20} />,
        tabBarIcon: ({ tintColor }) => <Icon type="feather" name='package' size={20} color={tintColor} />,
        headerTransparent: true,
        // headerLeft: 
        //     <View style={{marginHorizontal: 10}}>
        //         <Icon raised type="feather" name="menu" style={{margin: 10}} onPress={() => navigation.openDrawer()} />
        //     </View>,
        // headerStyle: {
        //     backgroundColor: 'transparent'//'#0288D1'
        // },
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