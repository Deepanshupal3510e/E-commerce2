import React from "react";
import { CiShare1 } from "react-icons/ci";
import { useSelector } from "react-redux";
import useMobile from "../hooks/useMobile";
import { Link, useLocation, useNavigate } from "react-router-dom";
import isAdmin from "../utils/isAdmin";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation()
  return (
    <>
      <section
        className={` p-4 font-arial rounded-lg sticky top-24 max-h-[calc(100vh-100px)]`}
      >
        <section className="mt-4">
          <p className="text-center lg:font-bold lg:text-2xl bg-white  md:text-sm ">
            {user.name?.toUpperCase()}
          </p>
          <p className="lg:pl-10 md:text-sm ">
            Role : {user.role}{" "}
            <CiShare1
              onClick={() => navigate("/my-account")}
              className="ml-4 inline"
            />
          </p>
          <p className="lg:pl-10 md:text-[12px] ">Mobile : {user.mobile} </p>
        </section>

        {isAdmin(user.role) ? (
          <>
            <Link
              to={"/product-catogary"}
              className={` hover:bg-[#e0cb0b] text-sm  duration-200 p-2 mt-2 rounded-md block ${location.pathname == "/product-catogary" ? "bg-[#e0cb0b]" : "bg-neutral-300"}`}
            >
              Catogery
            </Link>
            <Link
              to={"/sub-catogary"}
              className={` hover:bg-[#e0cb0b] text-sm  duration-200 p-2 mt-2 rounded-md block ${location.pathname == "/sub-catogary" ? "bg-[#e0cb0b]" : "bg-neutral-300"}`}
            >
              Sub Catogary
            </Link>
            <Link
              to={"/upload-products"}
              className={` hover:bg-[#e0cb0b] text-sm  duration-200 p-2 mt-2 rounded-md block ${location.pathname == "/upload-products" ? "bg-[#e0cb0b]" : "bg-neutral-300"}`}
            >
              Upload Product
            </Link>{" "}
            <Link
              to={"/products"}
              className={` hover:bg-[#e0cb0b] text-sm  duration-200 p-2 mt-2 rounded-md block ${location.pathname == "/products" ? "bg-[#e0cb0b]" : "bg-neutral-300"}`}
            >
              Product
            </Link>
          </>
        ) : (
          ""
        )}

        <Link
          to={"/my-cart"}
          className={` hover:bg-[#e0cb0b] text-sm  duration-200 p-2 mt-2 rounded-md block ${location.pathname == "/my-cart" ? "bg-[#e0cb0b]" : "bg-neutral-300"}`}
        >
          cart
        </Link>
        <Link
          to={"/my-orders"}
          className={` hover:bg-[#e0cb0b] text-sm  duration-200 p-2 mt-2 rounded-md block ${location.pathname == "/my-orders" ? "bg-[#e0cb0b]" : "bg-neutral-300"}`}
        >
          My Orders
        </Link>
        <Link
          to={"/my-wishlist"}
          className={` hover:bg-[#e0cb0b] text-sm  duration-200 p-2 mt-2 rounded-md block ${location.pathname == "/my-wishlist" ? "bg-[#e0cb0b]" : "bg-neutral-300"}`}
        >
          My Wishlist
        </Link>
        <Link
          to={"/my-address"}
          className={` hover:bg-[#e0cb0b] text-sm  duration-200 p-2 mt-2 rounded-md block ${location.pathname == "/my-address" ? "bg-[#e0cb0b]" : "bg-neutral-300"}`}
        >
          Add Address
        </Link>
      </section>
    </>
  );
};

export default Dashboard;
