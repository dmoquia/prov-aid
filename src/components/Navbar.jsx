import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import M from "materialize-css";
function Navbar() {
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Initialize dropdown on component mount
    M.Dropdown.init(dropdownRef.current);
  }, []);

  return (
    <>
      {/* Dropdown Structure  */}
      <ul id="dropdown1" className="dropdown-content">
        <li>
          <Link to="/att">BB</Link>
        </li>
        <li>
          <Link to="/attase">ASE</Link>
        </li>
        <li className="divider"></li>
        <li>
          <Link to="/attdia">DIA</Link>
        </li>
      </ul>

      <nav>
        <div className="nav-wrapper blue-grey darken-4">
          <a href="/" className="brand-logo">
            Parser
            <span
              className="amber accent-4"
              style={{
                color: "black",
                borderRadius: "0.3rem",
                padding: "0 0.2rem",
              }}
            >
              Mate
            </span>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/comcast">Comcast</Link>
            </li>
            <li>
              <Link to="/spectrum">Spectrum</Link>
            </li>
            {/* Dropdown Trigger  */}
            <li>
              <a
                className="dropdown-trigger"
                href="#!"
                data-target="dropdown1"
                ref={dropdownRef}
              >
                ATT<i className="material-icons right">arrow_drop_down</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
// import { Link } from "react-router-dom";
// import { useEffect, useRef } from "react";
// import M from "materialize-css";

// function Navbar() {
//   const dropdownRef1 = useRef(null);
//   const dropdownRef2 = useRef(null);

//   useEffect(() => {
//     // Initialize dropdowns on component mount
//     M.Dropdown.init(dropdownRef1.current);
//     M.Dropdown.init(dropdownRef2.current);
//   }, []);

//   return (
//     <>
//       {/* Dropdown Structure  */}
//       <ul id="dropdown1" className="dropdown-content">
//         <li>
//           <Link to="/att">BB</Link>
//         </li>
//         <li>
//           <Link to="/attase">ASE</Link>
//         </li>
//         <li className="divider"></li>
//         <li>
//           <Link to="/attdia">DIA</Link>
//         </li>
//       </ul>
//       <ul id="dropdown2" className="dropdown-content">
//         <li>
//           <Link to="/">blank</Link>
//         </li>
//       </ul>
//       <nav>
//         <div className="nav-wrapper blue-grey darken-4">
//           <a href="/" className="brand-logo">
//             Parser
//             <span
//               className="amber accent-4"
//               style={{
//                 color: "black",
//                 borderRadius: "0.3rem",
//                 padding: "0 0.2rem",
//               }}
//             >
//               Mate
//             </span>
//           </a>
//           <ul className="right hide-on-med-and-down">
//             <li>
//               <a
//                 className="dropdown-trigger"
//                 href="#!"
//                 data-target="dropdown2"
//                 ref={dropdownRef2}
//               >
//                 Blank<i className="material-icons right">arrow_drop_down</i>
//               </a>
//             </li>
//             <li>
//               <Link to="/comcast">Comcast</Link>
//             </li>
//             <li>
//               <Link to="/spectrum">Spectrum</Link>
//             </li>
//             {/* Dropdown Triggers */}
//             <li>
//               <a
//                 className="dropdown-trigger"
//                 href="#!"
//                 data-target="dropdown1"
//                 ref={dropdownRef1}
//               >
//                 ATT<i className="material-icons right">arrow_drop_down</i>
//               </a>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Navbar;

// import { useState } from "react";
// import EmailButton from "../components/EmailButton";

// function Comcast() {
//   const [parsedData, setParsedData] = useState(null);
//   const [parseProduct, setParsedProd] = useState(null);
//   // product and demarc
//   const handleFileSpeedUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const jsonData = JSON.parse(e.target.result);
//       const extractedProduct = extractProduct(jsonData);

//       setParsedProd(extractedProduct);
//     };

//     reader.readAsText(file);
//   };

//   const extractProduct = (jsonData) => {
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

//     const extractedProduct = {
//       bandwidth: speed ? speed.value : null,
//       demarc: demarc ? demarc : null,
//       prov: provisioner,
//     };

//     return extractedProduct;
//   };
//   // end of product and demarc

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

//     return extractedData;
//   };

//   return (
//     <>
//       <div className="container">
//         <input id="fileInput" type="file" onChange={handleFileUpload} />
//         <input id="fileInput" type="file" onChange={handleFileSpeedUpload} />

//         {parsedData && (
//           <div className="choose">
//             <p>New Circuit Information: {parsedData.newCktInfo}</p>
//             <p>Address: {parsedData.address}</p>
//             <p>Circuit Provider: {parsedData.provider}</p>
//             <p>PON/CCNA: {parsedData.ponCCNA}</p>
//             <p>Circuit ID: {parsedData.circuitID}</p>
//             <p>Bandwidth: {parseProduct.bandwidth}</p>
//             <p>Demarc: {parseProduct.demarc}</p>
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
//             {/* <SpeedDemarc /> */}
//             <p>Circuit Prov: {parseProduct.prov.join(" ")}</p>
//             <p>Comcast- 800-391-3000 (24/7 Customer support)</p>
//           </div>
//         )}
//         {parsedData && <EmailButton parsedData={parsedData} />}
//       </div>
//     </>
//   );
// }

// export default Comcast;
