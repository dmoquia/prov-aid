import PropTypes from "prop-types";
function AseEmailButton({ parsedData, parseProduct }) {
  const handleEmailClick = () => {
    let ccsupport = "PLUG AND PLAY –ATT ASE – 855-822-0263, option 3, option 1";

    const emailAddress = "recipient@example.com";
    const subject = `COMPLETION NOTICE: ${parsedData.newCktInfo} | Address: ${parsedData.address} | PON: ${parsedData.ponCCNA}`;
    const body = `
      Circuit has successfully been completed/activated.
      Please verify services as order can be moved to billing upon your confirmation in FSX.
      See below specifications:
      New Circuit Information: ${parsedData.newCktInfo}
      Address: ${parsedData.address}
      Ready Date ${parsedData.readyDate}
      - Circuit Provider: ${parsedData.provider}
      - UNI PON: ${parsedData.uniPon}
      - UNI EVC: ${parsedData.evcPon}
      - PON/CCNA: ${parsedData.ponCCNA}
      - ICSC: ${parsedData.icsc}
      - UNI Order: ${parsedData.uniOrder}
      - EVC Order: ${parsedData.evcOrder}
      - UNI ASR: ${parsedData.uniASR}
      - EVC ASR: ${parsedData.evcASR}
      - UNI CircuitID: ${parsedData.uniCircuitId}
      - EVC CircuitID: ${parsedData.evcCircuitId}
      - Configuration(uBAN): ${parsedData.ConfigBAN}
      - Handoff for LEC: ${parsedData.handoffLEC}
      - HUB: ${parsedData.hub}
      - Bandwidth: default
      - Demarc: ${parseProduct.demarc}
      - CFA: ${parseProduct.cfa}
      - VLAN: ${parseProduct.vlans}
      - IP Details & Ping will go here
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
AseEmailButton.propTypes = {
  parsedData: PropTypes.shape({
    newCktInfo: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    readyDate: PropTypes.string.isRequired,
    uniPon: PropTypes.string.isRequired,
    evcPon: PropTypes.string.isRequired,
    icsc: PropTypes.string.isRequired,
    uniOrder: PropTypes.string.isRequired,
    evcOrder: PropTypes.string.isRequired,
    uniASR: PropTypes.string.isRequired,
    evcASR: PropTypes.string.isRequired,
    uniCircuitId: PropTypes.string.isRequired,
    evcCircuitId: PropTypes.string.isRequired,
    ConfigBAN: PropTypes.string.isRequired,
    handoffLEC: PropTypes.string.isRequired,
    hub: PropTypes.string.isRequired,

    // old
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
    cfa: PropTypes.string.isRequired,
    vlans: PropTypes.string.isRequired,
    prov: PropTypes.array.isRequired,
    bandwidth: PropTypes.string.isRequired,
    demarc: PropTypes.string.isRequired,
  }),
};
export default AseEmailButton;
