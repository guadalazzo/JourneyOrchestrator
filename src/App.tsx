import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Missions from './pages/Missions';
import Layout from './components/Layout/Layout';
import CreateMission from './pages/CreateMission';
import EditMission from './pages/EditMission';
import { Provider } from 'react-redux';
import store from './store';
import { ROUTES } from './utils/consts';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.BASE_URL} element={<Layout />}>
            <Route path="/JourneyOrchestrator/" element={<Missions />} />
            <Route path={ROUTES.EDIT} element={<EditMission />} />
            <Route path={ROUTES.CREATE} element={<CreateMission />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
