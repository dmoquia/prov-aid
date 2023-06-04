function Att() {
  return (
    <div className="container">
      <h1>coming soon</h1>
    </div>
  );
}

export default Att;

// import { useState } from "react";

// function FileUpload() {
//   const [parsedData, setParsedData] = useState(null);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const jsonData = JSON.parse(e.target.result);
//       const extractedData = extractData(jsonData);

//       setParsedData(extractedData);
//     };

//     reader.readAsText(file);
//   };

//   const extractData = (jsonData) => {
//     const products = jsonData.productOrder.find(
//       (product) => product.sectionName === "Product Service Request"
//     );
//     const comments = products.fields.find(
//       (field) => field.fieldName === "LOCATION_COMMENTS"
//     );

//     const demarc = comments ? comments.value.split("DEMARC: ")[1] : "";

//     const speed = products.fields.find(
//       (field) => field.fieldName === "PRODUCT_SELECTED"
//     );

//     const billSec = jsonData.productOrder.find(
//       (contact) => contact.sectionName === "Billing/Contact Section"
//     );
//     const requestedBy = billSec.subSections.find(
//       (section) => section.sectionName === "Requested By"
//     );
//     const name = requestedBy.fields.find(
//       (field) => field.fieldName === "Contact Name"
//     );
//     const contactNum = requestedBy.fields.find(
//       (field) => field.fieldName === "Tel No/Ext"
//     );
//     const email = requestedBy.fields.find(
//       (field) => field.fieldName === "Email"
//     );
//     const provisioner = [name.value, contactNum.value, email.value];

//     const extractedData = {
//       bandwidth: speed ? speed.value : null,
//       demarc: demarc ? demarc : null,
//       prov: provisioner,
//     };

//     //condition
//     // if (jsonData.response && Array.isArray(jsonData.response)) {
//     //   const sections = jsonData.response[0]?.sections || [];

//     //   sections.forEach((section) => {
//     //     if (section.fields && Array.isArray(section.fields)) {
//     //       section.fields.forEach((field) => {
//     //         if (field.fieldName === "Billing_Account_Number") {
//     //           extractedData.circuitID = field.value || null;
//     //         }
//     //       });
//     //     }

//     //     if (section.subSections && Array.isArray(section.subSections)) {
//     //       section.subSections.forEach((subsection) => {
//     //         if (subsection.fields && Array.isArray(subsection.fields)) {
//     //           subsection.fields.forEach((field) => {
//     //             if (field.fieldName === "IP_BLOCK") {
//     //               extractedData.block = field.value || null;
//     //             }

//     //             if (field.fieldName === "GATEWAY_IP") {
//     //               extractedData.gatewayIP = field.value || null;
//     //             }
//     //           });
//     //         }
//     //       });
//     //     }
//     //   });
//     // }

//     return extractedData;
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//       {parsedData && (
//         <div>
//           <p>Bandwidth: {parsedData.bandwidth}</p>
//           <p>Demarc: {parsedData.demarc}</p>
//           <p>Circuit Prov: {parsedData.prov.join(" ")}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FileUpload;
