import { Member } from '../../types/missionManagment.types';
import { MEMBER_TYPES } from '../../utils/consts';
interface MemberProps {
  members: Member[];
  onMemberChange: (index: number, name: string, value: string) => void;
  onRemoveMember: (index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onAddMember: () => void;
}
export default function Members({ members, onMemberChange, onRemoveMember, onAddMember }: MemberProps) {
  return (
    <div className="member-list">
      <h3>Members</h3>
      {members.map((member, index) => {
        return (
          <fieldset key={`${member.type}-${index}`} className="member">
            <label className="field">
              {member.type === MEMBER_TYPES.ENGINEER ? 'Name:' : 'Type:'}
              <select value={member.type} name="type" onChange={(e) => onMemberChange(index, 'type', e.target.value)}>
                <option value={MEMBER_TYPES.PILOT}>Pilot</option>
                <option value={MEMBER_TYPES.ENGINEER}>Engineer</option>
                <option value={MEMBER_TYPES.PASSENGER}>Passenger</option>
              </select>
            </label>

            {member.type === MEMBER_TYPES.PILOT || member.type === MEMBER_TYPES.ENGINEER ? (
              <label className="field">
                Experience
                <input
                  id="experience"
                  placeholder="experience"
                  type="number"
                  min={0}
                  value={member.experience}
                  name="experience"
                  onChange={(e) => onMemberChange(index, 'experience', e.target.value)}
                />
              </label>
            ) : null}

            {member.type === MEMBER_TYPES.ENGINEER && ( //TODO CAMBIAR POR UN SELECT
              <label className="field">
                Job
                <select
                  id="job"
                  value={member.job}
                  name="job"
                  onChange={(e) => onMemberChange(index, 'job', e.target.value)}
                >
                  <option>Navigation</option>
                  <option>Solar panels</option>
                  <option>Maintenance</option>
                  <option>Mechanics</option>
                </select>
              </label>
            )}

            {member.type === MEMBER_TYPES.PASSENGER && (
              <label className="field">
                Age
                <input
                  id="age"
                  placeholder="age"
                  value={member.age}
                  name="age"
                  type="number"
                  min={0}
                  onChange={(e) => onMemberChange(index, 'age', e.target.value)}
                />
              </label>
            )}

            {member.type === MEMBER_TYPES.PASSENGER && (
              <label className="field">
                Wealth
                <input
                  id="wealth"
                  placeholder="wealth"
                  value={member.wealth}
                  name="wealth"
                  type="number"
                  min={0}
                  onChange={(e) => onMemberChange(index, 'wealth', e.target.value)}
                />
              </label>
            )}
            <button type="button" onClick={(e) => onRemoveMember(index, e)} className="remove-button">
              X
            </button>
          </fieldset>
        );
      })}

      <button type="button" onClick={onAddMember} className="btn">
        New member
      </button>
    </div>
  );
}
