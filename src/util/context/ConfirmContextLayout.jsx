import { Outlet } from 'react-router-dom';
import { ConfirmProvider } from './confirm.context';

const ConfirmContextLayout = () => {

  return (
    <ConfirmProvider>
      <Outlet />
    </ConfirmProvider>
  );
};

export default ConfirmContextLayout;