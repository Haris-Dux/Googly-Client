import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateuserAsync, userSessionAsync } from "../../features/authSlice";
import toast from "react-hot-toast";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userID = user?.user?.id;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const [loginLoading, setLoginLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.user?.name || "",
    email: user?.user?.email || "",
    phone: user?.user?.phone || "",
    address: user?.user?.address || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.user?.name || "",
        email: user?.user?.email || "",
        phone: user?.user?.phone || "",
        address: user?.user?.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newFormData = {
        ...prevData,
        [name]: value,
      };

      // Check if any form data has changed
      const isChanged = Object.keys(newFormData).some(
        (key) => newFormData[key] !== (user?.user[key] || "")
      );

      setHasChanges(isChanged);

      return newFormData;
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginLoading(true);

    if (!hasChanges) {
      toast.error("No changes made");
      setLoginLoading(false);
      return;
    }

    const id = userID;

    const updatedFields = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== user?.user[key]) {
        updatedFields[key] = formData[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      toast.error("No changes made");
      setLoginLoading(false);
      return;
    }

    dispatch(updateuserAsync({ id, ...updatedFields })).then((res) => {
      if (res.payload.message === "Update Successfull") {
        dispatch(userSessionAsync());
        toast.success("Updated");
        // setLoginLoading(false);
        setHasChanges(false);
      }
    });
    setLoginLoading(false);
  };

  return (
    <>
      <section className="pt-24 md:pt-32 xl:pt-24 p-4 bg-[#F5F5F5]">
        <div className="xl:max-w-4xl lg:max-w-4xl max-w-xl mx-auto min-h-screen flex items-center">
          <div className="grid lg:grid-cols-1 gap-8 w-full">
            {/* HEADER */}
            <div className="header mb-2">
              <h2 className="mb-3 Noto text-3xl font-bold text-gray-800">
                Personal Information
              </h2>
              <p className="text-md text-gray-800">
                Manage your name, password and account settings.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                {/* full name label */}
                <div className="sm:col-span-3">
                  <label
                    className="inline-block text-sm sm:text-lg font-semibold text-gray-800 mt-2.5"
                    htmlFor="af-account-full-name"
                  >
                    Full name:
                  </label>
                </div>

                {/* full name input fields */}
                <div className="sm:col-span-9">
                  <div className="sm:flex gap-3">
                    <input
                      className="bg-gray-50 mb-3 sm:mb-0 border border-gray-600 text-gray-900 sm:text-md rounded-md block w-full p-3 placeholder:text-gray-600 focus:shadow-lg focus:outline-none"
                      placeholder="Enter your Full Name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* full email label */}
                <div className="sm:col-span-3">
                  <label
                    className="inline-block text-sm sm:text-lg font-semibold text-gray-800 mt-2.5"
                    htmlFor="af-account-email"
                  >
                    Email:
                  </label>
                </div>

                {/* full email input fields */}
                <div className="sm:col-span-9">
                  <input
                    className="bg-gray-50 sm:mb-0 border border-gray-600 text-gray-900 sm:text-md rounded-md block w-full p-3 placeholder:text-gray-600 focus:shadow-lg focus:outline-none"
                    id="af-account-email"
                    placeholder="Enter Your Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-3">
                  <div className="inline-block">
                    <label
                      className="inline-block text-sm sm:text-lg font-semibold text-gray-800 mt-2.5"
                      htmlFor="af-account-phone"
                    >
                      Phone:
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-9">
                  <div className="sm:flex">
                    <input
                      className="bg-gray-50 sm:mb-0 border border-gray-600 text-gray-900 sm:text-md rounded-md block w-full p-3 placeholder:text-gray-600 focus:shadow-lg focus:outline-none"
                      id="af-account-phone"
                      placeholder="Enter Phone Number"
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    className="inline-block text-sm sm:text-lg font-semibold text-gray-800 mt-2.5"
                    htmlFor="af-account-bio"
                  >
                    Address:
                  </label>
                </div>

                <div className="sm:col-span-9">
                  <textarea
                    className="bg-gray-50 sm:mb-0 border border-gray-600 text-gray-900 sm:text-md rounded-md block w-full p-3 placeholder:text-gray-600 focus:shadow-lg focus:outline-none"
                    id="af-account-bio"
                    placeholder="Enter Your Address..."
                    rows={5}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-7 flex justify-end gap-x-2">
                {loginLoading ? (
                  <button className="w-40 h-12 items-center mx-auto text-white hover:bg-black bg-[#252525] flex justify-center tracking-wide">
                    <div
                      className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-white  rounded-full "
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`w-40 h-12 items-center mx-auto text-white ${hasChanges
                      ? "hover:bg-black bg-[#252525]"
                      : "bg-gray-400 cursor-not-allowed"
                      } flex justify-center tracking-wide`}
                    onClick={handleSubmit}
                    disabled={!hasChanges}
                  >
                    Save changes
                  </button>
                )}

                {/* <button
                type="submit"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white bg-[#EC72AF] hover:bg-[#f181b9]disabled:opacity-50 disabled:pointer-events-none"
              >
                Save changes
              </button> */}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
