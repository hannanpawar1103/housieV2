function Ticket({ ticket }: { ticket: (number | null)[][] }) {
  return (
    <div className="p-4 bg-blue-500 shadow-md rounded-xl border border-gray-300">
      <h2 className="text-xl font-bold text-center mb-3">Your Ticket 🎟️</h2>
      <div className="grid grid-rows-3 gap-2">
        {ticket.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-9 gap-2">
            {row.map((num, colIndex) => (
              <div
                key={colIndex}
                className={`flex items-center justify-center w-10 h-10 rounded-md text-lg font-semibold ${
                  num ? "bg-neutral-700 border border-yellow-500" : "bg-gray-100"
                }`}
              >
                {num ?? ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ticket