/* eslint-disable react/no-unescaped-entities */
// import { useState } from "react";

// function FileUpload() {
//   const [parsedData, setParsedData] = useState(null);
//   const [ipRange, setIpRange] = useState("");

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const jsonData = JSON.parse(e.target.result);
//       const extractedData = extractData(jsonData);
//       const json = JSON.parse(e.target.result);

//       if (
//         json &&
//         json.response &&
//         json.response[0] &&
//         json.response[0].sections[2] &&
//         json.response[0].sections[2].subSections[3] &&
//         json.response[0].sections[2].subSections[2].fields[1]
//       ) {
//         const ipAddressRange =
//           json.response[0].sections[2].subSections[3].fields[1].value;

//         setIpRange(ipAddressRange);
//       } else {
//         setIpRange("Invalid JSON structure");
//       }
//       // const ipAddressRange =
//       //   json.response[0].sections[2].subSections[3].fields[1].value;
//       // setIpRange(ipAddressRange);

//       setParsedData(extractedData);
//     };

//     reader.readAsText(file);
//   };

//   const extractData = (jsonData) => {
//     // Extract specific data from jsonData and return the extracted data
//     // Modify this function according to your specific data extraction requirements
//     console.log(jsonData.response[0].sections[2]);
//     const field = jsonData.response[0].sections[0].fields.find(
//       (field) => field.fieldName === "Billing_Account_Number"
//     );

//     const ipBlock = jsonData.response[0].sections[2].subSections[1].fields.find(
//       (field) => field.fieldName === "IP_BLOCK"
//     );
//     const gateway = jsonData.response[0].sections[2].subSections[1].fields.find(
//       (field) => field.fieldName === "GATEWAY_IP"
//     );
//     const dns1 = jsonData.response[0].sections[2].subSections[1].fields.find(
//       (field) => field.fieldName === "PRIMARY_DNS"
//     );
//     const dns2 = jsonData.response[0].sections[2].subSections[1].fields.find(
//       (field) => field.fieldName === "SECONDARY_DNS"
//     );

//     const extractedData = {
//       // Extract specific fields or values from jsonData
//       // Example:
//       newCktInfo: jsonData.info.project,
//       provider: jsonData.info.tradingPartner,
//       address: jsonData.info.endUserAddress,
//       ponCCNA: jsonData.info.requestNumber,
//       circuitID: field ? field.value : null,
//       // bandwidth:
//       // demarc:
//       block: ipBlock ? ipBlock.value : null,
//       gatewayIP: gateway ? gateway.value : null,
//       primaryDNS: dns1 ? dns1.value : null,
//       secondaryDNS: dns2 ? dns2.value : null,
//     };

//     //condition
//     if (jsonData.response && Array.isArray(jsonData.response)) {
//       const sections = jsonData.response[0]?.sections || [];

//       sections.forEach((section) => {
//         if (section.fields && Array.isArray(section.fields)) {
//           section.fields.forEach((field) => {
//             if (field.fieldName === "Billing_Account_Number") {
//               extractedData.circuitID = field.value || null;
//             }
//           });
//         }

//         if (section.subSections && Array.isArray(section.subSections)) {
//           section.subSections.forEach((subsection) => {
//             if (subsection.fields && Array.isArray(subsection.fields)) {
//               subsection.fields.forEach((field) => {
//                 if (field.fieldName === "IP_BLOCK") {
//                   extractedData.block = field.value || null;
//                 }

//                 if (field.fieldName === "GATEWAY_IP") {
//                   extractedData.gatewayIP = field.value || null;
//                 }
//               });
//             }
//           });
//         }
//       });
//     }

//     return extractedData;
//   };

//   return (
// <div>
//   <input type="file" onChange={handleFileUpload} />
//   {parsedData && (
//     <div>
//       <p>New Circuit Information: {parsedData.newCktInfo}</p>
//       <p>Address: {parsedData.address}</p>
//       <p>Circuit Provider: {parsedData.provider}</p>
//       <p>PON/CCNA: {parsedData.ponCCNA}</p>
//       <p>Circuit ID: {parsedData.circuitID}</p>
//       <p>IP Block: {parsedData.block}</p>
//       {ipRange && <p>IP Address Range: {ipRange}</p>}
//       <p>Gateway: {parsedData.gatewayIP}</p>
//       <p>Primary DNS: {parsedData.primaryDNS}</p>
//       <p>Secondary DNS: {parsedData.secondaryDNS}</p>
//       <p>Circuit Prov: </p>
//       <p>Comcast- 800-391-3000 (24/7 Customer support)</p>
//     </div>
//   )}
// </div>
//   );
// }

// export default FileUpload;

function Home() {
  return (
    <main>
      <div className="container">
        <h1 className="title">Hey There!</h1>
        <p className="text-heading">
          Welcome to Parsemate. This is a template generator app built to ease
          the process of creating templates in seconds.
        </p>
        <h2>Usage</h2>

        <ul>
          <li>
            1. Download the JSON file (FULLJSON) in UOC. And Extract the file.
          </li>
          <li>
            2. Select the carrier you want to create a template for. (e.g
            Comcast)
          </li>
          <li>3. Upload two files: "complete" or "configure" and "req".</li>
          <li>4. And Hit send email</li>
          <li>5. refresh the browser or hit F5 to generate a new one</li>
        </ul>
        <h3>Details</h3>
        <p>
          To retrieve the <span>company name, address, and IPs</span>, please
          upload either of the two files: "complete" or "configure". However, if
          you have the "complete" file, prioritize it as it is the only one that
          possibly contains the Modem details. Remember, you only need to upload
          these two mentioned files, and always upload them first. Otherwise,
          you may encounter errors or generate incomplete information. To obtain
          the speed, demarc, and provisioner info, locate the file starting with
          "req.json" and select the one with the latest version. Upload it as
          the second file.
        </p>
        <ul></ul>
      </div>
    </main>
  );
}

export default Home;
