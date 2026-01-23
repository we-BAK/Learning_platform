import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";

export default function Sharedlayout() {
  const location = useLocation();
  // Hide footer on all therapist pages
  const hideFooter = location.pathname.startsWith("/therapist");

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />

      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}
