import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const alternateActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const alternatActionText = action === 'sign-up'
      ? 'Sign In Instead'
      : 'Register Now';
    const submitButtonText = action === 'sign-up'
      ? 'Register'
      : 'Sign In';
    return (
      <form onSubmit={handleSubmit}>
        <div className="row-no-wrap">
          <label htmlFor="username">
            Username
          </label>
          <input
            required
            autoFocus
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
           />
        </div>
        <div className="row-no-wrap">
          <label htmlFor="password">
            Password
          </label>
          <input
            required
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
           />
        </div>

        <div className="row-no-wrap">
          <div className="column">
            <a href={alternateActionHref}>
              { alternatActionText }
            </a>
          </div>
          <div className="column row-no-wrap">
            <button type="submit" className="large-red-button">
            { submitButtonText }
            </button>
          </div>
        </div>
      </form>
    );
  }
}
