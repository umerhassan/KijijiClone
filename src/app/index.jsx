import React, { useState, useEffect } from 'react';
import Results from '../components';
import './styles.css';

export default function App() {
  const [data, setData] = useState([]); //data from the JSON file
  const [queriedData, setQueriedData] = useState([]); //filtered Data

  //The states below will be used for dynamically updating searches which I am working on currently.
  const [selectedMake, setSelectedMake] = useState();
  const [selectedModel, setSelectedModel] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [selectedKm, setSelectedKm] = useState();

  useEffect(() => {
    //Getting the data from the JSON file I uploaded on Github
    fetch('https://raw.githubusercontent.com/umerhassan/KijijiClone/main/data.json')
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setQueriedData(json.data);
      });
  }, []);

  useEffect(() => {
    //console.log(selectedMake + " " + selectedModel);
    let qData = data;
    if (selectedMake) qData = qData.filter(obj => { return obj.manufacturer === selectedMake });
    if (selectedModel) qData = qData.filter(obj => { return obj.model === selectedModel });
    if (selectedPrice) qData = qData.filter(obj => { return obj.price <= selectedPrice });
    if (selectedKm) qData = qData.filter(obj => { return obj.km <= selectedKm });
    setQueriedData(qData);
  }, [selectedMake, selectedModel, selectedPrice, selectedKm, data]);

  return (
    <>
      <header className="main-header">
        <div className="container">
          <h1 className="mh-logo">
            <img src="https://www.kijijiautos.ca/static/bb7cecf706c1509e1dba.svg" alt="Kijiji Logo" />
          </h1>
          <nav className="main-nav">
            <ul className="main-nav-list">
              <li>
                <a href="/">Home</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <img src="car-header.jpg" alt="Blue car" />
      <div className="formOuterContainer">
        <div className="formInnerContainer">
          <h1>Find your next car</h1>
          <div className="form">
            <div className="makeModel">
              <select defaultValue="" id="make" name="make" onChange={e => { setSelectedMake(e.target.value); setSelectedModel("") }}>
                <option value="" disabled hidden>Any make</option>
                {/* Getting just the unique manufacturers from the data */}
                {Array.from(new Set(data.map(obj => obj.manufacturer))).map(make => {
                  return <option key={make} value={make}>{make}</option>
                })}
              </select>
              <select defaultValue="" value={selectedModel} id="model" name="model" disabled={selectedMake ? false : true} onChange={e => setSelectedModel(e.target.value)}>
                <option value="" disabled hidden>Any model</option>
                {/* Getting just the unique models from the data based on the manufacturer */}
                {Array.from(new Set(data.filter(ob => ob.manufacturer === selectedMake).map(obj => obj.model))).map(model => {
                  return <option key={model} value={model}>{model}</option>
                })}
              </select>
            </div>
            <div className="priceKm">
              <input id="price" min="0" max="9999999" placeholder="Max price" type="number" onChange={e => setSelectedPrice(e.target.value)}></input>
              <input id="km" min="0" max="9999999" placeholder="Max km" type="number" onChange={e => setSelectedKm(e.target.value)}></input>
            </div>
            <button type="submit">{queriedData.length} results</button>
          </div>
        </div>
      </div>
      <Results data={queriedData} />
    </>
  );
}
