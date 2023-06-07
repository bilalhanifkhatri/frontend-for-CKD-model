import React from "react";
import "./style.css";

const Home = () => {
  return (
    <div className="home">
      <div className="center">
        <h1>Chronic Kidney Disease Risk</h1>
        <h4>Predict the probability of Chronic-Kidney-Disease occurrence</h4>
      </div>
      <div className="inputFields">
        <div className="inputDiv">
          <label htmlFor="bp">BP</label>
          <input type="text" name="bp" />
        </div>
        <div className="inputDiv">
          <label htmlFor="bp1">Bp1</label>
          <input type="text" name="bp1" />
        </div>
        <div className="inputDiv">
          <label htmlFor="bp2">BP2</label>
          <input type="text" name="bp2" />
        </div>
        <div className="inputDiv">
          <label htmlFor="bp3">Bp3</label>
          <input type="text" name="bp3" />
        </div>
        <div className="inputDiv">
          <label htmlFor="bp4">Bp4</label>
          <input type="text" name="bp4" />
        </div>
        <div className="inputDiv">
          <label htmlFor="bp5">Bp5</label>
          <input type="text" name="bp5" />
        </div>
        <div className="inputDiv">
          <label htmlFor="bp6">Bp6</label>
          <input type="text" name="bp6" />
        </div>
        <div className="inputDiv">
          <label htmlFor="bp7">Bp7</label>
          <input type="text" name="bp7" />
        </div>
      </div>
      <div className="inputModelAndPredictButton">
        <div className="inputelectDiv">
          <select>
            <option value="option1">Random Forest</option>
            <option value="option2">Standard Vector Machine (SVM)</option>
            <option value="option3">Decision Tree</option>
          </select>
        </div>
        <button>Predict</button>
      </div>
      <div className="result">
        The probability of CKD according to given data is: 50%
      </div>
      <div className="analysisCard">
        <div className="card1">
          <h4>95.7%</h4>
          <h5>Accuracy</h5>
        </div>
        <div className="card2">
          <h4>95.7%</h4>
          <h5>Accuracy</h5>
        </div>
      </div>
    </div>
  );
};

export default Home;