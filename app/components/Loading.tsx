function Loading({ fullScreen }: { fullScreen?: boolean }) {
  return (
    <div
      className={`${
        fullScreen ? "h-screen" : "h-full"
      } w-full flex justify-center items-center text-red-600`}
    >
      {/* <Loader color="#155DFC" className="animate-spin" /> */}
      <div className="loader"></div>
    </div>
  );
}

export default Loading;
