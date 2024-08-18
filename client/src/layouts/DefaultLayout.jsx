import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

// ######################################################################
// Navbar içeren bir layout componenti.
// ######################################################################

function DefaultLayout() {
  return (
    <div className="bg-themeLightGrey  flex flex-col ">
      <ResponsiveAppBar />
      <div className="mx-10 mt-6 ">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
