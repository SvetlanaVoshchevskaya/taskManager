import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getToken } from "redux/selectors/selectors";

const ProtectedComponent = ({ component: Component, token, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				!!token ? (
					<Component {...props} token={token} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

const mapStateToProps = state => ({
	token: getToken(state)
});

export default connect(mapStateToProps)(ProtectedComponent);
