import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "../../../../../helpers/http";
import { getSkillsAction } from "../../../../../redux/actions/profile";

export default function SkillForm() {
  const token = useSelector((state) => state.auth.token);
  const { skills } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const updateSkill = async (e) => {
    e.preventDefault();
    const values = new URLSearchParams({
      name: e.target.skill.value,
    });
    await http(token).post(`/profile/skills`, values);
    setMessage("Skill added");
    dispatch(getSkillsAction());
    setTimeout(() => {
      setMessage("");
    }, [5000]);
  };

  const deleteSkill = async (skillId) => {
    await http(token).delete(`/userSkill/${skillId}`);
    setMessage("Skill Deleted");
    dispatch(getSkillsAction());
    setTimeout(() => {
      setMessage("");
    }, [5000]);
  };

  return (
    <div className="py-1 my-5 font-openSans bg-white rounded-[8px]">
      <hr className="w-full" />
      {message && (
        <div className="w-full flex justify-center bg-green-500 my-2">
          <p className="text-white">{message}</p>
        </div>
      )}
      <form className="flex gap-5 w-full p-7" onSubmit={updateSkill}>
        <div className="flex flex-col w-full">
          <label htmlFor="skill" className="mb-2">
            Masukan skill
          </label>

          <input
            type="text"
            name="skill"
            className="dataDiri-InputClass w-full"
            id="skill"
            placeholder="Masukkan Skill"
          />
        </div>
        <button
          type="submit"
          className="w-20 h-12 rounded-[4px] bg-[#FBB017] text-[#FFFFFF] font-openSans self-end hover:scale-[1.05]"
        >
          Simpan
        </button>
      </form>
      <div className="px-7 mb-5 flex gap-4 flex-wrap">
        {skills?.map((e) => (
          <div
            className="px-7 py-2 rounded-[4px] bg-[#FBB017] relative"
            key={e.id}
          >
            {e.name}
            <div
              onClick={() => deleteSkill(e.id)}
              className="cursor-pointer absolute top-[-10px] right-[-5px] px-2 bg-red-500 rounded-full"
            >
              x
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
