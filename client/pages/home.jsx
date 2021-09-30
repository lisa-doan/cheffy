import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import Search from './search';

export default class Home extends React.Component {

  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <>
        <Search />
      </>
    );
  }
}

Home.contextType = AppContext;
