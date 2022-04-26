import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IncomingCall } from './incomingCall';
import { CallScreen } from './call';

const Stack = createStackNavigator();

export default function MainNavigation({ route }) {

  const extraData = route.params

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
      <Stack.Screen name="IncomingCall" >
        {props => <IncomingCall {...props} extraData={extraData} />}
      </Stack.Screen>
      <Stack.Screen name="Call" >
        {props => <CallScreen {...props} extraData={extraData} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}