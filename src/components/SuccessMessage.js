// import {useState} from "react";
import React from "react";
export default function SuccessMessage({ message }) {
  return (
    <div style={{ color: "green", marginTop: "10px" }}>
      {message}
    </div>
  );
}