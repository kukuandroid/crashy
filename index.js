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
  sendToAPI,
} from './src/send-error';
import {clear, key} from './src/utils/local-storage';
import {checkIfItemExist} from './src/utils/shared';
// import {translate} from './src/utils/translator';

// let apiUrl;
// let errTitle;
// let errMsg;
// let custInfo;
// let dvcInfo;
let onErr;

const checkLocalData = async () => {
  let data = await checkIfItemExist(key);
  if (data) {
    await sendLog(JSON.parse(data));
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
    // pass callback
    onErr(errorInfo);
    sendLog(errorInfo);
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

export default {
  init ({
    apiLogUrl,
    errorTitle,
    errorMessage,
    customerInfo = {},
    deviceInfo = {},
    onError
  }) {
    global.apiLogUrl = apiLogUrl;
    // errMsg = errorMessage;
    // errTitle = errorTitle;
    global.customerInfo = customerInfo;
    global.deviceInfo = deviceInfo;
    onErr = onError;
    console.log('crashy initialization ...');
    setNativeExceptionHandler(() => {}, false);
    setJSExceptionHandler(errorHandler, true);
    checkLocalData();
  },
  sendToAPI (errTitle, errDetail) {
    const errorInfo = {
      name: errTitle,
      detail: errDetail
    };
    sendToAPI(errorInfo);
  }
};
