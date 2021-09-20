import React from 'react';
import Search from './pages/search';
import Recipe from './pages/recipe';
import Cookbook from './pages/cookbook';
import Timer from './pages/timer';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Search />;
    }
    if (route.path === 'cookbook') {
      return <Cookbook />;
    }
    if (route.path === 'timer') {
      return <Timer />;
    }
    if (route.path === 'recipes') {
      const recipeId = route.params.get('recipeId');
      return <Recipe recipeId={recipeId} />;
    }
  }

  render() {
    return (

    <div>
    {
      this.renderPage()
    }
    </div>

    );
  }
}
