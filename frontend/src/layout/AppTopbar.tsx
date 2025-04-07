/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '@/types/layout';
import { LayoutContext } from './context/layoutcontext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { BASEURL } from '@/conflg/services/apiUrl';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const router = useRouter()
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));


    const handleLogout = async () => {
        try {
          // Call the logout endpoint which should clear the cookie.
          await axios.get(`${BASEURL}auth/logout`, { withCredentials: true });
          // After logout, navigate to the login page.
          router.push('/login');
        } catch (error) {
          console.error('Logout error:', error);
        }
      };
    

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
            
                <span>AMIR RAI</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="  p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
            <button type="button" className="p-link layout-topbar-button" onClick={handleLogout}>
      <i className="pi pi-sign-out"></i>
      <span>Logout</span>
    </button>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
