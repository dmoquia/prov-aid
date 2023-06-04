import { useState } from "react";

function FileUpload() {
  const [parseProduct, setParsedProd] = useState(null);
  const handleFileSpeedUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const jsonData = JSON.parse(e.target.result);
      const extractedProduct = extractProduct(jsonData);

      setParsedProd(extractedProduct);
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
      demarc: demarc ? demarc : null,
      prov: provisioner,
    };

    return extractedProduct;
  };

  return (
    <>
      <input type="file" onChange={handleFileSpeedUpload} />
      <div>
        {parseProduct && (
          <div>
            <p>Bandwidth: {parseProduct.bandwidth}</p>
            <p>Demarc: {parseProduct.demarc}</p>
            <p>Circuit Prov: {parseProduct.prov.join(" ")}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default FileUpload;
