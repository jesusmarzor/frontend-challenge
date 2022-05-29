import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from './../assets/img/logo.png';
import { useTranslation } from "react-i18next";

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  const { t } = useTranslation();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img className="w-full" src={logo}/>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block uppercase">App Venped</span>
            </h3>
            <ul className="mt-3">

              {/* Products */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${(pathname === '/' || pathname.includes('products')) && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/products"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    (pathname === '/' || pathname.includes('products')) && 'hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center">
                  <svg x="0px" y="0px" width="30px" height="30px" viewBox="0 0 48 48">
                    <path className="fill-indigo-500" d="M43,46H5c-2.209,0-4-1.791-4-4l4-24c0.678-3.442,2.668-4,4.877-4h2.652  C14.037,7.052,18.602,2,24,2s9.963,5.052,11.471,12h2.652c2.209,0,4.199,0.558,4.877,4l4,24C47,44.209,45.209,46,43,46z M24,4  c-4.352,0-8.045,4.178-9.418,10h18.837C32.045,8.178,28.353,4,24,4z M41,18c-0.308-1.351-0.957-2-2.37-2h-2.828  C35.925,16.976,36,17.975,36,19c0,0.552-0.447,1-1,1s-1-0.448-1-1c0-1.027-0.069-2.031-0.201-3H14.201C14.07,16.969,14,17.973,14,19  c0,0.552-0.447,1-1,1s-1-0.448-1-1c0-1.025,0.075-2.024,0.197-3H9.369C7.957,16,7.309,16.649,7,18L3,42c0,1.104,0.896,2,2,2h38  c1.104,0,2-0.896,2-2L41,18z"/>
                  </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      {t('Catalogue')}
                    </span>
                  </div>
                </NavLink>
              </li>

            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;