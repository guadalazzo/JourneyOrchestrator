import { useState } from 'react';
import { Mission, Member } from './missionManagment';
import './CreateMission.scss';

export default function CreateMission() {
  const [mission, setMission] = useState<Mission>({
    name: '',
    destination: '',
    date: '',
    members: [],
  });
  const [members, setMembers] = useState<Member[]>([{ type: 'pilot', experience: '0' }]);

  const handleChange = ({ target: { name, value } }) => {
    setMission((form) => ({ ...form, [name]: value }));
  };

  const handleMemberChange = (index: number, name: string, value: string) => {
    setMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      const updatedMember = { ...updatedMembers[index], [name]: value };
      updatedMembers[index] = updatedMember;
      return updatedMembers;
    });
  };

  const handleAddMember = () => {
    setMembers((prevMembers) => [...prevMembers, { type: 'pilot', experience: '0' }]);
  };
  return (
    <div>
      <h2>Configure a new Mission</h2>
      <form>
        <fieldset className="mission-topinfo">
          <label htmlFor="name">
            Name:
            <input type="text" value={mission.name} name="name" onChange={handleChange}></input>
          </label>
          <label htmlFor="destination">
            Destination:
            <input type="text" value={mission.destination} name="destination" onChange={handleChange}></input>
          </label>
          <label htmlFor="date">
            Departure:
            <input type="text" value={mission.date} name="date" onChange={handleChange}></input>
          </label>
        </fieldset>
        <div className="member-list">
          {members.map((member, index) => {
            return (
              <fieldset key={`${member.type}-${index}`}>
                <label>
                  {member.type === 'passenger' ? 'Name:' : 'Type:'}
                  <select
                    value={member.type}
                    name="type"
                    onChange={(e) => handleMemberChange(index, 'type', e.target.value)}
                  >
                    <option value="pilot">Pilot</option>
                    <option value="engineer">Engineer</option>
                    <option value="passenger">Passanger</option>
                  </select>
                  {member.type === 'pilot' || member.type === 'engineer' ? (
                    <input
                      type="number"
                      id="experience"
                      placeholder="experience"
                      value={member.experience}
                      name="experience"
                      onChange={(e) => handleMemberChange(index, 'experience', e.target.value)}
                    />
                  ) : null}
                  {member.type === 'engineer' && ( //TODO CAMBIAR POR UN SELECT
                    <input
                      id="job"
                      placeholder="job"
                      value={member.job}
                      name="job"
                      onChange={(e) => handleMemberChange(index, 'job', e.target.value)}
                      type="number"
                    />
                  )}
                  {member.type === 'passenger' && (
                    <input
                      id="age"
                      placeholder="age"
                      value={member.age}
                      name="age"
                      onChange={(e) => handleMemberChange(index, 'age', e.target.value)}
                      type="text"
                    />
                  )}
                  {member.type === 'passenger' && (
                    <input
                      id="wealth"
                      placeholder="wealth"
                      value={member.wealth}
                      name="wealth"
                      onChange={(e) => handleMemberChange(index, 'wealth', e.target.value)}
                      type="text"
                    />
                  )}
                </label>
              </fieldset>
            );
          })}

          <button type="button" onClick={handleAddMember}>
            New member
          </button>
        </div>
      </form>
    </div>
  );
}
