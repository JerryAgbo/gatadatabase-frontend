import React, { useState } from "react";
import StaffWorkSpace from "../workspace/StaffWorkSpace"; // Adjust the import path as necessary
import HeroSection from "../components/HeroSection"; // Adjust the import path as necessary

function ParentComponent() {
  const [certificateUrls, setCertificateUrls] = useState({
    mostRecent: "",
    previous: "",
  });

  const onUploadCertificate = (certificateType, url) => {
    if (certificateType === "mostRecent") {
      setCertificateUrls((prevUrls) => ({
        mostRecent: url,
        previous: prevUrls.mostRecent,
      }));
    }
  };

  return (
    <>
      <StaffWorkSpace
        onUploadCertificate={onUploadCertificate}
        certificateUrls={certificateUrls}
      />
      <HeroSection certificateUrls={certificateUrls} />
    </>
  );
}

export default ParentComponent;
