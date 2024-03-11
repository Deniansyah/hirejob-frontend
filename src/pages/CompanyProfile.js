/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import http from "../helpers/http";
import { useSelector } from "react-redux";
import imgProfile from "../assets/images/profile.jpg";

const CompanyProfile = () => {
  const [company, setCompany] = React.useState({});
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { picture } = useSelector((state) => state.profile);

  React.useEffect(() => {
    getCompany();
  }, [company]);

  const getCompany = async () => {
    const { data } = await http(token).get(`/profile/myAccount`);
    const { results } = data;

    const company = await http().get(`/users/company/${results.id}`);
    setCompany(company.data.results);
  };

  const editProfile = () => {
    navigate("/edit-company-profile", { state: company });
  };

  return (
    <div className="font-openSans">
      <Navbar />
      <div className="bg-[#E5E5E5]">
        <div className="px-5 pt-10 pb-28 md:px-[150px] lg:px-[150px] md:pt-[170px] md:pb-[200px] lg:pb-[270px] flex flex-col justify-center">
          <div className="bg-white md:bg-[#5E50A1] lg:bg-[#5E50A1] h-48 rounded-tl-[8px] rounded-tr-[8px] md:w-full">
            <div className="flex justify-center pt-[114px] h-48 mb-[-50px]">
              {picture ? (
                <img
                  className="h-[150px] w-[150px] rounded-[50%] absolute"
                  src={picture}
                  alt="test3"
                />
              ) : (
                <img
                  className="h-[150px] w-[150px] rounded-[50%] absolute"
                  src={imgProfile}
                  alt="test3"
                />
              )}
            </div>
          </div>
          <div className="bg-white text-center rounded-bl-[8px] rounded-br-[8px]">
            <div className="pt-[74px]">
              <div>
                <div className="text-[#1F2A36] text-[22px] leading-[56px] font-semibold">
                  {company.name}
                </div>
                <div className="text-[#1F2A36] text-[14px] leading-[24px] mb-[10px]">
                  {company.field}
                </div>
              </div>
              <div className="flex justify-center mb-[20px]">
                <img
                  className=""
                  src={require("../assets/images/map.png")}
                  alt="map"
                />
                <div className="text-[#9EA0A5] text-[14px] leading-[20px] pl-[17px]">
                  {company.address}
                </div>
              </div>
              <div className=" md:flex justify-center md:px-24 lg:px-32 mb-[20px]">
                <div className="text-[#9EA0A5] text-[14px] leading-[24px]">
                  {company.bio}
                </div>
              </div>
              <div className="mb-[42px]">
                <button
                  onClick={() => editProfile()}
                  className="border-1 bg-[#5E50A1] px-[104px] py-[15px] rounded text-white font-bold"
                >
                  Edit profile
                </button>
              </div>

              <div className="flex justify-center">
                <div className="mr-[20px] ">
                  <div className="mb-[33px]">
                    <img
                      className=""
                      src={require("../assets/images/mail.png")}
                      alt="mail"
                    />
                  </div>
                  <div className="mb-[33px]">
                    <img
                      className=""
                      src={require("../assets/images/instagram.png")}
                      alt="instagram"
                    />
                  </div>
                  <div className="mb-[31px]">
                    <img
                      className=""
                      src={require("../assets/images/phone.png")}
                      alt="phone"
                    />
                  </div>
                  <div className="mb-[37px]">
                    <img
                      className=""
                      src={require("../assets/images/linkedin.png")}
                      alt="linkedin"
                    />
                  </div>
                </div>
                <div className="text-[#9EA0A5] text-[14px] leading-[20px] mb-[238px]">
                  <div className="flex justify-start mb-[37px] ">
                    <span>{company.email}</span>
                  </div>
                  <div className="flex justify-start mb-[37px]">
                    <span>{company.instagram}</span>
                  </div>
                  <div className="flex justify-start mb-[37px]">
                    <span>{company.phoneNumber}</span>
                  </div>
                  <div className="flex justify-start mb-[37px]">
                    <span>{company.linkedin}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyProfile;
