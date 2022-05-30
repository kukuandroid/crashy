# Crashy 

Battery-included with automatic error logging, just provide your api server url. Support offline mode

A react native module that lets you to register a global error handler that can capture fatal/non fatal uncaught exceptions. The module helps prevent abrupt crashing of RN Apps without a graceful message to the user.

In the current scenario:

In DEV mode , you get a RED Screen error pointing your errors.
In Bundled mode , the app just quits without any prompt !

## Features

-   [x] Automatic error handler.
-   [x] Automatic report to server.
-   [x] Support offline mode.

## Installation
**Note: You must be using React Native 0.60.0 or higher to use the most recent version of `crashy`.**

For iOS, just run pod install

``` npm install https://github.com/kukuandroid/crashy.git#stable --save ```

## Basic Usage

In your app.js or application root,
```
import Crashy from "crashy"

Crashy.init({
   apiUrl: "your-api-url",
   deviceInfo: { // any device details },
   errorTitle: "your-error-title",
   customerInfo: { mayaUserId, username },
   errorMessage: "",
 });
```

##  Peer-dependencies
Crashy has dependencies to libraries as below, make sure to install it :

| No | Library | Link |
| :---:   | :-: | :-: |
| 1 | Async Storage | https://react-native-async-storage.github.io/async-storage/docs/install |


## For react-native@0.60.0 or above

As react-native@0.60.0 or above supports autolinking, so there is no need to run linking process. Read more about autolinking here.

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-exception-handler` and add `ReactNativeExceptionHandler.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libReactNativeExceptionHandler.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

##### Using Cocoapods

1. add `pod 'ReactNativeExceptionHandler', :podspec => '../node_modules/react-native-exception-handler/ReactNativeExceptionHandler.podspec'` to your Podfile
2. run `pod install`

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`

- Add `import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;` to the imports at the top of the file
- Add `new ReactNativeExceptionHandlerPackage()` to the list returned by the `getPackages()` method

2. Append the following lines to `android/settings.gradle`:
   ```
   include ':react-native-exception-handler'
   project(':react-native-exception-handler').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-exception-handler/android')
   ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
   ```
     compile project(':react-native-exception-handler')
   ```
   

## Option Properties
Property | Type | Default | Desc
--- | --- | --- | ---
apiUrl *(required)* | `String` |  | Log Error Server Url
errorTitle  | `String` | Ops,something went wrong | Alert message title
errorMessage | `String` | default | Message body
customerInfo | `Object` |  | Username, userId
deviceInfo | `Object` |   | Device information eg. deviceId, platformOS


## Maybank : Engineering Team

Peace ! ✌🏻🍻
