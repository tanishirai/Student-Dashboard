
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to the dashboard route
  return <Navigate to="/" replace />;
};

export default Index;
