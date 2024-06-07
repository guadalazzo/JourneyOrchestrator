import { useEffect, useState, useMemo, useCallback } from 'react';
import './Table.scss';
import { CreatedMission } from '../../types/missionManagment.types';
import { debounce } from '../../utils';
import DateRow from './DateRow';

export default function Table({
  missions,
  handleEdit,
  handleDelete,
}: {
  missions: CreatedMission[];
  handleEdit: (_: string) => void;
  handleDelete: (_: string) => void;
}) {
  const [missionsName, setMissionName] = useState('');
  const [missionsF, setMissionsF] = useState(missions);

  useEffect(() => {
    setMissionsF(missions);
  }, [missions]);

  const filterMissions = useCallback(
    (name: string) => {
      const lowerCaseName = name.toLowerCase();
      const filteredMissions = missions.filter((mission) => {
        const lowerCaseMissionName = mission.name.toLowerCase();
        return lowerCaseMissionName.includes(lowerCaseName);
      });
      setMissionsF(filteredMissions);
    },
    [missions],
  );
  // Delays the new filter call 400 sec
  const debouncedFilterMissions = useMemo(() => debounce(filterMissions, 400), [filterMissions]);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMissionName(e.target.value);
    debouncedFilterMissions(e.target.value);
  };

  return (
    <table className="missions-table">
      <thead>
        <tr>
          <th>
            <label className="search">
              <img src="/JourneyOrchestrator/assets/search.svg" alt="search"></img>
              <input
                onChange={handleInput}
                value={missionsName}
                type="text"
                name="name"
                id="name-search"
                placeholder="Search by Name"
              />
            </label>
          </th>
          <th>Members</th>
          <th>Destination</th>
          <th>Departure</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {missionsF?.map((mission, index) => {
          return (
            <tr className="missions-table_row" key={`${mission.name}-${index}`}>
              <td>{mission.name}</td>
              <td>{mission.members?.length}</td>
              <td>{mission.destination}</td>
              <td>
                <DateRow date={mission.date} />
              </td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(mission.id)}>
                  <img src="/JourneyOrchestrator/assets/edit.svg" alt="edit"></img>
                </button>
                <button className="btn-delete" onClick={() => handleDelete(mission.id)}>
                  <img src="/JourneyOrchestrator/assets/delete.svg" alt="delete"></img>
                </button>
              </td>
            </tr>
          );
        })}
        {!missionsF?.length && <div className="empty-state">No results</div>}
      </tbody>
    </table>
  );
}
