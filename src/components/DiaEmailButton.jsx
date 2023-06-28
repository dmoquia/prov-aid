import PropTypes from "prop-types";
function DiaEmailButton({ parsedData, parseProduct }) {
  const handleEmailClick = () => {
    let ccsupport;
    //   "PLUG AND PLAY – ATT DIA– 888-471-4574, option 1 (M-F 8 am to 8 pm EST)";
    console.log(parsedData.provider);
    if (parsedData.provider.toLowerCase() === "comcast") {
      ccsupport = "Comcast- 800-391-3000 (24/7 Customer support)";
    } else if (parsedData.provider.toLowerCase() === "spectrum") {
      ccsupport =
        "PLUG AND PLAY –-Spectrum Activation Support - 866-785-5681(E-Access On_Net Ckts)";
    } else if (parsedData.provider.toLowerCase() === "at&t(apex)") {
      ccsupport = "PLUG AND PLAY –ATT ASE – 855-822-0263, option 3, option 1";
    }

    const emailAddress = "recipient@example.com";
    const subject = `COMPLETION NOTICE: ${parsedData.newCktInfo} | Address: ${parsedData.address} | PON: ${parsedData.requestNumber}`;
    const body = `
      Circuit has successfully been completed/activated.
      Please verify services as order can be moved to billing upon your confirmation in FSX.
      See below specifications:
      New Circuit Information: ${parsedData.newCktInfo}
      Address: ${parsedData.address}
      Ready Date ${parsedData.readyDate}
      - Circuit Provider: ${parsedData.provider}
      - PON/CCNA: ${parsedData.pon}
      - USO: Can be found on att tracker
      - Bandwidth: ${parseProduct.bandwidth}
      - Circuit ID: ${parsedData.circuitID}
      - LEC circuit ID: Can be found on att tracker
      - Demarc: ${parseProduct.demarc}
      - Handoff for LEC: ${parsedData.handoff}
      - HUB: ${parsedData.hub}
      - CFA: ${parsedData.cfa}
      - VLAN: ${parsedData.vlan}
      - IP Details & Ping will go here
      Circuit Prov: ${parseProduct.prov.join(" ")}
      ${ccsupport}
    `;
    // backend option on sending email https://chat.openai.com/c/98b5ddad-d036-4cd8-a672-f931abd8f184
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
DiaEmailButton.propTypes = {
  parsedData: PropTypes.shape({
    requestNumber: PropTypes.string.isRequired,
    newCktInfo: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    readyDate: PropTypes.string.isRequired,
    hub: PropTypes.string.isRequired,
    cfa: PropTypes.string.isRequired,
    vlan: PropTypes.string.isRequired,
    circuitID: PropTypes.string.isRequired,
    handoff: PropTypes.string.isRequired,
    // old
    provider: PropTypes.string.isRequired,
    pon: PropTypes.string.isRequired,
  }).isRequired,
  parseProduct: PropTypes.shape({
    prov: PropTypes.array.isRequired,
    bandwidth: PropTypes.string.isRequired,
    demarc: PropTypes.string.isRequired,
  }),
};
export default DiaEmailButton;
