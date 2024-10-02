const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="flex flex-col items-center">
        <div
          className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-solid"
          style={{ borderRightColor: "transparent" }}
        ></div>
        <h3 className="text-3xl py-5">Loading...</h3>
      </div>
    </div>
  );
};

export default LoadingAnimation;
