/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types/layout';
import { useAuth } from '@/context/UserContext'; 

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const { user } = useAuth(); 

    const model: AppMenuItem[] = [
        // {
        //     label: 'Home',
        //     items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        // }
    ];

    if (user?.role === 'admin') {
        model.push({
            label: 'Admin',
            items: [
                { label: ' Orders', icon: 'pi pi-fw pi-list', to: '/orders' },
                { label: 'Users', icon: 'pi pi-fw pi-users', to: '/member/admin' },
                { label: 'Products', icon: 'pi pi-fw pi-box', to: '/products' }
            ]
        });
    }

    if (user?.role === 'manager') {
        model.push({
            label: 'Manager',
            items: [
                { label: 'Team Orders', icon: 'pi pi-fw pi-users', to: '/orders' },
                { label: 'Products', icon: 'pi pi-fw pi-box', to: '/products' }
            ]
        });
    }

    if (user?.role === 'employee') {
        model.push({
            label: 'Employee',
            items: [
                { label: 'My Orders', icon: 'pi pi-fw pi-shopping-cart', to: '/orders' },
                { label: 'Shop Products', icon: 'pi pi-fw pi-shopping-bag', to: '/products' }
            ]
        });
    }

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? (
                        <AppMenuitem item={item} root={true} index={i} key={item.label} />
                    ) : (
                        <li className="menu-separator" key={`sep-${i}`}></li>
                    );
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
