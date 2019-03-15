import React from 'react';
import {Card} from 'semantic-ui-react';
import PlayerCard from './playerCard';
import {connect} from 'react-redux';
import {stats} from '../store';

const PreviewCard = props => {
  console.log('previewProps', props);
  return (
    <Card.Content>
      <strong>
        <center>Probable Pitchers</center>
      </strong>

      <div className="situation">
        <PlayerCard
          player={{
            fullName: props.preview.awayProbable.fullName,
            id: props.preview.awayProbable.id
          }}
        />
        <PlayerCard
          player={{
            fullName: props.preview.homeProbable.fullName,
            id: props.preview.homeProbable.id
          }}
        />
        {/* </div> */}
      </div>
    </Card.Content>
  );
};

// export default PreviewCard;

/**
 * Redux
 */

const mapDispatch = dispatch => {
  return {
    getStats: profile => dispatch(stats(profile))
  };
};

export default connect(null, mapDispatch)(PreviewCard);
