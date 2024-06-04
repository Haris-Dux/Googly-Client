import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginuserAsync } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "./auth.css";
import Loader from "react-loaders";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { user, loginLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user?.login) {
      const fromCart =
        new URLSearchParams(location.search).get("from") === "cart";
      navigate(fromCart ? "/cart" : "/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginuserAsync(formData));
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
            <div className="blur_bg border px-4 py-8 sm:p-12 rounded-2xl">
              <h1 className="Noto text-white max-w-xs sm:max-w-full text-center mb-5 text-3xl sm:text-4xl font-bold">
                Login Your Account
              </h1>

              <p className="max-w-full mb-5 text-white  text-sm sm:text-md text-center">
                Sign in to access your account and explore exclusive offers.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
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
                        className="text-gray-50 select-none cursor-pointer"
                        htmlFor="remember"
                      >
                        show password
                      </label>
                    </div>
                  </div>
                  <Link
                    to="/forget"
                    className="text-sm font-medium text-primary-600 hover:underline text-gray-50"
                  >
                    Forgot password?
                  </Link>
                </div>

                {loginLoading ? (
                  <button className="w-full h-11 items-center justify-center mx-auto bg-[#fff] text-white flex tracking-wide">
                     <Loader type="ball-beat" active={true} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full h-11 items-center font-semibold mx-auto bg-[#DEC344] hover:bg-[#e3cc65] text-black flex justify-center tracking-wide"
                  >
                    LOGIN NOW
                  </button>
                )}

                <p className="text-sm font-light text-white ">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Sign up
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

export default Login;
