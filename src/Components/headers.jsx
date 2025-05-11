import React from 'react'
import { Link } from 'react-router-dom'

export default function Headers({ label }) {
  return (
    <div className='webbody' style={{ overflow: "hidden" }}>
      <div className="dchcdbkvnvj">
        <div className="djdhfdjf">
          <Link to={"/"}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/wingedwordsadmin.appspot.com/o/Vista%20Eats%2FChatGPT_Image_May_10__2025__01_32_03_PM-removebg-preview.png?alt=media&token=a6787180-c4d8-4212-8c6c-8cf02bf81a05"
              alt="logo"
              height="70px"
              width="90px"
            />
          </Link>
          <div className="location" style={{ display: "flex", flexDirection: "row" }}>
            <div
              className="dhbdbv"
              style={{
                fontWeight: "600",
                fontSize: "14px",
                marginTop: "2px"
              }}
            >
              {label}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
