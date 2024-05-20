import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Missions from './pages/Missions';
import Layout from './components/Layout/Layout';
import CreateMission from './pages/MissionManagment/CreateMission';
import EditMission from './pages/MissionManagment/EditMission';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Missions />} />
            <Route path="/edit/:id" element={<EditMission />} />
            <Route path="/create" element={<CreateMission />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
