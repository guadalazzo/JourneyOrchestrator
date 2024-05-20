import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Table from '../../components/Table/Table';
import { Mission } from '../../types/missionManagment.types';
import './styles.scss';
import { getMissions } from '../../services';
import { setMissionsA } from '../../store/missionManagment/missionManagment';

export default function Missions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadMissions = async () => {
    const data = await getMissions();
    setMissions(data);
    dispatch(setMissionsA(data));
  };

  useEffect(() => {
    loadMissions();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="main-content">
      <div className="top-panel">
        <h2>Missions</h2>
        <Link className="top-panel_new-mission btn" to="/create">
          New mission
        </Link>
      </div>
      <Table missions={missions} handleEdit={handleEdit} />
    </div>
  );
}
