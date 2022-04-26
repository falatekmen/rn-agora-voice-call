import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Image,
    BackHandler
} from 'react-native';
import RtcEngine from 'react-native-agora';
import { navigate } from './customNavigator';
import { icons } from './assets';
import { units, fonts } from './theme';


export function CallScreen({ extraData, navigation }) {

    const { params } = extraData

    const [engine, setEngine] = useState({});
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeakerOn, setIsSpeakerOn] = useState(false);

    const agoraInit = async () => {
        setEngine(await RtcEngine.create(params.appId));
    };

    const agoraStart = async () => {
        await engine.joinChannel(
            params.token,
            params.channel,
            null,
            0,
        )
        engine.addListener('UserOffline', async () => {
            endCall();
        });
    };

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            agoraInit();
            isInitialMount.current = false;
        } else {
            agoraStart();
        }
    }, [engine]);

    const toggleMicrophone = async () => {
        await engine.muteLocalAudioStream(!isMuted)
            .then(() => setIsMuted(!isMuted));
    };

    const toggleSpeaker = async () => {
        await engine.setEnableSpeakerphone(!isSpeakerOn)
            .then(() => setIsSpeakerOn(!isSpeakerOn));
    };

    const endCall = async () => {
        await engine.leaveChannel()
        await engine.destroy()
        navigation.pop()
        navigate(params.mainScreen);
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
            <Text style={styles.text}>
                {params.callerName}
            </Text>
            <View style={styles.iconsWrapper}>
                <TouchableOpacity onPress={toggleMicrophone}>
                    <Image
                        source={isMuted ? icons.unmute : icons.mute}
                        style={styles.smallIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={endCall}>
                    <Image
                        source={icons.endCall}
                        style={styles.largeIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleSpeaker}>
                    <Image
                        source={isSpeakerOn ? icons.speakerOn : icons.speakerOff}
                        style={styles.smallIcon}
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
    text: {
        flex: 3,
        fontSize: fonts(36),
        marginTop: units.height / 18,
        alignSelf: 'center',
        color: '#333333'
    },
    iconsWrapper: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
    },
    smallIcon: {
        height: units.height / 11,
        width: units.height / 11
    },
    largeIcon: {
        height: units.height / 9,
        width: units.height / 9,
    }
});
