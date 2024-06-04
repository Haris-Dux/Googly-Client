import LoaderGif from "../assets/FYB Loader GIF.gif";

const Loader = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 overflow-hidden flex justify-center items-center max-w-full min-h-screen bg-black"
      style={{ zIndex: "1000" }}
    >
      <div className="flex justify-center bg-black items-center min-h-screen">
        <img className="w-96 h-96" src={LoaderGif} alt="Loader" />
      </div>
    </div>
  );
};

export default Loader;
