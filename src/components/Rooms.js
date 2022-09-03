import { useContext } from "react";
import { RoomsData } from "./../context/RoomsDataHandler";
import RoomLogo from "./RoomLogo";
import { PopUpData } from "./../context/PopUp/PopUpDataHandler";
import Appliances from "./Appliances";

function Rooms() {
  const { rooms } = useContext(RoomsData);
  const popUp = useContext(PopUpData);
  return (
    <div className="flex-center">
      <div className="rooms">
        {rooms.map((room) => (
          <RoomLogo
            id={room.id}
            key={room.id}
            click={() =>
              popUp.init({
                element: (
                  <Appliances roomNo={room.id} dataset={room.appliances} />
                ),
              })
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Rooms;
