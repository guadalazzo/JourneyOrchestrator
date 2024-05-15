import { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import { MissionsM } from '../Missions.types';
export default function Missions() {
  const [missions, setMissions] = useState<MissionsM>([]);

  const getMissions = async () => {
    try {
      const missionsResponse = await fetch('http://localhost:3000/missions');
      const parsedRes = await missionsResponse.json();
      setMissions(parsedRes);
    } catch (e) {
      console.error('error:', e);
    }
  };
  useEffect(() => {
    getMissions();
  }, []);

  return (
    <article>
      <h2>Missions</h2>
      <Table missions={missions} />
    </article>
  );
}
