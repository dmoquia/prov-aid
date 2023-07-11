

import  { useState } from 'react';
import {processEmailString} from '../utils/helper'
const modifyEmails = (emailString) => {
  const emailRegex = /([\w.-]+)@([\w.-]+)/g;

  const modifiedString = emailString.replace(emailRegex, (match, p1, p2) => {
    if (p2 === 'fusionconnect.com') {
      return match;
    }
    return p1;
  });
  const processedString = processEmailString(modifiedString);
  return processedString;
};




const EmailComponent = () => {
  const [inputText, setInputText] = useState('');
  const [modifiedString, setModifiedString] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    const modifiedText = modifyEmails(event.target.value);
    setModifiedString(modifiedText);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(modifiedString)
      .then(() => {
        console.log('Modified text copied to clipboard.');
        setInputText("")
        setModifiedString("")
      })
      .catch((error) => {
        console.error('Failed to copy modified text:', error);
      });
  };

  return (
    <div style={{width:"800px", margin:"20px auto"}}>
      <textarea value={inputText} onChange={handleInputChange} rows={10} cols={50} />
      <button onClick={handleCopyClick} className='btn'>Copy </button>
      <pre>{modifiedString}</pre>
    </div>
  );
};

export default EmailComponent;







