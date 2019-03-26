import React from 'react';
import {connect} from 'react-redux';
import PlayerCard from './playerCard';

const FinalCard = props => {
  // console.log('FC props', props);
  const {game} = props;
  return (
    <div className="finalCard">
      <div className="pitcherFinal">
        <div>Winning Pitcher</div>
        <PlayerCard player={{...game.decisions.winner}} />
        <div>Losing Pitcher</div>
        <PlayerCard player={{...game.decisions.loser}} />
        <div>Save</div>
      </div>
      <div className="hitterFinal">
        <div>Home Runs</div>
      </div>
    </div>
  );
};

const mapDispatch = dispatch => {
  return {
    getStats: profile => dispatch(stats(profile))
  };
};

// export default FinalCard;
export default connect(null, mapDispatch)(FinalCard);
