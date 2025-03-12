'use client'
import React from "react";
import '../style.css';

const company = "PIRAMIDE";

const HeaderTop = () => {
  return (
    <>
      {company === "PIRAMIDE" ? (
        <div className="header-home-piramide">
          <img className="image-logo-header" src="/logo-piramides.png" alt="Logo Oceanica" />
        </div>
      ) : (
        <div className="header-home-oceanica">
          <img className="image-logo-header" src="/oceanica.png" alt="Logo Oceanica" />
        </div>
      )}
    </>
  );
};

export default HeaderTop;
