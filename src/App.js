import './App.css';
import React from 'react';


function App() {

  const handleClick = (e) => {
    e.preventDefault();
    const frame = document.getElementById('iframe');
    const malib = frame.contentWindow.MaLib;
    let queryParameters = [
      {
        "dataSource": {
          "id": 73510
        },
        "filter": {
          "logicalOperation": "OR",
          "conditionList": [
            {
              "tabularCondition": {
                "key": "code",
                "dataType": "STRING",
                "operator": "=",
                "value": "01470402014000000000000000"
              }
            }
          ]
        },
        "returns": []
      }
    ]

    malib.query.queryFeatures(queryParameters).then(res => {
      let features = JSON.parse(res.data[0].features)
      let geometry = res && res.data && features.features[0].geometry
      malib.apiRegistry
        .getApis(["Feature"])
        .then(([Feature]) => {
          let fe = new Feature({
            type: "Feature",
            geometry: geometry,
            properties: {},
          });

          malib.actionsRegistry.dispatch("setMapBBOX", fe.getBBox());
          malib.actionsRegistry.dispatch("addHighlight", fe);
        });
    })
  }
  return (
      <div className="App">
        <div>
          Test Form
          <button onClick={handleClick}>CLICK</button>
        </div>
        <iframe
          id="iframe"
          className='iframe'
          src="http://newcapital.eastus.cloudapp.azure.com:8080/portal"
        ></iframe>
      </div>
    );
  }

  export default App;
