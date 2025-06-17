import { NAV_ITEMS } from "@/constants/data";

import { Link } from "react-router";

const NavMenu = () => {
  return (
    <ul className="flex items-center justify-center gap-x-7">
      {NAV_ITEMS.map((item) => (
        <li key={item.link}>
          <Link
            className="text-subtitle2 text-white hover:text-green-400 font-[500]"
            to={item.link}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
