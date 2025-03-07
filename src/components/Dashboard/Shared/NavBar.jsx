import React from "react";
import useAuth from "../../../hooks/useAuth";
import ThemeToggle from "../../ThemeToggle";

function NavBar() {
  const { user } = useAuth();

  return (
    <div className="px-6 py-3 flex justify-end gap-4 items-center ">
      <div>
        <ThemeToggle />
      </div>
      <div className="flex items-center gap-4">
        <h5 className="font-medium text-lg text-white">{user?.displayName}</h5>
        <div>
          <img className="w-12 rounded-full" src={user?.photoURL} alt="" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
