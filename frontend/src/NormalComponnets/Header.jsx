import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { BsHandbag } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { getCartTotal } from "../features/ActionsSlice";
import { IoIosArrowUp } from "react-icons/io";
import { logoutUserAsync } from "../features/authSlice";
import SearchModal from "./SearchModal";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const showNav1 =
    location.pathname === "/" ||
    location.pathname === "/shop" ||
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forget" ||
    location.pathname === "/about" ||
    location.pathname === "/contact" ||
    location.pathname === "/orders" ||
    location.pathname.startsWith("/selectedItem") ||
    location.pathname === "/cart";

  // getting data from store
  const { cart, totalPrice, totalQuantity } = useSelector(
    (state) => state.action
  );

  const data = useSelector((state) => state.auth.user);
  const user = data?.user;
  const login = data?.login;

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const forMobileNavigate = [
    { title: "Profile", path: "profile" },
    { title: "My Orders", path: "orders" },
  ];

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Shop", path: "/shop" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    // { title: "Blog", path: "/blogs" },
  ];

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropDownOpen(false);
    }
  };

  useEffect(() => {
    if (windowWidth > 1024) {
      setIsMenuOpen(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsDropDownOpen(false);
    setIsOpen(false);
    window.scroll(0, 0);
  };

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUserAsync());
    closeMenu();
    handleLinkClick();
  };

  const handleLogin = () => {
    navigate("/login");
    handleLinkClick();
  };

  return (
    <>
      <nav
        className={`navbar absolute top-0 w-full py-0 border-b ${
          showNav1 ? "bg-transparent" : "bg-[#2d2d2dd4]"
        }  ${isModalOpen ? "opacity-40" : ""} transition-all `}
      >
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl px-3 sm:px-6 xl:px-0 mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between ">
            <div className="flex items-center justify-between border-0 lg:border-r border-[#A4A3A2] py-4">
              {/* -------------- BRAND LOGO -------------- */}
              <Link
                to="/"
                onClick={handleLinkClick}
                className="flex items-center gap-0.5 md:pr-8"
              >
                <img
                  className="w-auto h-10 sm:h-16"
                  src={"https://cdn.shopify.com/s/files/1/0649/1399/8024/files/22.9_KB_Size_Googly_white_Logo.png?v=1718027791"}
                  alt="Googly Logo"
                />
              </Link>

              {/* -------------- HAMBURGER BUTTON FOR MOBILE VIEW -------------- */}
              {!isOpen ? (
                <div className="flex lg:hidden">
                    {/* SEARCH */}
                <Link
                  onClick={openModal}
                  className="px-0 pb-0.5 text-lg font-medium tracking-wide text-white rounded-xl"
                >
                  <IoSearchOutline size={22} />
                </Link>
                  <Link
                    to="/cart"
                    onClick={() => window.scroll(0, 0)}
                    className="relative mx-4 sm:mx-2 md:mx-3 xl:mx-3"
                  >
                    <span className="relative -z-50">
                      <BsHandbag size={22} className="text-white" />
                      <span className="absolute -right-1 -top-2.5 rounded-full bg-[#DEC344] px-1 py-0 text-xs text-black">
                        {totalQuantity}
                      </span>
                    </span>
                  </Link>

                  <button
                    onClick={toggleMenu}
                    type="button"
                    className="focus:outline-none text-gray-100"
                    aria-label="toggle menu"
                  >
                    {isOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="28"
                        height="28"
                        fill="currentColor"
                      >
                        <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                      >
                        <path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              ) : null}
            </div>

            {/* -------------- MENU FOR LARGE VIEW -------------- */}
            <div className="hidden lg:flex lg:items-center">
              {navigation.map((data, index) => (
                <Link
                  key={index}
                  to={data.path}
                  onClick={() => window.scroll(0, 0)}
                  className="button_navbar poppin px-0 pt-2 pb-0.5 mx-4 sm:mx-2 md:mx-5 xl:mx-5 text-lg font-medium tracking-wide text-white rounded-xl"
                >
                  {data.title}
                </Link>
              ))}

              {/* CART & SEARCH */}
              <div className="cart_search flex ml-3 pl-3 py-7 items-center border-l border-[#A4A3A2]">
                {/* SEARCH */}
                <Link
                  onClick={openModal}
                  className="px-0 pt-2 pb-0.5 mx-4 sm:mx-2 md:mx-3 xl:mx-3 text-lg font-medium tracking-wide text-white rounded-xl"
                >
                  <IoSearchOutline size={22} />
                </Link>

                {/* CART */}
                <Link
                  to="/cart"
                  onClick={() => window.scroll(0, 0)}
                  className="relative mx-4 sm:mx-2 md:mx-3 xl:mx-3"
                >
                  <span className="relative -z-50">
                    <BsHandbag size={22} className="text-white" />
                    <span className="absolute -right-1 -top-2.5 rounded-full bg-[#DEC344] px-1 py-0 text-xs text-black">
                      {totalQuantity}
                    </span>
                  </span>
                </Link>

                {windowWidth > 426 &&
                  (login && user ? (
                    <div className="dropdown relative pl-6" ref={dropdownRef}>
                      <button
                        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                        className="text-md font-medium tracking-wide text-gray-100 rounded-xl"
                      >
                        <span className="flex items-center capitalize font-medium text-[1.05rem]">
                          {user?.name}
                          {isDropDownOpen ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </span>
                      </button>

                      {isDropDownOpen && (
                        <div className="absolute right-0 z-20 w-40 py-2 mt-3 overflow-hidden origin-top-right bg-white rounded-xl shadow-xl">
                          <Link
                            to="/profile"
                            onClick={handleLinkClick}
                            className="block px-4 py-3 w-full text-left text-sm text-gray-800 font-medium capitalize hover:text-white hover:bg-[#252525cd]"
                          >
                            Profile
                          </Link>

                          <hr className="border-gray-200" />

                          <Link
                            to="/orders"
                            onClick={handleLinkClick}
                            className="block px-4 py-3 w-full text-left text-sm text-gray-800 font-medium capitalize hover:text-white hover:bg-[#252525cd]"
                          >
                            My Order
                          </Link>

                          <hr className="border-gray-200" />

                          <button
                            onClick={handleLogout}
                            className="block px-4 py-3 w-full text-left text-sm text-gray-800 font-medium capitalize hover:text-white hover:bg-[#252525cd]"
                          >
                            Sign out
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to="/login" className="px-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-circle-user-round text-gray-200"
                      >
                        <path d="M18 20a6 6 0 0 0-12 0" />
                        <circle cx="12" cy="10" r="4" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* -------------- MENU FOR MOBILE VIEW -------------- */}
          <div
            className={`lg:hidden ${
              isOpen ? "block" : "hidden"
            } absolute inset-x-0 top-0 w-full mt-0 px-6 pt-6 pb-4 transition-all duration-300 ease-in-out bg-[#1e1e1eec] lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              {/* ------------- CLOSE BUTTONS ------------- */}
              <div className="button flex justify-end items-center mr-2">
                <button
                  onClick={toggleMenu}
                  type="button"
                  className="focus:outline-none text-gray-100"
                  aria-label="toggle menu"
                >
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="28"
                      height="28"
                      fill="currentColor"
                    >
                      <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"></path>
                    </svg>
                  )}
                </button>
              </div>

              {/* ------------- NORMAL ROUTES ------------- */}
              {navigation.map((data, index) => (
                <Link
                  key={index}
                  to={data.path}
                  onClick={handleLinkClick}
                  className="px-0 py-5 mx-4 xl:mx-6 text-lg text-center font-medium tracking-wide text-gray-100"
                >
                  {data.title}
                </Link>
              ))}

              {login && user && isOpen
                ? forMobileNavigate.map((data, index) => (
                    <Link
                      key={index}
                      to={`${data.path}`}
                      className="px-0 py-5 mx-4 xl:mx-6 text-lg text-center font-medium tracking-wide text-gray-100"
                      onClick={handleLinkClick}
                    >
                      {data.title}
                    </Link>
                  ))
                : null}

              {/* LOGOUT BUTTON */}
              {login && user && isOpen && (
                <button
                  onClick={handleLogout}
                  className="px-0 py-5 mx-4 xl:mx-6 text-lg text-center font-medium tracking-wide text-gray-100"
                >
                  Logout
                </button>
              )}

              {/* LOGIN BUTTON */}
              {!login && !user && isOpen && (
                <button
                  onClick={handleLogin}
                  className="px-0 py-5 mx-4 xl:mx-6 text-lg text-center font-medium tracking-wide text-gray-100"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <SearchModal
        isOpen={isOpen}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default Header;
