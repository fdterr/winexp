import React from 'react';
import {connect} from 'react-redux';
import PlayerCard from './playerCard';
import {Card} from 'semantic-ui-react';

const FinalCard = props => {
  // console.log('FC props', props);
  const {game} = props;
  return (
    <Card.Content className="finalPitchers">
      <div className="pitcherFinal">
        <div>
          {/* {game.decisions.winner.fullName} */}
          Winning Pitcher
        </div>
        <PlayerCard live={false} player={{...game.decisions.winner}} />
      </div>
      <div className="pitcherFinal">
        Losing Pitcher
        <PlayerCard live={false} player={{...game.decisions.loser}} />
      </div>
      {/* <div className="hitterFinal">
        <div>Home Runs</div>
      </div> */}
    </Card.Content>
  );
};

const mapDispatch = dispatch => {
  return {
    getStats: profile => dispatch(stats(profile))
  };
};

// export default FinalCard;
export default connect(null, mapDispatch)(FinalCard);
