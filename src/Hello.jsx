import axios from "axios";
import React, { useState, useRef } from "react";
import "./style.css";

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
  const [responseData, setResponseData] = useState("");

  const handleSubmit = () => {
    if (selectedFile) {
      console.log("selected file : ", selectedFile);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("algorithm", selectedAlgo);
      axios
        .post(`${baseUrl}/image`, formData)
        .then((resp) => {
          setPredictionResult(resp.data);
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err);
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
    }
  };

  // triggers when file is selected with click
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
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
    
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
        {/* <input
          type="file"
          accept=".jpg, .jpeg, .png, .pdf"
          id="file-input"
          onChange={(event) => {
            const file = event.target.files[0];
            const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;

            if (allowedExtensions.test(file.name)) {
              setSelectedFile(file);
            } else {
              alert(
                "Please select a file with the correct format. Only JPG, JPEG, PNG, and PDF files are allowed."
              );
              event.target.value = null; // Clear the input value
            }
            
          }}
          style={{ display: "none" }}
        />
        <label htmlFor="file-input" className="custom-file-input-label">
        Sammmolke
      </label> */}
      </div>

      <form
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={handleSubmit} // Add handleSubmit function here
        style={{
          height: isFileUploaded ? "6rem" : "16rem", // Set the height conditionally
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
              SetDropBoxText(file.name)
            } else {
              alert(
                "Please select a file with the correct format. Only JPG, JPEG, PNG, and PDF files are allowed."
              );
              event.target.value = null; // Clear the input value
            }
            
          }}
          style={{ display: "none" }}
        />
        <label htmlFor="file-input" className="custom-file-input-label">
        Upload a File
      </label>
            {/* <button
              className="upload-button"
              onClick={onButtonClick}

              style={{ color: "black" }}
            >
              Upload a file
            </button> */}
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

      <button onClick={handleSubmit}>Submit</button>
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

// import axios from "axios";
// import React, { useState } from "react";
// import "./style.css";

// const Hello = () => {
//   const baseUrl = `http://127.0.0.1:5000`;
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [selectedAlgo, setSelectedAlgo] = useState(null);
//   const [predictionResult, setPredictionResult] = useState(null);

//   const handleSubmit = () => {
//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       formData.append("algorithm", selectedAlgo);
//       axios
//         .post(`${baseUrl}/image`, formData)
//         .then((resp) => {
//           setPredictionResult(resp.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       console.log("No file selected");
//     }
//   };

//   return (
//     <div className="container">
//       <h1 className="heading">Chronic Kidney Disease Prediction</h1>
//       <div className="center">
//         <select
//           id="algorithm-select"
//           value={selectedAlgo}
//           onChange={(e) => setSelectedAlgo(e.target.value)}
//         >
//           <option value="rf">Random Forest (RF)</option>
//           <option value="svc">Support Vector Classifier (SVC)</option>
//           <option value="dt">Decision Tree (DT)</option>
//         </select>
//         <input
//           type="file"
//           onChange={(event) => setSelectedFile(event.target.files[0])}
//         />
//       </div>
//       <div className="drop-zone">
//         <p>Drag and drop file here or click to select file</p>
//       </div>
//         <button onClick={handleSubmit}>Submit</button>
//       {predictionResult !== null && (
//         <div className="result">
//           <p>{predictionResult == '1' ? "You have the disease." : "You do not have the disease."}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Hello;

// import axios from "axios";
// import React, { useState } from "react";

// const Hello = () => {
//   const baseUrl = `http://127.0.0.1:5000`;
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [selectedAlgo, setSelectedAlgo] = useState("rf");

//   const handleSubmit = () => {
//     if (selectedFile) {
//       console.log("Selected file:", selectedFile);
//     //   setSelectedAlgo("rf");

//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       formData.append("algorithm", selectedAlgo);
//       axios
//         .post(`${baseUrl}/image`, formData)
//         .then((resp) => {
//           console.log(resp);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       console.log("No file selected");
//     }
//   };

//   return (
//     <div>
//       <h1 className="heading">Chronic Kidney Disease Prediction</h1>
//       <select
//         id="algorithm-select"
//         value={selectedAlgo}
//         onChange={(e) => setSelectedAlgo(e.target.value)}
//       >
//         <option value="rf">Random Forest (RF)</option>
//         <option value="svc">Support Vector Classifier (SVC)</option>
//         <option value="dt">Decision Tree (DT)</option>
//       </select>
//       <input
//         type="file"
//         onChange={(event) => setSelectedFile(event.target.files[0])}
//       />
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default Hello;
