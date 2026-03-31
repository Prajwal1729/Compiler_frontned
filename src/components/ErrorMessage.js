// import {useState} from "react";
import React from "react";
export default function ErrorMessage({ message }) {
  return (
    <div style={{ color: "red", marginTop: "10px" }}>
      {message}
    </div>
  );
}