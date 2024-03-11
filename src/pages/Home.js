/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
// import { SlArrowLeft, SlArrowRight } from "react-icons/sl"; // Arrow icon
import { CiSearch } from "react-icons/ci"; // Search icon
import imgProfile from "../assets/images/profile.jpg";

const Home = () => {
  const [profile, setProfile] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [amountPage, setAmountPage] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    axios
      .get(`https://hirejob-backend.vercel.app/users/skill?page=${page}&search=${search}&sortBy=${sortBy}&status=${status}`)
      .then((data) => data.data)
      .then((res) => {
        pageAmount(res.pageInfo.totalData);
        setProfile(res.results);
      });
    console.log(profile);
  }, [page, profile, search, sortBy, status]);

  const searchUser = () => {
    const searchValue = document.querySelector("#search-input").value;
    setSearch(searchValue);
    setPage(1);
  };

  const pageAmount = (users) => {
    const pageArr = [];
    const result = parseInt(users) / 4;
    const pageNum = Math.ceil(result);

    for (let i = 1; i <= pageNum; i++) {
      pageArr.push(i);
    }

    setAmountPage(pageArr);
  };

  const sort = (value) => {
    if (value === "Skill") {
      setSortBy("skills");
      setStatus("");
      setPage(1);
    } else if (value === "Freelancer") {
      setStatus("Freelancer");
      setSortBy("");
      setPage(1);
    } else {
      setStatus("Fulltime");
      setSortBy("");
      setPage(1);
    }
  };

  return (
    <div className="font-openSans">
      <Navbar />
      <Header />
      <div className="bg-[#E5E5E5] ">
        <div className="px-3  lg:py-[50px] lg:px-[150px] mb-5 lg:mb-0">
          <div>
            <div className="bg-white rounded-[6px]  w-full lg:w-max">
              <div className="px-3 lg:px-[10px] py-[6px] lg:flex items-center">
                <div className="flex-1 text-[14px] text-[#9EA0A5] leading-[20px] relative">
                  <input
                    id="search-input"
                    className=" py-[19px] pl-[15px] lg:pr-14 w-full lg:w-[38rem] outline-1 outline-[#9EA0A5]"
                    placeholder="Search for any skill"
                  />
                  <CiSearch className="absolute w-8 h-8 top-3 right-3" />
                </div>
                <div className="lg:flex items-center">
                  <div className="lg:mr-[25px] hidden lg:block">
                    <img
                      className=""
                      src={require("../assets/images/Line.png")}
                      alt="Line"
                    />
                  </div>
                  <div className="pl-3 lg:lg-0 lg:mr-[50px] mb-5 lg:mb-0">
                    <select
                      onClick={(e) => sort(e.target.value)}
                      className="text-[#9EA0A5] text-[16px] bg-white outline-none"
                    >
                      <option className="hidden">Sort</option>
                      <option value="Skill">Sortir berdasarkan Skill</option>
                      <option value="Freelancer">
                        Sortir berdasarkan Freelance
                      </option>
                      <option value="Fulltime">
                        Sortir berdasarkan Fulltime
                      </option>
                    </select>
                  </div>

                  <div className="pl-3 lg:lg-0">
                    <button
                      onClick={() => searchUser()}
                      className=" border-1 bg-[#5E50A1] py-[17px] w-full lg:px-[34px] rounded text-white font-semibold"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="px-3 lg:px-[150px] pb-[50px]">
          {profile.map((bio) => (
            <div className="bg-white flex flex-col lg:flex-row justify-center items-center pl-3 lg:pl-[20px] pt-[21px] pb-[38px] lg:pr-[77px] mb-3 lg:mb-[1px] rounded-[8px]">
              <div className="lg:mr-[35px] flex lg:items-center">
                {bio.picture ? (
                  <img
                    className="lg:w-[100px] lg:h-[100px] rounded-full"
                    src={bio.picture}
                    alt="picture"
                  />
                ) : (
                  <img
                    className="lg:w-[100px] lg:h-[100px] rounded-full"
                    src={imgProfile}
                    alt="picture"
                  />
                )}
              </div>
              <div className="flex-1">
                <div>
                  <span className="text-[#1F2A36] text-2xl lg:text-[22px] font-bold">
                    {bio.name}
                  </span>
                </div>
                <div className="mb-[6px]">
                  <span className="text-[#9EA0A5] text-[14px] leading-[20px]">
                    {bio.jobDesk} - {bio.status ? bio.status : null}
                  </span>
                </div>
                <div className="flex items-center mb-[17px]">
                  <img
                    className="mr-[15px] w-[16px] h-[16px]"
                    src={require("../assets/images/map.png")}
                    alt="map"
                  />
                  <span className="text-[#9EA0A5] text-[14px] leading-[20px]">
                    {bio.address}
                  </span>
                </div>

                <div className="flex flex-wrap lg:grid-cols-3 gap-2 mb-3 lg:mb-0">
                  {bio.skills.map((skill) => (
                    <div>
                      <div className="border-1 bg-[#FBB01799] rounded-[4px] px-2 py-[5px] text-white text-center">
                        {skill}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Link
                  to={"/jobseeker-profile/" + bio.id}
                  className="border-1 bg-[#5E50A1] py-[17px] px-[27px] rounded font-semibold text-white leading-[20px] text-[16px]"
                >
                  Lihat Profile
                </Link>
              </div>
            </div>
          ))}
        </main>
        <div className="px-3 lg:px-[150px] pb-[70px] text-[#9EA0A5] text-[18px] flex justify-center">
          <div className="mr-[14px]">
            <button>
              <img
                className="border-1 bg-white rounded py-[19px] px-[23px]"
                src={require("../assets/images/left.png")}
                alt="left"
              />
            </button>
          </div>
          {amountPage.map((page, i) => (
            <div key={i} className="mr-[14px]">
              <button
                onClick={() => setPage(() => page)}
                className="border-1 hover:text-white focus:text-white bg-white hover:bg-[#5E50A1] focus:bg-[#5E50A1] rounded py-[15.5px] px-[24px]"
              >
                {page}
              </button>
            </div>
          ))}

          <div className="mr-[14px]">
            <button>
              <img
                className="border-1 bg-white rounded py-[19px] px-[23px]"
                src={require("../assets/images/right.png")}
                alt="right"
              />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
