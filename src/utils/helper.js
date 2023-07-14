

// removes phone number from sender who is not from fusionconnect.com
function replacePhoneNumber(blob) {
  var regex = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/g;
  var matches = blob.match(regex);
  var senderEmailMatch = blob.match(/From: (.*?)\n/);
  var senderEmail = senderEmailMatch ? senderEmailMatch[1] : null;

  if (senderEmail && !senderEmail.includes("@fusionconnect.com")) {
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

