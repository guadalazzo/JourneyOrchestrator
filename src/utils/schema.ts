import * as Yup from 'yup';
import { parse } from 'date-fns';

export const MissionSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(),
  date: Yup.date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, 'dd/MM/yyyy', new Date());
      return result;
    })
    .typeError('please enter a valid date')
    .required()
    .min('1969-11-13', 'Date is too early'),
});
