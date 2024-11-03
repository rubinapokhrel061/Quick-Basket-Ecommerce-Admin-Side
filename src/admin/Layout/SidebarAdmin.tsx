import { useEffect, useState } from "react";
import { TbCategoryPlus } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../Store/hooks";
import { fetchOrders, fetchProducts, fetchUsers } from "../Store/dataSlice";
import { AiFillEdit } from "react-icons/ai";
import { AiFillProduct } from "react-icons/ai";

const SidebarAdmin = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
    dispatch(fetchUsers());
  }, []);

  return (
    <aside
      id="sidebar"
      className={`fixed h-[90vh] bg-[#242424] py-6 transition-all duration-500 ease-in-out ${
        isExpanded ? "w-80" : "w-20"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="px-5 h-full flex flex-col justify-between space-y-10">
        <ul className="space-y-2 pb-2">
          <li>
            <NavLink
              to="/user-details"
              className="flex items-center font-bold p-2 rounded-lg transition-colors duration-300 bg-[#616161] hover:bg-[#474747] text-white"
            >
              <FaRegUser className="w-6 h-6 transition-colors  text-[#EEEEEE] hover:text-[#F5F5F5] duration-300" />
              {isExpanded && (
                <span className="ml-5 text-xl transition-colors text-[#EEEEEE] hover:text-[#F5F5F5] duration-300">
                  User Details
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/product-details"
              className="flex items-center font-bold p-2 rounded-lg transition-colors duration-300 bg-[#616161] hover:bg-[#474747] text-white"
            >
              <AiFillProduct className="w-6 h-6 transition-colors  text-[#EEEEEE] hover:text-[#F5F5F5] duration-300" />
              {isExpanded && (
                <span className="ml-5 text-xl transition-colors text-[#EEEEEE] hover:text-[#F5F5F5] duration-300">
                  Product Details
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category-details"
              className="flex items-center font-bold p-2 rounded-lg transition-colors duration-300 bg-[#616161] hover:bg-[#474747] text-white"
            >
              <TbCategoryPlus className="w-6 h-6 transition-colors  text-[#EEEEEE] hover:text-[#F5F5F5] duration-300" />
              {isExpanded && (
                <span className="ml-5 text-xl transition-colors text-[#EEEEEE] hover:text-[#F5F5F5] duration-300">
                  Category Details
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/order-details"
              className="flex items-center font-bold p-2 rounded-lg transition-colors duration-300 bg-[#616161] hover:bg-[#474747] text-white"
            >
              <AiFillEdit className="w-6 h-6 transition-colors  text-[#EEEEEE] hover:text-[#F5F5F5] duration-300" />
              {isExpanded && (
                <span className="ml-5 text-xl transition-colors text-[#EEEEEE] hover:text-[#F5F5F5] duration-300">
                  Order Details
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
