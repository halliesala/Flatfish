import { Outlet } from 'react-router-dom';
import Header from './Header';

function App() {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
