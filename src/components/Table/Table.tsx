import './Table.scss';
export default function Table({ missions }) {
  return (
    <table className="missions-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Members</th>
          <th>Destination</th>
          <th>Departure</th>
        </tr>
      </thead>
      <tbody>
        {missions?.map((mission) => {
          return (
            <tr>
              <td>{mission.name}</td>
              <td>{mission.crew_count}</td>
              <td>{mission.destination}</td>
              <td>{mission.date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
