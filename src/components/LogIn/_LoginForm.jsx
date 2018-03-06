import React from 'react';
import PropTypes from 'prop-types';

import { doLogin } from '../../redux/actions';
import { byPropKey } from '../../utils';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const propTypes = {
  history: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  loginError: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({})]),
};

const defaultProps = {
  loginError: false,
};

class LogInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginError) {
      const oldState = this.state;
      this.setState({
        ...oldState,
        password: '',
        email: '',
      });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    const { history, dispatch } = this.props;

    dispatch(doLogin({ email, password, history }));
  };

  render() {
    const { email, password } = this.state;
    const { loginError } = this.props;
    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          value={email}
          placeholder="Email Address"
          onChange={event => this.setState(byPropKey('email', event.target.value))}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={event => this.setState(byPropKey('password', event.target.value))}
        />

        <button disabled={isInvalid} type="submit">
          Log In
        </button>

        <div>{loginError && loginError.message}</div>
      </form>
    );
  }
}

LogInForm.propTypes = propTypes;
LogInForm.defaultProps = defaultProps;

export default LogInForm;
