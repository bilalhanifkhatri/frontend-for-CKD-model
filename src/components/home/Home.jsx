import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { Line } from "rc-progress";
import Upload from "rc-upload";

export default function Home() {
  const baseUrl = `http://127.0.0.1:5000`;
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  const [percentage, setPercentage] = useState(0);
  const [imgData, setImgData] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState();
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [fileSize, setFileSize] = useState();
  const [responseData, setResponseData] = useState("");

  const props = {
    action: `${baseUrl}/image`,
    accept: ".jpg, .jpeg, .png, .pdf",
    beforeUpload(file) {
      // Check file format
      const allowedFormats = [".jpg", ".jpeg", ".png", ".pdf"];
      const fileFormat = file.name
        .substring(file.name.lastIndexOf("."))
        .toLowerCase();
      if (!allowedFormats.includes(fileFormat)) {
        alert(
          "Please select a file with the correct format. Only .jpg, .jpeg, .png, and .pdf formats are allowed."
        );
        return false;
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

      if (selectedFile) {
        console.log("Selected file:", selectedFile);
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

      return true;
    },
    onSuccess(file) {
      // Finish upload
      setIsUploading(false);
      setIsFileUploaded(true);

      if (selectedFile) {
        console.log("Selected file:", selectedFile);
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
    },
    onProgress(step) {
      // Update progress
      setPercentage(Math.round(step.percent));
      setIsFileUploaded(true);
    },
    onError(err) {
      console.log("onError", err);
    },
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPercentage(0);
    setImgData(null);
    setIsUploading(false);
    setFileName(null);
    setFileSize(null);
    setIsFileUploaded(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Upload file using Axios
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("algorithm", selectedAlgo);

    if (selectedFile) {
      console.log("Selected file:", selectedFile);
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

  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = React.useRef(null);

  // handle drag events
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
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(e.dataTransfer.files[0]);
      const allowedFormats = [".jpg", ".jpeg", ".png", ".pdf"];
      const fileFormat = file.name
        .substring(file.name.lastIndexOf("."))
        .toLowerCase();
      if (!allowedFormats.includes(fileFormat)) {
        alert(
          "Please select a file with the correct format. Only .jpg, .jpeg, .png, and .pdf formats are allowed."
        );
        return;
      }

      // Start upload
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

      // Upload file using XMLHttpRequest or fetch API
      
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(e.target.files[0]);
      const allowedFormats = [".jpg", ".jpeg", ".png", ".pdf"];
      const fileFormat = file.name
        .substring(file.name.lastIndexOf("."))
        .toLowerCase();
      if (!allowedFormats.includes(fileFormat)) {
        alert(
          "Please select a file with the correct format. Only .jpg, .jpeg, .png, and .pdf formats are allowed."
        );
        return;
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

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="App">
      <h1 className="heading">Chronic Kidney Disease Prediction</h1>
      <select
        id="algorithm-select"
        value={selectedAlgo}
        onChange={(e) => setSelectedAlgo(e.target.value)}
      >
        <option value="RF">Random Forest (RF)</option>
        <option value="SVC">Support Vector Classifier (SVC)</option>
        <option value="DT">Decision Tree (DT)</option>
      </select>
      {fileName && (
        <React.Fragment>
          {imgData && (
            <div>
              <img src={imgData} alt="uploaded" width="250" />
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
              <div className="progress-text">
                {isUploading ? `Uploading ${percentage}% ` : `Finished`}
              </div>
            </div>
            <div className="file-size">{`${fileSize} KB`}</div>
          </div>
        </React.Fragment>
      )}
      <Upload {...props}>
        <button id="upload-button">Upload File</button>
      </Upload>
      {fileName && (
        <button id="clear-button" onClick={handleClear}>
          Clear
        </button>
      )}
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
          <div>
            <p>Drag and drop your file here or</p>
              <button className="upload-button">
                onClick={onButtonClick}
                Upload a file
              </button>
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

      {predictionResult !== null && (
        <div className="result response-div">
          <p>
            {predictionResult == "1"
              ? "You have the disease."
              : "You do not have the disease."}
          </p>
        </div>
      )}
    </div>
  );
}

// import React, { useState } from "react";
// import axios from "axios";
// import "./style.css";
// import { Line } from "rc-progress";
// import Upload from "rc-upload";
// import DragDrop from "../../assets/dragdrop.jpeg";
// import Background from "../../assets/background.jpeg";

// export default function Home() {
//   const baseUrl = "http://127.0.0.1:5000";

//   const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
//   const [percentage, setPercentage] = useState(0);
//   const [imgData, setImgData] = useState();
//   const [isUploading, setIsUploading] = useState(false);
//   const [fileName, setFileName] = useState();
//   const [isFileUploaded, setIsFileUploaded] = useState(false);
//   const [fileSize, setFileSize] = useState();
//   const [responseData, setResponseData] = useState("");

//   const props = {
//     action: `${baseUrl}/image`,
//     accept: ".jpg, .jpeg, .png, .pdf",
//     beforeUpload(file) {
//       // Check file format
//       const allowedFormats = [".jpg", ".jpeg", ".png", ".pdf"];
//       const fileFormat = file.name
//         .substring(file.name.lastIndexOf("."))
//         .toLowerCase();
//       if (!allowedFormats.includes(fileFormat)) {
//         alert(
//           "Please select a file with the correct format. Only .jpg, .jpeg, .png, and .pdf formats are allowed."
//         );
//         return false;
//       }

//       // Start upload
//       setIsUploading(true);
//       // Set file details
//       setFileName(file.name);
//       setFileSize(Math.floor(file.size / 1000));

//       // Display file
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImgData(reader.result);
//       };
//       reader.readAsDataURL(file);

//       return true;
//     },
//     onSuccess() {
//       // Finish upload
//       setIsUploading(false);
//       setIsFileUploaded(true);

//       // Upload file using Axios
//       const formData = new FormData();
//       formData.append("file", file);

//       axios
//         .post(`${baseUrl}/image`, formData)
//         .then((response) => {
//           // Handle the response from the API
//           console.log(response.data);
//           // You can update the UI with the response data
//           // For example, set the response data in state and display it in a div
//           // const responseData = response.data;
//           setResponseData(responseData);
//         })
//         .catch((error) => {
//           console.log("Error:", error);
//         });
//     },
//     onProgress(step) {
//       // Update progress
//       setPercentage(Math.round(step.percent));
//       setIsFileUploaded(true);
//     },
//     onError(err) {
//       console.log("onError", err);
//     },
//   };

//   const handleClear = () => {
//     setPercentage(0);
//     setImgData(null);
//     setIsUploading(false);
//     setFileName(null);
//     setFileSize(null);
//     setIsFileUploaded(false);
//   };

//   // drag state
//   const [dragActive, setDragActive] = useState(false);
//   // ref
//   const inputRef = React.useRef(null);

//   // handle drag events
//   const handleDrag = function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const file = e.dataTransfer.files[0];
//       // Perform necessary actions with the dropped file
//       // Check file format
//       const allowedFormats = [".jpg", ".jpeg", ".png", ".pdf"];
//       const fileFormat = file.name
//         .substring(file.name.lastIndexOf("."))
//         .toLowerCase();
//       if (!allowedFormats.includes(fileFormat)) {
//         alert(
//           "Please select a file with the correct format. Only .jpg, .jpeg, .png, and .pdf formats are allowed."
//         );
//         return;
//       }

//       // Start upload
//       setIsUploading(true);
//       // Set file details
//       setFileName(file.name);
//       setFileSize(Math.floor(file.size / 1000));
//       setPercentage(0); // Reset the progress percentage

//       // Display file
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImgData(reader.result);
//       };
//       reader.readAsDataURL(file);

//       // Upload file using XMLHttpRequest or fetch API
//       const xhr = new XMLHttpRequest();
//       xhr.open("POST", `${baseUrl}/image`, true);

//       xhr.upload.onprogress = (event) => {
//         // Update progress
//         const percent = Math.round((event.loaded / event.total) * 100);
//         setIsFileUploaded(true);
//         setPercentage(percent);
//       };

//       xhr.onload = () => {
//         // Finish upload
//         setIsFileUploaded(true);
//         setIsUploading(false);
//       };

//       xhr.onerror = (err) => {
//         console.log("onError", err);
//       };

//       const formData = new FormData();
//       formData.append("file", file);

//       xhr.send(formData);
//     }
//   };

//   // triggers when file is selected with click
//   const handleChange = function (e) {
//     e.preventDefault();
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       // Perform necessary actions with the selected file
//       // Check file format
//       const allowedFormats = [".jpg", ".jpeg", ".png", ".pdf"];
//       const fileFormat = file.name
//         .substring(file.name.lastIndexOf("."))
//         .toLowerCase();
//       if (!allowedFormats.includes(fileFormat)) {
//         alert(
//           "Please select a file with the correct format. Only .jpg, .jpeg, .png, and .pdf formats are allowed."
//         );
//         return;
//       }

//       // Start upload
//       setIsUploading(true);
//       // Set file details
//       setFileName(file.name);
//       setFileSize(Math.floor(file.size / 1000));

//       // Display file
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImgData(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // triggers the input when the button is clicked
//   const onButtonClick = () => {
//     inputRef.current.click();
//   };

//   return (
//     <div className="App">
//       <h1 className="heading">Chronic Kidney Disease Prediction</h1>
//       <select
//         id="algorithm-select"
//         value={selectedAlgorithm}
//         onChange={(e) => setSelectedAlgorithm(e.target.value)}
//       >
//         <option value="">Select Algorithm</option>
//         <option value="RF">Random Forest (RF)</option>
//         <option value="SVM">Support Vector Machine (SVM)</option>
//         <option value="DT">Decision Tree (DT)</option>
//       </select>
//       {fileName && (
//         <React.Fragment>
//           {imgData && (
//             <div>
//               <img src={imgData} alt="uploaded" width="250" />
//             </div>
//           )}
//           <div className="upload-list">
//             <div className="file-name">
//               <b>{fileName}</b>
//             </div>
//             <div className="progress-container">
//               <Line
//                 percent={percentage}
//                 strokeWidth={9}
//                 trailWidth={9}
//                 trailColor="#FFF"
//                 strokeColor={isUploading ? "#41C3D2" : "#92ed14"}
//               />
//               <div className="progress-text">
//                 {isUploading ? `Uploading ${percentage}% ` : `Finished`}
//               </div>
//             </div>
//             <div className="file-size">{`${fileSize} KB`}</div>
//           </div>
//         </React.Fragment>
//       )}
//       <Upload {...props}>
//         <button id="upload-button">Upload File</button>
//       </Upload>
//       {fileName && (
//         <button id="clear-button" onClick={handleClear}>
//           Clear
//         </button>
//       )}
//       <form
//         id="form-file-upload"
//         onDragEnter={handleDrag}
//         onSubmit={(e) => e.preventDefault()}
//         style={{
//           height: isFileUploaded ? "6rem" : "16rem", // Set the height conditionally
//         }}
//       >
//         <input
//           ref={inputRef}
//           type="file"
//           id="input-file-upload"
//           multiple={true}
//           onChange={handleChange}
//         />
//         <label
//           id="label-file-upload"
//           htmlFor="input-file-upload"
//           className={dragActive ? "drag-active" : ""}
//         >
//           <div>
//             <p>Drag and drop your file here or</p>
//             <Upload {...props}>
//               <button className="upload-button">
//                 {/*  onClick={onButtonClick} */}
//                 Upload a file
//               </button>
//             </Upload>
//           </div>
//         </label>
//         {dragActive && (
//           <div
//             id="drag-file-element"
//             onDragEnter={handleDrag}
//             onDragLeave={handleDrag}
//             onDragOver={handleDrag}
//             onDrop={handleDrop}
//           ></div>
//         )}
//       </form>
//       {responseData && (
//         <div className="response-div">
//           Your chances of having Chronic Kidney Disease with {selectedAlgorithm}{" "}
//           algorithm is: {responseData}
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useRef } from "react";
// import axios from "axios";
// import "./style.css";
// import { Line } from "rc-progress";
// import Upload from "rc-upload";

// export default function Home() {
//   const baseUrl = "http://127.0.0.1:5000";

//   const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
//   const [percentage, setPercentage] = useState(0);
//   const [imgData, setImgData] = useState();
//   const [isUploading, setIsUploading] = useState(false);
//   const [fileName, setFileName] = useState();
//   const [isFileUploaded, setIsFileUploaded] = useState(false);
//   const [responseData, setResponseData] = useState("");

//   const props = {
//     action: `${baseUrl}/image`,
//     accept: ".jpg, .jpeg, .png, .pdf",
//     beforeUpload(file) {
//       // Check file format
//       const allowedFormats = [".jpg", ".jpeg", ".png", ".pdf"];
//       const fileFormat = file.name
//         .substring(file.name.lastIndexOf("."))
//         .toLowerCase();
//       if (!allowedFormats.includes(fileFormat)) {
//         alert(
//           "Please select a file with the correct format. Only .jpg, .jpeg, .png, and .pdf formats are allowed."
//         );
//         return false;
//       }

//       // Start upload
//       setIsUploading(true);
//       // Set file details
//       setFileName(file.name);

//       // Display file
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImgData(reader.result);
//       };
//       reader.readAsDataURL(file);

//       return true;
//     },
//     onSuccess() {
//       // Finish upload
//       setIsUploading(false);
//       setIsFileUploaded(true);

//       // Upload file using Axios
//       const formData = new FormData();
//       formData.append("file", file);

//       axios
//         .post(`${baseUrl}/image`, formData)
//         .then((response) => {
//           // Handle the response from the API
//           console.log(response.data);
//           // You can update the UI with the response data
//           // For example, set the response data in state and display it in a div
//           // const responseData = response.data;
//           setResponseData(responseData);
//         })
//         .catch((error) => {
//           console.log("Error:", error);
//         });
//     },
//     onProgress(step) {
//       // Update progress
//       setPercentage(Math.round(step.percent));
//       setIsFileUploaded(true);
//     },
//     onError(err) {
//       console.log("onError", err);
//     },
//   };

//   const handleClear = () => {
//     setPercentage(0);
//     setImgData(null);
//     setIsUploading(false);
//     setFileName(null);
//     setIsFileUploaded(false);
//   };

//   const handleDrag = function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const file = e.dataTransfer.files[0];
//       // Perform necessary actions with the dropped file
//       // Check file format
//       const allowedFormats = [".jpg", ".jpeg", ".png", ".pdf"];
//       const fileFormat = file.name
//         .substring(file.name.lastIndexOf("."))
//         .toLowerCase();
//       if (!allowedFormats.includes(fileFormat)) {
//         alert(
//           "Please select a file with the correct format. Only .jpg, .jpeg, .png, and .pdf formats are allowed."
//         );
//         return;
//       }

//       // Start upload
//       setIsUploading(true);
//       // Set file details
//       setFileName(file.name);
//       setPercentage(0); // Reset the progress percentage

//       // Display file
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImgData(reader.result);
//       };
//       reader.readAsDataURL(file);

//       // Upload file using XMLHttpRequest or fetch API
//       const xhr = new XMLHttpRequest();
//       xhr.open("POST", `${baseUrl}/image`, true);

//       xhr.upload.onprogress = (event) => {
//         // Update progress
//         const percent = Math.round((event.loaded / event.total) * 100);
//         setIsFileUploaded(true);
//         setPercentage(percent);
//       };

//       xhr.onload = () => {
//         // Finish upload
//         setIsFileUploaded(true);
//         setIsUploading(false);
//       };

//       xhr.onerror = (err) => {
//         console.log("onError", err);
//       };

//       const formData = new FormData();
//       formData.append("file", file);

//       xhr.send(formData);
//     }
//   };

//   const handleChange = function (e) {
//     e.preventDefault();
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       // Perform necessary actions with the selected file
//       // Check file format
//       const allowedFormats = [".jpg", ".jpeg", ".png", ".pdf"];
//       const fileFormat = file.name
//         .substring(file.name.lastIndexOf("."))
//         .toLowerCase();
//       if (!allowedFormats.includes(fileFormat)) {
//         alert(
//           "Please select a file with the correct format. Only .jpg, .jpeg, .png, and .pdf formats are allowed."
//         );
//         return;
//       }

//       // Start upload
//       setIsUploading(true);
//       // Set file details
//       setFileName(file.name);

//       // Display file
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImgData(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const inputRef = useRef(null);

//   const onButtonClick = () => {
//     inputRef.current.click();
//   };

//   return (
//     <div className="App">
//       <h1 className="heading">Chronic Kidney Disease Prediction</h1>
//       <select
//         id="algorithm-select"
//         value={selectedAlgorithm}
//         onChange={(e) => setSelectedAlgorithm(e.target.value)}
//       >
//         <option value="">Select Algorithm</option>
//         <option value="RF">Random Forest (RF)</option>
//         <option value="SVM">Support Vector Machine (SVM)</option>
//         <option value="DT">Decision Tree (DT)</option>
//       </select>
//       {fileName && (
//         <React.Fragment>
//           {imgData && (
//             <div>
//               <img src={imgData} alt="uploaded" width="250" />
//             </div>
//           )}
//           <div className="upload-list">
//             <div className="file-name">
//               <b>{fileName}</b>
//             </div>
//             <div className="progress-container">
//               <Line
//                 percent={percentage}
//                 strokeWidth={9}
//                 trailWidth={9}
//                 trailColor="#FFF"
//                 strokeColor={isUploading ? "#41C3D2" : "#92ed14"}
//               />
//               <div className="progress-text">
//                 {isUploading ? `Uploading ${percentage}% ` : `Finished`}
//               </div>
//             </div>
//           </div>
//         </React.Fragment>
//       )}
//       <Upload {...props}>
//         <button id="upload-button">Upload File</button>
//       </Upload>
//       {fileName && (
//         <button id="clear-button" onClick={handleClear}>
//           Clear
//         </button>
//       )}
//       <form
//         id="form-file-upload"
//         onDragEnter={handleDrag}
//         onSubmit={(e) => e.preventDefault()}
//         style={{
//           height: isFileUploaded ? "6rem" : "16rem", // Set the height conditionally
//         }}
//       >
//         <input
//           ref={inputRef}
//           type="file"
//           id="input-file-upload"
//           multiple={true}
//           onChange={handleChange}
//         />
//         <label
//           id="label-file-upload"
//           htmlFor="input-file-upload"
//           className={dragActive ? "drag-active" : ""}
//         >
//           <div>
//             <p>Drag and drop your file here or</p>
//             <Upload {...props}>
//               <button className="upload-button">
//                 {/*  onClick={onButtonClick} */}
//                 Upload a file
//               </button>
//             </Upload>
//           </div>
//         </label>
//         {dragActive && (
//           <div
//             id="drag-file-element"
//             onDragEnter={handleDrag}
//             onDragLeave={handleDrag}
//             onDragOver={handleDrag}
//             onDrop={handleDrop}
//           ></div>
//         )}
//       </form>
//       {responseData && (
//         <div className="response-div">
//           Your chances of having Chronic Kidney Disease with {selectedAlgorithm}{" "}
//           algorithm is: {responseData}
//         </div>
//       )}
//     </div>
//   );
// }

// // import React, { useState } from "react";
// // import axios from "axios";
// // import "./style.css";
// // import { Line } from "rc-progress";
// // import Upload from "rc-upload";
// // import DragDrop from "../../assets/dragdrop.jpeg";
// // import Background from "../../assets/background.jpeg";

// // export default function Home() {
// //   const baseUrl = "http://127.0.0.1:5000";

// //   const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
// //   const [percentage, setPercentage] = useState(0);
// //   const [imgData, setImgData] = useState();
// //   const [isUploading, setIsUploading] = useState(false);
// //   const [fileName, setFileName] = useState();
// //   const [isFileUploaded, setIsFileUploaded] = useState(false);
// //   const [fileSize, setFileSize] = useState();
// //   const [responseData, setResponseData] = useState("");

// //   const props = {
// //     action: `${baseUrl}/image`,
// //     accept: ".jpg, .jpeg, .png, .pdf",
// //     beforeUpload(file) {
// //       // Check file format
// //       const allowedFormats = [".jpg", ".jpeg", ".png", ".pdf"];
// //       const fileFormat = file.name
// //         .substring(file.name.lastIndexOf("."))
// //         .toLowerCase();
// //       if (!allowedFormats.includes(fileFormat)) {
// //         alert(
// //           "Please select a file with the correct format. Only .jpg, .jpeg, .png, and .pdf formats are allowed."
// //         );
// //         return false;
// //       }

// //       // Start upload
// //       setIsUploading(true);
// //       // Set file details
// //       setFileName(file.name);
// //       setFileSize(Math.floor(file.size / 1000));

// //       // Display file
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImgData(reader.result);
// //       };
// //       reader.readAsDataURL(file);

// //       return true;
// //     },
// //     onSuccess() {
// //       // Finish upload
// //       setIsUploading(false);
// //       setIsFileUploaded(true);

// //       // Upload file using Axios
// //       const formData = new FormData();
// //       formData.append("file", file);

// //       axios
// //         .post(`${baseUrl}/image`, formData)
// //         .then((response) => {
// //           // Handle the response from the API
// //           console.log(response.data);
// //           // You can update the UI with the response data
// //           // For example, set the response data in state and display it in a div
// //           // const responseData = response.data;
// //           setResponseData(responseData);
// //         })
// //         .catch((error) => {
// //           console.log("Error:", error);
// //         });
// //     },
// //     onProgress(step) {
// //       // Update progress
// //       setPercentage(Math.round(step.percent));
// //       setIsFileUploaded(true);
// //     },
// //     onError(err) {
// //       console.log("onError", err);
// //     },
// //   };

// //   const handleClear = () => {
// //     setPercentage(0);
// //     setImgData(null);
// //     setIsUploading(false);
// //     setFileName(null);
// //     setFileSize(null);
// //     setIsFileUploaded(false);
// //   };

// //   // drag state
// //   const [dragActive, setDragActive] = useState(false);
// //   // ref
// //   const inputRef = React.useRef(null);

// //   // handle drag events
// //   const handleDrag = function (e) {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (e.type === "dragenter" || e.type === "dragover") {
// //       setDragActive(true);
// //     } else if (e.type === "dragleave") {
// //       setDragActive(false);
// //     }
// //   };

// //   const handleDrop = function (e) {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setDragActive(false);
// //     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
// //       const file = e.dataTransfer.files[0];
// //       // Perform necessary actions with the dropped file
// //       // Check file format
// //       const allowedFormats = [".jpg", ".jpeg", ".png", ".pdf"];
// //       const fileFormat = file.name
// //         .substring(file.name.lastIndexOf("."))
// //         .toLowerCase();
// //       if (!allowedFormats.includes(fileFormat)) {
// //         alert(
// //           "Please select a file with the correct format. Only .jpg, .jpeg, .png, and .pdf formats are allowed."
// //         );
// //         return;
// //       }

// //       // Start upload
// //       setIsUploading(true);
// //       // Set file details
// //       setFileName(file.name);
// //       setFileSize(Math.floor(file.size / 1000));
// //       setPercentage(0); // Reset the progress percentage

// //       // Display file
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImgData(reader.result);
// //       };
// //       reader.readAsDataURL(file);

// //       // Upload file using XMLHttpRequest or fetch API
// //       const xhr = new XMLHttpRequest();
// //       xhr.open("POST", `${baseUrl}/image`, true);

// //       xhr.upload.onprogress = (event) => {
// //         // Update progress
// //         const percent = Math.round((event.loaded / event.total) * 100);
// //         setIsFileUploaded(true);
// //         setPercentage(percent);
// //       };

// //       xhr.onload = () => {
// //         // Finish upload
// //         setIsFileUploaded(true);
// //         setIsUploading(false);
// //       };

// //       xhr.onerror = (err) => {
// //         console.log("onError", err);
// //       };

// //       const formData = new FormData();
// //       formData.append("file", file);

// //       xhr.send(formData);
// //     }
// //   };

// //   // triggers when file is selected with click
// //   const handleChange = function (e) {
// //     e.preventDefault();
// //     if (e.target.files && e.target.files[0]) {
// //       const file = e.target.files[0];
// //       // Perform necessary actions with the selected file
// //       // Check file format
// //       const allowedFormats = [".jpg", ".jpeg", ".png", ".pdf"];
// //       const fileFormat = file.name
// //         .substring(file.name.lastIndexOf("."))
// //         .toLowerCase();
// //       if (!allowedFormats.includes(fileFormat)) {
// //         alert(
// //           "Please select a file with the correct format. Only .jpg, .jpeg, .png, and .pdf formats are allowed."
// //         );
// //         return;
// //       }

// //       // Start upload
// //       setIsUploading(true);
// //       // Set file details
// //       setFileName(file.name);
// //       setFileSize(Math.floor(file.size / 1000));

// //       // Display file
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImgData(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   // triggers the input when the button is clicked
// //   const onButtonClick = () => {
// //     inputRef.current.click();
// //   };

// //   return (
// //     <div className="App">
// //       <h1 className="heading">Chronic Kidney Disease Prediction</h1>
// //       <select
// //         id="algorithm-select"
// //         value={selectedAlgorithm}
// //         onChange={(e) => setSelectedAlgorithm(e.target.value)}
// //       >
// //         <option value="">Select Algorithm</option>
// //         <option value="RF">Random Forest (RF)</option>
// //         <option value="SVM">Support Vector Machine (SVM)</option>
// //         <option value="DT">Decision Tree (DT)</option>
// //       </select>
// //       {fileName && (
// //         <React.Fragment>
// //           {imgData && (
// //             <div>
// //               <img src={imgData} alt="uploaded" width="250" />
// //             </div>
// //           )}
// //           <div className="upload-list">
// //             <div className="file-name">
// //               <b>{fileName}</b>
// //             </div>
// //             <div className="progress-container">
// //               <Line
// //                 percent={percentage}
// //                 strokeWidth={9}
// //                 trailWidth={9}
// //                 trailColor="#FFF"
// //                 strokeColor={isUploading ? "#41C3D2" : "#92ed14"}
// //               />
// //               <div className="progress-text">
// //                 {isUploading ? `Uploading ${percentage}% ` : `Finished`}
// //               </div>
// //             </div>
// //             <div className="file-size">{`${fileSize} KB`}</div>
// //           </div>
// //         </React.Fragment>
// //       )}
// //       <Upload {...props}>
// //         <button id="upload-button">Upload File</button>
// //       </Upload>
// //       {fileName && (
// //         <button id="clear-button" onClick={handleClear}>
// //           Clear
// //         </button>
// //       )}
// //       <form
// //         id="form-file-upload"
// //         onDragEnter={handleDrag}
// //         onSubmit={(e) => e.preventDefault()}
// //         style={{
// //           height: isFileUploaded ? "6rem" : "16rem", // Set the height conditionally
// //         }}
// //       >
// //         <input
// //           ref={inputRef}
// //           type="file"
// //           id="input-file-upload"
// //           multiple={true}
// //           onChange={handleChange}
// //         />
// //         <label
// //           id="label-file-upload"
// //           htmlFor="input-file-upload"
// //           className={dragActive ? "drag-active" : ""}
// //         >
// //           <div>
// //             <p>Drag and drop your file here or</p>
// //             <Upload {...props}>
// //               <button className="upload-button">
// //                 {/*  onClick={onButtonClick} */}
// //                 Upload a file
// //               </button>
// //             </Upload>
// //           </div>
// //         </label>
// //         {dragActive && (
// //           <div
// //             id="drag-file-element"
// //             onDragEnter={handleDrag}
// //             onDragLeave={handleDrag}
// //             onDragOver={handleDrag}
// //             onDrop={handleDrop}
// //           ></div>
// //         )}
// //       </form>
// //       {responseData && (
// //         <div className="response-div">
// //           Your chances of having Chronic Kidney Disease with {selectedAlgorithm}{" "}
// //           algorithm is: {responseData}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Home;
