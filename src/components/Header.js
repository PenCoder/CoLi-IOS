import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem} from 'native-base';
import {Header, Icon} from 'react-native-elements';

const MainHeader = ({props}) => {
    return(
        <View>
            <Header
                backgroundColor={'transparent'}
                leftComponent={
                    <Icon raised type="feather" name="menu" style={{margin: 10}} onPress={() => props.navigation.openDrawer()} />
                }
            />
        </View>
    )
}
export default MainHeader;