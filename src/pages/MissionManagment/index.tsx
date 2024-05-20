import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Mission, Member } from '../../types/missionManagment.types';
import './style.scss';
import { validate, reset } from '../../store/missionManagment/missionManagment';
import { getMission } from '../../services/index';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function MissionManagment({ id }: { id?: string }) {
  const [mission, setMission] = useState<Mission>({
    name: '',
    destination: 'Mars Alpha-110',
    date: '',
    members: [],
  });
  const [members, setMembers] = useState<Member[]>([{ type: 'engineer', experience: '0', job: 'Navigation' }]);
  const errorMessage = useSelector((state) => state.missionManagment.errorMessage);
  const isValid = useSelector((state) => state.missionManagment.isValid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadMission = async (id: string) => {
    const data = await getMission(id);
    setMission(data);
    setMembers(data.members);
  };

  useEffect(() => {
    if (id) {
      loadMission(id);
    }
    return () => {
      // on unmount
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (isValid) {
      navigate('/');
    }
  }, [isValid]);

  const handleChange = ({ target: { name, value } }: { target: HTMLInputElement | HTMLSelectElement }) => {
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
  const handleRemoveMember = (index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setMembers((prevMembers) => {
      const updatedMembers = prevMembers.filter((_, i) => i !== index);
      return updatedMembers;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...mission,
      members: [...members],
    };
    dispatch(validate(payload));
  };
  return (
    <div className="main-content">
      <Breadcrumbs name={id ? 'Edit' : 'Create'} />
      {id ? <h2>Edit Mission</h2> : <h2>Configure a new Mission</h2>}
      <form onSubmit={handleSubmit}>
        <fieldset className="mission-topinfo">
          <label htmlFor="name" className="field">
            Name
            <input type="text" value={mission.name} name="name" onChange={handleChange} required></input>
          </label>
          <label htmlFor="destination" className="field">
            Destination
            <select value={mission.destination} name="destination" onChange={handleChange}>
              <option>Mars Alpha-116</option>
              <option>Mars Alpha-110</option>
              <option>Mars Alpha-100</option>
            </select>
          </label>
          <label htmlFor="date" className="field">
            Departure
            <input type="text" value={mission.date} name="date" onChange={handleChange} required></input>
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

          <button type="button" onClick={handleAddMember} className="btn">
            New member
          </button>
        </div>
        <button className="btn" type="submit">
          {id ? 'Edit' : 'Create'}
        </button>
      </form>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
}
