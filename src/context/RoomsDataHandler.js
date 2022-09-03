import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const RoomsData = createContext();

function RoomsDataProvider({ children }) {
  const [rooms, setRooms] = useState([]);
  const [_, set_] = useState(true);

  useEffect(() => {
    let roomsData = require("./db.json").Rooms;
    let temp = [];
    roomsData.forEach((room) => {
      temp.push(room);
    });
    setRooms(temp);
  }, []);

  const toggleAppliance = (roomNum, applianceId) => {
    let temp = rooms;
    let appliance = temp
      .filter((room) => room.id === roomNum)[0]
      .appliances.filter((appliance) => appliance.id === applianceId)[0];

    appliance.state = !appliance.state;
    set_(!_);
  };

  const shutDownAll = (roomNum) => {
    let temp = rooms;
    let room = temp.filter((room) => room.id === roomNum)[0];
    // console.log(temp.filter((room) => room.id === roomNum)[0]);
    room.appliances = room.appliances.map((appliance) => {
      let app = appliance;
      app.state = false;
      return app;
    });

    console.log(temp, rooms);

    set_(!_);
  };

  const data = { rooms, toggleAppliance, shutDownAll };
  return <RoomsData.Provider value={data}>{children}</RoomsData.Provider>;
}

export default RoomsDataProvider;
