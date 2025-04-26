import { Navigate } from 'react-router-dom';

const ProtectedCustomerRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!accessToken || !user || user.role !== 'customer') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedCustomerRoute;
