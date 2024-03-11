import React from "react";
import Left from "../components/authComponents/Left";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { registerRecruiterAction } from "../redux/actions/auth";
import { Formik, Form, Field } from "formik";
import YupPassword from "yup-password";
import * as Yup from "yup";

const phoneRegEx = /^(^08)(\d{8,10})$/;

const registerRecruiterScheme = Yup.object().shape({
  name: Yup.string().required("Masukkan nama"),
  company: Yup.string().required("Masukkan nama perusahaan"),
  field: Yup.string().required("Masukan bidang perusahaan"),
  email: Yup.string().email("Email tidak valid").required("Masukkan email"),
  password: Yup.string()
    .password()
    .min(8, "Panjang minimal 8")
    .minLowercase(1, "Minimal 1 huruf kecil")
    .minUppercase(1, "Minimal 1 kapital")
    .minSymbols(1, "Minimal 1 simbol")
    .minNumbers(1, "Minimal 1 angka")
    .required("Masukkan kata sandi"),
  confirmPassword: Yup.string()
    .password()
    .min(8, "Panjang minimal 8")
    .minLowercase(1, "Minimal 1 huruf kecil")
    .minUppercase(1, "Minimal 1 kapital")
    .minSymbols(1, "Minimal 1 simbol")
    .minNumbers(1, "Minimal 1 angka")
    .required("Masukkan konfirmasi kata sandi"),
  phoneNumber: Yup.string().matches(phoneRegEx, "nomor telepon tidak valid").required("Masukkan nomor telepon"),
});

YupPassword(Yup);
const RegisterRecruiter = () => {
  const dispatch = useDispatch();
  const [errMessage, setErrMessage] = React.useState("");
  const [showTop, setShowTop] = React.useState(false);
  const [showBottom, setShowBottom] = React.useState(false);
  const navigate = useNavigate();

  const registerRecruiter = async (value) => {
    const cb = () => {
      navigate("/home");
    };
    try {
      const results = await dispatch(
        registerRecruiterAction({
          ...value,
          cb,
        })
      );
      setErrMessage(results.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerShowTop = () => {
    setShowTop(!showTop);
  };

  const handlerShowBottom = () => {
    setShowBottom(!showBottom);
  };

  return (
    <div className="flex h-screen overflow-y-hidden">
      <Left />
      <div className="md:basis-1/2 bg-[#E5E5E] overflow-y-auto">
        <div className="md:py-28 py-10 px-16">
          <img className="md:hidden block mb-10" src={require("../assets/images/navlogo.png")} alt="logo" />
          <h2 className="text-2xl font-bold mb-3">Halo, Pewpeople</h2>
          <p className="text-gray-500 mb-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
          {errMessage ? (
            <div className="alert alert-error shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errMessage}</span>
              </div>
            </div>
          ) : null}
          <Formik
            initialValues={{
              name: "",
              email: "",
              company: "",
              field: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={registerRecruiterScheme}
            onSubmit={registerRecruiter}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex flex-col mb-7 mt-3">
                  <label className="text-gray-400 mb-1">Nama</label>
                  <Field className="border rounded py-2 px-4 bg-white focus:outline-none" type="text" name="name" placeholder="Masukan nama panjang" />
                  {errors.name && touched.name ? <div className="text-red-500 text-sm">{errors.name}</div> : null}
                </div>
                <div className="flex flex-col mb-7">
                  <label className="text-gray-400 mb-1">Email</label>
                  <Field className="border rounded py-2 px-4 bg-white focus:outline-none" type="email" name="email" placeholder="Masukan alamat email" />
                  {errors.email && touched.email ? <div className="text-red-500 text-sm">{errors.email}</div> : null}
                </div>
                <div className="flex flex-col mb-7">
                  <label className="text-gray-400 mb-1">Perusahaan</label>
                  <Field className="border rounded py-2 px-4 bg-white focus:outline-none" type="text" name="company" placeholder="Masukan nama perusahaan" />
                  {errors.company && touched.company ? <div className="text-red-500 text-sm">{errors.company}</div> : null}
                </div>
                <div className="flex flex-col mb-7">
                  <label className="text-gray-400 mb-1">Bidang Perusahaan</label>
                  <Field className="border rounded py-2 px-4 bg-white focus:outline-none" type="text" name="field" placeholder="Bidang perusahaan anda" />
                  {errors.field && touched.field ? <div className="text-red-500 text-sm">{errors.field}</div> : null}
                </div>
                <div className="flex flex-col mb-7">
                  <label className="text-gray-400 mb-1">No handphone</label>
                  <Field className="border rounded py-2 px-4 bg-white focus:outline-none" type="telp" name="phoneNumber" placeholder="Masukan no handphone" />
                  {errors.phoneNumber && touched.phoneNumber ? <div className="text-red-500 text-sm">{errors.phoneNumber}</div> : null}
                </div>
                <div className="flex flex-col mb-7 relative">
                  <label className="text-gray-400 mb-1">Kata sandi</label>
                  <Field className="border rounded py-2 px-4 bg-white focus:outline-none" type={showTop ? "text" : "password"} name="password" placeholder="Masukan kata sandi" />
                  <label onClick={handlerShowTop} className="absolute right-5 top-10 cursor-pointer">
                    {showTop ? <BsEyeSlash className="w-[20px] h-[20px]" /> : <BsEye className="w-[20px] h-[20px]" />}
                  </label>
                  {errors.password && touched.password ? <div className="text-red-500 text-sm">{errors.password}</div> : null}
                </div>
                <div className="flex flex-col mb-7 relative">
                  <label className="text-gray-400 mb-1">Konfirmasi kata sandi</label>
                  <Field className="border rounded py-2 px-4 bg-white focus:outline-none" type={showBottom ? "text" : "password"} name="confirmPassword" placeholder="Masukan konfirmasi kata sandi" />
                  <label onClick={handlerShowBottom} className="absolute right-5 top-10 cursor-pointer">
                    {showBottom ? <BsEyeSlash className="w-[20px] h-[20px]" /> : <BsEye className="w-[20px] h-[20px]" />}
                  </label>
                  {errors.confirmPassword && touched.confirmPassword ? <div className="text-red-500 text-sm">{errors.confirmPassword}</div> : null}
                </div>
                <button type="submit" className="flex justify-center bg-[#FBB017] rounded text-white w-full py-2 my-5">
                  Daftar
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center">
            Anda sudah punya akun?{" "}
            <Link to="/login" className="text-[#FBB017]">
              Masuk disini
            </Link>
          </p>
          <p className="text-center">
            Daftar sebagai pencari kerja?{" "}
            <Link to="/register" className="text-[#FBB017]">
              Daftar disini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterRecruiter;
