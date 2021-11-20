import React from 'react';
import { Link } from 'react-router-dom';
import './../App.css';
import './../styles/Dashboard.scss';

export default function Dashboard() {
  return (
    <>
      <div id="div-dashboard">
        <h1>Explore new habits.</h1>

        <div>
          <ul>
            <li>
              <Link className="link" to="/category/languages/list">
                languages
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
      </div>
      <div id="div-dashboard-text">
        Stare at owner accusingly then wink i cry and cry and cry unless you pet
        me, and then maybe i cry just for fun bite the neighbor's bratty kid for
        rub face on owner for if it smells like fish eat as much as you wish.
        Kitty stare at ceiling, Gate keepers of hell meowsiers playing with
        balls of wool play with twist ties, so this cat happen now, it was too
        purr-fect!!!.
      </div>
      <section id="scn-dashboard-img"></section>
    </>
  );
}
