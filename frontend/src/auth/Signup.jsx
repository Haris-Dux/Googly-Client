import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createuserAsync } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loaders";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signupLoading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createuserAsync(formData)).then((res) => {
      if (res.payload.success) {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        navigate("/login");
      }
    });
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
            <div className="blur_bg border text-white px-4 py-8 sm:p-12 rounded-2xl">
              <h1 className="playfair max-w-xs sm:max-w-full text-center mb-5 text-3xl sm:text-4xl font-bold">
                Signup Your Account
              </h1>

              <p className="max-w-full mb-5 text-sm sm:text-md text-center">
                Get the best in eyewear with Googly. Sign up for perks and
                deals!
              </p>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4">
                {/* NAME */}
                <div>
                  <input
                    className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-md block w-full p-3 placeholder:text-gray-600"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <input
                    className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-md block w-full p-3 placeholder:text-gray-600"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <input
                    className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-md block w-full p-3 placeholder:text-gray-600"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter Your Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
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
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-0"
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

                {signupLoading ? (
                  <button className="w-full h-11 items-center mx-auto bg-[#fff] text-white flex justify-center tracking-wide">
                    <Loader type="ball-beat" active={true} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full h-11 items-center font-semibold mx-auto bg-[#DEC344] hover:bg-[#e3cc65] text-black flex justify-center tracking-wide"
                  >
                    SIGNUP NOW
                  </button>
                )}

                {/* TERM & CONDITION LINKS*/}
                <p className="max-w-sm text-sm font-normal text-white">
                  By creating an account, you agree to It Experts{" "}
                  <Link
                    to="/terms"
                    className="underline underline-offset-2 font-medium cursor-pointer"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="underline underline-offset-2 font-medium cursor-pointer"
                  >
                    Privacy Policy
                  </Link>
                </p>

                <p className="text-sm font-light text-white">
                  Already have an account ?{" "}
                  <Link
                    to="/login"
                    onClick={() => window.scroll(0, 0)}
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
