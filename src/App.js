import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Icon } from "leaflet";
import data from "./utils/data";

function App() {
  const [active, setActive] = useState(null);

  return (
    <section className="px-5 sm:px-20">
      <h1 className="text-2xl font-sans text-center font-bold my-5">React leaflet Demo</h1>
      <div className="flex flex-wrap gap-12 items-center mt-8">
        <div className="">
          <MapContainer
            center={[data[0].geometry?.coordinates[0], data[0].geometry?.coordinates[1]]}
            zoom={13}
            scrollWheelZoom={false}
            className="w-[300px] sm:w-[600px] h-[500px]"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.map(item => (
              <Marker
                position={[
                  item?.geometry?.coordinates[0],
                  item?.geometry?.coordinates[1],
                ]}
                key={item.properties.place_ID}
                eventHandlers={{
                  click: (e) => {
                    setActive(item)
                  },
                }}
              >
                <Popup
                  onClose={() => {
                    setActive(null);
                  }}
                >
                  <p>
                    {active?.properties?.name}
                  </p>
                </Popup>
              </Marker>
            ))}

          </MapContainer>
        </div>
        <div className="flex-1 h-[500px] border p-5">
          {active ? (
            <img src={active?.img} alt={active.NAME} className="w-full h-full object-cover" />
          ) : (
            <h1 className="w-full h-full font-sans text-lg flex justify-center items-center">Click on the highlighted location so see the area image</h1>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
