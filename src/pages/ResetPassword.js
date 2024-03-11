import React from "react";
import Left from "../components/authComponents/Left";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import YupPassword from "yup-password";
import * as Yup from "yup";
YupPassword(Yup);

const resetPasswordScheme = Yup.object().shape({
  email: Yup.string().email("Email tidak valid").required("Masukkan email"),
});

const ResetPassword = () => {
  const navigate = useNavigate();

  const forgotPassword = async (value) => {
    const email = value.email;

    navigate("/request-reset", { state: email });
  };
  return (
    <div className="flex h-screen overflow-y-hidden">
      <Left />
      <div className="lg:basis-1/2 bg-[#E5E5E] overflow-y-auto">
        <div className="lg:py-28 py-10 px-3 lg:px-16">
          <img className="lg:hidden block mb-10" src={require("../assets/images/navlogo.png")} alt="logo" />
          <h2 className="text-2xl font-bold mb-3">Reset password</h2>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={resetPasswordScheme}
            onSubmit={forgotPassword}
          >
            {({ errors, touched }) => (
              <Form>
                <p className="text-gray-500 mb-10">Enter your user account's verified email address and we will send you a password reset link.</p>
                <div className="flex flex-col mb-7">
                  <label className="text-gray-400 mb-1">Email</label>
                  <Field className="border rounded py-2 px-4 bg-white focus:outline-none" type="email" name="email" placeholder="Masukan alamat email" />
                  {errors.email && touched.email ? <div className="text-red-500 text-sm">{errors.email}</div> : null}
                </div>
                <button type="submit" className="flex justify-center bg-[#FBB017] rounded text-white w-full py-2 my-5">
                  Send password reset email
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
