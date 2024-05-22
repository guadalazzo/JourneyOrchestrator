import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Table from '../../components/Table/Table';
import { CreatedMission } from '../../types/missionManagment.types';
import { getMissions, deleteMission } from '../../services';
import { setMissionsA } from '../../store/missionManagment/missionManagment';
import { ROUTES } from '../../utils/consts';
import { reducer } from '../../types/missionManagment.types';
import './styles.scss';

export default function Missions() {
  const [missions, setMissions] = useState<CreatedMission[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isValid = useSelector<reducer>((state) => state.missionManagment.isValid);

  // Load missions, updates local an global state
  const loadMissions = async () => {
    try {
      const data = await getMissions();
      setMissions(data);
      dispatch(setMissionsA(data));
    } catch (e) {
      console.error('Failed to load missions:', e);
    }
  };

  // Load missions on mount and when isValid changes
  useEffect(() => {
    loadMissions();
  }, [isValid]);

  // Navigates to edit page
  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  // Handles delete and reloads missions
  const handleDelete = async (id: string) => {
    try {
      await deleteMission(id);
      loadMissions();
    } catch (e) {
      console.error('Failed to delete mission:', e);
    }
  };

  return (
    <div className="main-content">
      <div className="top-panel">
        <h2>Missions</h2>
        <Link className="top-panel_new-mission btn" to={ROUTES.CREATE} aria-label="new-mission">
          New mission
        </Link>
      </div>
      <Table missions={missions} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
}
