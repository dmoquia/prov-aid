

export function processEmailString(emailString) {
  const lines = emailString.split("\n");
  let result = "";
  let deleteMobileNumber = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("From:")) {
      deleteMobileNumber = !line.includes("@fusionconnect.com");
    }

    const lowercaseLine = line.toLowerCase(); // Convert line to lowercase

    if (
      (deleteMobileNumber &&
        (lowercaseLine.startsWith("mobile:") ||
          lowercaseLine.startsWith("mobile") ||
          lowercaseLine.startsWith("phone:") ||
          lowercaseLine.startsWith("phone") ||
          lowercaseLine.startsWith("tel:") ||
          lowercaseLine.startsWith("tel"))) ||
      lowercaseLine.startsWith("telephone:") ||
      lowercaseLine.startsWith("telephone")
    ) {
      result += line.substring(0, line.indexOf(":") + 1) + "\n";
    } else {
      result += line + "\n";
    }
  }

  return result;
}
