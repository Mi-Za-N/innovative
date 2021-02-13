import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

const Icon = styled.span`
  min-width: 16px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLink = ({
  href,
  label,
  intlId,
  router,
  icon,
  className,
  onClick,
  iconClass,
  dynamic,
}) => {
  
  const isCurrentPath = router.pathname === href || router.asPath === href;
  return (
    <div onClick={onClick} className={className ? className : ''}>
      {dynamic ? (
        <Link href={'/[type]'} as={href}>
          <a
            className={isCurrentPath ? ' current-page' : ''}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {icon ? <Icon className={iconClass}>{icon}</Icon> : ''}

            {/* <span className="label">
              {intlId ? (
                <FormattedMessage
                  id={intlId ? intlId : 'defaultNavLinkId'}
                  defaultMessage={label}
                />
              ) : (
                label
              )}
            </span> */}
          </a>
        </Link>
      ) : (
       <Link href={'/[type]'} as={href}>
          <a
            className={isCurrentPath ? ' current-page' : ''}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {icon ? <Icon className={iconClass}>{icon}</Icon> : ''}

            {/* <span className="label">
              {intlId ? (
                <FormattedMessage
                  id={intlId ? intlId : 'defaultNavLinkId'}
                  defaultMessage={label}
                />
              ) : (
                label
              )}
            </span> */}
          </a>
        </Link>
      )}
    </div>
  );
};

export default withRouter(NavLink);
