import React from "react";
import Profile from "../components/editProfileComponents/editCompanyProfile/profileEditCompanyProfile/ProfileCompany";
import CompanyPersonalDataForm from "../components/editProfileComponents/editCompanyProfile/assideEditCompanyProfile/companyPersonalData/SocialCompany";
import SocialCompany from "../components/editProfileComponents/editCompanyProfile/assideEditCompanyProfile/companyPersonalData/SocialCompany";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function EditCompanyProfile() {
  return (
    <>
      <Navbar blueBg="bg-[#5E50A1] h-[28rem] w-full absolute top-32" greyBg="bg-[#E5E5E5] h-[123rem] md:h-[60rem] lg:h-[60rem] w-full absolute top-0 md:top-[29rem] lg:top-[29rem]" />
      <div className="pt-[100px]">
        <div className="md:grid md:grid-cols-[400px_minmax(100px,_1fr)_10px] md:gap-5 mt-20 mb-32 lg:grid-cols-[500px_minmax(100px,_1fr)_110px]">
          <Profile />
          <div className="mx-2">
            <form action="" className="flex flex-col md:flex md:flex-col bg-white rounded-[8px]">
              <CompanyPersonalDataForm />
              <div className="flex flex-col gap-2 px-7 mt-7 md:flex md:flex-col md:gap-2">
                <label htmlFor="decryption" className="text-[#9EA0A5] text-xs">
                  Deskripsi singkat
                </label>
                <textarea name="decryption" id="decryption" className="deskripsi-singkatClassName" placeholder="Tuliskan deskripsi singkat"></textarea>
              </div>
              <SocialCompany />
              <button type="button" className="w-20 self-end h-12 rounded-[4px] bg-[#FBB017] text-[#FFFFFF] font-openSans m-7 hover:scale-[1.05]">
                Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}