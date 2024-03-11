import React, { useState } from "react";
import AssideNav from "../AssideNav";
import { IoMdCloudUpload, IoIosResize } from "react-icons/io";
import { BsImage } from "react-icons/bs";

import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import http from "../../../../../helpers/http";
import { getProfileAction } from "../../../../../redux/actions/profile";

export default function Portfolio() {
  const token = useSelector((state) => state.auth.token);
  const { id } = jwt_decode(token);
  const [, setIsLoadingPicture] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const updatePortofolio = async (e) => {
    e.preventDefault();

    const format = ["image/jpg", "image/png", "image/jpeg"];
    const picture = e.target.picture.files[0];
    if (picture) {
      if (format.includes(picture.type)) {
        if (picture.size < 2000000) {
          let dataForm = new FormData();
          dataForm.append("picture", picture);
          dataForm.append("link", e.target.link.value);
          dataForm.append("name", e.target.name.value);
          dataForm.append("userId", id);
          try {
            setIsLoadingPicture(true);
            const { data } = await http(token).post("/portofolio", dataForm, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            await dispatch(getProfileAction());
            setIsLoadingPicture(false);
            setMessage(data.message);
            setTimeout(() => {
              setMessage("");
            }, 5000);
          } catch (err) {
            setIsLoadingPicture(false);
            setMessage(err.response.data.message);
          }
        } else {
          setMessage("Image file size must be less than 2mb");
        }
      } else {
        setMessage("File type must be images");
      }
    } else {
      const values = new URLSearchParams({
        link: e.target.link.value,
        name: e.target.name.value,
        userId: id,
        picture: "",
      });
      await http(token).post(`/portofolio`, values);
    }
  };

  return (
    <div className="bg-white rounded-[8px] p-1 mt-5 font-openSans">
      {message && (
        <div
          className={`w-full flex justify-center ${
            message === "Create Portofolio succes"
              ? "bg-green-500 my-2"
              : "bg-red-500 my-2"
          }`}
        >
          <p className="text-white">{message}</p>
        </div>
      )}
      <AssideNav
        navClassName="font-openSans text-xl text-[#1F2A36]"
        nav1="Portfolio"
      />
      <hr className="w-full" />
      <form action="" className="px-7 mb-10" onSubmit={updatePortofolio}>
        <div className="flex flex-col gap-2 mt-7">
          <label htmlFor="aplikasi" className="text-[#9EA0A5] text-xs">
            Nama aplikasi
          </label>
          <input
            type="text"
            name="name"
            className="dataDiri-InputClass"
            id="aplikasi"
            placeholder="Masukan nama aplikasi"
          />
        </div>
        <div className="flex flex-col gap-2 mt-7">
          <label htmlFor="repository" className="text-[#9EA0A5] text-xs">
            Link repository
          </label>
          <input
            type="text"
            name="link"
            className="dataDiri-InputClass"
            id="repository"
            placeholder="Masukan link repository"
          />
        </div>
        <div className="flex flex-col gap-2 mt-7">
          <span className="text-[#9EA0A5] text-xs mt-7">Upload gambar</span>
          <div className="cursor-pointer flex flex-col border-[1px] border-[#9EA0A5] border-dashed h-[348px] w-full rounded-[8px] justify-center items-center gap-5 text-[#9EA0A5] p-5 text-center">
            <IoMdCloudUpload className="h-16 w-28 cursor-pointer hover:scale-[1.05] hover:drop-shadow-md" />
            <span className="font-openSans text-[#1F2A36] text-sm">
              Drag & Drop untuk Upload Gambar Aplikasi Mobile
            </span>
            <span className="text-xs text-[#1F2A36]">
              Atau cari untuk mengupload file dari direktorimu
            </span>
            <input type="file" name="picture" id="picture" className="" />
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <BsImage className="w-8 h-8" />
                <span className="text-[9px] md:ext-xs text-[#1F2A36]">
                  High-Res Image <br />
                  PNG, JPG or GIF{" "}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IoIosResize className="border-[1px] border-[#9EA0A5] rounded-[2px] w-8 h-7 md:w-8 md:h-8" />
                <span className="text-[9px] text-start md:text-xs text-[#1F2A36]">
                  Size <br /> 1080x1920 or 600x800{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full mt-7" />
        <button
          className="btn-portfolioClassName hover:scale-[1.05]"
          type="submit"
        >
          Tambah portofolio
        </button>
      </form>
    </div>
  );
}
