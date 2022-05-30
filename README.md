# Crashy 

Battery-included with automatic error logging, just provide your api server url. Support offline mode

## Installation

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
