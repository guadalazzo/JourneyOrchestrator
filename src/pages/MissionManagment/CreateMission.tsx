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
  const handleRemoveMember = (index: number, e) => {
    e.preventDefault();
    setMembers((prevMembers) => {
      const updatedMembers = prevMembers.filter((_, i) => i !== index);
      return updatedMembers;
    });
  };
  return (
    <div className="main-content">
      <h2>Configure a new Mission</h2>
      <form>
        <fieldset className="mission-topinfo">
          <label htmlFor="name" className="field">
            Name
            <input type="text" value={mission.name} name="name" onChange={handleChange}></input>
          </label>
          <label htmlFor="destination" className="field">
            Destination
            {/* TODO CHANGE FOR SELECT */}
            <input type="text" value={mission.destination} name="destination" onChange={handleChange}></input>
          </label>
          <label htmlFor="date" className="field">
            Departure
            <input type="text" value={mission.date} name="date" onChange={handleChange}></input>
          </label>
        </fieldset>
        <div className="member-list">
          <h3>Members</h3>
          {members.map((member, index) => {
            return (
              <fieldset key={`${member.type}-${index}`} className="member">
                <label className="field">
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
                </label>

                {member.type === 'pilot' || member.type === 'engineer' ? (
                  <label className="field">
                    Experience
                    <input
                      id="experience"
                      placeholder="experience"
                      value={member.experience}
                      name="experience"
                      onChange={(e) => handleMemberChange(index, 'experience', e.target.value)}
                    />
                  </label>
                ) : null}

                {member.type === 'engineer' && ( //TODO CAMBIAR POR UN SELECT
                  <label className="field">
                    Job
                    <select
                      id="job"
                      value={member.job}
                      name="job"
                      onChange={(e) => handleMemberChange(index, 'job', e.target.value)}
                    >
                      <option>Navigation</option>
                      <option>Solar panels</option>
                      <option>Maintenance</option>
                      <option>Mechanics</option>
                    </select>
                  </label>
                )}

                {member.type === 'passenger' && (
                  <label className="field">
                    Age
                    <input
                      id="age"
                      placeholder="age"
                      value={member.age}
                      name="age"
                      onChange={(e) => handleMemberChange(index, 'age', e.target.value)}
                      type="text"
                    />
                  </label>
                )}

                {member.type === 'passenger' && (
                  <label className="field">
                    Wealth
                    <input
                      id="wealth"
                      placeholder="wealth"
                      value={member.wealth}
                      name="wealth"
                      onChange={(e) => handleMemberChange(index, 'wealth', e.target.value)}
                      type="text"
                    />
                  </label>
                )}
                <button type="button" onClick={(e) => handleRemoveMember(index, e)} className="remove-button">
                  X
                </button>
              </fieldset>
            );
          })}

          <button type="button" onClick={handleAddMember} className="new-member">
            New member
          </button>
        </div>
      </form>
    </div>
  );
}
