# Crashy Project 

Battery-included with automatic error logging, just provide your api server url

```Example : Crashy.init('your-server-api-url')```

## Usage

``` npm i git@github.com:kukuandroid/crashy.git#stable --save ```

In your app.js or application root,
```
import Crashy from "crashy"
Crashy.init({apiLogUrl : "your-api-server", errorTitle : "", errorMessage : "");
```

##  Prerequisite
Crashy has dependencies to libraries as below, make sure to install it :
1)  https://github.com/react-native-device-info/react-native-device-info
2)  https://react-native-async-storage.github.io/async-storage/docs/install
3)  https://github.com/react-native-netinfo/react-native-netinfo


## For react-native@0.60.0 or above

As react-native@0.60.0 or above supports autolinking, so there is no need to run linking process. Read more about autolinking here.


## Properties
Property | Type | Default | Desc
--- | --- | --- | ---
apiLogUrl *(required)* | `String` | null | Log Error Server Url
errorTitle  | `String` | default | Alert message title
errorMessage | `String` | default | Alert message body


## Maybank : Engineering Team

Peace ! ✌🏻🍻
