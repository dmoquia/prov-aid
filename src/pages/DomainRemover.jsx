

//__________________________________________________________________________

// import  { useState } from 'react';

// function EmailParser() {
//   const [emailString, setEmailString] = useState('');
//   const [from, setFrom] = useState('');
//   const [to, setTo] = useState([]);
//   const [cc, setCc] = useState([]);
//   const [sent, setSent] = useState('');
//   const [subject, setSubject] = useState('');
//   const [body, setBody] = useState('');

//   const handleInputChange = (event) => {
//     setEmailString(event.target.value);
//   };

//   const parseEmailString = () => {
//     const lines = emailString.split('\n');
//     let fromValue = '';
//     const toValue = [];
//     const ccValue = [];
//     let sentValue = '';
//     let subjectValue = '';
//     let bodyValue = '';

//     let captureBody = false;

//     lines.forEach((line) => {
//       if (line.startsWith('From:')) {
//         const fromMatch = line.match(/From:\s(.+?)\s</);
//         if (fromMatch) {
//           fromValue = fromMatch[1];
//         }
//       } else if (line.startsWith('To:')) {
//         const toMatch = line.match(/To:\s(.+)/);
//         if (toMatch) {
//           const recipients = toMatch[1].split(';');
//           recipients.forEach((recipient) => {
//             const recipientName = recipient.match(/<([^>]+)/);
//             if (recipientName) {
//               if (recipientName[1].includes('@')) {
//                 const [alias, domain] = recipientName[1].split('@');
//                 if (alias !== '') {
//                   toValue.push(alias);
//                 } else {
//                   const [name, email] = domain.split('.');
//                   if (name !== '') {
//                     toValue.push(name);
//                   } else {
//                     toValue.push(email);
//                   }
//                 }
//               } else {
//                 toValue.push(recipientName[1]);
//               }
//             }
//           });
//         }
//       } else if (line.startsWith('Cc:')) {
//         const ccMatch = line.match(/Cc:\s(.+)/);
//         if (ccMatch) {
//           const recipients = ccMatch[1].split(';');
//           recipients.forEach((recipient) => {
//             const recipientName = recipient.match(/<([^>]+)/);
//             if (recipientName) {
//               if (recipientName[1].includes('@')) {
//                 const [alias, domain] = recipientName[1].split('@');
//                 if (alias !== '') {
//                   ccValue.push(alias);
//                 } else {
//                   const [name, email] = domain.split('.');
//                   if (name !== '') {
//                     ccValue.push(name);
//                   } else {
//                     ccValue.push(email);
//                   }
//                 }
//               } else {
//                 ccValue.push(recipientName[1]);
//               }
//             }
//           });
//         }
//       } else if (line.startsWith('Sent:')) {
//         const sentMatch = line.match(/Sent:\s(.+)/);
//         if (sentMatch) {
//           sentValue = sentMatch[1];
//         }
//       } else if (line.startsWith('Subject:')) {
//         const subjectMatch = line.match(/Subject:\s(.+)/);
//         if (subjectMatch) {
//           subjectValue = subjectMatch[1];
//         }
//       } else if (line === '') {
//         captureBody = true;
//       } else if (captureBody) {
//         bodyValue += line + '\n';
//       }
//     });

//     setFrom(fromValue);
//     setTo(toValue);
//     setCc(ccValue);
//     setSent(sentValue);
//     setSubject(subjectValue);
//     setBody(bodyValue.trim());
//   };

//   const copyToClipboard = () => {
//     const result = `From: ${from}\nTo: ${to.join(', ')}\nCc: ${cc.join(', ')}\nSent: ${sent}\nSubject: ${subject}\n\n${body}`;
//     navigator.clipboard.writeText(result);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     parseEmailString();
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <textarea value={emailString} onChange={handleInputChange} />
//         <button type="submit">Parse</button>
//       </form>

//       <h3>From:</h3>
//       <p>{from}</p>

//       <h3>To:</h3>
//       <ul>
//         {to.map((recipient, index) => (
//           <li key={index}>{recipient}</li>
//         ))}
//       </ul>

//       <h3>Cc:</h3>
//       <ul>
//         {cc.map((recipient, index) => (
//           <li key={index}>{recipient}</li>
//         ))}
//       </ul>

