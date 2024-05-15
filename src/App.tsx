import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Missions from './pages/Missions';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Missions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
