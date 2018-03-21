import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Counter from '../Counter/Counter.jsx';
import * as ROUTES from '../../constants/routes';
import './Exercise.css';

const propTypes = {
  exerciseId: PropTypes.string.isRequired,
  updater: PropTypes.func.isRequired,
};

const Exercise = ({ exerciseId, updater }) => (
  <div className="sc-exercise">
    <div className="sc-exercise__counter">
      <Counter key={exerciseId} exerciseId={exerciseId} updater={updater} />
    </div>
    <Link
      className="sc-exercise__button"
      to={{
        pathname: `${ROUTES.EXERCISEDETAILS}${exerciseId}`,
        state: {
          action: 'push',
        },
      }}
      href={`${ROUTES.EXERCISEDETAILS}${exerciseId}`}
    >
      &gt;
    </Link>
  </div>
);

Exercise.propTypes = propTypes;

export default Exercise;
