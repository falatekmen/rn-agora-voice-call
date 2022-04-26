import React, { useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar,
    SafeAreaView,
    BackHandler
} from 'react-native';
import { navigate } from './customNavigator';
import { units, fonts } from './theme'

export const IncomingCall = ({ navigation, extraData }) => {

    const { params } = extraData

    const acceptCall = () => {
        navigation.navigate('Call')
    };

    const endCall = () => {
        navigate(params.mainScreen)
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                return true
            })
        return () => backHandler.remove()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <View style={styles.textWrapper}>
                <Text style={styles.text}>
                    {params.callerName}
                </Text>
                <Text style={styles.subText}>is calling</Text>
            </View>
            <View style={styles.iconWrapper}>
                <TouchableOpacity
                    onPress={endCall}>
                    <Image
                        style={styles.icon}
                        source={require('./assets/endCall.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={acceptCall}>
                    <Image
                        style={styles.icon}
                        source={require('./assets/acceptCall.png')}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    textWrapper: {
        flex: 3,
        alignItems: 'center',
        padding: units.height / 18,
    },
    text: {
        color: '#333333',
        fontSize: fonts(36),
    },
    subText: {
        color: '#333333',
        fontSize: fonts(24),
    },
    iconWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    icon: {
        height: units.height / 9,
        width: units.height / 9,
        alignSelf: 'center',
    },
});