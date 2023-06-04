// import { useState } from "react";
// import EmailButton from "../components/EmailButton";
// import SpeedDemarc from "../components/SpeedDemarc";
// function Comcast() {
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
//     // Extract specific data from jsonData and return the extracted data
//     // Modify this function according to your specific data extraction requirements

//     // Modem details
//     let macAddress = "Not found";

//     // manufacturer
//     let manufacturer = "Not found";

//     // Model
//     let model = "Not found";
//     const serviceConfig = "Service Configuration";
//     const wanIpInfo = "WAN IP Information";
//     const ipblock = "IP_BLOCK";
//     const lanIpInfo = "LAN IP Information";
//     const ipAddress = "IP_ADDRESS";
//     const gatewayIp = "GATEWAY_IP";
//     const routingInfo = "Routing Information";
//     const firstDNS = "PRIMARY_DNS";
//     const secondDNS = "SECONDARY_DNS";

//     const baseKey = jsonData?.response[0]?.sections.find(
//       (section) => section.sectionName === serviceConfig
//     );

//     console.log(jsonData.response[0].sections);
//     if (
//       jsonData.response[0].sections[2]?.subSections?.[4] &&
//       jsonData.response[0].sections[2].subSections[0]
//     ) {
//       // Code to execute when manufacturer is found
//       manufacturer =
//         jsonData.response[0].sections[2]?.subSections?.[4]?.fields.find(
//           (field) => field.fieldName === "MANUFACTURER"
//         );
//       model = jsonData.response[0].sections[2].subSections[4].fields.find(
//         (field) => field.fieldName === "MODEL"
//       );
//       macAddress = jsonData.response[0].sections[2].subSections[0].fields.find(
//         (field) => field.fieldName === "DEVICE_MAC_ADDRESS"
//       );
//     }
//     // end of modem details
//     const field = jsonData.response[0].sections[0].fields.find(
//       (field) => field.fieldName === "Billing_Account_Number"
//     );

//     // IP BLOCK
//     const ipBlock = baseKey?.subSections
//       .find((section) => section.sectionName === wanIpInfo)
//       ?.fields.find((field) => field.fieldName === ipblock);

//     // GATEWAY
//     const gateway = baseKey?.subSections
//       .find((section) => section.sectionName === routingInfo)
//       ?.fields.find((field) => field.fieldName === gatewayIp);

//     // IP RANGE
//     const ipRange = baseKey?.subSections
//       .find((section) => section.sectionName === lanIpInfo)
//       ?.fields.find((field) => field.fieldName === ipAddress);

//     const range = ipRange.value;
//     const rangeParts = range.split(" - ");
//     const firstUsable = rangeParts[0];
//     const lastUsable = rangeParts[1];

//     // PRIMARY/SECONDARY DNS
//     let dns1 = null;
//     let dns2 = null;

//     const dnsTree = baseKey?.subSections.find(
//       (section) => section.sectionName === wanIpInfo
//     );

//     if (dnsTree) {
//       dns1 = dnsTree.fields.find((field) => field.fieldName === firstDNS);
//       dns2 = dnsTree.fields.find((field) => field.fieldName === secondDNS);
//     }

//     const extractedData = {
//       // Extract specific fields or values from jsonData
//       // Example:
//       newCktInfo: jsonData.info.project || jsonData.info.endUser,
//       provider: jsonData.info.tradingPartner,
//       address: jsonData.info.endUserAddress,
//       ponCCNA: jsonData.info.requestNumber,
//       circuitID: field ? field.value : null,
//       block: ipBlock !== undefined ? ipBlock.value : null,
//       gatewayIP: gateway ? gateway.value : null,
//       primaryDNS: dns1 ? dns1.value : null,
//       secondaryDNS: dns2 ? dns2.value : null,
//       range: ipRange ? ipRange.value : null,
//       firstIP: firstUsable ? firstUsable : null,
//       lastIP: lastUsable ? lastUsable : null,
//       manufacturer:
//         manufacturer !== "Not found" ? manufacturer.value : manufacturer,
//       models: model !== "Not found" ? model.value : model,
//       macAddress: macAddress !== "Not found" ? macAddress.value : macAddress,
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
//     <>
//       <div className="container">
//         <input id="fileInput" type="file" onChange={handleFileUpload} />

