import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Missions from './pages/Missions/Missions';
import Layout from './components/Layout/Layout';
import CreateMission from './pages/MissionManagment/CreateMission';
import EditMission from './pages/MissionManagment/EditMission';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Missions />} />
          <Route path="/edit/:id" element={<EditMission />} />
          <Route path="/create" element={<CreateMission />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
