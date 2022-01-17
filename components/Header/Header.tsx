import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

const Header: FC = () => {
  const { data } = useSession();

  const links = [
    {
      href: '/appointments',
      name: 'Appointments',
      icon: 'fas fa-calendar-check',
    },
    { href: '/visits-history', name: 'History', icon: 'fas fa-history' },
    {
      href: '/update-password',
      name: 'Update Password',
      icon: 'fas fa-unlock-alt',
    },
  ];

  const adminLinks = [
    { href: '/staffs', name: 'All staffs', icon: 'fas fa-user' },
    { href: '/create-staff', name: 'new staff', icon: 'fas fa-user-plus' },
  ];

  return (
    <header className={`header`}>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <Link href="/admin">
          <a className="sidebar-brand d-flex align-items-center justify-content-center">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">visitee</div>
          </a>
        </Link>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <Link href="/dashboard">
            <a className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Admin and Staff</div>

        {links.map(cur => (
          <li className="nav-item" key={cur.name}>
            <Link href={cur.href}>
              <a className="nav-link">
                <i className={cur.icon}></i>
                <span>{cur.name}</span>
              </a>
            </Link>
          </li>
        ))}

        {data.user.image === 'admin' && (
          <>
            <hr className="sidebar-divider" />

            <div className="sidebar-heading">Addons</div>

            {adminLinks.map(cur => (
              <li className="nav-item" key={cur.name}>
                <Link href={cur.href}>
                  <a className="nav-link">
                    <i className={cur.icon}></i>
                    <span>{cur.name}</span>
                  </a>
                </Link>
              </li>
            ))}
          </>
        )}

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-block">
          <button
            className="rounded-circle border-0 text-danger"
            onClick={() => signOut()}
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </ul>
    </header>
  );
};

export default Header;
