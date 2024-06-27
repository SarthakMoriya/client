import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeComponent = ({ url }) => {
  const qrRef = React.useRef();

  const handleShare = () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      canvas.toBlob((blob) => {
        const filesArray = [
          new File([blob], "qr-code.png", {
            type: "image/png",
            lastModified: new Date().getTime(),
          }),
        ];

        const shareData = {
          title: "QR Code",
          text: "Check out this QR code!",
          files: filesArray,
        };

        if (navigator.share) {
          navigator
            .share(shareData)
            .catch((error) => console.error("Error sharing", error));
        } else {
          console.error("Web Share API not supported in your browser.");
        }
      });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div ref={qrRef}>
        <QRCodeCanvas value={url} size={156} />
      </div>
      <button
        onClick={handleShare}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
        className="border rounded shadow-xl hover:shadow-none delay-100 duration-300 ease-in-out border-blue hover:border-yellow-400 hover:rounded-none"
      >
        Share QR Code
      </button>
    </div>
  );
};

export default QRCodeComponent;