//       <h3>Sent:</h3>
//       <p>{sent}</p>

//       <h3>Subject:</h3>
//       <p>{subject}</p>

//       <h3>Body:</h3>
//       <p>{body}</p>

//       <button onClick={copyToClipboard}>Copy</button>
//     </div>
//   );
// }

// export default EmailParser;


import  { useState } from 'react';

function EmailParser() {
  const [emailString, setEmailString] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState([]);
  const [cc, setCc] = useState([]);
  const [sent, setSent] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleInputChange = (event) => {
    setEmailString(event.target.value);
  };

  const parseEmailString = () => {
    const lines = emailString.split('\n');
    let fromValue = '';
    const toValue = [];
    const ccValue = [];
    let sentValue = '';
    let subjectValue = '';
    let bodyValue = '';

    let captureBody = false;

    lines.forEach((line) => {
      if (line.startsWith('From:')) {
        const fromMatch = line.match(/From:\s(.+?)\s</);
        if (fromMatch) {
          fromValue = fromMatch[1];
        }
      } else if (line.startsWith('To:')) {
        const toMatch = line.match(/To:\s(.+)/);
        if (toMatch) {
          const recipients = toMatch[1].split(';');
          recipients.forEach((recipient) => {
            const recipientName = recipient.match(/<([^>]+)/);
            if (recipientName) {
              const aliasMatch = recipient.match(/"([^"]+)"/);
              if (aliasMatch) {
                toValue.push(aliasMatch[1]);
              } else {
                const [name] = recipientName[1].split('@');
                toValue.push(name);
              }
            }
          });
        }
      } else if (line.startsWith('Cc:')) {
        const ccMatch = line.match(/Cc:\s(.+)/);
        if (ccMatch) {
          const recipients = ccMatch[1].split(';');
          recipients.forEach((recipient) => {
            const recipientName = recipient.match(/<([^>]+)/);
            if (recipientName) {
              const aliasMatch = recipient.match(/"([^"]+)"/);
              if (aliasMatch) {
                ccValue.push(aliasMatch[1]);
              } else {
                const [name] = recipientName[1].split('@');
                ccValue.push(name);
              }
            }
          });
        }
      } else if (line.startsWith('Sent:')) {
        const sentMatch = line.match(/Sent:\s(.+)/);
        if (sentMatch) {
          sentValue = sentMatch[1];
        }
      } else if (line.startsWith('Subject:')) {
        const subjectMatch = line.match(/Subject:\s(.+)/);
        if (subjectMatch) {
          subjectValue = subjectMatch[1];
        }
      } else if (line === '') {
        captureBody = true;
      } else if (captureBody) {
        bodyValue += line + '\n';
      }
    });

    setFrom(fromValue);
    setTo(toValue);
    setCc(ccValue);
    setSent(sentValue);
    setSubject(subjectValue);
    setBody(bodyValue.trim());
  };

  const copyToClipboard = () => {
    const result = `From: ${from}\nTo: ${to.join(', ')}\nCc: ${cc.join(', ')}\nSent: ${sent}\nSubject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(result);
    setEmailString("")
    setFrom("")
    setTo([])
    setCc([])
    setSent("")
    setSubject("")
    setBody("")
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    parseEmailString();

  };

  return (
    <div>
     <div style={{width:"800px", margin:"20px auto"}}>
     <form onSubmit={handleSubmit}>
        <textarea value={emailString} onChange={handleInputChange} />
        <button type="submit" className='btn'>Trim</button>
      </form>
         <button onClick={copyToClipboard} className='btn'>Copy</button>
     </div>
      <div style={{width:"800px", margin:"20px auto"}}>
      <h3>From:</h3>
      <p>{from}</p>

      <h3>To:</h3>
      <ul>
        {to.map((recipient, index) => (
          <li key={index}>{recipient}</li>
        ))}
      </ul>

      <h3>Cc:</h3>
      <ul>
        {cc.map((recipient, index) => (
          <li key={index}>{recipient}</li>
        ))}
      </ul>

      <h3>Sent:</h3>
      <p>{sent}</p>

      <h3>Subject:</h3>
      <p>{subject}</p>

      <h3>Body:</h3>
      <p>{body}</p>

      </div>

    </div>
  );
}

export default EmailParser;
