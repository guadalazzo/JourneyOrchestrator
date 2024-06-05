import { Engineer, Passenger, Pilot, Member } from '../../types/missionManagment.types';
import { MEMBER_TYPES } from '../../utils/consts';
interface MemberProps {
  members: Member[];
  onMemberChange: (_: number, _1: string, _2: string) => void;
  onRemoveMember: (_: number, _1: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onAddMember: () => void;
}
// Type guards
function isPilot(member: Engineer | Passenger | Pilot): member is Pilot {
  return member.type === MEMBER_TYPES.PILOT;
}

function isEngineer(member: Engineer | Passenger | Pilot): member is Engineer {
  return member.type === MEMBER_TYPES.ENGINEER;
}

function isPassanger(member: Engineer | Passenger | Pilot): member is Passenger {
  return member.type === MEMBER_TYPES.PASSENGER;
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

            {(isPilot(member) || isEngineer(member)) && (
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
            )}

            {isEngineer(member) && (
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

            {isPassanger(member) && (
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

            {isPassanger(member) && (
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
