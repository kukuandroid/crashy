import {getItem, key, setItem} from './utils/local-storage';
//  import {translate} from './utils/translator';

export const sendToAPI =  async (url, errorInfo, custInfo, deviceInfo) => {
  try {
    let body = {
      errorInfo,
      deviceInfo,
      custInfo,
      timestamp: new Date()
    };
    console.log(JSON.stringify(body));
    const rawResponse = await fetch(url, {
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
    saveToLocalStorage(errorInfo, deviceInfo, custInfo);
    // throw new Error;
  }
};


const saveToLocalStorage = async (errorInfo, deviceInfo, custInfo) => {
  var existing =  await getItem(key);
  existing = existing ? JSON.parse(existing) : [];
  if (errorInfo) {
    existing.push({errorInfo, deviceInfo, custInfo});
    await setItem(key, JSON.stringify(existing));
  }
};


export const fetchOriginalErrorLine = (line, column) => {
  const url = `https://adr9r5gtng.execute-api.us-east-1.amazonaws.com/default/translate-sourcemap?line=${line}&column=${column}`;
  let errorLine =  fetch(url).
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
export const sendLog = async (url, error, custInfo, dvcInfo) => {
  try {
    const formattedString = formatString(error);
    const line =  formattedString[0];
    const column =  formattedString[1];
    let errorInfo =  await fetchOriginalErrorLine(line, column);
    //  let errorInfo = translate(line, column);
    await sendToAPI(url, errorInfo, custInfo, dvcInfo);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sendToAPI: sendToAPI,
  sendLog: sendLog,
  formatString: formatString,
  fetchOriginalErrorLine: fetchOriginalErrorLine,
  saveToLocalStorage: saveToLocalStorage
};