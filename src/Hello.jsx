import axios from "axios";
import React, { useState, useRef } from "react";
import "./style.css";
import { Line } from "rc-progress";

const Hello = () => {
  const baseUrl = `http://127.0.0.1:5000`;
  const [selectedFile, setSelectedFile] = useState(null);
  const [dropBoxText, SetDropBoxText] = useState(
    "Drag and drop your file here or"
  );
  const [selectedAlgo, setSelectedAlgo] = useState("rf");
  const [predictionResult, setPredictionResult] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [imgData, setImgData] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState();
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [fileSize, setFileSize] = useState();

  const handleSubmit = () => {
    if (selectedFile) {
      console.log("selected file : ", selectedFile);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("algorithm", selectedAlgo);
      setIsUploading(true); // Start the upload process
      setPercentage(0); // Reset the progress percentage

      axios
        .post(`${baseUrl}/image`, formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setPercentage(progress);
          },
        })
        .then((resp) => {
          setPredictionResult(resp.data);
          console.log(resp.data);
          setIsUploading(false); // Upload finished
          setPercentage(100); // Set percentage to 100 after the upload is completed
        })
        .catch((err) => {
          console.log(err);
          setIsUploading(false); // Upload finished (in case of an error)
        });
    } else {
      console.log("No file selected");
    }
  };

  const handleClear = () => {
    SetDropBoxText("Drag and drop your file here or");
    setSelectedFile(null);
    setPercentage(0);
    setImgData(null);
    setIsUploading(false);
    setFileName(null);
    setFileSize(null);
    setIsFileUploaded(false);
  };

  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = useRef(null);
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    console.log("i am pasting or dropping...");
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;

      if (allowedExtensions.test(file.name)) {
        setSelectedFile(file);
        SetDropBoxText(file.name);
      } else {
        alert(
          "Please select a file with the correct format. Only JPG, JPEG, PNG, and PDF files are allowed."
        );
        e.dataTransfer.value = null; // Clear the input value
      }
      setIsUploading(true);
      // Set file details
      setFileName(file.name);
      setFileSize(Math.floor(file.size / 1000));
      setPercentage(0); // Reset the progress percentage

      // Display file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;

      if (allowedExtensions.test(file.name)) {
        setSelectedFile(file);
        SetDropBoxText(file.name);
      } else {
        alert(
          "Please select a file with the correct format. Only JPG, JPEG, PNG, and PDF files are allowed."
        );
        e.dataTransfer.value = null; // Clear the input value
      }
      // Start upload
      setIsUploading(true);
      // Set file details
      setFileName(file.name);
      setFileSize(Math.floor(file.size / 1000));

      // Display file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="container">
      <h1 className="heading">Chronic Kidney Disease Prediction</h1>
      <div className="center">
        <select
          id="algorithm-select"
          value={selectedAlgo}
          onChange={(e) => setSelectedAlgo(e.target.value)}
        >
          <option value="rf">Random Forest (RF)</option>
          <option value="svc">Support Vector Classifier (SVC)</option>
          <option value="dt">Decision Tree (DT)</option>
        </select>

        {fileName && (
          <React.Fragment>
            {imgData && (
              <div>
                <img src={imgData} alt="uploaded" width="300" />
              </div>
            )}
            <div className="upload-list">
              <div className="file-name">
                <b>{fileName}</b>
              </div>
              <div className="progress-container">
                <Line
                  percent={percentage}
                  strokeWidth={9}
                  trailWidth={9}
                  trailColor="#FFF"
                  strokeColor={isUploading ? "#41C3D2" : "#92ed14"}
                />
                <div className="  ">
                  {isUploading ? `Uploading ${percentage}% ` : `Finished`}
                </div>
              </div>
              <div className="file-size">{`${fileSize} KB`}</div>
            </div>
          </React.Fragment>
        )}
        {fileName && (
          <button id="clear-button" onClick={handleClear}>
            Clear
          </button>
        )}
        
      </div>

      <form
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={handleSubmit} // Add handleSubmit function here
        style={{
          height: isFileUploaded ? "4rem" : "12rem", // Set the height conditionally
        }}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <div style={{ color: "black" }}>
            <p>{dropBoxText}</p>
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .pdf"
              id="file-input"
              onChange={(event) => {
                const file = event.target.files[0];
                const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;

                if (allowedExtensions.test(file.name)) {
                  setSelectedFile(file);
                  SetDropBoxText(file.name);
                } else {
                  alert(
                    "Please select a file with the correct format. Only JPG, JPEG, PNG, and PDF files are allowed."
                  );
                  event.target.value = null; // Clear the input value
                }
                setIsUploading(true);
                // Set file details
                setFileName(file.name);
                setFileSize(Math.floor(file.size / 1000));
                setPercentage(0); // Reset the progress percentage

                // Display file
                const reader = new FileReader();
                reader.onloadend = () => {
                  setImgData(reader.result);
                };
                reader.readAsDataURL(file);
              }}
              style={{ display: "none" }}
            />
            <label htmlFor="file-input" className="custom-file-input-label">
              Upload a File
            </label>
          </div>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>

      <button className="submitButton" onClick={handleSubmit} style={{
          marginBottom: !isUploading ? "1rem" : "5rem", // Set the height conditionally
        }}>
        Submit
      </button>
      {predictionResult !== null && (
        <div className="result">
          <p>
            {predictionResult === 1
              ? "You have the disease."
              : "You do not have the disease."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Hello;
