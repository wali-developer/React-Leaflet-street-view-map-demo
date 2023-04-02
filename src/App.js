import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, Circle } from 'react-leaflet';
// import { Icon } from "leaflet";
import data from "./utils/data";
import { icon } from "leaflet";

function App() {
  const [active, setActive] = useState(null);
  console.log(data);

  return (
    <section className="px-20">
      <h1 className="text-2xl font-sans text-center font-bold my-5">React leaflet</h1>
      <div className="flex gap-12 items-center mt-8">
        <div className="">
          <MapContainer
            center={[data[0].geometry?.coordinates[0], data[0].geometry?.coordinates[1]]}
            zoom={13}
            scrollWheelZoom={false}
            style={{
              width: '600px',
              height: '500px'
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {data.map(park => (
              <div
                className="w-[200px] h-[200px] border border-black"
                onClick={() => console.log('first')
                }
              >
                <LayerGroup>
                  <Circle
                    center={[
                      park?.geometry?.coordinates[0],
                      park?.geometry?.coordinates[1],
                    ]}
                    pathOptions={{ color: 'red', fillColor: 'red' }}
                    radius={100}
                    key={park.properties.PARK_ID}
                    eventHandlers={{
                      click: (e) => {
                        setActive(park)
                      },
                    }}

                  />
                </LayerGroup>
              </div>
            ))}

          </MapContainer>
        </div>
        {active && (
          <div className="flex-1 h-[500px] border p-5">
            <img src={active?.img} alt={active.NAME} className="w-full h-full" />
          </div>
        )}
      </div>
    </section>
  );
}

export default App;

const Icon = () => {
  return (
    <div>Marker</div>
  )
}
