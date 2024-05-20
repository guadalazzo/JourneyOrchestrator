import './Table.scss';
import { Mission } from '../../types/missionManagment.types';

export default function Table({ missions, handleEdit }: { missions: Mission[]; handleEdit: (id: number) => void }) {
  return (
    <table className="missions-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Members</th>
          <th>Destination</th>
          <th>Departure</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {missions?.map((mission, index) => {
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
      </tbody>
    </table>
  );
}
