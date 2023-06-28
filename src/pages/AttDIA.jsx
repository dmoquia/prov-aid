import { useState } from "react";
import DiaEmailButton from "../components/DiaEmailButton";

function AttDIA() {
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
      (product) =>
        ["Product Service Request", "PRODUCT SERVICE REQUEST"].includes(
          product.sectionName
        )
      // product.sectionName === "PRODUCT SERVICE REQUEST" ||
      // "Product Service Request"
    );

    // const comments = products.fields.find(
    //   (field) => field.fieldName === "LOCATION_COMMENTS"
    // );
    const comments = jsonData.productOrder
      ?.find(
        (item) =>
          ["Product Service Request", "PRODUCT SERVICE REQUEST"].includes(
            item.sectionName
          )
        // item.sectionName === "Product Service Request" ||
        // "PRODUCT SERVICE REQUEST"
      )
      .fields?.find((field) => field.fieldName === "COMMENTS");
    const regex = /(\d+(?:MB|GB|m))/i;
    const match = comments.value.match(regex);
    const speed = match ? match[0] : null;

    // const demarc = comments ? comments.value.split("DEMARC: ")[1] : "";
    // const demarc = comments.value.split("DEMARC")[1].trim();
    // console.log(
    //   jsonData.productOrder
    //     .find((item) => item.sectionName === "PRODUCT SERVICE REQUEST")
    //     .fields.find((field) => field.fieldName === "LOCATION_COMMENTS")
    // );
    let demarc;
    // if (comments.value.includes("DEMARC:")) {
    //   demarc = comments.value.split("DEMARC:")[1].trim();
    // } else if (comments.value.includes("DEMARC")) {
    //   demarc = comments.value.split("DEMARC")[1].trim();
    // } else if (comments.value.includes("DMARC")) {
    //   demarc = comments.value.split("DMARC")[1].trim();
    // }
    // ***** improve finding demarc ****
    const keywords = ["DEMARC:", "DEMARC", "DMARC"];
    for (const keyword of keywords) {
      const index = comments.value.indexOf(keyword);
      if (index !== -1) {
        demarc = comments.value.substring(index + keyword.length).trim();
        break;
      }
    }

    // const speed = products.fields.find(
    //   (field) => field.fieldName === "PRODUCT_SELECTED"
    // );

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
      // bandwidth: speed ? speed : null,
      bandwidth: `${speed} ATT Ethernet DIA` || "Únavailable" || null,
      demarc: demarc || "unavailable" || null,
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

    // let macAddress = undefined;
    // let manufacturer = undefined;
    // let model = undefined;
    // const wanIpInfo = "WAN IP Information";
    // const ipblock = "IP_BLOCK";
    // const lanIpInfo = "LAN IP Information";
    // const ipAddress = "IP_ADDRESS";
    // const gatewayIp = "GATEWAY_IP";
    // const routingInfo = "Routing Information";
    // const firstDNS = "PRIMARY_DNS";
    // const secondDNS = "SECONDARY_DNS";
    const unavailable = "Unavailable";
    const serviceConfig = "Service Configuration";
    const baseKey = jsonData?.response[0]?.sections.find(
      (section) => section.sectionName === serviceConfig
    );
    console.log(jsonData);
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

    // Billing Account/Circuit id
    const cktID = baseKey.subSections
      .find((section) => section.sectionName === "Network Information")
      .fields.find((f) => f.fieldName === "CIRCUIT_ID");
    // IP BLOCK
    // const ipBlock = baseKey?.subSections
    //   .find((section) => section.sectionName === wanIpInfo)
    //   ?.fields.find((field) => field.fieldName === ipblock);

    // // GATEWAY
    // const gateway = baseKey?.subSections
    //   .find((section) => section.sectionName === routingInfo)
    //   ?.fields.find((field) => field.fieldName === gatewayIp);

    // // IP RANGE
    // const ipRange = baseKey?.subSections
    //   .find((section) => section.sectionName === lanIpInfo)
    //   ?.fields.find((field) => field.fieldName === ipAddress).value;

    // const rangeParts = ipRange ? ipRange.split(" - ") : [];
    // const firstUsable = rangeParts[0] || null;
    // const lastUsable = rangeParts[1] || null;

    // // PRIMARY/SECONDARY DNS
    // let dns1 = null;
    // let dns2 = null;

    // const dnsTree = baseKey?.subSections.find(
    //   (section) => section.sectionName === wanIpInfo
    // );

    // if (dnsTree) {
    //   dns1 = dnsTree.fields.find((field) => field.fieldName === firstDNS);
    //   dns2 = dnsTree.fields.find((field) => field.fieldName === secondDNS);
    // }

    const extractedData = {
      newCktInfo: jsonData.info.project || jsonData.info.endUser,
      requestNumber: jsonData.info.requestNumber,
      address: jsonData.info.endUserAddress,
      readyDate: jsonData.info.tpCompletionDate,
      provider: jsonData.info.tradingPartner,
      pon: "Can be found on att tracker",
      uso: "Can be found on att tracker",
      circuitID: cktID ? cktID.value : unavailable || null,
      handoff: "default",
      hub: "N/A",
      cfa: "N/A",
      vlan: "N/A",
      // old
      // ponCCNA: jsonData.info.requestNumber,
      // block: ipBlock ? ipBlock.value : unavailable || null,
      // gatewayIP: gateway ? gateway.value : unavailable || null,
      // primaryDNS: dns1 ? dns1.value : unavailable || null,
      // secondaryDNS: dns2 ? dns2.value : unavailable || null,
      // range: ipRange ? ipRange : unavailable || null,
      // firstIP: firstUsable ? firstUsable : unavailable || null,
      // lastIP: lastUsable ? lastUsable : unavailable || null,
      // manufacturer:
      //   manufacturer !== undefined ? manufacturer.value : unavailable || null,
      // models: model !== undefined ? model.value : unavailable || null,
      // macAddress:
      //   macAddress !== undefined ? macAddress.value : unavailable || null,
    };

    return extractedData;
  };
  return (
    <>
      <h1 className="carrier">AT&T DIA</h1>
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
              <p>Ready Date: {parsedData.readyDate}</p>
              <p>Circuit Provider: {parsedData.provider}</p>
              <p>PON/CCNA: {parsedData.pon}</p>
              <p>USO: {parsedData.uso}</p>
              <p>Circuit ID: {parsedData.circuitID}</p>
              <p>Handoff for LEC: {parsedData.handoff}</p>
              <p>LEC circuit ID: </p>
              <p>HUB: {parsedData.hub} </p>
              <p>CFA: {parsedData.cfa} </p>
              <p>VLAN: {parsedData.vlan} </p>
            </div>
          )}

          {parseProduct && (
            <div>
              <p>Bandwidth: {parseProduct.bandwidth}</p>
              <p>Demarc: {parseProduct.demarc}</p>
              <p>Circuit Prov: {parseProduct.prov.join(" ")}</p>
              <p>PLUG AND PLAY -AT&T- 844-963-0016 (Activation/Support)</p>
              <p>IP Details here...</p>
            </div>
          )}
        </div>
        {parsedData && parseProduct && (
          <DiaEmailButton parsedData={parsedData} parseProduct={parseProduct} />
        )}
      </div>
    </>
  );
}

export default AttDIA;
