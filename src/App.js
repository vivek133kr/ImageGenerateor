import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Button, CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDrop = (acceptedFiles) => {
    setLoading(true);
    setUrl(""); // Reset URL before starting the upload
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://image-generator-new-620ddf5a162b.herokuapp.com/api/upload`);

    xhr.addEventListener("load", (event) => {
      setLoading(false);
      if (event.target.status === 201) {
        const res = JSON.parse(xhr.response);
        setUrl(res.url);
        toast.success("File uploaded successfully!");
      } else {
        setUrl(""); // Reset URL in case of error
        const errorResponse = JSON.parse(xhr.response);
        toast.error(errorResponse.error || "An error occurred during upload.");
      }
    });

    xhr.addEventListener("error", () => {
      setLoading(false);
      setUrl(""); // Reset URL in case of error
      toast.error("An error occurred during upload.");
    });

    xhr.send(formData);
  };

  return (
    <div className="App">
      <ToastContainer />
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
            "application/pdf": [],
          }}
          onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
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
                  Please make sure that the picture is in JPEG, PNG format
                </p>
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
                    <p>Drag and drop file here</p>
                    <p>OR</p>
                    <Button variant="contained">Browse Files</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Dropzone>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            !loading &&
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
