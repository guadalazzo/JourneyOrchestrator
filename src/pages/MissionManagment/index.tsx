import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Mission, Member, reducer } from '../../types/missionManagment.types';
import { validate, reset } from '../../store/missionManagment/missionManagment';
import { getMission } from '../../services/index';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import Members from './Members';
import { MissionSchema } from '../../utils/schema';
import { changeDateFormatTo, formateForDateInput } from '../../utils';
import { ROUTES } from '../../utils/consts';
import './style.scss';

export default function MissionManagment({ id }: { id?: string }) {
  const [mission, setMission] = useState<Mission>({
    name: '',
    destination: 'Mars Alpha-110',
    date: '',
    members: [],
  });
  const [members, setMembers] = useState<Member[]>([{ type: 'engineer', experience: '0', job: 'Navigation' }]);
  const errorMessage = useSelector<reducer>((state) => {
    if (state.missionManagment) {
      return state.missionManagment.errorMessage;
    } else {
      return '';
    }
  }) as string;
  const isValid = useSelector<reducer>((state) => state.missionManagment.isValid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let initialValues: Mission = {
    name: '',
    destination: 'Mars Alpha-110',
    date: '',
    members: [],
  };

  const loadMission = async (id: string) => {
    const data = await getMission(id);
    data.date = formateForDateInput(data.date);
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
      navigate(ROUTES.BASE_URL);
    }
  }, [isValid]);

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

  const handleSubmit = useCallback(
    (values: Mission, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
      setSubmitting(true);
      const formattedDate = changeDateFormatTo(values.date);
      const payload = {
        ...values,
        date: formattedDate,
        members: [...members],
      };

      dispatch(validate(payload));
      if (isValid) setSubmitting(false);
    },
    [members],
  );

  return (
    <div className="main-content mission-managment">
      <Breadcrumbs name={id ? 'Edit' : 'Create'} />
      {id ? <h2>Edit Mission</h2> : <h2>Configure a new Mission</h2>}

      <Formik
        initialValues={id ? mission : initialValues}
        enableReinitialize
        validationSchema={MissionSchema}
        onSubmit={(values, { setSubmitting }) => handleSubmit(values, { setSubmitting })}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <fieldset className="mission-topinfo">
              <label htmlFor="name" className="field">
                Name
                <input
                  type="text"
                  value={values.name}
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                ></input>
                {errors.name && touched.name && <span className="error-message">{errors.name}</span>}
              </label>
              <label htmlFor="destination" className="field">
                Destination
                <select value={values.destination} name="destination" onChange={handleChange} onBlur={handleBlur}>
                  <option>Mars Alpha-116</option>
                  <option>Mars Alpha-110</option>
                  <option>Mars Alpha-100</option>
                </select>
              </label>
              <label htmlFor="date" className="field">
                Departure
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={values.date}
                  name="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                ></input>
                {errors.date && touched.date && <span className="error-message">{errors.date}</span>}
              </label>
            </fieldset>
            <Members
              members={members}
              onMemberChange={handleMemberChange}
              onAddMember={handleAddMember}
              onRemoveMember={handleRemoveMember}
            />
            <button className="btn cta" type="submit">
              {id ? 'Edit' : 'Create'}
            </button>
          </form>
        )}
      </Formik>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
}
