import { Route } from 'react-router-dom';
import { FC } from 'react';
import { RouteProps, Redirect } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

interface Props extends RouteProps<string> {}

const AuthRoute: FC<Props> = ({ children, ...rest }) => {
    const logged = useAppSelector((state) => state.auth.logged);

    return (
        <Route
          {...rest}
          render={({ location }) => {
            return logged === true ? (
              children
            ) : (
              <Redirect to={{
                  pathname: "/login",
                  state: { from: location },
              }} />
            );
          }}
        />
      );
}

export default AuthRoute;