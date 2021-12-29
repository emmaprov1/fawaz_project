import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { signOut } from 'next-auth/client';

const Header: FC = () => {
  const router = useRouter();

  let links = [
    { href: '/', name: 'dashboard' },
    { href: '/appointment', name: 'appointment' },
    { href: '/see-a-doctor', name: 'doctors' },
    { href: '/medical-records', name: 'medical records' },
    { href: '/symptom-checker', name: 'symptom checker' },
    { href: '/messages', name: 'messages' },
    { href: '/payments', name: 'payments' },
  ];

  if (router.pathname.startsWith('/hospital'))
    links = [
      { href: '/hospital', name: 'dashboard' },
      { href: '/hospital/signup-doctors', name: 'appointment' },
    ];

  if (router.pathname.startsWith('/doctor'))
    links = [
      { href: '/doctor', name: 'dashboard' },
      { href: '/doctor/appointment', name: 'appointment' },
    ];

  return (
    <header className={`header`}>
      <div className="header-logo">
        <Link href="/">
          <a>
            <Image
              src="/images/icons/RiDokita.png"
              height={40}
              width={202}
              alt="logo"
            />
          </a>
        </Link>
      </div>

      <div className="header-nav">
        <ul className="header-list">
          {links.map(cur => (
            <li
              className={`header-item ${
                router.pathname === cur.href ? 'header-item-active' : ''
              }`}
              key={cur.href}
            >
              <Link href={cur.href}>
                <a className="header-link">
                  <svg>
                    <use
                      xlinkHref={`/images/icons/icons.svg#icon-${cur.name
                        .split(' ')
                        .join('-')}`}
                    />
                  </svg>
                  <span className="">{cur.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="header-list header-list-spec">
          <li
            className={`header-item ${
              router.pathname === '/forum' ? 'header-item-active' : ''
            }`}
          >
            <Link href="/forum">
              <a className="header-link">
                <svg>
                  <use xlinkHref={`/images/icons/icons.svg#icon-chat`} />
                </svg>
                <span>Community Forum</span>
              </a>
            </Link>
          </li>

          <li
            className={`header-item ${
              router.pathname === '/help' ? 'header-item-active' : ''
            }`}
          >
            <Link href="/help">
              <a className="header-link">
                <svg>
                  <use xlinkHref={`/images/icons/icons.svg#icon-help`} />
                </svg>
                <span>help</span>
              </a>
            </Link>
          </li>

          <li className="header-item header-item-spec">
            <button
              className="header-link"
              onClick={() => {
                signOut();
              }}
            >
              <svg>
                <use xlinkHref={`/images/icons/icons.svg#icon-logout`} />
              </svg>
              <span>logout</span>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
