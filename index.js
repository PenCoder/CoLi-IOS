/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import codePush from 'react-native-code-push';

// Code Push Options
let options = {
    updateDialog: false,
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.IMMEDIATE,
    rollbackRetryOptions: {
        delayInHours: 1 / 60,
        maxRetryAttempts: 3
    }
}

AppRegistry.registerComponent(appName, () => App);
