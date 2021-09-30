import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  render() {

    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="" />;

    const weclomeMessage = route.path === 'sign-in'
      ? 'Please sign in to continue.'
      : 'Create an account to get started!';
    return (
      <div className="center">
        <header>
          <h1>cheffy</h1>
        </header>
        <div className="row-no-wrap">
          <h3>{ weclomeMessage }</h3>
        </div>
        <div className="row-no-wrap">
        <AuthForm
          key={route.path}
          action={route.path}
          onSignIn={handleSignIn} />
        </div>
      </div>
    );
  }
}

AuthPage.contextType = AppContext;
