import React from 'react';
import AppDrawer from '../components/app-drawer';

export default class Cookbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      value: '',
      isConfirmClicked: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidMount() {
    fetch('/api/cookbook/')
      .then(res => res.json())
      .then(results => {
        this.setState({ results });
      })
      .catch(error => console.error(error));
  }

  handleDelete() {
    const recipeId = this.state.value;
    fetch(`/api/cookbook/${recipeId}`, {
      method: 'DELETE'
    })
      .then(res => {
        let removeIndex = '';
        for (const i in this.state.results) {
          if (this.state.results[i].recipeId === parseInt(recipeId)) {
            removeIndex = i;
          }
        }
        this.state.results.splice(removeIndex, 1);
        this.setState({
          isConfirmClicked: false,
          value: '',
          results: this.state.results
        });
      });
  }

  handleConfirm() {
    this.setState({
      isConfirmClicked: true,
      value: event.target.id
    });
  }

  closeMenu() {
    this.setState({
      isConfirmClicked: false,
      value: ''
    });
  }

  render() {
    const recipes = this.state.results;
    if (this.state.isConfirmClicked) {
      return (
        <div className="modal-container">
          <div className="modal-content">
            <div className="right">
              <i onClick={this.closeMenu} className="fas fa-times times-icon"></i>
            </div>
            <p className="modal-message">Are you sure you want to delete this recipe?</p>
            <a href={'#cookbook'}>
              <button onClick={this.handleDelete}className="blue-button">YES</button>
            </a>
          </div>
        </div>
      );
    }
    return (
      <>
      <div className="menu">
        <AppDrawer />
      </div>
      <header><h1>Cookbook</h1></header>
      <div className="recipe-container">
          {recipes.map(item => (
          <div key={item.recipeId}>
          <div className="row">
            <div className="column-one-fourth">
              <div className="img-container-small">
                <a href= {`#recipes?recipeId=${item.uri.split('_')[1]}`}>
                  <img src={item.image}></img>
                </a>
              </div>
            </div>
            <div className="column-three-fourth">
              <div className="title-container">
                <a href= {`#recipes?recipeId=${item.uri.split('_')[1]}`}>
                  <div className="column">
                      <h3>{item.label}</h3>
                    <span className="content">{Math.floor(item.calories)} kcal</span>
                  </div>
                </a>
                <i onClick={this.handleConfirm} id={item.recipeId} className="fas fa-times-circle delete-icon"></i>
              </div>
            </div>
          </div>
          </div>)
          )}
      </div>
      </>
    );
  }
}
