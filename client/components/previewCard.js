import React from 'react';
import {Card} from 'semantic-ui-react';
import PlayerCard from './playerCard';
import {connect} from 'react-redux';
import {stats} from '../store';

const PreviewCard = props => {
  // console.log('previewProps', props);

  let {homeProbable, awayProbable} = props.preview || {};
  if (!homeProbable) {
    homeProbable = {fullName: 'n/a', id: '00001'};
  } else if (!awayProbable) {
    awayProbable = {fullName: 'n/a', id: '00001'};
  }
  props.getStats({
    id: homeProbable.id,
    season: '2018',
    stats: 'season',
    group: 'pitching'
  });

  props.getStats({
    id: awayProbable.id,
    season: '2018',
    stats: 'season',
    group: 'pitching'
  });
  // console.log('in preview', homeProbable, awayProbable);
  return (
    <Card.Content>
      <strong>
        <center>Probable Pitchers</center>
      </strong>

      <div className="situation">
        <PlayerCard player={awayProbable} />
        <PlayerCard player={homeProbable} />
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
