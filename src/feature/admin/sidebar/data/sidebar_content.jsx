import { CgProfile } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { PiCity } from "react-icons/pi";
import { FaSwimmingPool } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";

const sidebar_content = [
  {
    name: "Dashboard",
    type: "button",
    icon: <CgProfile />,
    link: "/admin",
    role: ["ADMIN", "EMPLOYEE"],
  },
  {
    name: "Managed City",
    type: "button",
    icon: <PiCity />,
    link: "/admin/managed_city",
    role: ["ADMIN", "EMPLOYEE"],
  },
  {
    name: "Amenities",
    type: "group",
    icon: <FaSwimmingPool />,
    role: ["ADMIN", "EMPLOYEE"],
    children: [
      {
        name: "Amenity List",
        icon: <FaSwimmingPool />,
        link: "/admin/amenity_list",
      },
      {
        name: "Create New Amenity",
        icon: <FaPlus />,
        link: "/admin/new_amenity",
      },
    ],
  },
  {
    name: "Category",
    type: "group",
    icon: <TbCategory />,
    role: ["ADMIN", "EMPLOYEE"],
    children: [
      {
        name: "Category List",
        icon: <TbCategory />,
        link: "/admin/category_list",
      },
      {
        name: "Create New Category",
        icon: <FaPlus />,
        link: "/admin/new_category",
      },
    ],
  },
];

export default sidebar_content;
