import { Link } from 'react-router-dom';

export default function Breadcrumbs({ name }) {
  return (
    <ol>
      <Link to="/">Mission</Link> / <span>{name}</span>
    </ol>
  );
}
