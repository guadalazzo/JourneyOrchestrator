import MissionManagment from './index';
import { useParams } from 'react-router-dom';
export default function EditMission() {
  const { id } = useParams();

  return <MissionManagment id={id} />;
}
