import {getItem, setItem} from './utils/local-storage';
// import {translate} from './utils/translator';

const sendToAPI =  async (url, errorInfo, custInfo, deviceInfo) => {
  try {
    let body = {
      errorInfo,
      deviceInfo,
      custInfo 
    };
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const content = await rawResponse.json();
    console.log(JSON.stringify(body));
    console.log('error sent', content);
    console.log('====================================');
    return content;
  } catch (err) {
    saveToLocalStorage(errorInfo, deviceInfo, custInfo);
    throw new Error;
  }
};


const saveToLocalStorage = async (error, deviceInfo, custInfo) => {
  var existing =  await getItem('@error_logs');
  existing = existing ? JSON.parse(existing) : [];
  console.log('existing ->', existing);
  if (error) {
    existing.push({error, deviceInfo, custInfo});
    await setItem('@error_logs', JSON.stringify(existing));
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
    // let errorInfo = translate(line, column);
    await sendToAPI(url, errorInfo, custInfo, dvcInfo);
  } catch (err) {
    console.log(err);
  }
};

