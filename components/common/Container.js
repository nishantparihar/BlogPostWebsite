import React, { useContext } from 'react';
import useWindowWidth from '../hooks/useWindowWidth';
import { Window_Width } from '../../context/context';

export default function Container({ children }) {
  // const { isSmallerDevice } = useWindowWidth();
  const { isSmallerDevice } = useContext(Window_Width);
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <div style={{ width: isSmallerDevice ? '95%' : '85%' }}>{children}</div>
    </div>
  );
}
