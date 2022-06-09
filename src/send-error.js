import {getItem, setItem} from './utils/local-storage';
//  import {translate} from './utils/translator';

export const sendToAPI = async (errorInfo) => {
  try {
    let body = {
      errorInfo,
      deviceInfo: global.deviceInfo,
      customerInfo: global.customerInfo,
      timestamp: new Date(),
    };
    console.log(JSON.stringify(body));

    const rawResponse = await fetch(global.apiLogUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const content = await rawResponse.json();
    console.log('error sent', content);
    return content;
  } catch (err) {
    console.log('err', err);
    saveToLocalStorage(errorInfo);
    // throw new Error;
  }
};

const saveToLocalStorage = async (errorInfo) => {
  var existing = await getItem();
  existing = existing ? JSON.parse(existing) : [];
  if (errorInfo) {
    existing.push({
      errorInfo,
      deviceInfo: global.deviceInfo,
      custInfo: global.customerInfo,
    });
    await setItem(JSON.stringify(existing));
  }
};

export const fetchOriginalErrorLine = (line, column) => {
  const url = `https://adr9r5gtng.execute-api.us-east-1.amazonaws.com/default/translate-sourcemap?line=${line}&column=${column}`;
  let errorLine = fetch(url).
    then((response) => response.json()).
    then((json) => json).
    catch((error) => error);
  return errorLine;
};
export const formatString = (text) => {
  let startIdx = text.indexOf('1');
  let endIdx = text.indexOf(')');
  let result = text.substring(startIdx, endIdx);
  return result.split(':');
};
export const sendLog = async (errorInfo) => {
  try {
    await sendToAPI(errorInfo);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sendToAPI: sendToAPI,
  sendLog: sendLog,
  formatString: formatString,
  fetchOriginalErrorLine: fetchOriginalErrorLine,
  saveToLocalStorage: saveToLocalStorage,
};
