import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassAsync } from "../features/authSlice";
import { useDispatch } from "react-redux";

const ResetPass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const params = useParams();

  const { id } = params;

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    const resetPassword = password;
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        await dispatch(resetPassAsync({ id, resetPassword })).then((res) => {
          if (res.payload.message) {
            navigate("/login");
            setFormData({
              password: "",
              confirmPassword: "",
            });
          }
        });
      } catch (error) {
        console.error("Error resetting password:", error);
      }
    } else {
      console.error("Passwords do not match");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className="bg_auth py-7 sm:py-10 px-0 sm:px-4 md:px-14">
        <div className="max-w-5xl xl:max-w-4xl mx-auto">
          <div className="flex justify-center items-center flex-col-reverse sm:flex-row gap-10 md:gap-2 min-h-screen">
            {/* FORM SIDE */}
            <div className="blur_bg border text-white w-full sm:max-w-sm px-2 py-8 sm:p-10 rounded-2xl">
              <h1 className="Noto text-center sm:max-w-full mb-5 text-3xl sm:text-4xl font-bold">
                Reset Password
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* EMAIL */}
                <div>
                  <input
                    className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-md block w-full p-3 placeholder:text-gray-600"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter New Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <input
                    className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-md block w-full p-3 placeholder:text-gray-600"
                    type={showPassword ? "text" : "password"}
                    id="confirmpassword"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* TOGGLE PASSWORD VISIBILITY */}
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        aria-describedby="remember"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                        id="remember"
                        type="checkbox"
                        onChange={togglePasswordVisibility}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        className="text-white select-none cursor-pointer"
                        htmlFor="remember"
                      >
                        show password
                      </label>
                    </div>
                  </div>
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

export default ResetPass;
