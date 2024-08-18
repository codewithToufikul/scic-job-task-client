import { Link, NavLink } from 'react-router-dom';
import navLogo from '../assets/logo.png';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useContext } from 'react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const handleLogOut = () =>{
    logoutUser()
      .then(() => {
        toast.success('Successfully logged out!');
      })
      .catch(error => {
        toast.error(error.message);
      });
  }

  const navLink = (
    <>
      <p>
        <NavLink
          className={({ isActive, isPending }) =>
            isActive
              ? "bg-[#dfd4c1] mr-6 text-white p-[6px] px-3 rounded-md  font-semibold text-lg"
              : isPending
              ? "pending"
              : "text-lg mr-6 font-bold"
          }
          to="/"
        >
          HOME
        </NavLink>
      </p>
      <p>
        <NavLink
          className={({ isActive, isPending }) =>
            isActive
              ? " bg-[#f99a00] mr-6 text-white p-[6px] px-3 rounded-md  font-semibold text-lg "
              : isPending
              ? "pending"
              : " text-lg mr-6   font-bold"
          }
          to="/product"
        >
          {" "}
          All PRODUCT
        </NavLink>
      </p>
      </>
  )
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLink}
          </ul>
        </div>
        <div className=' flex items-center gap-4'>
          <img src={navLogo} alt="Company Logo" className="h-12 w-auto" />
          <h2 className=' md:text-3xl text-lg font-semibold'>ProductPeak</h2>
        </div>
      </div>
      <div className="flex justify-end w-full gap-10">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          {navLink}
          </ul>
        </div>
        {
          user ? <div onClick={handleLogOut} className="navbar-end w-fit">
          <Link  className="btn bg-orange-400 text-lg font-medium text-white">Log Out !</Link>
        </div> : <div className="navbar-end w-fit">
          <Link to={'/login'} className="btn bg-blue-400 text-lg font-medium text-white">Sing In</Link>
        </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
