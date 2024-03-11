/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import http from "../helpers/http";

const Hire = () => {
  const { state } = useLocation();
  const token = useSelector((state) => state.auth.token);

  const [dataEmploye, setDataEmployee] = useState({});
  const [purposeList, setPurposeList] = useState([]);
  const [purposeId, setPurposeId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getUserProfile();
    getPurpose();
  }, []);

  const getUserProfile = async () => {
    const { data } = await http().get(`/profile/${state}`);
    const { results } = data;
    setDataEmployee(results);
  };

  const getPurpose = async () => {
    const { data } = await http().get(`/purpose`);
    const { results } = data;
    setPurposeList(results);
  };

  const toContacts = async (e) => {
    e.preventDefault();

    const message = e.target.message.value;

    const { data } = await http(token).post(`/contacts`, {
      purposeId,
      message,
    });

    setSuccessMessage("Pesan telah dikirim");
    return data;
  };

  return (
    <div>
      <div className="md:flex md:items-center md:py-5 hidden md:px-28">
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
      </div>

      <div className="flex bg-slate-100 gap-5 px-10 md-px-20 lg:px-28 py-10 font-sans flex-col lg:flex-row">
        <div className="flex-[35%]">
          <div className="bg-white p-5 rounded-lg">
            <div className="flex justify-center items-center mb-5">
              <img src={dataEmploye.picture} alt="profile" />
            </div>
            <div>
              <h3 className="font-medium text-xl md:text-2xl mb-2">
                {dataEmploye.name}
              </h3>
              <p className="font-medium mb-2"> {dataEmploye.jobDesk}</p>
              <p className="text-[#9EA0A5] mb-3"> {dataEmploye.status}</p>
              <div className="flex items-center gap-3 mb-2">
                <img
                  className="inline"
                  src={require("../assets/images/map.png")}
                  alt="map"
                />
                <p className="text-[#9EA0A5]"> {dataEmploye.address}</p>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  className="inline"
                  src={require("../assets/images/phone.png")}
                  alt="map"
                />
                <p className="text-[#9EA0A5]"> {dataEmploye.phoneNumber}</p>
              </div>
              <p className="text-[#9EA0A5] mb-4"> {dataEmploye.bio}</p>
            </div>
            <h4 className="font-medium text-xl md:text-2xl mb-5">Skill</h4>
            <div className="flex flex-wrap gap-3 mb-10">
              {dataEmploye?.skills?.map((skill, index) => {
                return (
                  <div
                    className="py-1 px-5 w-fit border-2 border-amber-500 rounded bg-amber-300 text-white"
                    key={index}
                  >
                    {skill}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-10 max-[768px]:px-0">
          <h1 className="font-semibold text-2xl leading-10 mb-6">
            Hubungi {dataEmploye.name}
          </h1>
          <p className="leading-6	text-lg mb-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod
            ipsum et dui rhoncus auctor.
          </p>
          <form onSubmit={toContacts} className="flex flex-col">
            {successMessage && (
              <div className="alert alert-success shadow-lg mb-5">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{successMessage}</span>
                </div>
              </div>
            )}
            <label className="text-xs leading-4	mb-2.5">
              Tujuan tentang pesan ini
            </label>
            <select
              onClick={(e) => setPurposeId(e.target.value)}
              className="leading-5 text-sm rounded-md mb-6 p-2.5"
            >
              {purposeList.map((o, i) => (
                <option key={i} value={o.id}>
                  {o.name}
                </option>
              ))}
              ;
            </select>
            <div className="relative w-full flex flex-col">
              <label className="text-xs leading-4	mb-2.5">Pesan</label>
              <textarea
                name="message"
                className="leading-5 text-sm t-0 r-0 rounded-md	h-[30vh] mb-12 p-2.5"
                placeholder="Deskripsikan/jelaskan lebih detail"
              ></textarea>
              <div className="absolute w-8 h-8 rounded-md bg-[#C4C4C4] p-2 top-[65%] left-[90%] max-[768px]:top-2/3 max-[768px]:left-[93%]">
                <img
                  src={require("../assets/images/attachment.png")}
                  alt="Attachment"
                />
              </div>
            </div>
            <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-amber-400 py-2 px-4 text-sm font-medium text-white hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Kirim
            </button>
          </form>
        </div>
      </div>

      <div className="bg-[#5E50A1] hidden md:block px-10 md:px-20 lg:px-28 py-10 font-sans">
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
      </div>

      <div className="bg-slate-100 md:hidden">
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
      </div>
    </div>
  );
};

export default Hire;
