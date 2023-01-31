import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import http from "../helpers/http";
import imgProfile from "../assets/images/profile.jpg";

const ProfileJobseeker = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [dataUser, setDataUser] = useState({});
  const [portofolio, setPortofolio] = useState([]);
  const role = useSelector((state) => state.auth.role);

  const getUserProfile = async () => {
    const { data } = await http().get(`/profile/${id}`);
    const { results } = data;
    setDataUser(results);
  };

  const getPortofolioProfile = async () => {
    const { data } = await http().get(`/profile/portofolio/${id}`);
    const { results } = data;
    setPortofolio(results);
  };

  const hire = (e) => {
    e.preventDefault();
    navigate("/hire", { state: id });
  };

  useEffect(() => {
    getUserProfile();
    getPortofolioProfile();
  }, [getPortofolioProfile, getUserProfile]);

  return (
    <div>
      {/* <div className="lg:flex lg:items-center lg:py-5 hidden lg:px-28">
        <div className="flex-1">
          <img
            className="w-32"
            src={require("../assets/images/navlogo.png")}
            alt="logo"
          />
        </div>
        <div className="mr-14">
          <img src={require("../assets/images/bell.png")} alt="bell" />
        </div>
        <div className="mr-14">
          <img src={require("../assets/images/mail.png")} alt="mail" />
        </div>
        <div>
          <img
            className="w-12"
            src={require("../assets/images/profile.png")}
            alt="profile"
          />
        </div>
      </div> */}

      <Navbar />

      <div className="flex bg-slate-100 gap-5 px-10 md-px-20 lg:px-28 py-10 font-sans flex-col lg:flex-row pt-36">
        <div className="flex-[35%]">
          <div className="bg-white p-5 rounded-lg">
            <div className="flex justify-center items-center mb-5">
              {dataUser?.picture ? (
                <img
                  src={dataUser?.picture}
                  alt="profile"
                  className="lg:w-[120px] lg:h-[120px] rounded-full"
                />
              ) : (
                <img
                  src={imgProfile}
                  alt="profile"
                  className="lg:w-[120px] lg:h-[120px] rounded-full"
                />
              )}
            </div>
            <div>
              <h3 className="font-medium text-xl md:text-2xl mb-2">
                {dataUser?.name}
              </h3>
              <p className="font-medium mb-2">{dataUser?.jobDesk}</p>
              <p className="text-[#9EA0A5] mb-3">{dataUser?.status}</p>
              <div className="flex items-center gap-3 mb-2">
                <img
                  className="inline"
                  src={require("../assets/images/map.png")}
                  alt="map"
                />
                <p className="text-[#9EA0A5]">{dataUser?.address}</p>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  className="inline"
                  src={require("../assets/images/phone.png")}
                  alt="map"
                />
                <p className="text-[#9EA0A5]">{dataUser?.phoneNumber}</p>
              </div>
              <p className="text-[#9EA0A5] mb-4">{dataUser?.bio}</p>
            </div>
            <div className="mb-8">
              {role === "RECRUITER" && (
                <button
                  className="w-full h-12 bg-[#5E50A1] text-white text-lg font-bold border-2 rounded-md"
                  onClick={hire}
                >
                  Hire
                </button>
              )}
            </div>
            <h4 className="font-medium text-xl md:text-2xl mb-5">Skill</h4>
            <div className="flex flex-wrap gap-3 mb-10">
              {dataUser?.skills?.map((skill, index) => {
                return (
                  <div
                    className="py-1 px-5 w-fit border-2 border-amber-500 rounded bg-amber-300 text-white"
                    key={skill}
                  >
                    {skill}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-3 mb-5">
              <img
                className="inline"
                src={require("../assets/images/mail.png")}
                alt="map"
              />
              <p className="text-[#9EA0A5]">{dataUser?.email}</p>
            </div>
            <div className="flex items-center gap-3 mb-5">
              <img
                className="inline"
                src={require("../assets/images/instagram.png")}
                alt="map"
              />
              <p className="text-[#9EA0A5]">{dataUser?.instagram}</p>
            </div>
            <div className="flex items-center gap-3 mb-5">
              <img
                className="inline"
                src={require("../assets/images/github.png")}
                alt="map"
              />
              <p className="text-[#9EA0A5]">{dataUser?.github}</p>
            </div>
            <div className="flex items-center gap-3 mb-5">
              <img
                className="inline"
                src={require("../assets/images/gitlab.png")}
                alt="map"
              />
              <p className="text-[#9EA0A5]">{dataUser?.gitlab}</p>
            </div>
          </div>
        </div>

        <div className="flex-[65%]">
          <div className="bg-white rounded-lg p-5">
            <div className="flex items-center gap-10 mb-8">
              <div className="py-3 border-b-4 rounded border-[#5E50A1]">
                <h3 className="font-semibold text-xl md:text-2xl cursor-pointer lg:text-lg">
                  Portofolio
                </h3>
              </div>
              <div>
                <Link to={`/jobseeker-profile/experiences/${id}`}>
                  <h3 className="text-xl md:text-2xl cursor-pointer hover:font-semibold lg:text-lg">
                    Pengalaman kerja
                  </h3>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {portofolio?.map((e) => {
                return (
                  <div
                    className="flex flex-col gap-1 items-center justify-center cursor-pointer hover:font-semibold"
                    key={toString(e.id)}
                  >
                    <img
                      src={e.picture}
                      alt="Remainder app"
                      className="w-[270px] h-[200px]"
                    />
                    <p>{e.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-[#5E50A1] hidden md:block px-10 md:px-20 lg:px-28 py-10 font-sans">
        <div className="w-2/6 mb-16">
          <img
            className="mb-8 w-28"
            src={require("../assets/images/footerlogo.png")}
            alt="logo"
          />
          <p className="text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod
            ipsum et dui rhoncus auctor.
          </p>
        </div>
        <div>
          <hr />
          <div className="flex mt-5 gap-20">
            <p className="flex-1 text-white">
              2022 Peworld. All right reserved
            </p>
            <p className="text-white">Telepon</p>
            <p className="text-white">Email</p>
          </div>
        </div>
      </div> */}

      <Footer />

      {/* <div className="bg-slate-100 md:hidden">
        <div className="flex px-10 py-5 bg-white border-[1px] rounded-t-3xl">
          <div className="flex-1 flex justify-center items-center cursor-pointer">
            <img src={require("../assets/images/grid.png")} alt="grid" />
          </div>
          <div className="flex-1 flex justify-center items-center cursor-pointer">
            <img src={require("../assets/images/search.png")} alt="search" />
          </div>
          <div className="flex-1 flex justify-center items-center cursor-pointer">
            <img src={require("../assets/images/message.png")} alt="message" />
          </div>
          <div className="flex-1 flex justify-center items-center cursor-pointer">
            <img src={require("../assets/images/profile2.png")} alt="profile" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProfileJobseeker;
