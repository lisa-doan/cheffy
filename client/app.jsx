import React from 'react';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';
import decodeToken from './lib/decode-token';
import Search from './pages/search';
import Recipe from './pages/recipe';
import Cookbook from './pages/cookbook';
import Home from './pages/home';
import Auth from './pages/auth';
import NotFound from './pages/not-found';
import PageContainer from './components/page-container';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(location.hash) });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'search') {
      return <Search />;
    }
    if (route.path === 'cookbook') {
      return <Cookbook />;
    }
    if (route.path === 'recipes') {
      const recipeId = route.params.get('recipeId');
      return <Recipe recipeId={recipeId} />;
    }
    if (route.path === 'sign-in' || route.path === 'sign-up') {
      return <Auth />;
    }
    return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <>
    <div>
      <AppContext.Provider value={contextValue}>
        <PageContainer>
          { this.renderPage() }
        </PageContainer>
      </AppContext.Provider>

      </div>
    </>
    );
  }
}
