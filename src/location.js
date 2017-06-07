import React, { Component } from 'react';


class LocationInfo extends Component {

  render () {

      if (typeof this.props.area[0] === 'undefined') {
        return <div></div>
      }
      return (
              <div className="App-intro">
              <br />
                There are currently {this.props.area[0].locations} locations in {this.props.area[0].city}
              <br />
              <GetLocationInfoButton onLocationClick={this.props.onLocationClick}/>
              <LocationInfoDisplay locData={this.props.locData}
                                   handleMeasureClick={this.props.onMeasurementClick}/>
            </div>);

      }
    }

class GetLocationInfoButton extends Component {


  render () {
          return (<div>
                  <br />
                    <button className="App-intro"
                            onClick={this.props.onLocationClick}>
                      Get location information
                    </button>
                  </div>);
      }
    }


class LocationInfoDisplay extends Component {

  render () {
          if (this.props.locData.length > 0) {
                    return (<div >
                            <br />
                            <table className="locationTable">
                              <tbody>
                                <tr>
                                  <th>Location Name</th>
                                  <th>Coordinates</th>
                                  <th>Sensors</th>
                                </tr>
                                {this.props.locData.map((item) => (
                              <tr key={item.location}>
                                <td>{item.location}</td>
                                <td>{item.coordinates.latitude}, {item.coordinates.longitude}</td>
                                <td value={item.location}><button onClick={this.props.handleMeasureClick}>{item.parameters.toString()}</button></td>
                              </tr>
                            ))}
                                </tbody>
                              </table>

                            </div>);
                  };
            return <div></div>
      }
    }

export {LocationInfo, GetLocationInfoButton, LocationInfoDisplay}
