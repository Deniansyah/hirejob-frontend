import React, { useRef, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imgProfile from "../../../../assets/images/profile.jpg";
import http from "../../../../helpers/http";
import { getProfileAction } from "../../../../redux/actions/profile";

export default function Profile({ dataUser }) {
  const { token } = useSelector((state) => state.auth);

  const [, setIsLoadingPicture] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changePassword = () => {
    navigate("/reset-password");
  };

  const back = () => {
    navigate("/home");
  };

  const inputFile = useRef(null);
  const openFile = () => {
    inputFile.current.click();
  };

  const doChangePicture = async (e) => {
    const format = ["image/jpg", "image/png", "image/jpeg"];

    const picture = e.target.files[0];
    if (picture) {
      if (format.includes(picture.type)) {
        if (picture.size < 2000000) {
          let dataForm = new FormData();
          dataForm.append("picture", picture);
          try {
            setIsLoadingPicture(true);
            const { data } = await http(token).patch(
              "/profile/uploads",
              dataForm,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            await dispatch(getProfileAction());
            setIsLoadingPicture(false);
            setMessage(data.message);
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
    }
  };

  return (
    <div className="md:ml-20 lg:ml-[150px]">
      <div className="bg-white md:p-5 rounded-[8px] font-openSans py-4 mx-2">
        <div className="profile-image-parents">
          {dataUser.picture ? (
            <img
              src={dataUser.picture}
              alt="profile"
              className="profileImageClassName"
            />
          ) : (
            <img
              src={imgProfile}
              alt="profile"
              className="profileImageClassName"
            />
          )}

          <div className="flex flex-col justify-center text-center">
            <input
              type="file"
              name="picture"
              id="picture"
              ref={inputFile}
              className="hidden"
              onChange={doChangePicture.bind(this)}
            />
            <div
              className="flex items-center justify-center cursor-pointer"
              onClick={openFile}
            >
              <RiPencilFill />
              <span>Edit</span>
            </div>
            <div
              className={`text-sm ${
                message === "Profile updated"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message && message}
            </div>
          </div>
        </div>
        <div className="my-10 px-7 md:flex md:flex-col md:gap-2">
          <div className="grid grid-rows md:flex md:flex-col md:gap-2">
            <h2 className="text-[#1F2A36] text-xl">{dataUser?.name}</h2>

            <span className="text-[#1F2A36] text-sm">{dataUser?.jobDesk}</span>
            <span className="text-[#9EA0A5] text-sm order-3 md:order-2">
              {dataUser?.status}
            </span>
            <div className="flex flex-row order-2 md:flex md:items-center gap-2 text-sm text-[#9EA0A5] my-2">
              {/* <HiOutlineMapPin /> */}
              <span>{dataUser?.address}</span>
            </div>
            <div className="hidden md:flex order-4 items-center md:gap-2  text-[#9EA0A5] text-sm">
              {/* <BsTelephone /> */}
              <span>{dataUser?.phoneNumber}</span>
            </div>
            <p className="text-[#9EA0A5] order-5 hidden text-sm md:block">
              {dataUser?.bio}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-7 my-7 mx-3 md:flex md:flex-col md:m-2 md:gap-7 md:mt-10">
        <button
          type="button"
          className="btn-editProfile text-[#FFFFFF] bg-[#5E50A1]"
          onClick={changePassword}
        >
          Ubah Password
        </button>
        <button
          type="button"
          className="btn-editProfile bg-[#FFFFFF] text-[#5E50A1] border-[1px] border-[#5E50A1]"
          onClick={back}
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
