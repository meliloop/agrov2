import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import {Button, Drawer, List, ListItem, ListItemText} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuHome from '@material-ui/icons/Home';
import { IconBackArrow } from '../../components/UI/Icon/Icon';
import '../../assets/scss/main.scss';

const ListItemLink = (props) => <ListItem button component="a" {...props} />;

const Layout = (props) => {
    let history = useHistory();
    const navState= useSelector(state => state.nav);
    const authState= useSelector(state => state.auth);
    const [leftMenu, setLeftMenu] =   useState(false);
        
    const toggleDrawer = (open) => (event) => {
        if( event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift') )
            return;

        setLeftMenu(open);
    };
        
    return (
        <div className={navState.currentContainer}>
            {authState.userId ?
            <React.Fragment key="left">
                {navState.currentContainer !== 'search' ?
                <div className="header">
                    <Button onClick={() => history.goBack()} className="back-arrow">
                        <IconBackArrow />
                    </Button>
                    <Link to="/" className="home-button">
                        <MenuHome color="primary" />
                    </Link>
                    <Button onClick={toggleDrawer(true)} className="main-menu">
                        <MenuIcon color="primary" />
                    </Button>
                </div>:
                <div className="header">
                    <Button onClick={toggleDrawer(true)}>
                        <MenuIcon color="primary" />
                    </Button>
                </div>}
            

                <Drawer anchor="left" open={leftMenu} onClose={toggleDrawer(false)}>
                    <div
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <List>
                            <ListItemLink href="/" key="home">
                                <ListItemText primary="Inicio" />
                            </ListItemLink>
                            {localStorage.getItem('token') ?
                            <>
                                <ListItemLink href="/mi-cuenta" key="micuenta">
                                    <ListItemText primary="Mi Cuenta" />
                                </ListItemLink>
                                <ListItemLink href="/logout" key="logout">
                                    <ListItemText primary="Salir" />
                                </ListItemLink>
                            </>
                                :
                            <>
                                <ListItemLink href="/login" key="login">
                                    <ListItemText primary="Ingresar" />
                                </ListItemLink>
                                <ListItemLink  href="/registracion" key="registracion">
                                    <ListItemText primary="Registrarse" />
                                </ListItemLink>
                            </>}
                        </List>
                    </div>
                </Drawer>
            </React.Fragment>:
            <React.Fragment key="left">
                {navState.currentContainer !== 'landing' &&
                <div className="header">
                    <Button onClick={() => history.goBack()} className="back-arrow">
                        <IconBackArrow />
                    </Button>
                </div>}
            </React.Fragment>}

            <main className="content content--list">
                {props.children}
            </main>
        </div>
    )
};

export default Layout;