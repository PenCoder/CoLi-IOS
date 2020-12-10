import React from 'react';
import { View } from 'native-base';
import WebView from 'react-native-webview';
import { Overlay } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

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
                <Spinner
                    visible={this.state.isLoading}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                    cancelable={true}
                />

                <WebView
                    source={{ uri: this.state.url }}
                    onLoadEnd={() => this.setState({ isLoading: false })}
                    onLoadStart={() => this.setState({ isLoading: true })}
                />
            </View>
        )
    }
}