import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Table from '../../components/Table/Table';
import { MissionsM } from './Missions.types';
import './Missions.scss';
import { getMissions } from '../../services';

export default function Missions() {
  const [missions, setMissions] = useState<MissionsM>([]);
  const navigate = useNavigate();

  const loadMissions = async () => {
    try {
      const data = await getMissions();
      setMissions(data);
    } catch (e) {
      console.error('error:', e);
    }
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
        <Link className="top-panel_new-mission" to="/create">
          New mission
        </Link>
      </div>
      <Table missions={missions} handleEdit={handleEdit} />
    </div>
  );
}
