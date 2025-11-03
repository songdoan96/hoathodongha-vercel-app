function Loading({ fullScreen }: { fullScreen?: boolean }) {
  return (
    <div
      className={`${
        fullScreen ? "h-screen" : "h-full"
      } w-full flex flex-col justify-center items-center text-red-600`}
    >
      {/* <Loader color="#155DFC" className="animate-spin" /> */}
      <div className="loader"></div>
      {fullScreen && (
        <h1 className="mt-8 font-bold uppercase">Cố lên cố lên, sắp tới rồi sắp tới rồi !</h1>
      )}
    </div>
  );
}

export default Loading;
