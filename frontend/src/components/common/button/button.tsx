import clsx from 'clsx';
import { ButtonColor, ButtonIcon, ButtonStyleType, ButtonType } from 'common/enums';
import { ButtonClickCallback } from 'common/types';
import * as React from 'react';
import styles from './styles.module.scss';

interface Props {
  type: ButtonType;
  styleType: ButtonStyleType;
  color: ButtonColor;
  label: string;
  onClick: ButtonClickCallback;
  hasHiddenLabel: boolean;
  isDisabled: boolean;
  icon?: ButtonIcon;
}

const Button: React.FC<Props> = ({ type, styleType, color, label, isDisabled, hasHiddenLabel, icon, onClick }) => (
  <button
    className={clsx(styles.btn, styles[styleType], styles[color], icon && styles[icon])}
    type={type}
    disabled={isDisabled}
    onClick={onClick}>
    {hasHiddenLabel ? <span className={styles.visuallyHidden}>{label}</span> : label}
    {icon && <span className={clsx(styles.buttonIcon, styles[icon])}></span>}
  </button>
);

export default Button;