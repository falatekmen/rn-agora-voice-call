# React Native Agora Voice Call

Package to <ins>receive</ins> voice calls in React Native using Agora React Native SDK.

<img width="300" alt="image" src="https://user-images.githubusercontent.com/81239267/163897972-3c738f39-cb1d-474c-9505-2ca344f14013.png">

# Installation

Install `rn-agora-voice-call`:

    npm install rn-agora-voice-call

Go to your ios folder and run:

    pod install

# Agora Integration

In your React Native project, install the Agora React Native SDK.

    npm install react-native-agora
    
Go to your ios folder and run:

    pod install

The Agora React Native SDK uses Swift in native modules, and therefore your project must support compiling Swift. Otherwise, you will get errors when building the iOS app.

 1- Open the project with Xcode.

    cd ios
    open ProjectName.xcworkspace

 2- Click File > New > File.

<img width="450" alt="image" src="https://user-images.githubusercontent.com/81239267/164997855-9fa418bd-f902-4092-b269-eb61d161d787.png">

Select iOS > Swift File, and then click Next > Create to create a new File.swift file.

<img width="450" alt="image" src="https://user-images.githubusercontent.com/81239267/164997976-6b6af309-1dda-471d-b8d2-d9c6b536ff69.png">
<img width="450" alt="image" src="https://user-images.githubusercontent.com/81239267/164997962-f3f3f538-5da4-456f-b933-e88a0ee8170b.png">

For more information: [Agora.io](https://docs.agora.io/en/Voice/start_call_audio_react_native?platform=React%20Native)

# Usage

`Note:` Don't forget to ask for microphone permission at runtime before the call starts. You can use the [react-native-permissions](https://www.npmjs.com/package/react-native-permissions) package for this. In addition, the application must have [navigation](https://reactnavigation.org) installed.

1- Import the `AgoraCall` and `navigationRef` from the package to the main navigation. Add `AgoraCall` as a component to the navigator and add `navigationRef` as a ref to the NavigationContainer.

<img width="525" alt="image" src="https://user-images.githubusercontent.com/81239267/164985053-1b8ccc8b-f5d9-4e14-986c-4d0be90fc587.png">

2- You can receive Agora call from any screen. Specify a screen and import the `navigate` from the package and get the necessary parameters for Agora with a notification on that screen. Send the parameters to the `AgoraCall` component with the `params` key.

<img width="425" alt="image" src="https://user-images.githubusercontent.com/81239267/164985235-4ca4e41c-291a-45d5-8a5a-1617b84bfbb6.png">

Send the following parameters to your application with a notification:

`callerName`: The name that will appear on the screen when the call starts.

`token`: Agora Token.

`channel`: Agora channel name specified when generating the Agora token.

`appId`: Agora App ID.

`mainScreen`: Any screen name in the navigation to return to after completing the call.

# Testing the package

You can use the [AgoraCall](https://github.com/falatekmen/AgoraCall) app to test your app. With this application, you can initiate a call and get the necessary parameters for the package.