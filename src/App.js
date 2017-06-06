import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class CitySelector extends Component {
  render () {

    return ()
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Air Pollution Data Navigator</h2>
        </div>
        <p className="App-intro">
          Please Select a City.
        </p>
        <form>
          <select className="App-intro">
            <option value="bristol">Bristol</option>
            <option value="bath">Bath</option>
          </select>
          <p className="App-intro">
          Select the Measurement type.
        </p>
          <select className="App-intro">
            <option value="no2">Nitrogen Dioxide</option>
            <option value="o3">Ozone</option>
            <option value="pm10">Particles &lt; 10&#956;m</option>
            <option value="pm10">Particles &lt; 25&#956;m</option>
          </select>
        </form>
        <p className="App-intro">
          Here's the current reading:
        </p>
        <div className="Data">
          5 &#956;g/m<sup>3</sup>
        </div>
      </div>
    );
  }
}

var DATA = {
  "meta": {
    "name": "openaq-api",
    "license": "CC BY 4.0",
    "website": "https://docs.openaq.org/",
    "page": 1,
    "limit": 100,
    "found": 2
  },
  "results": [
    {
      "location": "Bath Roadside",
      "city": "Bath",
      "country": "GB",
      "measurements": [
        {
          "parameter": "no2",
          "value": 3,
          "lastUpdated": "2017-06-06T04:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "DEFRA"
        }
      ],
      "coordinates": {
        "latitude": 51.391127,
        "longitude": -2.354155
      }
    },
    {
      "location": "Bristol St Paul's",
      "city": "Bristol",
      "country": "GB",
      "measurements": [
        {
          "parameter": "no2",
          "value": 1,
          "lastUpdated": "2017-06-06T04:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "DEFRA"
        },
        {
          "parameter": "o3",
          "value": 61,
          "lastUpdated": "2017-06-06T04:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "DEFRA"
        },
        {
          "parameter": "pm10",
          "value": 8,
          "lastUpdated": "2017-06-06T04:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "DEFRA"
        },
        {
          "parameter": "pm25",
          "value": 4,
          "lastUpdated": "2017-06-06T04:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "DEFRA"
        }
      ],
      "coordinates": {
        "latitude": 51.462839,
        "longitude": -2.584482
      }
    }
  ]
}

export default App;
