import React, { Component, Suspense } from 'react';
import { Redirect,Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import AuthRoute from '../../components/Auth/AuthRoute'
import AuthenticationService from '../../api/AuthenticationService'
import AuthSidebarNav from '../../components/Auth/AuthSidebarNav'

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
// import navigation from '../../_nav'; //BG001-
import navigation from '../../components/Auth/_navAuth';  //TODO: Routes Sidebar BG001+

// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

  signOut(e) {
    e.preventDefault()
    AuthenticationService.logout()
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            {/*<AppSidebarHeader />*/}
            {/*<AppSidebarForm />*/}
            <Suspense>
            {/*TODO: Sidebar  BG001+*/}
            <AuthSidebarNav navConfig={navigation} {...this.props} />
            {/*<AppSidebarNav navConfig={navigation} {...this.props} />*/}
            </Suspense>
            {/*<AppSidebarFooter />*/}
            {/*<AppSidebarMinimizer />*/}
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      // TODO: Custom Route Auth <Route || <AuthRoute
                        <AuthRoute
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        roles={route.roles}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
