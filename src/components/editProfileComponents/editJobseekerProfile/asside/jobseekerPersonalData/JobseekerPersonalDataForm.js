import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "../../../../../helpers/http";
import { getProfileAction } from "../../../../../redux/actions/profile";
import AssideNav from "../AssideNav";

export default function DataDiriForm({ dataUser }) {
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const updateUserInfo = async (e) => {
    e.preventDefault();
    const values = new URLSearchParams({
      name: e.target.name.value,
      jobDesk: e.target.jobDesk.value,
      address: e.target.address.value,
      instagram: e.target.instagram.value,
      linkedin: e.target.linkedin.value,
      github: e.target.github.value,
      gitlab: e.target.gitlab.value,
      bio: e.target.bio.value,
      status: e.target.status.value,
    });
    setIsLoading(true);
    await http(token).patch(`/profile`, values);
    await dispatch(getProfileAction());
    setMessage("Profile Updated");
    setIsLoading(false);
    setTimeout(() => {
      setMessage("");
    }, [5000]);
  };

  return (
    <form onSubmit={updateUserInfo} className="flex flex-col md:flex md:flex-col bg-white rounded-[8px]">
      <div className="box-border pt-1">
        <AssideNav navClassName="font-openSans text-xl text-[#1F2A36]" nav1="Data diri" />
        <hr className="w-full" />
        {message && (
          <div className="w-full flex justify-center bg-green-500 my-2">
            <p className="text-white">{message}</p>
          </div>
        )}
        <div className="parents-DataDiriInputClassName">
          <label htmlFor="name" className="text-[#9EA0A5] text-xs">
            Nama lengkap
          </label>
          <input type="text" name="name" className="dataDiri-InputClass" id="namaLengkap" placeholder="Masukan nama Job desk" defaultValue={dataUser.name} />
        </div>
        <div className="parents-DataDiriInputClassName">
          <label htmlFor="jobDesk" className="text-[#9EA0A5] text-xs">
            Job desk
          </label>
          <input type="text" name="jobDesk" className="dataDiri-InputClass" id="jobdesk" placeholder="Masukan nama Job desk" defaultValue={dataUser.jobDesk} />
        </div>
        <div className="parents-DataDiriInputClassName">
          <label htmlFor="jobDesk" className="text-[#9EA0A5] text-xs">
            Jenis Pekerjaan
          </label>
          <select type="text" className="focus:outline-none border border-gray-300  p-3 my-1 rounded-md pr-9 pl-3" name="status" id="status">
            <option className="hidden">{dataUser.status ? dataUser.status : "--- Select role ---"}</option>
            <option value="Freelance">Freelance</option>
            <option value="Fulltime">Fulltime</option>
          </select>
        </div>
        <div className="parents-DataDiriInputClassName">
          <label htmlFor="domisili" className="text-[#9EA0A5] text-xs">
            Domisili
          </label>
          <input type="text" name="address" className="dataDiri-InputClass" id="domisili" placeholder="Masukan Domosili" defaultValue={dataUser.address} />
        </div>
        <div className="flex flex-col md:flex md:flex-col gap-6 lg:flex lg:flex-row px-7 mt-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="ig" className="text-[#9EA0A5] text-xs">
              Instagram
            </label>
            <input type="text" name="instagram" className="dataDiri-InputClass lg:w-full" id="ig" placeholder="Masukan Username IG" defaultValue={dataUser.instagram} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="ig" className="text-[#9EA0A5] text-xs">
              LinkedIn
            </label>
            <input type="text" name="linkedin" className="dataDiri-InputClass lg:w-full" id="linkedin" placeholder="Masukan Username LinkedIn" defaultValue={dataUser.linkedin} />
          </div>
        </div>
        <div className="flex flex-col md:flex md:flex-col gap-6 lg:flex lg:flex-row px-7 mt-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="github" className="text-[#9EA0A5] text-xs">
              Github
            </label>
            <input type="text" name="github" className="dataDiri-InputClass lg:w-full" id="github" placeholder="Masukan Username Github" defaultValue={dataUser.github} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="gitlab" className="text-[#9EA0A5] text-xs">
              Gitlab
            </label>
            <input type="text" name="gitlab" className="dataDiri-InputClass lg:w-full" id="gitlab" placeholder="Masukan Username Gitlab" defaultValue={dataUser.gitlab} />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-7 mt-7 md:flex md:flex-col md:gap-2">
          <label htmlFor="decryption" className="text-[#9EA0A5] text-xs">
            Deskripsi singkat
          </label>
          <textarea name="bio" id="decryption" className="deskripsi-singkatClassName" placeholder="Tuliskan deskripsi singkat" defaultValue={dataUser.bio}></textarea>
        </div>

        <div className="flex justify-end">
          <button disabled={isLoading} type="submit" className="w-20 h-12 rounded-[4px] bg-[#FBB017] text-[#FFFFFF] font-openSans m-7 hover:scale-[1.05]">
            Simpan
          </button>
        </div>
      </div>
    </form>
  );
}
