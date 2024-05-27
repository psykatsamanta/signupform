import React, { useState } from "react";
import { CityData, Country, Data } from "../types/type";
import { FaEye, FaEyeSlash, FaTelegramPlane } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { CountryData } from "../types/type";
import { useNavigate } from "react-router-dom";

interface MainProps {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}

const emailValidator =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const panCardValidator = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const aadharValidator = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;

const Main: React.FC<MainProps> = ({ data, setData }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [view, setView] = useState<boolean>(false);

  const handleClick = () => {
    navigate("/success");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData((prev) => ({ ...prev, country: e.target.value }));
    if (CityData[e.target.value]) {
      setData((prev) => ({ ...prev, city: CityData[prev.country][0] || "" }));
    } else {
      setData((prev) => ({ ...prev, city: "" }));
    }
  };

  const changeView = () => {
    setView(!view);
  };

  let Content: React.ReactNode = (
    <div className="w-full flex flex-col justify-start items-center gap-3">
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="fname" className="text-[#232323]">
          First Name*
        </label>
        <input
          type="text"
          name="fname"
          placeholder="Enter First Name"
          className="p-2 placeholder:text-[#5e5e5e] text-[#232323] focus:outline-0 rounded-sm bg-transparent border-2 border-[#232323]"
          value={data.fname}
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="lname" className="text-[#232323]">
          Last Name*
        </label>
        <input
          type="text"
          name="lname"
          placeholder="Enter Last Name"
          className="p-2 placeholder:text-[#5e5e5e] text-[#232323] focus:outline-0 rounded-sm bg-transparent border-2 border-[#232323]"
          value={data.lname}
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="username" className="text-[#232323]">
          Username*
        </label>
        <input
          type="text"
          name="username"
          placeholder="Choose Username"
          className="p-2 placeholder:text-[#5e5e5e] text-[#232323] focus:outline-0 rounded-sm bg-transparent border-2 border-[#232323]"
          value={data.username}
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="email" className="text-[#232323]">
          Email*
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="p-2 placeholder:text-[#5e5e5e] text-[#232323] focus:outline-0 rounded-sm bg-transparent border-2 border-[#232323]"
          value={data.email}
          onChange={handleChange}
        />
        {!emailValidator.test(data.email) && (
          <p className="text-red-600 text-sm font-bold">
            * Enter an valid Email!
          </p>
        )}
      </div>
    </div>
  );

  if (step === 2)
    Content = (
      <div className="w-full flex flex-col justify-start items-center gap-3">
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="fname" className="text-[#232323]">
            Password*
          </label>
          <div className="p-2 flex items-center border-2 border-[#232323] justify-between gap-2">
            <input
              type={!view ? "password" : "text"}
              name="password"
              placeholder="Enter Password"
              className="placeholder:text-[#5e5e5e] w-full text-[#232323] focus:outline-0 rounded-sm bg-transparent"
              value={data.password}
              onChange={handleChange}
            />
            <button type="button" onClick={changeView}>
              {!view ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>
          {!passwordValidator.test(data.password) && (
            <p className="text-red-600 text-xs font-bold">
              * Password must contain at least 8 characters, including
              uppercase, lowercase letters, numbers, and special characters.
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="lname" className="text-[#232323]">
            Contact Number*
          </label>
          <div className="flex justify-between items-center p-2 gap-2 border-2 border-[#232323]">
            <select
              className="w-1/4 bg-transparent p-1 focus:outline-0"
              onChange={handleChange}
              value={data.countryCode}
              name="countryCode"
            >
              {Object.keys(CountryData).map((key) => (
                <option key={key} className="flex items-center justify-between">
                  {CountryData[key as keyof Country].code}
                  {" +"}
                  {CountryData[key as keyof Country].callingCode}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="phone"
              placeholder="Enter Phone No."
              className="w-full placeholder:text-[#5e5e5e] text-[#232323] border-l-2 border-[#232323] focus:outline-0 rounded-sm bg-transparent pl-3"
              value={data.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="username" className="text-[#232323]">
            Country*
          </label>
          <select
            className="w-full bg-transparent focus:outline-0 p-2 border-2 border-[#232323] rounded-sm text-[#232323]"
            onChange={handleCountryChange}
            value={data.country}
            name="country"
          >
            {Object.keys(CountryData).map((key) => (
              <option key={key} className="flex items-center justify-between">
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="email" className="text-[#232323]">
            City*
          </label>
          <select
            className="w-full bg-transparent focus:outline-0 p-2 border-2 border-[#232323] rounded-sm text-[#232323]"
            onChange={handleChange}
            value={data.city}
            name="city"
            disabled={!CityData[data.country]}
          >
            {CityData[data.country] ? (
              CityData[data.country].map((key) => (
                <option key={key}>{key}</option>
              ))
            ) : (
              <option disabled className="disabled:bg-[#232323]">
                No city found
              </option>
            )}
          </select>
        </div>
      </div>
    );

  if (step === 3)
    Content = (
      <div className="w-full flex flex-col justify-start items-center gap-3">
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="aadharno" className="text-[#232323]">
            Adhaar Number*
          </label>
          <input
            type="number"
            name="aadharno"
            placeholder="Enter Aadhaar Number"
            className="p-2 placeholder:text-[#5e5e5e] text-[#232323] focus:outline-0 rounded-sm bg-transparent border-2 border-[#232323]"
            value={data.aadharno}
            onChange={handleChange}
          />
          {!aadharValidator.test(data.aadharno) && (
            <p className="text-sm text-red-600 font-bold">
              * Enter a valid Aadhar Card Number
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="panno" className="text-[#232323]">
            Pan Card Number*
          </label>
          <input
            type="text"
            name="panno"
            placeholder="Enter Pancard Number"
            className="p-2 placeholder:text-[#5e5e5e] text-[#232323] focus:outline-0 rounded-sm bg-transparent border-2 border-[#232323]"
            value={data.panno}
            onChange={handleChange}
          />
          {!panCardValidator.test(data.panno) && (
            <p className="text-sm text-red-600 font-bold">
              * Enter a valid PAN Card Number
            </p>
          )}
        </div>
      </div>
    );

  return (
    <div className="h-full md:h-auto md:min-h-[300px] bg-slate-200 rounded-md shadow-sm p-4 w-full md:w-[500px] flex flex-col gap-4 text-[#232323]">
      <div className="flex flex-col w-full gap-2">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p>Start Your Journey From Here</p>
      </div>
      <div className="w-full flex items-center justify-center">{Content}</div>
      <div className="flex w-full justify-between items-center gap-3">
        <button
          className="w-1/2 bg-slate-800 text-white px-4 py-2 rounded-sm disabled:cursor-not-allowed disabled:bg-slate-600 flex items-center gap-2"
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
        >
          <FaArrowLeft />
          Previous
        </button>
        {step < 3 ? (
          <button
            className="w-1/2 bg-slate-800 text-white px-4 py-2 rounded-sm disabled:cursor-not-allowed disabled:bg-slate-600 flex items-center justify-end gap-2"
            onClick={() => setStep(step + 1)}
            disabled={step === 3}
          >
            Next
            <FaArrowRight />
          </button>
        ) : (
          <button
            className="w-1/2 bg-slate-800 text-white px-4 py-2 rounded-sm disabled:cursor-not-allowed disabled:bg-slate-600 flex items-center gap-2 justify-center"
            onClick={handleClick}
            disabled={
              data.fname === "" ||
              data.lname === "" ||
              data.username === "" ||
              data.password === "" ||
              data.phone === "" ||
              !panCardValidator.test(data.panno) ||
              !emailValidator.test(data.email) ||
              !passwordValidator.test(data.password) ||
              !aadharValidator.test(data.aadharno)
            }
          >
            Submit
            <FaTelegramPlane />
          </button>
        )}
      </div>
    </div>
  );
};

export default Main;
