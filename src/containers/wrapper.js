var React = require('react'),
  ReactRedux = require('react-redux'),
  cookie = require('./../../lib/cookie'),
  actions = require('../actions'),
  LastUserSelector = require('../components/lastUserSelector'),
  Login = require('./../components/login');

var Wrapper = React.createClass({
  componentWillMount: function () {
    var sca = cookie.get();
    if (sca) { this.props.login(sca.username, sca.wif); }
  },
  render: function () {
    let {routes} = this.props;
    let nonisAuthenticatedComponent = <Login {...this.props} />
    if (routes.length && routes[1] && routes[1].path && routes[1].path.indexOf('loginlist') > 0) {
      nonisAuthenticatedComponent = <LastUserSelector {...this.props} />
    }

    return (
      <div className='app-wrapper'>
        {this.props.auth.isAuthenticated && this.props.children}
        {!this.props.auth.isAuthenticated && nonisAuthenticatedComponent}
      </div>
    );
  }
});

var mapStateToProps = function (state) {
  return { auth: state.auth };
};

var mapDispatchToProps = function (dispatch) {
  return {
    login: function (username, password) { dispatch(actions.login(username, password)); }
  }
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Wrapper);