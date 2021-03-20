import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Register from './containers/Auth/Register/Register';
import Account from './containers/Account/Dashboard';
import AccountUpdate from './containers/Auth/Register/Register';
import Logout from './containers/Auth/Logout/Logout';
import Search from './containers/Search/Search';
import Member from './containers/Member/Member';
import Machine from './containers/Machine/Machine';
import MachineForm from './containers/Account/Machine/Form';
import Chat from './containers/Chat/Chat';
import Politicas from './containers/Politicas/Politicas';
import Terminos from './containers/Terminos/Terminos';
import Landing from './containers/Landing/Landing';

import * as actions from './store/actions/index';

const authGuard  = (Component) => () => localStorage.getItem("token")   ?   <Component /> : <Redirect to="/login" />;
const loggedGuard= (Component) => () => localStorage.getItem("token")   ?   <Redirect to="/mi-cuenta" /> : <Component />;

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    return (
      <>
        <Layout>
          <Switch>
            <Route path="/registracion" render={loggedGuard(Register)} />
            <Route path="/login" render={loggedGuard(Auth)} />
            <Route path="/logout" render={authGuard(Logout)} />
            <Route path="/mi-cuenta/agregar" render={authGuard(MachineForm)} />
            <Route
              path='/mi-cuenta/chat/usuario/:usuarioId'
              render={(props) => localStorage.getItem("token") ?  <Chat {...props} /> : <Redirect to="/login" />}
            />
            <Route
              path='/mi-cuenta/maquina/id/:maquinaId'
              render={(props) => localStorage.getItem("token") ?  <MachineForm {...props} /> : <Redirect to="/login" />}
            />
            <Route path="/mi-cuenta/editar" render={authGuard(AccountUpdate)} />
            <Route path="/mi-cuenta" render={authGuard(Account)} />
            <Route 
              path="/maquina/id/:maquinaId" 
              render={(props) => localStorage.getItem("token") ?  <Machine {...props} /> : <Redirect to="/login" />}
              />
            <Route 
              path="/usuario/id/:usuarioId"
              render={(props) => localStorage.getItem("token") ?  <Member {...props} /> : <Redirect to="/login" />} 
              />
            <Route path="/busqueda" render={authGuard(Search)} />
            <Route path="/terminos" component={Terminos} />
            <Route path="/politicas" component={Politicas} />
            <Route 
              exact 
              path="/" 
              render={() => localStorage.getItem("token") ?  <Search /> : <Landing />} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() ),
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );