import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {Button, Drawer, List, ListItem, ListItemText} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import '../../assets/scss/main.scss';
import { IconBackArrow } from '../../components/UI/Icon/Icon';

const ListItemLink = (props) => <ListItem button component="a" {...props} />;

const Layout = (props) => {
    let history = useHistory();
    const navState= useSelector(state => state.nav);
    const [leftMenu, setLeftMenu] =   useState(false);
        
    const toggleDrawer = (open) => (event) => {
        if( event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift') )
            return;

        setLeftMenu(open);
    };

    return (
        <>
            <React.Fragment key="left">
                {navState.currentContainer !== 'single' ?
                <Button onClick={toggleDrawer(true)}>
                    <MenuIcon color="primary" />
                </Button>:
                <Button onClick={() => history.goBack()}>
                    <IconBackArrow />
                </Button>}

                <Drawer anchor="left" open={leftMenu} onClose={toggleDrawer(false)}>
                    <div
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <List>
                            <ListItemLink href="/" key="home">
                                <ListItemText primary="Home" />
                            </ListItemLink>
                            {localStorage.getItem('token') ?
                            <>
                                <ListItemLink href="/mi-cuenta" key="micuenta">
                                    <ListItemText primary="Mi Cuenta" />
                                </ListItemLink>
                                <ListItemLink href="/logout" key="logout">
                                    <ListItemText primary="Logout" />
                                </ListItemLink>
                            </>
                                :
                            <>
                                <ListItemLink href="/login" key="login">
                                    <ListItemText primary="Login" />
                                </ListItemLink>
                                <ListItemLink  href="/registracion" key="registracion">
                                    <ListItemText primary="Registración" />
                                </ListItemLink>
                            </>}
                        </List>
                    </div>
                </Drawer>
            </React.Fragment>

            <main className="content">
                {props.children}
            </main>
        </>
    )
};

export default Layout;