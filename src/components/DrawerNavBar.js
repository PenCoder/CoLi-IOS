import React from 'react';
import { Image, ScrollView } from 'react-native';
import {Container, Header, Body, Content} from 'native-base';
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerNavigatorItems } from 'react-navigation-drawer';

const DrawerNavBar = props =>(
      <ScrollView>
      <SafeAreaView>
            <Header style={{height: '20%'}}>
                <Body>
                    <Image
                    style={{width: 200, height: 90}}
                    source={{ uri: 'http://localhost:8081/src/media/images/logo.png' }}
                    />
                </Body>
            </Header>
            <Content>
                <DrawerNavigatorItems  {...props} />
            </Content>
        </SafeAreaView>
      </ScrollView>
    )
export default DrawerNavBar;