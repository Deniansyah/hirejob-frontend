import React from "react";
import Left from "../components/authComponents/Left";
import { Link } from "react-router-dom";

const ConfirmRelogin = () => {
    return (
        <div className="flex h-screen">
            <Left />
            <div className="md:basis-1/2 bg-[#E5E5E] overflow-y-auto">
                <div className="py-28 px-16">
                    <h2 className="text-2xl font-bold mb-3">Please login with your account</h2>
                    <p className="text-gray-500 mb-10">We have an an email containing a password reset instruction toyour email. please check your email.</p>
                    <form>
                        <div className="flex flex-col mb-7">
                            <label className="text-gray-400 mb-1">Email</label>
                            <input className="border rounded py-2 px-4 bg-white" type="email" name="email" placeholder="Masukan alamat email"/>
                        </div>
                        <div className="flex flex-col mb-7">
                            <label className="text-gray-400 mb-1">Kata sandi</label>
                            <input className="border rounded py-2 px-4 bg-white" type="password" name="password" placeholder="Masukan kata sandi"/>
                        </div>
                        <Link to='/home' className="flex justify-center bg-[#FBB017] rounded text-white w-full py-2 my-5">Reset password</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRelogin