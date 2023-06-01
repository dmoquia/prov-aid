import { useState } from "react";
import EmailButton from "../components/EmailButton";
function FileUpload() {
  const [parsedData, setParsedData] = useState(null);
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
    // Extract specific data from jsonData and return the extracted data
    // Modify this function according to your specific data extraction requirements
    // console.log(jsonData.response[0].sections[2].subSections[4].fields);
    const ipIndex = jsonData.response[0].sections[2].subSections[3]
      ? 3
      : jsonData.response[0].sections[2].subSections[2]
      ? 2
      : null;
    // const subSections = jsonData?.response[0]?.sections[2]?.subSections || [];
    // const ipIndex = subSections?.findIndex(
    //   (subSection, index) => index > 1 && subSection
    // );

    // Modem details
    let macAddress = "Not found";
    // =jsonData.response[0].sections[2].subSections[0].fields.find(
    //   (field) => field.fieldName === "DEVICE_MAC_ADDRESS"
    // );
    // const manufacturer =
    //   jsonData.response[0].sections[2]?.subSections[4].fields.find(
    //     (field) => field.fieldName === "MANUFACTURER"
    //   );
    let manufacturer = "Not found";
    // manufacturer =
    //   jsonData.response[0].sections[2]?.subSections?.[4]?.fields.find(
    //     (field) => field.fieldName === "MANUFACTURER"
    //   );

    let model = "Not found";
    // =jsonData.response[0].sections[2].subSections[4].fields.find(
    //   (field) => field.fieldName === "MODEL"
    // );
    console.log(macAddress, manufacturer, model);
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
    // end of modem details
    const field = jsonData.response[0].sections[0].fields.find(
      (field) => field.fieldName === "Billing_Account_Number"
    );

    const ipBlock = jsonData.response[0].sections[2].subSections[1].fields.find(
      (field) => field.fieldName === "IP_BLOCK"
    );
    const gateway = jsonData.response[0].sections[2].subSections[1].fields.find(
      (field) => field.fieldName === "GATEWAY_IP"
    );
    const rangesIP = jsonData.response[0].sections[2].subSections[
      ipIndex
    ].fields.find((field) => field.fieldName === "IP_ADDRESS");
    const range = rangesIP.value;

    const rangeParts = range.split(" - ");
    const firstUsable = rangeParts[0];
    const lastUsable = rangeParts[1];

    // const dns1 = jsonData.response[0].sections[2].subSections[0].fields.find(
    //   (field) => field.fieldName === "PRIMARY_DNS"
    // );
    // const dns2 = jsonData.response[0].sections[2].subSections[0].fields.find(
    //   (field) => field.fieldName === "SECONDARY_DNS"
    // );
    let dns1 = null;
    let dns2 = null;

    for (const subSection of jsonData.response[0].sections[2].subSections) {
      dns1 = subSection.fields.find(
        (field) => field.fieldName === "PRIMARY_DNS"
      );
      dns2 = subSection.fields.find(
        (field) => field.fieldName === "SECONDARY_DNS"
      );

      if (dns1 && dns2) {
        break; // Exit the loop if both dns1 and dns2 are found
      }
    }
    // subSections.some((subSection) => {
    //   dns1 = subSection.fields.find(
    //     (field) => field.fieldName === "PRIMARY_DNS"
    //   );
    //   dns2 = subSection.fields.find(
    //     (field) => field.fieldName === "SECONDARY_DNS"
    //   );
    //   return dns1 && dns2; // Exit the loop if both dns1 and dns2 are found
    // });
    const extractedData = {
      // Extract specific fields or values from jsonData
      // Example:
      newCktInfo: jsonData.info.project,
      provider: jsonData.info.tradingPartner,
      address: jsonData.info.endUserAddress,
      ponCCNA: jsonData.info.requestNumber,
      circuitID: field ? field.value : null,
      // bandwidth:
      // demarc:
      block: ipBlock ? ipBlock.value : null,
      gatewayIP: gateway ? gateway.value : null,
      primaryDNS: dns1 ? dns1.value : null,
      secondaryDNS: dns2 ? dns2.value : null,
      range: rangesIP ? rangesIP.value : null,
      firstIP: firstUsable ? firstUsable : null,
      lastIP: lastUsable ? lastUsable : null,
      manufacturer:
        manufacturer !== "Not found" ? manufacturer.value : manufacturer,
      models: model !== "Not found" ? model.value : model,
      macAddress: macAddress !== "Not found" ? macAddress.value : macAddress,
    };

    //condition
    if (jsonData.response && Array.isArray(jsonData.response)) {
      const sections = jsonData.response[0]?.sections || [];

      sections.forEach((section) => {
        if (section.fields && Array.isArray(section.fields)) {
          section.fields.forEach((field) => {
            if (field.fieldName === "Billing_Account_Number") {
              extractedData.circuitID = field.value || null;
            }
          });
        }

        if (section.subSections && Array.isArray(section.subSections)) {
          section.subSections.forEach((subsection) => {
            if (subsection.fields && Array.isArray(subsection.fields)) {
              subsection.fields.forEach((field) => {
                if (field.fieldName === "IP_BLOCK") {
                  extractedData.block = field.value || null;
                }

                if (field.fieldName === "GATEWAY_IP") {
                  extractedData.gatewayIP = field.value || null;
                }
              });
            }
          });
        }
      });
    }

    return extractedData;
  };

  return (
    <>
      <div className="container">
        <input type="file" onChange={handleFileUpload} />
        {parsedData && (
          <div className="choose">
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

            <p>Circuit Prov: </p>
            <p>Comcast- 800-391-3000 (24/7 Customer support)</p>
          </div>
        )}
        <EmailButton parsedData={parsedData} />
      </div>
    </>
  );
}

export default FileUpload;
