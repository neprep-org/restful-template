import SideBar from "../components/sidebar";
import { DashboardProvider } from "../context/DashboardContext";
import { columns, data } from "../utils/faker";
import Table from "../components/table";
import {
  IoIosSpeedometer,
  IoMdPeople,
  IoIosNotifications,
} from "react-icons/io";

const Dashboard = () => {
  return (
    <DashboardProvider>
      <div className="h-screen w-full flex flex-row">
        <SideBar />
        <div className="h-[100%] w-[15%]"></div>
        <div className="w-[85%] h-[100%] flex flex-col justify-center items-center">
          {/* Dashboard */}
          <div className="flex justify-around w-full mb-8">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center w-64">
              <IoIosSpeedometer className="text-4xl text-blue-500 mb-4" />
              <p className="text-2xl font-bold">Total Users</p>
              <p className="text-xl">1000</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center w-64">
              <IoMdPeople className="text-4xl text-green-500 mb-4" />
              <p className="text-2xl font-bold">Active Users</p>
              <p className="text-xl">750</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center w-64">
              <IoIosNotifications className="text-4xl text-red-500 mb-4" />
              <p className="text-2xl font-bold">Notifications</p>
              <p className="text-xl">10</p>
            </div>
          </div>

          {/* Table */}
          <div className="w-[90%]">
            <Table data={data} columns={columns} />
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
