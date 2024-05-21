import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Table from '../../components/Table/Table';
import { CreatedMission } from '../../types/missionManagment.types';
import { getMissions } from '../../services';
import { setMissionsA } from '../../store/missionManagment/missionManagment';
import { ROUTES } from '../../utils/consts';
import { reducer } from '../../types/missionManagment.types';
import './styles.scss';

export default function Missions() {
  const [missions, setMissions] = useState<CreatedMission[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isValid = useSelector<reducer>((state) => state.missionManagment.isValid);

  const loadMissions = async () => {
    const data = await getMissions();
    setMissions(data);
    dispatch(setMissionsA(data));
  };

  useEffect(() => {
    loadMissions();
  }, [isValid]);

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="main-content">
      <div className="top-panel">
        <h2>Missions</h2>
        <Link className="top-panel_new-mission btn" to={ROUTES.CREATE}>
          New mission
        </Link>
      </div>
      <Table missions={missions} handleEdit={handleEdit} />
    </div>
  );
}
