import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useState } from 'react';

function App() {

  const [color, setColor] = useState("black");

  return (
    <div className="container">
      <Header color={color} setColor={setColor}/>
      <Outlet context={[color]}/>
    </div>
  );
}

export default App;
