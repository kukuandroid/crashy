# Crashy Project 

Battery-included with automatic error logging, just provide your api server url

```Example : Crashy.init('your-server-api-url')```

## Usage

``` npm i git@github.com:kukuandroid/crashy.git#stable --save ```

In your app.js or application root,
```
import Crashy from "crashy"

const options = {
    apiUrl: "https://sit-maya.maybank.com.my/v1/logs",
    errorTitle: "Error Title",
    customerId : "88a123x-12asdwx-19kks92a"
};
  
 <Crashy options={options}>
 {YourApplicationCode}
 </Crashy>
```

##  Peer-dependencies
Crashy has dependencies to libraries as below, make sure to install it :

| No | Library | Link |
| :---:   | :-: | :-: |
| 1 | React Native Device Info | https://github.com/react-native-device-info/react-native-device-info |
| 2 | Async Storage | https://react-native-async-storage.github.io/async-storage/docs/install |
| 3 | React Native NetInfo |  https://github.com/react-native-netinfo/react-native-netinfo |


## For react-native@0.60.0 or above

As react-native@0.60.0 or above supports autolinking, so there is no need to run linking process. Read more about autolinking here.


## Option Properties
Property | Type | Default | Desc
--- | --- | --- | ---
apiLogUrl *(required)* | `String` | null | Log Error Server Url
errorTitle  | `String` | default | Alert message title
errorMessage | `String` | default | Alert message body


## Maybank : Engineering Team

Peace ! ✌🏻🍻
