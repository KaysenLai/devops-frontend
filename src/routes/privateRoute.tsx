import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../hooks/index';

interface Props {
  component: React.FC;
  path: string;
  exact?: boolean;
}

const PrivateRoute:React.FC<Props> = ({
  path, exact, component,
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    const status = lodash.isEmpty(token);
    setAuthenticated(status);
  }, [token]);

  if (!authenticated) {
    return <Route path={path} exact={exact} component={component} />;
  }
  return <Redirect to="/login" />;
};

PrivateRoute.defaultProps = {
  exact: false,
};

export default PrivateRoute;
