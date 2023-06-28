import { useState } from "react";
import EmailButton from "../components/EmailButton";

function Comcast() {
  const [parsedData, setParsedData] = useState(null);
  const [parseProduct, setParseProduct] = useState(null);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const handleFileSpeedUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    // filename validation
    const fileName = file.name.toLowerCase();
    const allowedNames = ["req"];

    // Check if the file name contains either "complete" or "configure"
    const isValidFile = allowedNames.some((name) => fileName.includes(name));

    if (!isValidFile) {
      // Handle the case when the uploaded file name is not valid
      setError(
        "Invalid file name. Please upload a file with 'req' in its name."
      );
      setTimeout(() => {
        setShow(true);
      }, 2000);
      return;
    }

    // end of filename validation
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

    // const demarc = comments ? comments.value.split("DEMARC: ")[1] : "";
    let demarc;
    const keywords = ["DEMARC:", "DEMARC", "DMARC"];
    for (const keyword of keywords) {
      const index = comments.value.indexOf(keyword);
      if (index !== -1) {
        demarc = comments.value.substring(index + keyword.length).trim();
        break;
      }
    }

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
    // filename validation
    const fileName = file.name.toLowerCase();
    const allowedNames = [
      "complete",
      "configure",
      "confirmed",
      "informational",
      "confirmed",
      "accept",
    ];

    // Check if the file name contains either "complete" or "configure"
    const isValidFile = allowedNames.some((name) => fileName.includes(name));

    if (!isValidFile) {
      // Handle the case when the uploaded file name is not valid
      setError(
        "Invalid file name. Please upload a file with 'complete' or 'configure' in its name."
      );
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      return;
    }

    // end of filename validation
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
    const gatewayIp = "GATEWAY_IP";
    const routingInfo = "Routing Information";
    const firstDNS = "PRIMARY_DNS";
    const secondDNS = "SECONDARY_DNS";
    const unavailable = "Unavailable";
    const baseKey = jsonData?.response[0]?.sections.find(
      (section) => section.sectionName === serviceConfig
    );

    // if (
    //   jsonData.response[0].sections[2]?.subSections?.[4] &&
    //   jsonData.response[0].sections[2].subSections[0]
    // ) {
    //   // Code to execute when manufacturer is found
    //   manufacturer =
    //     jsonData.response[0].sections[2]?.subSections?.[4]?.fields.find(
    //       (field) => field.fieldName === "MANUFACTURER"
    //     );
    //   model = jsonData.response[0].sections[2].subSections[4].fields.find(
    //     (field) => field.fieldName === "MODEL"
    //   );
    //   macAddress = jsonData.response[0].sections[2].subSections[0].fields.find(
    //     (field) => field.fieldName === "DEVICE_MAC_ADDRESS"
    //   );
    // }

    // let cpe;
    // const cpe1 = jsonData.response[0].sections[2]?.subSections.find(
    //   (item) => item.sectionName === "CPE Information"
    // );
    // const cpe2 = jsonData.response[0]?.sections
    //   .find((section) => section?.sectionName === "Service Configuration")
    //   .subSections?.find((sub) => sub.sectionName === "CPE Information");

    // if (cpe1 || cpe2) {
    //   cpe = cpe1 || cpe2;
    // }
    // let field = jsonData?.response[0]?.sections
    //   ?.find((section) => section.sectionName === "Service Configuration")
    //   ?.subSections?.find(
    //     (section) => section.sectionName === "Network Information"
    //   )
    //   ?.fields?.find((field) => field.fieldName === "DEVICE_MAC_ADDRESS");

    // if (cpe) {
    //   manufacturer = cpe.fields.find(
    //     (field) => field.fieldName === "MANUFACTURER"
    //   );
    //   model = cpe.fields.find((field) => field.fieldName === "MODEL");
    //   // macAddress = jsonData.response[0].sections[2].subSections
    //   //   .find((item) => item.sectionName === "Network Information")
    //   //   .fields.find((field) => field.fieldName === "DEVICE_MAC_ADDRESS");
    //   macAddress = field;
    // }

    // improvement found on https://chat.openai.com/c/84ec5ae7-d1fe-459f-8cd1-a4b9e52d2c6f
    const { sections } = jsonData.response[0];
    const opt1 = sections[2]?.subSections.find(
      (item) => item.sectionName === "CPE Information"
    );
    const opt2 = sections
      .find((section) => section?.sectionName === "Service Configuration")
      ?.subSections.find((sub) => sub.sectionName === "CPE Information");

    const cpe = opt1 || opt2;

    const networkSection = sections
      .find((section) => section.sectionName === "Service Configuration")
      ?.subSections.find(
        (section) => section.sectionName === "Network Information"
      );

    const field = networkSection?.fields.find(
      (field) => field.fieldName === "DEVICE_MAC_ADDRESS"
    );

    if (cpe) {
      manufacturer = cpe.fields.find(
        (field) => field.fieldName === "MANUFACTURER"
      );
      model = cpe.fields.find((field) => field.fieldName === "MODEL");
      macAddress = field;
    }

    // Billing Account/Circuit id
    const cktID = jsonData.response[0].sections[0].fields.find(
      (field) => field.fieldName === "Billing_Account_Number"
    );
    // IP BLOCK
    const ipBlock = baseKey?.subSections
      .find((section) => section.sectionName === wanIpInfo)
      ?.fields.find((field) => field.fieldName === ipblock);

    // GATEWAY
    const gateway = baseKey?.subSections
      .find((section) => section.sectionName === routingInfo)
      ?.fields.find((field) => field.fieldName === gatewayIp);

    // IP RANGE
    // let ipRange;

    // const r1 = baseKey?.subSections
    //   .find((section) => section.sectionName === lanIpInfo)
    //   ?.fields.find((field) => field.fieldName === "IP_ADDRESS").value;

    // const r2 = baseKey?.subSections
    //   .find((section) => section.sectionName === lanIpInfo)
    //   ?.fields.find(
    //     (field) => field.fieldName === "LAN_IP_ADDRESS_RANGE"
    //   ).value;
    // if (r1) {
    //   ipRange = r1;
    // } else {
    //   ipRange = r2;
    // }
    // improvement found here https://chat.openai.com/c/acf2f08d-f87d-4829-9708-26fcab6e6d2f
    let ipRange;
    const section = baseKey?.subSections.find(
      (section) => section.sectionName === lanIpInfo
    );

    if (section) {
      const r1 = section.fields.find(
        (field) => field.fieldName === "IP_ADDRESS"
      )?.value;
      const r2 = section.fields.find(
        (field) => field.fieldName === "LAN_IP_ADDRESS_RANGE"
      )?.value;
      ipRange = r1 || r2;
    }

    // const rangeParts = ipRange ? ipRange.split(" - ").split(" TO ") : [];
    // const rangeParts = ipRange ? ipRange.split(" - ").split(" TO ") : [];
    // improvement https://chat.openai.com/c/84ec5ae7-d1fe-459f-8cd1-a4b9e52d2c6f
    const rangeParts = ipRange
      ? ipRange.includes(" - ")
        ? ipRange.split(" - ")
        : ipRange.split(" TO ")
      : [];

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
      circuitID: cktID ? cktID.value : unavailable || null,
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
      <h1 className="carrier">Comcast BB2</h1>
      <div className="container">
        {error && !show && <div className="error">{error}</div>}
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
