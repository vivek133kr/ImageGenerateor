import logo from './logo.svg';
import './App.css';
import { Alert, Button, Modal } from "@mui/material";
import "./App.css";

import CheckIcon from '@mui/icons-material/Check';
import Dropzone from "react-dropzone";

import { useNavigate, useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useRef, useState } from "react";
import { Formik } from "formik";

import "@fontsource/roboto";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import * as Yup from "yup";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";


import { isMobile } from "react-device-detect";
function App() {


  let [loading, setLoading] = useState(false)
  let [url, setUrl] = useState("")
const [isCopied, setIsCopied] = useState(false);

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(url);
    setIsCopied(true);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

  console.log(loading, url, " line 33")
  return (
    <div className="App">
      <h1>Generate Image Link</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Dropzone
          maxFiles={1}
          accept={{
            "image/jpeg": [],
            "image/png": [],
            "image/jpg": [],
          }}
          onDrop={(acceptedFiles, rejectedFiles) => {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", acceptedFiles[0]);

            const xhr = new XMLHttpRequest();
            xhr.open(
              "POST",
              ` https://smoggy-gold-betta.cyclic.app/api/upload`
            );

            xhr.addEventListener("load", (event) => {
              if (event.target.status === 201) {
                const res = JSON.parse(xhr.response);

                setUrl(res.url);
                setLoading(false);
                console.log(res, " loading new way");
              } else {
                setLoading(false);
              }
            });

            xhr.send(formData);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                width: "90%",
                height: "423px",

                borderRadius: "8px",
                backgroundColor: "white",
                display: "flex",
                padding: "0px",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  paddingTop: "5%",
                  paddingBottom: "3%",
                  textAlign: "center",
                  display: "flex",

                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "28px",
                    color: "#1A73E8",
                    fontFamily: "Roboto",
                    paddingLeft: "4%",
                    margin: "0px",
                    paddingRight: "4%",
                    fontStyle: "normal",
                    fontWeight: 500,
                  }}
                >
                  Upload Files
                </p>
                <p
                  style={{
                    width: "90%",
                    margin: "0px",
                  }}
                >
                  Please make sure that the picture is in Jpeg, png format
                </p>{" "}
              </div>
              <div
                style={{
                  display: "flex",
                  width: "70%",

                  flexDirection: "column",
                  marginBottom: "5%",
                  justifyContent: "center",
                }}
              >
                <div
                  {...getRootProps({
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",

                    width: "300px",

                    border: "2px solid purple",

                    borderWidth: 2,
                    borderRadius: 2,
                    borderColor: "#eeeeee",
                    borderStyle: "dashed",
                    backgroundColor: "#fafafa",
                    color: "#bdbdbd",
                    transition: "border .3s ease-in-out",
                  })}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    {...getInputProps({
                      max: 1,
                      accept: "image/jpeg, image/png",
                    })}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "230px",

                      borderWidth: 2,
                      borderRadius: 9,
                      borderColor: "#1A73E8",
                      borderStyle: "dashed",
                      backgroundColor: "#fafafa",
                      border: "4px dashed #1A73E8",
                      color: "#bdbdbd",
                      transition: "border .3s ease-in-out",

                      width: "100%",
                    }}
                  >
                    {/* <img src={UploadLogo} alt="new" /> */}
                    <p>Drag and drop file here</p>
                    <p>OR</p>
                    <Button variant="contained">Browse Files</Button>
                  </div>
                </div>
              </div>
              {/* {values[item.name].length == item.max_file_allowed ? (
                                    <Alert
                                      icon={false}
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        margin: "0 auto",
                                        backgroundColor: "black",
                                        color: "white",
                                      }}
                                    >
                                      <p>
                                        {" "}
                                        {DropErrors.length}
                                        {DropErrors.length == 1
                                          ? " file"
                                          : " files"}{" "}
                                        have been rejected. Make sure all files
                                        size should be within{" "}
                                        {item.max_file_size} mb
                                      </p>
                                    </Alert>
                                        ):""} */}
            </div>
          )}
        </Dropzone>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {loading  ? (
            <CircularProgress />
          ) : (
            loading == false &&
            url.length > 0 && (
              <div
                style={{
                  display: "flex",
                }}
              >
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "24px",
                    }}
                  >
                    IMAGE URL &nbsp;: &nbsp; &nbsp;
                  </span>
                  {url}
                </p>
                <Button
                  style={{
                    width: "fit-content",
                    marginLeft: "20px",
                  }}
                  variant="contained"
                  onClick={async () => {
                    await copyText();
                    setIsCopied(true);
                    setTimeout(() => {
                      setIsCopied(false);
                    }, 2000);
                  }}
                >
                  {!isCopied ? "Copy" : <CheckIcon />}
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
