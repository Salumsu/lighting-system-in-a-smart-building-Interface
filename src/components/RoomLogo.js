function RoomLogo({ id, click }) {
  return (
    <div className="room-logo flex-center" onClick={click}>
      <p>Room {id}</p>
    </div>
  );
}

export default RoomLogo;
