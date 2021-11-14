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

  let makeRef = React.createRef();
  let modelRef = React.createRef();
  let priceRef = React.createRef();
  let kmRef = React.createRef();

  //Filtering the search results
  function search() {

    console.log(makeRef.current.value + " " + modelRef.current.value);
    let qData = data;
    if (makeRef.current.value) qData = qData.filter(obj => { return obj.manufacturer === makeRef.current.value });
    if (modelRef.current.value) qData = qData.filter(obj => { return obj.model === modelRef.current.value });
    if (priceRef.current.value) qData = qData.filter(obj => { return obj.price <= priceRef.current.value });
    if (kmRef.current.value) qData = qData.filter(obj => { return obj.km <= kmRef.current.value });
    setQueriedData(qData);
  }

  return (
    <>
      <div className="formOuterContainer">
        <div className="formInnerContainer">
          <h1>Find your next car</h1>
          <div className="form">
            <div className="makeModel">
              <select defaultValue="" ref={makeRef} id="make" name="make" onChange={e => {setSelectedMake(e.target.value);/*search()*/}}>
                <option value="" disabled hidden>Any make</option>
                {/* Getting just the unique manufacturers from the data */}
                {Array.from(new Set(data.map(obj => obj.manufacturer))).map(make => {
                  return <option key={make} value={make}>{make}</option>
                })}
              </select>
              <select defaultValue="" ref={modelRef} id="model" name="model" disabled={selectedMake ? false : true} onChange={e => {setSelectedModel(e.target.value);setQueriedData(data);/*search()*/}}>
                <option value="" disabled hidden>Any model</option>
                {/* Getting just the unique models from the data based on the manufacturer */}
                {Array.from(new Set(data.filter(ob => ob.manufacturer === selectedMake).map(obj => obj.model))).map(model => {
                  return <option key={model} value={model}>{model}</option>
                })}
              </select>
            </div>
            <div className="priceKm">
              <input id="price" ref={priceRef} min="0" max="9999999" placeholder="Max price" type="number" onChange={e => {setSelectedPrice(e.target.value);/*search()*/}}></input>
              <input id="km" ref={kmRef} min="0" max="9999999" placeholder="Max km" type="number" onChange={e => {setSelectedKm(e.target.value);/*search()*/}}></input>
            </div>
            <button type="submit" onClick={search}>{queriedData.length} results</button>
          </div>
        </div>
      </div>
      <Results data={queriedData} />
    </>
  );
}