//         {parsedData && (
//           <div className="choose">
//             <p>New Circuit Information: {parsedData.newCktInfo}</p>
//             <p>Address: {parsedData.address}</p>
//             <p>Circuit Provider: {parsedData.provider}</p>
//             <p>PON/CCNA: {parsedData.ponCCNA}</p>
//             <p>Circuit ID: {parsedData.circuitID}</p>
//             <p>IP Block: {parsedData.block}</p>
//             <p>IP Address Range: {parsedData.range}</p>
//             <p>First IP: {parsedData.firstIP}</p>
//             <p>Last IP: {parsedData.lastIP}</p>
//             <p>Gateway: {parsedData.gatewayIP}</p>
//             <p>Primary DNS: {parsedData.primaryDNS}</p>
//             <p>Secondary DNS: {parsedData.secondaryDNS}</p>
//             <strong>Model Details</strong>
//             <ul>
//               <li>Brand: {parsedData.manufacturer}</li>
//               <li>Model: {parsedData.models}</li>
//               <li>Mac address: {parsedData.macAddress}</li>
//             </ul>
//             <SpeedDemarc />
//             <p>Comcast- 800-391-3000 (24/7 Customer support)</p>
//           </div>
//         )}
//         {parsedData && <EmailButton parsedData={parsedData} />}
//       </div>
//     </>
//   );
// }

// export default Comcast;
import { useState } from "react";
import EmailButton from "../components/EmailButton";

