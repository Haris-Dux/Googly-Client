import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyOtpAsync } from "../features/authSlice";
import { useDispatch } from "react-redux";

const OtpChecker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { id } = params;
  const [formData, setFormData] = useState({
    otp: "",
    userId: id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOtpAsync(formData)).then((res) => {
      if (res.payload.OtpVerified) {
        navigate(`/reset/${id}/${res.payload.OtpVerified.toString()}`);
        setFormData({
          otp: "",
        });
      }
    });
  };

  return (
    <>
      <section className="bg_auth py-7 sm:py-10 px-0 sm:px-4 md:px-14">
        <div className="max-w-5xl xl:max-w-4xl mx-auto">
          <div className="flex justify-center items-center flex-col-reverse sm:flex-row gap-10 md:gap-2 min-h-screen">
            {/* FORM SIDE */}
            <div className="blur_bg border text-white w-full sm:max-w-sm px-2 py-8 sm:p-12 rounded-2xl">
              <h1 className="Noto text-center sm:max-w-full mb-5 text-2xl sm:text-4xl font-bold">
                OTP Verification
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* EMAIL */}
                <div>
                  <input
                    className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-md block w-full p-3 placeholder:text-gray-600"
                    type="number"
                    id="otp"
                    name="otp"
                    placeholder="Enter OTP Verification code"
                    value={formData.otp}
                    onChange={(e) =>
                      setFormData({ ...formData, otp: e.target.value })
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 items-center font-semibold mx-auto bg-[#DEC344] hover:bg-[#e3cc65] text-black flex justify-center tracking-wide"
                >
                  SUBMIT NOW
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OtpChecker;
