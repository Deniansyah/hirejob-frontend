import React, { useRef, useState } from "react";
import { HiOutlineMapPin } from "react-icons/hi2";
import { RiPencilFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import http from "../../../../helpers/http";
import { getProfileAction } from "../../../../redux/actions/profile";
import imgProfile from "../../../../assets/images/profile.jpg";

export default function Profile(props) {
  const { profile } = props;
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = React.useState("");

  const { picture } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [, setIsLoadingPicture] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const updateCompany = async () => {
    const values = {
      name: document.getElementById("name").value,
      field: document.getElementById("field").value,
      address: document.getElementById("address").value,
      bio: document.getElementById("bio").value,
      email: document.getElementById("email").value,
      instagram: document.getElementById("instagram").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      linkedin: document.getElementById("linkedin").value,
    };

    const { data } = await http().patch(`/company/${profile.id}`, values);

    setSuccessMessage(data.message);
  };

  const back = () => {
    navigate(`/company-profile/${profile.userId}`);
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
          {picture ? (
            <img
              src={picture}
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
              message === "Profile updated" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message && message}
          </div>
        </div>
        <div className="my-10 px-7 md:flex md:flex-col md:gap-2">
          <div className="grid grid-rows md:flex md:flex-col md:gap-2">
            <h2 className="text-[#1F2A36] text-xl">{profile.name}</h2>
            <span className="text-[#1F2A36] text-sm">{profile.field}</span>
            {profile.status && (
              <span className="text-[#9EA0A5] text-sm order-3 md:order-2">
                {profile.status}
              </span>
            )}
            <div className="flex flex-row order-2 md:flex md:items-center gap-2 text-sm text-[#9EA0A5] my-2">
              <HiOutlineMapPin />
              <span>{profile.address}</span>
            </div>
            <p className="text-[#9EA0A5] order-5 hidden text-sm md:block">
              {profile.bio}
            </p>
          </div>
        </div>
      </div>
      {successMessage && (
        <div className="alert alert-success shadow-lg my-5">
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
      <div className="flex flex-col gap-7 my-7 mx-3 md:flex md:flex-col md:m-2 md:gap-7 md:mt-10">
        <button
          onClick={() => updateCompany()}
          type="button"
          className="btn-editProfile text-[#FFFFFF] bg-[#5E50A1]"
        >
          Simpan
        </button>
        <button
          onClick={() => back()}
          type="button"
          className="btn-editProfile bg-[#FFFFFF] text-[#5E50A1] border-[1px] border-[#5E50A1]"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
