import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="list">List</Link>
            </li>
            <li>
              <Link to="view">View</Link>
            </li>
            <li>
              <Link to="write">Write</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
