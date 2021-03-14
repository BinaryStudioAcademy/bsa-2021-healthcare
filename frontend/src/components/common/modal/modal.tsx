import * as React from 'react';

import styles from './styles.module.scss';

interface Props {
  isShow: boolean;
  children:React.ReactNode;
}

const Modal: React.FC<Props> = ({ isShow, children }) => {

  return (
      <>
        {isShow &&
            <div className={styles.container}>
                {children}
            </div>
        }
      </>
  );
}
export default Modal;
