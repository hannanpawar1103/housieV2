const roomCodeGenerator = () => {
  const roomCodeData = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let roomCode = "";

  for (let i = 1; i <= 6; i++) {
    const randomNumber = Math.floor(Math.random() * roomCodeData.length);
    roomCode += roomCodeData[randomNumber];
  }

  return roomCode
};

export {roomCodeGenerator}