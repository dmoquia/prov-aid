

// export function processEmailString(emailString) {
//     const lines = emailString.split('\n');
//     let result = '';
//     let deleteMobileNumber = false;

//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i].trim();

//       if (line.startsWith('From:')) {
//         deleteMobileNumber = !line.includes('@fusionconnect.com');
//       }

//       if (deleteMobileNumber && (line.startsWith('Mobile:') || line.startsWith('Phone:'))) {
//         result += line.substring(0, line.indexOf(':') + 1) + '\n';
//       } else {
//         result += line + '\n';
//       }
//     }

//     return result;
//   }

// export function processEmailString(emailString) {
//   const lines = emailString.split("\n");
//   let result = "";
//   let deleteMobileNumber = false;

//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i].trim();

//     if (line.startsWith("From:")) {
//       deleteMobileNumber = !line.includes("@fusionconnect.com");
//     }

//     const lowercaseLine = line.toLowerCase(); // Convert line to lowercase

//     if (
//       (deleteMobileNumber &&
//         (lowercaseLine.startsWith("mobile:") ||
//           lowercaseLine.startsWith("mobile") ||
//           lowercaseLine.startsWith("phone:") ||
//           lowercaseLine.startsWith("phone") ||
//           lowercaseLine.startsWith("tel:") ||
//           lowercaseLine.startsWith("tel"))) ||
//       lowercaseLine.startsWith("telephone:") ||
//       lowercaseLine.startsWith("telephone") ||
//       lowercaseLine.startsWith("office:") ||
//       lowercaseLine.startsWith("office") ||
//       lowercaseLine.startsWith("o:") ||
//       lowercaseLine.startsWith("o")||
//       lowercaseLine.startsWith("(o)")||
//       lowercaseLine.startsWith("(o):")||
//       lowercaseLine.startsWith("(m)")||
//       lowercaseLine.startsWith("(m):")||
//       lowercaseLine.startsWith("+1")
//     ) {
//       result += line.substring(0, line.indexOf(":") + 1) + "\n";
//     } else {
//       result += line + "\n";
//     }
//   }

//   return result;
// }

// export function splitEmailText(emailText) {
//   const delimiter = "From:";
//   const lines = emailText.split("\n");
//   const result = [];
//   let currentEmail = "";

//   for (let line of lines) {
//     if (line.startsWith(delimiter)) {
//       if (currentEmail !== "") {
//         result.push(currentEmail.trim());
//         currentEmail = "";
//       }
//     }
//     currentEmail += line + "\n";
//   }

//   if (currentEmail !== "") {
//     result.push(currentEmail.trim());
//   }
//  return result
// }


// function replacePhoneNumber(blob) {
//   var regex = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/g;
//   var matches = blob.match(regex);
//   var senderEmail = blob.match(/From: (.*?)\n/)[1];

//   if (senderEmail && !senderEmail.includes("@fusionconnect.com")) {
//     blob = blob.replace(matches[0], "");
//   }

//   return blob;
// }




// `
// // From: benita.ronbinson@comcast.com
// // Sent: Tuesday, July 4, 2023 3:30 AM
// // To:  John Doe <john.doe@fusionconnect.com>; Gelmar Aquino <Gelmar.Aquino@att.com>;
// // Cc: Evangeline Gerundio <Evangeline.Gerundio@movate.com>;
// // Subject: MOM

// // Hi Team,

// // doing good too
// // Thank you and best regards,

// // Benita Robinson , Project manager
// // Mobile: +1 935 605 4808
// // email: benita.ronbinson@comcast.com

// // From:  John Doe <john.doe@fusionconnect.com>
// // Sent: Tuesday, July 4, 2023 3:26 AM
// // To:  Gelmar Aquino <Gelmar.Aquino@att.com>; benita.ronbinson@comcast.com
// // Cc: Evangeline Gerundio <Evangeline.Gerundio@movate.com>;
// // Subject: MOM

// // Hi Guy,

// // doing fine.
// // Thank you and best regards,

// // John Doe , Access Prov

// // Mobile: +1 935 605 4067

// // Email: john.doe@fusionconnect.com

// // From: Gelmar Aquino <Gelmar.Aquino@att.com>
// // Sent: Tuesday, July 4, 2023 3:20 AM
// // To: John Doe <john.doe@fusionconnect.com>; benita.ronbinson@comcast.com
// // Cc: Evangeline Gerundio <Evangeline.Gerundio@movate.com>;
// // Subject: MOM

// // Hi Team,

// // how are you
// // Thank you and best regards,

// // Gelmar Aquino , Quality Analyst

// // +1 (850) 005 4586
// // Email: Gelmar.Aquino@att.com
// // `

// removes phone number from sender who is not from fusionconnect.com
function replacePhoneNumber(blob) {
  var regex = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/g;
  var matches = blob.match(regex);
  var senderEmailMatch = blob.match(/From: (.*?)\n/);
  var senderEmail = senderEmailMatch ? senderEmailMatch[1] : null;

  // if (senderEmail && !senderEmail.includes("@fusionconnect.com")) {
  //   blob = blob.replace(matches[0], "");
  // }
  // this will fix the "Uncaught TypeError: Cannot read properties of null (reading '0')" error
  if (senderEmail && !senderEmail.includes("@fusionconnect.com") && matches && matches.length > 0) {
    blob = blob.replace(matches[0], "");
  }

  return blob;
}


// convert blob of string into an array
function splitEmailText(emailText) {
  const delimiter = "From:";
  const lines = emailText.split("\n");
  const result = [];
  let currentEmail = "";

  for (let line of lines) {
    if (line.startsWith(delimiter)) {
      if (currentEmail !== "") {
        result.push(currentEmail.trim());
        currentEmail = "";
      }
    }
    currentEmail += line + "\n";
  }

  if (currentEmail !== "") {
    result.push(currentEmail.trim());
  }

  // Add a newline character after each "From:" line
  const formattedResult = result.map((email) =>replacePhoneNumber(email.trim())  + "\n\n\n" ).join("");

  return formattedResult;
}


// this function removes domain from an email
export const modifyEmails = (emailString) => {
  const emailRegex = /([\w.-]+)@([\w.-]+)/g;

  const modifiedString = emailString.replace(emailRegex, (match, p1, p2) => {
    if (p2 === 'fusionconnect.com') {
      return match;
    }
    return p1;
  });

  const processedString = splitEmailText(modifiedString);

  return processedString;

};

