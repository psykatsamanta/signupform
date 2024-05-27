import { Data } from "../types/type";
import { FaCheckCircle } from "react-icons/fa";

interface SuccessProps {
  data: Data;
}

const Success: React.FC<SuccessProps> = ({ data }) => {
  return (
    <div className="h-full md:h-auto md:min-h-[300px] bg-slate-200 rounded-md shadow-sm p-5 w-full md:w-[500px] flex flex-col gap-4 text-[#232323] items-center">
      <FaCheckCircle className="text-6xl text-green-500" />
      <h1 className="text-2xl font-semibold">Registration Successful</h1>
      <div className="flex flex-col justify-start items-start w-full">
        <p>First Name - {data.fname}</p>
        <p>Last Name - {data.lname}</p>
        <p>Useraname - {data.username}</p>
        <p>Email - {data.email}</p>
        <p>Password - {data.password}</p>
        <p>
          Phone No - +{data.countryCode} {data.phone}
        </p>
        <p>Country - {data.country}</p>
        <p>City - {data.city}</p>
        <p>PAN No - {data.panno}</p>
        <p>Aadhar No - {data.aadharno}</p>
      </div>
    </div>
  );
};

export default Success;
