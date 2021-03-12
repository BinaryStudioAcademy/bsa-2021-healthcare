import * as React from 'react';
import iconLogo from 'assets/images/icon-logo.svg';
import { Button, Link } from '../index';
import {
  AppRoute,
  ButtonColor,
  ButtonIcon,
  ButtonStyleType,
  ButtonType,
} from 'common/enums';
import { Props } from './common';
import { useVisible } from 'hooks';
import styles from './header.module.scss';

const Header: React.FC<Props> = ({ user }) => {
  const { ref, isVisible, setIsVisible } = useVisible(false);

  const toggleShowMenu = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoSection}>
        <Link to={AppRoute.ROOT}>
          <img src={iconLogo} loading="lazy" alt="HealthCare Logo" />
          <div className={styles.logoLabel}>HealthCare</div>
        </Link>
      </div>
      <div className={styles.pagesSection}>
        <Link to={AppRoute.DOCTOR}>Doctor</Link>
        <Link to={AppRoute.CLINIC}>Clinic</Link>
        <Link to={AppRoute.MY_PROFILE}>My Profile</Link>
        <Link to={AppRoute.MY_CALENDAR}>My Calendar</Link>
        <Link to={AppRoute.MY_CHATS}>My Chats</Link>
      </div>
      <div className={styles.userSection}>
        <Button
          type={ButtonType.BUTTON}
          styleType={ButtonStyleType.MEDIUM_ROUND}
          color={ButtonColor.GRAY_LIGHT}
          label="Search"
          onClick={() => console.log('Search')}
          hasHiddenLabel={true}
          icon={ButtonIcon.SEARCH}
        />
        <Button
          type={ButtonType.BUTTON}
          styleType={ButtonStyleType.MEDIUM_ROUND}
          color={ButtonColor.GRAY_LIGHT}
          label="Notifications"
          onClick={() => console.log('Notifications')}
          hasHiddenLabel={true}
          href={AppRoute.NOTIFICATIONS}
          icon={ButtonIcon.BELL}
        />
        <img
          width={35}
          height={32}
          className={styles.avatar}
          src={user.imagePath}
        />
        <div className={styles.userInfo}>{user.name}</div>
        <Button
          type={ButtonType.BUTTON}
          styleType={ButtonStyleType.MEDIUM_ROUND}
          color={ButtonColor.GRAY_LIGHT}
          label="Expand"
          onClick={toggleShowMenu}
          hasHiddenLabel={true}
          icon={ButtonIcon.EXPAND}
        />
        {isVisible && (
          <div className={styles.dropdownMenu} ref={ref}>
            <div className={styles.userName}>{user.name}</div>
            <Button
              type={ButtonType.BUTTON}
              styleType={ButtonStyleType.WITHOUT_BORDER}
              color={ButtonColor.GRAY_LIGHT}
              label="Logout"
              onClick={toggleShowMenu}
              hasHiddenLabel={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
