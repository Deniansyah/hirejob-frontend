import React from "react";
import AssideNav from "../AssideNav";

import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import http from "../../../../../helpers/http";
import { useState } from "react";

export default function PengalamanKerja() {
  const token = useSelector((state) => state.auth.token);
  const { id } = jwt_decode(token);

  const [message, setMessage] = useState("");

  const updateExperiences = async (e) => {
    e.preventDefault();
    const values = {
      companyName: e.target.companyName.value,
      position: e.target.position.value,
      userId: id,
      joinDate: e.target.joinDate.value,
      outDate: e.target.outDate.value,
      description: e.target.description.value,
    };
    await http(token).post(`/experiences`, values);
    setMessage("Exprerience added");
    setTimeout(() => {
      setMessage("");
    }, [5000]);
  };

  return (
    <div className="font-openSans bg-white py-1 rounded-[8px]">
      <AssideNav
        navClassName="font-openSans text-xl text-[#1F2A36]"
        nav1="Pengalaman Kerja"
      />
      <hr className="w-full" />
      {message && (
        <div className="w-full flex justify-center bg-green-500 my-2">
          <p className="text-white">{message}</p>
        </div>
      )}
      <form className="px-7" onSubmit={updateExperiences}>
        <div className="lg:grid lg:grid-cols-2 lg:gap-2 my-7">
          <div className="pengalamanKerja-InputParentClassName">
            <label htmlFor="perusahaan" className="text-[#9EA0A5] text-xs">
              Nama Perusahaan
            </label>
            <input
              type="text"
              name="companyName"
              className="dataDiri-InputClass"
              id="perusahaan"
              placeholder="Masukkan Perusahaan"
            />
          </div>
          <div className="pengalamanKerja-InputParentClassName">
            <label htmlFor="perusahaan" className="text-[#9EA0A5] text-xs">
              Posisi
            </label>
            <input
              type="text"
              name="position"
              className="dataDiri-InputClass"
              id="posisi"
              placeholder="Masukkan Posisi"
            />
          </div>
          <div className="pengalamanKerja-InputParentClassName">
            <label htmlFor="masuk" className="text-[#9EA0A5] text-xs">
              Tahun Masuk
            </label>
            <input
              type="text"
              name="joinDate"
              className="dataDiri-InputClass"
              id="masuk"
              placeholder="Ex. 2020-03-23"
            />
          </div>
          <div className="pengalamanKerja-InputParentClassName">
            <label htmlFor="keluar" className="text-[#9EA0A5] text-xs">
              Tahun Keluar
            </label>
            <input
              type="text"
              name="outDate"
              className="dataDiri-InputClass"
              id="keluar"
              placeholder="Ex. 2021-03-23"
            />
          </div>
        </div>
        <div className="pengalamanKerja-InputParentClassName">
          <label htmlFor="description" className="text-[#9EA0A5] text-xs">
            Deskripsi singkat
          </label>
          <textarea
            name="description"
            id="description"
            className="deskripsi-singkatClassName"
            placeholder="Tuliskan deskripsi singkat"
          ></textarea>
        </div>
        <hr className="w-full" />
        <button
          type="submit"
          className="btn-portfolioClassName hover:scale-[1.05]"
        >
          Tambah pengalaman kerja
        </button>
        <hr className="w-full mb-20" />
      </form>
    </div>
  );
}
