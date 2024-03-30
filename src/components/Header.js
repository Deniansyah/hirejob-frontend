import React from "react";

const Header = (props) => {
  return (
    <div className="bg-[#5E50A1] mb-[50xp] pt-[100px]">
      <div className="flex justify-start items-center gap-5 px-4 md:px-[150px] py-5">
        <p className="text-3xl text-white font-bold">Top Jobs</p>
        <p className="text-3xl text-white">-</p>
        <p className="text-lg text-white">Lengkapi informasi pribadi anda di profile agar terpublikasi !</p>
      </div>
    </div>
  );
};

export default Header;
