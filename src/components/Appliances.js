import { useContext } from "react";
import { RoomsData } from "../context/RoomsDataHandler";

function Appliances({ roomNo, dataset }) {
  const { toggleAppliance, shutDownAll } = useContext(RoomsData);
  return (
    <div className="appliances">
      <h2>Room {roomNo}</h2>
      <div className="shut-down-all" onClick={() => shutDownAll(roomNo)}>
        <h3 className="flex-center">Shut Down All</h3>
      </div>
      <div className="flex-center">
        <div className="appliance-list">
          {dataset.map((appliance) => {
            let isOn = appliance.state;
            return (
              <div
                className={`appliance ${isOn ? "on" : "off"}`}
                key={appliance.id}
                onClick={() => toggleAppliance(roomNo, appliance.id)}
              >
                <h3>{appliance.name}</h3>
                <p>{isOn ? "on" : "off"}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Appliances;
