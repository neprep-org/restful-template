import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div className=" flex justify-center items-center">
      <img
        src={logo}
        alt="Exam's logo"
        height={150}
        width={200}
        className="ml-6"
      />
    </div>
  );
};

export default Logo;
