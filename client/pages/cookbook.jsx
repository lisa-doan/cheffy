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
            <div className="column">
              <p className="modal-message">are you sure you want to delete this recipe?</p>
              <a href={'#cookbook'}>
                <button onClick={this.handleDelete}className="blue-button">yes</button>
              </a>
            </div>
          </div>
        </div>
      );
    }
    return (
      <>
      <div className="menu">
        <AppDrawer />
      </div>

      <header><h1>cookbook</h1></header>

      <div className="container1">
          {recipes.map(item => (
          <div key={item.recipeId}>

              <div className="col-half">

                <div className="col-one-fourth">
                  <div className="img-container">
                    <a href= {`#recipes?recipeId=${item.uri.split('_')[1]}`}>
                      <img src={item.image}></img>
                    </a>
                  </div>
                </div>

                <div className="title-container">
                  <div className="column">
                    <a href= {`#recipes?recipeId=${item.uri.split('_')[1]}`}>
                      <h3>
                        {item.label.length > 22 ? item.label.slice(0, 22).toLowerCase() + '...' : item.label.toLowerCase() }
                      </h3>
                    </a>
                      <span className="content">{Math.floor(item.calories)} kcal</span>
                  </div>

                  <div className="column">
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