function Comcast() {
  const [parsedData, setParsedData] = useState(null);
  const [parseProduct, setParseProduct] = useState(null);

  const handleFileSpeedUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const jsonData = JSON.parse(e.target.result);
      const extractedProduct = extractProduct(jsonData);
      setParseProduct(extractedProduct);
    };

    reader.readAsText(file);
  };

  const extractProduct = (jsonData) => {
    const products = jsonData.productOrder.find(
      (product) => product.sectionName === "Product Service Request"
    );
    const comments = products.fields.find(
      (field) => field.fieldName === "LOCATION_COMMENTS"
    );

    const demarc = comments ? comments.value.split("DEMARC: ")[1] : "";

    const speed = products.fields.find(
      (field) => field.fieldName === "PRODUCT_SELECTED"
    );

    const billSec = jsonData.productOrder.find(
      (contact) => contact.sectionName === "Billing/Contact Section"
    );
    const requestedBy = billSec.subSections.find(
      (section) => section.sectionName === "Requested By"
    );
    const name = requestedBy.fields.find(
      (field) => field.fieldName === "Contact Name"
    );
    const contactNum = requestedBy.fields.find(
      (field) => field.fieldName === "Tel No/Ext"
    );
    const email = requestedBy.fields.find(
      (field) => field.fieldName === "Email"
    );
    const provisioner = [name.value, contactNum.value, email.value];

    const extractedProduct = {
      bandwidth: speed ? speed.value : null,
      demarc: demarc ? demarc : "unavailable" || null,
      prov: provisioner,
    };

    return extractedProduct;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const jsonData = JSON.parse(e.target.result);
      const extractedData = extractData(jsonData);
      setParsedData(extractedData);
    };

    reader.readAsText(file);
  };

  const extractData = (jsonData) => {
    // Modem details
    let macAddress = undefined;
    let manufacturer = undefined;
    let model = undefined;
    const serviceConfig = "Service Configuration";
    const wanIpInfo = "WAN IP Information";
    const ipblock = "IP_BLOCK";
    const lanIpInfo = "LAN IP Information";
    const ipAddress = "IP_ADDRESS";
    const gatewayIp = "GATEWAY_IP";
    const routingInfo = "Routing Information";
    const firstDNS = "PRIMARY_DNS";
    const secondDNS = "SECONDARY_DNS";
    const unavailable = "Unavailable";
    const baseKey = jsonData?.response[0]?.sections.find(
      (section) => section.sectionName === serviceConfig
    );

    if (
      jsonData.response[0].sections[2]?.subSections?.[4] &&
      jsonData.response[0].sections[2].subSections[0]
    ) {
      // Code to execute when manufacturer is found
      manufacturer =
        jsonData.response[0].sections[2]?.subSections?.[4]?.fields.find(
          (field) => field.fieldName === "MANUFACTURER"
        );
      model = jsonData.response[0].sections[2].subSections[4].fields.find(
        (field) => field.fieldName === "MODEL"
      );
      macAddress = jsonData.response[0].sections[2].subSections[0].fields.find(
        (field) => field.fieldName === "DEVICE_MAC_ADDRESS"
      );
    }

    // IP BLOCK
    const ipBlock = baseKey?.subSections
      .find((section) => section.sectionName === wanIpInfo)
      ?.fields.find((field) => field.fieldName === ipblock);

    // GATEWAY
    const gateway = baseKey?.subSections
      .find((section) => section.sectionName === routingInfo)
      ?.fields.find((field) => field.fieldName === gatewayIp);

    // IP RANGE
    const ipRange = baseKey?.subSections
      .find((section) => section.sectionName === lanIpInfo)
      ?.fields.find((field) => field.fieldName === ipAddress).value;

    const rangeParts = ipRange ? ipRange.split(" - ") : [];
    const firstUsable = rangeParts[0] || null;
    const lastUsable = rangeParts[1] || null;

    // PRIMARY/SECONDARY DNS
    let dns1 = null;
    let dns2 = null;

    const dnsTree = baseKey?.subSections.find(
      (section) => section.sectionName === wanIpInfo
    );

    if (dnsTree) {
      dns1 = dnsTree.fields.find((field) => field.fieldName === firstDNS);
      dns2 = dnsTree.fields.find((field) => field.fieldName === secondDNS);
    }

    const extractedData = {
      newCktInfo: jsonData.info.project || jsonData.info.endUser,
      provider: jsonData.info.tradingPartner,
      address: jsonData.info.endUserAddress,
      ponCCNA: jsonData.info.requestNumber,
      circuitID: jsonData.response[0].sections[0].fields.find(
        (field) => field.fieldName === "Billing_Account_Number"
      )?.value,
      block: ipBlock ? ipBlock.value : unavailable || null,
      gatewayIP: gateway ? gateway.value : unavailable || null,
      primaryDNS: dns1 ? dns1.value : unavailable || null,
      secondaryDNS: dns2 ? dns2.value : unavailable || null,
      range: ipRange ? ipRange : unavailable || null,
      firstIP: firstUsable ? firstUsable : unavailable || null,
      lastIP: lastUsable ? lastUsable : unavailable || null,
      manufacturer:
        manufacturer !== undefined ? manufacturer.value : unavailable || null,
      models: model !== undefined ? model.value : unavailable || null,
      macAddress:
        macAddress !== undefined ? macAddress.value : unavailable || null,
    };

    return extractedData;
  };
  return (
    <>
      <div className="container">
        <input id="fileInput" type="file" onChange={handleFileUpload} />

        {parsedData && (
          <input id="fileInput" type="file" onChange={handleFileSpeedUpload} />
        )}
        <div className="choose">
          {parsedData && (
            <div>
              <p>New Circuit Information: {parsedData.newCktInfo}</p>
              <p>Address: {parsedData.address}</p>
              <p>Circuit Provider: {parsedData.provider}</p>
              <p>PON/CCNA: {parsedData.ponCCNA}</p>
              <p>Circuit ID: {parsedData.circuitID}</p>
              <p>IP Block: {parsedData.block}</p>
              <p>IP Address Range: {parsedData.range}</p>
              <p>First IP: {parsedData.firstIP}</p>
              <p>Last IP: {parsedData.lastIP}</p>
              <p>Gateway: {parsedData.gatewayIP}</p>
              <p>Primary DNS: {parsedData.primaryDNS}</p>
              <p>Secondary DNS: {parsedData.secondaryDNS}</p>
              <strong>Model Details</strong>
              <ul>
                <li>Brand: {parsedData.manufacturer}</li>
                <li>Model: {parsedData.models}</li>
                <li>Mac address: {parsedData.macAddress}</li>
              </ul>
            </div>
          )}

          {parseProduct && (
            <div>
              <p>Bandwidth: {parseProduct.bandwidth}</p>
              <p>Demarc: {parseProduct.demarc}</p>
              <p>Circuit Prov: {parseProduct.prov.join(" ")}</p>
              <p>Comcast- 800-391-3000 (24/7 Customer support)</p>
            </div>
          )}
        </div>
        {parsedData && parseProduct && (
          <EmailButton parsedData={parsedData} parseProduct={parseProduct} />
        )}
      </div>
    </>
  );
}

export default Comcast;
