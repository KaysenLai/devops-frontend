import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import styles from './breadcrumb.module.scss';

const Breadcrumb: React.FC<RouteComponentProps> = (props) => {
  const { location } = props;
  const { pathname } = location;
  const pathnames = pathname.split('/').filter((x) => x);

  const breadcrumbCaseUpdater = (path) => {
    let result = '';
    path.split('-').map((name) => {
      result += `${name.charAt(0).toUpperCase()}${name.slice(1)} `;
    });
    return result.trim();
  };

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {pathnames.length > 0 ? (
          <Link className={styles.breadcrumbItem} to="/">
            Home
          </Link>
        ) : (
          <Typography>Home</Typography>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography key={name} style={{ fontWeight: 'bold', color: 'black' }}>{breadcrumbCaseUpdater(name)}</Typography>
          ) : (
            <Link
              className={styles.breadcrumbItem}
              key={name}
              to={routeTo}
            >
              {breadcrumbCaseUpdater(name)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default withRouter(Breadcrumb);
