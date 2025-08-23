"use client";

export default function Home() {
  return (
    <>
      <h1 className="text-blue-300 font-serif font-semibold text-4xl text-center mt-10">
        Housie
      </h1>
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="enter your name"
          className="bg-white text-black text-center p-3 px-28 rounded-2xl"
        />
      </div>
      <div className="flex mt-10 justify-center">
        <button className="bg-blue-300 p-3 px-20 font-bold text-2xl rounded-2xl">Play</button>
      </div>
    </>
  );
}
