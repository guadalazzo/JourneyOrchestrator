import './Table.scss';
import { Mission } from '../../types/missionManagment.types';
import { useState } from 'react';

export default function Table({ missions, handleEdit }: { missions: Mission[]; handleEdit: (id: number) => void }) {
  const [missionsName, setMissionName] = useState('');
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMissionName(e.target.value);
  };
  const filteredMissions = missions.filter((product) => {
    // TODO implement Debounce
    return product.name.includes(missionsName);
  });

  return (
    <table className="missions-table">
      <thead>
        <tr>
          <th>
            <label className="search">
              <img src="public/assets/search.svg" alt="search"></img>
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
        {filteredMissions?.map((mission, index) => {
          return (
            <tr className="missions-table_row" key={`${mission.name}-${index}`}>
              <td>{mission.name}</td>
              <td>{mission.members?.length}</td>
              <td>{mission.destination}</td>
              <td>{mission.date}</td>
              <td>
                <button onClick={() => handleEdit(mission.id)}>
                  <img src="public/assets/edit.svg" alt="edit"></img>
                </button>
              </td>
            </tr>
          );
        })}
        {!filteredMissions.length && <div>No results</div>}
      </tbody>
    </table>
  );
}
