import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <ul>
        <li>
          <Link className="link" to="/category/languages/list">
            Languages
          </Link>
        </li>

        <li>
          <Link className="link" to="/category/nutrition/list">
            nutrition
          </Link>
        </li>
        <li>
          <Link className="link" to="/category/organization/list">
            organization
          </Link>
        </li>
        <li>
          <Link className="link" to="/category/relationships/list">
            relationships
          </Link>
        </li>
        <li>
          <Link className="link" to="/category/social-media/list">
            social media
          </Link>
        </li>
        <li>
          <Link className="link" to="/category/work/list">
            work
          </Link>
        </li>
        <li>
          <Link className="link" to="/category/fitness/list">
            fitness
          </Link>
        </li>
        <li>
          <Link className="link" to="/category/health/list">
            health
          </Link>
        </li>
      </ul>
    </div>
  );
}
