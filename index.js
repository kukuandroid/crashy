import {Alert} from 'react-native';
import {defaultTitle} from './src/config';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from './src/error-handler';
import {
  fetchOriginalErrorLine,
  formatString,
  sendLog,
} from './src/send-error';
import {clear} from './src/utils/local-storage';
import {checkIfItemExist} from './src/utils/shared';
// import {translate} from './src/utils/translator';

let apiUrl;
let errTitle;
let errMsg;
let custInfo;
let dvcInfo;
let onErr;

const checkLocalData = async () => {
  let data = await checkIfItemExist('@error_logs');
  if (data) {
    await sendLog(apiUrl, JSON.parse(data), custInfo, dvcInfo);
    clear();
  }
};

const errorHandler = async (e, isFatal) => {
  let errString = JSON.stringify(e, Object.getOwnPropertyNames(e));
  const formattedString = formatString(errString);
  const line = formattedString[0];
  const column = formattedString[1];
  // let errorInfo =  translate(line, column);
  let errorInfo = await fetchOriginalErrorLine(line, column);
  // alert message
  if (isFatal) {
    // Alert.alert(
    //   errTitle ? errTitle : defaultTitle,
    //   errMsg ? errMsg : JSON.stringify(errorInfo),
    //   [
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     {text: 'OK', onPress: () => console.log('OK Pressed')},
    //   ]
    // );

    // pass callback
    onErr(errorInfo);
    sendLog(apiUrl, errString, custInfo, dvcInfo);
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

export default {
  init ({
    apiLogUrl = '',
    errorTitle = '',
    errorMessage = '',
    customerInfo = '',
    deviceInfo = {},
    onError = {}
  }) {
    apiUrl = apiLogUrl;
    errMsg = errorMessage;
    errTitle = errorTitle;
    custInfo = customerInfo;
    dvcInfo = deviceInfo;
    onErr = onError;
    console.log('crashy initialization ...');
    setNativeExceptionHandler(() => {}, false);
    setJSExceptionHandler(errorHandler, true);
    checkLocalData();
  },
};
