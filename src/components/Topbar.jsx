import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <nav className="md:hidden fixed inset-0 h-16 p-6 md:p-8 lg:p-12 flex justify-between items-center glassmorphism z-10">
      <div className="bg-gray-200 rounded-sm font-extrabold w-20 h-10 flex justify-center items-center cursor-pointer">
        <a href="/">LOGO</a>
      </div>
      <ul className="flex gap-4">
        {["about", "ideas", "CV"].map((item, index) => (
          <li className="capitalize text-lg font-semibold" key={index}>
            <Link to={`/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Topbar;
