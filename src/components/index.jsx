import React from 'react';

export default function Results({ data }) {
  return (
    <div className="allResults">
      {data.map((obj,index)=> {
        return <div className="results" key={index}>
          <img src={obj.img} alt="Sample"/>
          <div className="details">
            <h2>{obj.manufacturer} {obj.model}</h2>
            <h3>${obj.price}</h3>
            <p>{obj.km} km</p>
          </div>
        </div>
      })}
    </div>
  );
}
