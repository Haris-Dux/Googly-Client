
const Loader2 = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 overflow-hidden flex justify-center items-center max-w-full min-h-screen bg-white"
      style={{ zIndex: "1000" }}
    >
      <div className="flex justify-center items-center min-h-screen">
        <img className="w-auto h-16 sm:h-16" src={"https://cdn.shopify.com/s/files/1/0649/1399/8024/files/25.3_KB_Size_Googly_Logo.png?v=1718027480"} alt="Loading" />
      </div>
    </div>
  );
};

export default Loader2;
