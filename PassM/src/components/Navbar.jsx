import React from "react";

const Navbar = () => {
  return (
    <nav className="text-white bg-black">
      <div className="mycontainer flex justify-between items-center px-5 py-5 h-12">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-blue-500">&lt;</span>
          Pass
          <span className="text-blue-500">M&gt;</span>
        </div>

        <a href="https://github.com/Ujjwal132" target="_blank" rel="noopener noreferrer" className='bg-black my-5 mx-2 rounded-full flex'>
          <img className='invert w-10 p-1' src="/icons/github.svg" alt="github logo" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
