import { useSelector } from "react-redux";
import ChangeProfilePhoto from "../components/ChangeProfilePhoto";
import LogOut from "../components/LogOut";
import { LuCircleUserRound } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Myaccount = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()

  const redirectToUpdateDetails = () => {
    navigate("/update-user-details")
  }
  return (
    <>
      <div className="w-full h-fit py-6 shadow-md bg md:flex">
        <div className=" w-full h-40 md:w-[30%] md:flex-col md:items-center flex justify-around items-center">
          {user.avtar ? (
            <img src={user.avtar} className="h-20 w-20 md:h-30 md:w-30 rounded-full" alt="" />
          ) : (
            <LuCircleUserRound className="h-20 w-20 text-gray-500" />
          )}

          {user.email ? (
            <div className="flex justify-center items-center gap-3 md:hidden">
              <ChangeProfilePhoto /> <FiEdit onClick={redirectToUpdateDetails} />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className=" w-full md:w-[70%]  p-6 flex justify-between">
          <div className=""> 
          <h1 className="text-2xl font-bold">{user.name.toUpperCase()}</h1>
          <p>Mobile : {user.mobile}</p>
          <p className="text-sm">Email : {user.email}</p>
          <p className="text-sm ">address : {user.address}</p>
          <div className="md:hidden"><LogOut  /></div>
          
          </div>
         
          <div className="hidden md:block">
          {user.email ? (
            <div className="flex justify-center items-center gap-3">
             <FiEdit onClick={redirectToUpdateDetails} /> <ChangeProfilePhoto />   <LogOut />
            </div>
          ) : (
            ""
          )}
          </div>
        </div>
      </div>

    
    </>
  );
};

export default Myaccount;
