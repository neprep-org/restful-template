import avatar from "../assets/avatar.png";
import { useAuth } from "../context/AuthContext";
import { FaChartBar, FaSignOutAlt, FaStar, FaUser } from "react-icons/fa";
import { IconContext } from "react-icons";
import TruncatedText from "./clippedText";
import SideBarButton from "./sidebarButton";
import { useDashboard } from "../context/DashboardContext";
import DashboardLogo from "./dashboardLogo";

const SideBar = () => {
  const { user, logout } = useAuth();
  const { activeButton, setActiveButton } = useDashboard();

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="h-[100%] w-[15%] border-r border-primary flex flex-col justify-between p-4 bg-primary shadow-lg shadow-primary-dark fixed">
      <div>
        <div className="flex flex-col items-center mb-6 ">
          <DashboardLogo />
          <div className="border-t border-white w-[70%] mt-12 mb-6 opacity-50"></div>
        </div>
        <div className="flex flex-col items-center mt-12">
          <div className=" flex flex-col justify-center items-center w-full">
            <IconContext.Provider value={{ size: "1.5em" }}>
              <SideBarButton
                isActive={activeButton === "Entity 1"}
                onClick={() => handleButtonClick("Entity 1")}
              >
                <FaUser className="inline mr-4" />
                Users
              </SideBarButton>
              <SideBarButton
                isActive={activeButton === "Entity 2"}
                onClick={() => handleButtonClick("Entity 2")}
              >
                <FaChartBar className="inline mr-4" />
                Statistics
              </SideBarButton>
              <SideBarButton
                isActive={activeButton === "Entity 3"}
                onClick={() => handleButtonClick("Entity 3")}
              >
                <FaStar className="inline mr-4" />
                Others
              </SideBarButton>
            </IconContext.Provider>
          </div>
          <div className="border-t border-white w-[70%] mt-16 mb-6 opacity-50"></div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={avatar}
          alt="User's Avatar"
          className="h-24 w-24 rounded-full "
        />
        <TruncatedText text={user.email} length={15} />
        <IconContext.Provider value={{ size: "1.5em" }}>
          <button
            className={`w-full px-4 py-2 my-2 rounded bg-white text-primary hover:bg-slate-100 hover:cursor-pointer`}
            onClick={logout}
          >
            <FaSignOutAlt className="inline mr-2" /> Log Out
          </button>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default SideBar;
