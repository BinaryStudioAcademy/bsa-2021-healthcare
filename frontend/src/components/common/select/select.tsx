import { SelectChangeCallback } from 'common/types';
import * as React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { IOption } from 'common/interfaces';

interface Props {
  options: IOption<string>[];
  isDisabled?: boolean;
  hasError?: boolean;
  onChange: SelectChangeCallback;
}

const Select: React.FC<Props> = ({ options, isDisabled, hasError, onChange }) => (
  <select className={clsx(styles.select, hasError && styles.error)} onChange={onChange} disabled={isDisabled}>
    {
      options.map(option => {
        return <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>;
      })
    }
  </select>
);

export default Select;
