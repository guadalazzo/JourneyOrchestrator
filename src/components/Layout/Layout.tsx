import { Outlet } from 'react-router-dom';
import './Layout.scss';

export default function Layout() {
  return (
    <div className="layout">
      <nav>
        <h1 className="main-title">Journey to MARS</h1>
      </nav>
      <Outlet />
    </div>
  );
}
