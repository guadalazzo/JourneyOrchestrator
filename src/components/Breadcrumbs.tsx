import { Link } from 'react-router-dom';

export default function Breadcrumbs({ name }: { name: string }) {
  return (
    <ol>
      <Link to="/">Missions</Link> / <span>{name}</span>
    </ol>
  );
}
