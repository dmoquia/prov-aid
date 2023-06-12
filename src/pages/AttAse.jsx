import { useState } from "react";

import AseEmailButton from "../components/AttAseEmailButton";
function AttASE() {
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
    const ruid = jsonData.productOrder
      .find((section) => section.sectionName === "UNI DETAIL SECTION")
      .fields.find((field) => field.fieldName === "RUID");
    const comments = jsonData.productOrder
      ?.find((item) =>
        ["ASR ADMINISTRATIVE SECTION"].includes(item.sectionName)
      )
      .fields?.find((field) => field.fieldName === "REMARKS");

    let demarc;
    if (comments.value.includes("DEMARC:")) {
      demarc = comments.value.split("DEMARC:")[1].trim();
    } else if (comments.value.includes("DEMARC")) {
      demarc = comments.value.split("DEMARC")[1].trim();
    } else if (comments.value.includes("DMARC")) {
      demarc = comments.value.split("DMARC")[1].trim();
    }

    // const speed = products.fields.find(
    //   (field) => field.fieldName === "PRODUCT_SELECTED"
    // );

    // const billSec = jsonData.productOrder.find(
    //   (contact) => contact.sectionName === "Billing/Contact Section"
    // )

    // const dataObjects = [
    //   jsonData.productOrder.find(
    //     (section) => section.sectionName === "UNI DETAIL SECTION"
    //   ),
    // ];

    // const targetSubSectionName = "CE-VLAN SECTION";

    // for (const obj of dataObjects) {
    //   if (obj.sectionName === "UNI DETAIL SECTION") {
    //     for (const subSection of obj.subSections) {
    //       if (subSection.sectionName === targetSubSectionName) {
    //         for (const field of subSection.fields) {
    //           const fieldValue = field.value;
    //           // Perform your desired action with each fieldValue
    //           console.log(fieldValue);
    //         }
    //         break;
    //       }
    //     }
    //   }
    // }

    // improvement coming from this https://chat.openai.com/c/63c271e9-fafd-49b7-84c1-c995d3327f0f

    const data = jsonData.productOrder.filter(
      (section) => section.sectionName === "UNI DETAIL SECTION"
    );
    let result;
    // Now you can iterate over the 'data' array to process each object
    for (const obj of data) {
      // Process each 'obj' as needed

      let vlan = obj.subSections
        .filter((sub) => sub.sectionName === "CE-VLAN SECTION")
        .flatMap((sub) => sub.fields)
        .find((field) => field.fieldName === "CE_VLAN" && field.value !== "");

      if (vlan !== undefined) {
        result = vlan;
      }
    }

    const requestedBy = jsonData.productOrder
      .find((contact) => contact.sectionName === "Billing/Contact Section")
      .subSections.find((subSec) => subSec.sectionName === "Requested By");

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
      cfa: ruid ? ruid.value : "Unavailable" || null,
      vlans: result ? result.value : "Unavailable" || null,
      // bandwidth: speed ? speed.value : null,
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

    const asr = jsonData.response[0].sections
      .find((section) => section.sectionName === "Administration Section")
      .fields.find((field) => field.fieldName === "ASR_NO");
    // let macAddress = undefined;
    // let manufacturer = undefined;
    // let model = undefined;
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

    const extractedData = {
      newCktInfo: jsonData.info.project || jsonData.info.endUser,
      address: jsonData.info.endUserAddress,
      readyDate: jsonData.info.tpCompletionDate,
      provider: jsonData.info.productCatalogName,
      uniPon: jsonData.info.relatedPurchaseOrderNumber,
      evcPon: jsonData.info.requestNumber,
      ponCCNA: jsonData.info.buyerID,
      icsc: jsonData.info.sellerID,
      uniOrder: jsonData.info.sellerOrderNumber,
      evcOrder: jsonData.info.sellerVirtualOrderNumber,
      uniASR: asr ? asr.value : unavailable || null,
      evcASR: jsonData.info.sellerOrderID,
      uniCircuitId: jsonData.info.sellerCircuitIDs,
      evcCircuitId: "default",
      ConfigBAN: "default",
      handoffLEC: "default",
      hub: "default fsx",
    };

    return extractedData;
  };
  return (
    <>
      <h1 className="carrier">AT&T ASE</h1>
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
              <p>UNI PON: {parsedData.uniPon}</p>
              <p>UNI EVC: {parsedData.evcPon}</p>
              <p>PON/CCNA: {parsedData.ponCCNA}</p>
              <p>ICSC: {parsedData.icsc}</p>
              <p>UNI Order: {parsedData.uniOrder}</p>
              <p>EVC Order: {parsedData.evcOrder}</p>
              <p>UNI ASR: {parsedData.uniASR}</p>
              <p>EVC ASR: {parsedData.evcASR}</p>
              <p>UNI CircuitID: {parsedData.uniCircuitId}</p>
              <p>EVC circuit ID: {parsedData.evcCircuitId}</p>
              <p>Configuration(uBan): {parsedData.ConfigBAN}</p>
              <p>Handoff for LEC: {parsedData.handoffLEC}</p>
              <p>HUB: {parsedData.hub}</p>
            </div>
          )}

          {parseProduct && (
            <div>
              <p>Bandwidth: default</p>
              <p>Demarc: {parseProduct.demarc}</p>

              <p>CFA: {parseProduct.cfa}</p>
              <p>VLAN: {parseProduct.vlans}</p>
              <p>IP Details & Ping will go here</p>
              <p>Circuit Prov: {parseProduct.prov.join(" ")}</p>
              <p>PLUG AND PLAY –ATT ASE – 855-822-0263, option 3, option 1</p>
            </div>
          )}
        </div>
        {parsedData && parseProduct && (
          <AseEmailButton parsedData={parsedData} parseProduct={parseProduct} />
        )}
      </div>
    </>
  );
}

export default AttASE;
