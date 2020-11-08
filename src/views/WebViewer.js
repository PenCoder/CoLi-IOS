import React from 'react';
import { View } from 'native-base';
import WebView from 'react-native-webview';
import { Overlay } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

export default class WebViewer extends React.Component {
    constructor(props) {
        super(props);

        const { params } = props.navigation.state;
        if (params == null) {
            props.navigation.goBack();
        }
        else {
            this.state = {
                url: params.url,
                isLoading: true
            };
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Overlay
                    isVisible={this.state.isLoading}
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
                <WebView
                    source={{ uri: this.state.url }}
                    onLoadEnd={() => this.setState({ isLoading: false })}
                    onLoadStart={() => this.setState({ isLoading: true })}
                />
            </View>
        )
    }
}