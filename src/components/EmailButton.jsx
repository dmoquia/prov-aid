import PropTypes from "prop-types";
function EmailButton({ parsedData, parseProduct }) {
  const handleEmailClick = () => {
    let ccsupport = "";
    const provider = parsedData.provider.toLowerCase();

    const supportInfo = {
      comcast: "Comcast- 800-391-3000 (24/7 Customer support)",
      spectrum:
        "PLUG AND PLAY –-Spectrum Activation Support - 866-785-5681(E-Access On_Net Ckts)",
      "at&t(apex)": "PLUG AND PLAY -AT&T- 844-963-0016 (Activation/Support)",
    };

    ccsupport = supportInfo[provider] || "";

    // let ccsupport = "";
    // if (parsedData.provider.toLowerCase() === "comcast") {
    //   ccsupport = "Comcast- 800-391-3000 (24/7 Customer support)";
    // } else if (parsedData.provider.toLowerCase() === "spectrum") {
    //   ccsupport =
    //     "PLUG AND PLAY –-Spectrum Activation Support - 866-785-5681(E-Access On_Net Ckts)";
    // } else if (parsedData.provider.toLowerCase() === "at&t(apex)") {
    //   ccsupport = "PLUG AND PLAY -AT&T- 844-963-0016 (Activation/Support)";
    // }
    const emailAddress = "recipient@example.com";
    const subject = `COMPLETION NOTICE: ${parsedData.newCktInfo} | Address: ${parsedData.address} | PON: ${parsedData.ponCCNA}`;
    const body = `
      Circuit has successfully been completed/activated.
      Please verify services as order can be moved to billing upon your confirmation in FSX.
      See below specifications:
      New Circuit Information: ${parsedData.newCktInfo}
      Address: ${parsedData.address}
      - Circuit Provider: ${parsedData.provider}
      - PON/CCNA: ${parsedData.ponCCNA}
      - Circuit ID: ${parsedData.circuitID}
      - Bandwidth: ${parseProduct.bandwidth}
      - Demarc: ${parseProduct.demarc}
      - IP Block: ${parsedData.block}
      - IP Address Range: ${parsedData.range}
      - First IP: ${parsedData.firstIP}
      - Last IP: ${parsedData.lastIP}
      - Gateway: ${parsedData.gatewayIP}
      - Primary DNS: ${parsedData.primaryDNS}
      - Secondary DNS: ${parsedData.secondaryDNS}
      Model Details:
      - Brand: ${parsedData.manufacturer}
      - Model: ${parsedData.models}
      - Mac address: ${parsedData.macAddress}
      - Ping test will go here
      Circuit Prov: ${parseProduct.prov.join(" ")}

      ${ccsupport}
    `;

    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <button
      onClick={handleEmailClick}
      style={{
        marginTop: "1.5rem",
        background: "teal",
        padding: "0.5em",
        color: "white",
      }}
    >
      Send Email
    </button>
  );
}
EmailButton.propTypes = {
  parsedData: PropTypes.shape({
    newCktInfo: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
    ponCCNA: PropTypes.string.isRequired,
    circuitID: PropTypes.string.isRequired,
    block: PropTypes.string.isRequired,
    range: PropTypes.string.isRequired,
    firstIP: PropTypes.string.isRequired,
    lastIP: PropTypes.string.isRequired,
    gatewayIP: PropTypes.string.isRequired,
    primaryDNS: PropTypes.string.isRequired,
    secondaryDNS: PropTypes.string.isRequired,
    manufacturer: PropTypes.string.isRequired,
    models: PropTypes.string.isRequired,
    macAddress: PropTypes.string.isRequired,
  }).isRequired,
  parseProduct: PropTypes.shape({
    prov: PropTypes.array.isRequired,
    bandwidth: PropTypes.string.isRequired,
    demarc: PropTypes.string.isRequired,
  }),
};
export default EmailButton;
