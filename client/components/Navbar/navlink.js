/* eslint-disable valid-jsdoc */
import {useRouter} from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';

/**
 *
 * @param {*} param0
 * @returns
 */
function NavLink({href, activeClassName, children}) {
  const router = useRouter();

  return (
    <Link href={href}>
      <a className={router.asPath.includes(href) ? activeClassName : ''}>
        {children}
      </a>
    </Link>
  );
}

export default NavLink;
