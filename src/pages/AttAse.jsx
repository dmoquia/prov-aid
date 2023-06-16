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
    // // const ruid = jsonData.productOrder
    // //   .find((section) => section.sectionName === "UNI DETAIL SECTION")
    // //   .fields.find((field) => field.fieldName === "RUID");

    // const ruid = jsonData.productOrder
    //   .filter((section) => section.sectionName === "UNI DETAIL SECTION")
    //   .fields.find(
    //     (field) => field.fieldName === "RUID" && field.value !== matchRuid
    //   );
    // console.log(ruid);

    // const matchRuid = parsedData.uniCircuitId;

    // const ruid = jsonData.productOrder
    //   .filter((section) => section.sectionName === "UNI DETAIL SECTION")
    //   .flatMap((section) => section.fields)
    //   .filter(
    //     (field) => field.fieldName === "RUID" && field.value !== matchRuid
    //   )
    //   .map((field) => field.value);

    // console.log(ruid);

    // ***to get the circuit id***
    // solution can be found here https://chat.openai.com/c/afcb41da-7a00-4ab6-a1c5-8f97443492ae
    const matchRuid = parsedData.uniCircuitId;
    const ruid = jsonData.productOrder
      .flatMap((section) => section.fields)
      .find((field) => field.fieldName === "RUID" && field.value !== matchRuid);

    const fieldValue = ruid ? ruid.value : "Unavailable" || null;

    // get the demarcs from the comments
    const comments = jsonData.productOrder
      ?.find((item) =>
        ["ASR ADMINISTRATIVE SECTION"].includes(item.sectionName)
      )
      .fields?.find((field) => field.fieldName === "REMARKS");

    //  get the bandwith from the comments. solution came from https://chat.openai.com/c/2c71cda4-74bb-4195-bc38-d55a56581e2f

    let bwd = null;
    if (comments) {
      const parts = comments.value.split("\n");
      if (parts.length > 0) {
        bwd = parts[0].trim();
      }
    }

    let demarc;
    if (comments.value.includes("DEMARC:")) {
      demarc = comments.value.split("DEMARC:")[1].trim();
    } else if (comments.value.includes("DEMARC")) {
      demarc = comments.value.split("DEMARC")[1].trim();
    } else if (comments.value.includes("DMARC")) {
      demarc = comments.value.split("DMARC")[1].trim();
    }

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
      cfa: fieldValue,
      vlans: result ? result.value : "Unavailable" || null,
      bandwidth: bwd ? bwd : "Unavailable" || null,
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
    console.log(jsonData);

    const asr = jsonData.response[0].sections
      .find((section) => section.sectionName === "Administration Section")
      .fields.find((field) => field.fieldName === "ASR_NO");
    // let macAddress = undefined;
    // let manufacturer = undefined;
    // let model = undefined;
    // const serviceConfig = "Service Configuration";
    // const wanIpInfo = "WAN IP Information";
    // const ipblock = "IP_BLOCK";
    // const lanIpInfo = "LAN IP Information";
    // const ipAddress = "IP_ADDRESS";
    // const gatewayIp = "GATEWAY_IP";
    // const routingInfo = "Routing Information";
    // const firstDNS = "PRIMARY_DNS";
    // const secondDNS = "SECONDARY_DNS";
    // const baseKey = jsonData?.response[0]?.sections.find(
    //   (section) => section.sectionName === serviceConfig
    // );

    const unavailable = "Unavailable";
    // let uniOrd = jsonData.info.sellerOrderNumber;
    // if (!uniOrd || typeof uniOrd !== "string") {
    //   // Handle the case when uniOrder is not a string or is undefined/null
    //   uniOrd = ""; // Set a default value or handle the error condition as needed
    // }
    // let uniCkt = jsonData.info.sellerCircuitIDs;
    // if (!uniCkt || typeof uniCkt !== "string") {
    //   // Handle the case when uniOrder is not a string or is undefined/null
    //   uniCkt = ""; // Set a default value or handle the error condition as needed
    // }

    function validateStringProperty(value) {
      // improvement found on https://chat.openai.com/c/2c71cda4-74bb-4195-bc38-d55a56581e2f
      return typeof value === "string" ? value : value.join(", ");
    }

    const extractedData = {
      carrier: jsonData.info.tradingPartner,
      requestNumber: jsonData.info.requestNumber,
      newCktInfo: jsonData.info.project || jsonData.info.endUser,
      address: jsonData.info.endUserAddress,
      readyDate: jsonData.info.tpCompletionDate,
      provider: jsonData.info.productCatalogName,
      uniPon:
        jsonData.info.relatedPurchaseOrderNumber ||
        jsonData.info.requestNumber ||
        unavailable,
      evcPon: jsonData.info.requestNumber,
      ponCCNA: jsonData.info.buyerID,
      icsc: jsonData.info.sellerID,
      uniOrder: validateStringProperty(jsonData.info.sellerOrderNumber),
      evcOrder: jsonData.info.sellerVirtualOrderNumber,
      uniASR: asr ? asr.value : unavailable || null,
      evcASR: jsonData.info.sellerOrderID,
      uniCircuitId: validateStringProperty(jsonData.info.sellerCircuitIDs),
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
              <p>Bandwidth: {parseProduct.bandwidth}</p>
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
