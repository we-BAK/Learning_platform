// Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ title, navItems }) => {
  const location = useLocation();

  return (
    <div className="w-64 bg-blue-50 p-4 shadow-md min-h-screen">
      <h2 className="text-xl font-bold mb-6 text-blue-800">{title}</h2>
      <nav>
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center space-x-2 p-2 rounded-md mb-2 transition-colors ${
              location.pathname === item.path
                ? "bg-blue-200 text-blue-800"
                : "text-gray-700 hover:bg-blue-100"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
