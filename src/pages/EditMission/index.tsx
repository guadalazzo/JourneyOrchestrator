import MissionManagment from '../../components/MissionManagment/index';
import { useParams } from 'react-router-dom';
export default function EditMission() {
  const { id } = useParams();

  return <MissionManagment id={id} />;
}
