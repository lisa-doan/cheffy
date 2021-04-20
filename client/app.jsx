import React from 'react';
import Search from './pages/search';
import RecipeDetails from './pages/recipe-details';
import Cookbook from './pages/cookbook';
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
    if (route.path === 'recipes') {
      const recipeId = route.params.get('recipeId');
      return <RecipeDetails recipeId={recipeId} />;
    }
  }

  render() {
    return (
      <div className="container">
    {this.renderPage()}
    </div>
    );
  }
}
