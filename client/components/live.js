import React from 'react';
import {connect} from 'react-redux';
import GameCard from './gameCard';

const Live = props => {
  props.games.length
    ? console.log('prop games', props.games)
    : console.log('no games');
  return (
    <div className="cardTable">
      {props.games.length ? (
        props.games.map(game => {
          return <GameCard game={game} />;
        })
      ) : (
        <div>Something</div>
      )}
    </div>
  );
};

const mapState = state => {
  return {
    games: state.games.games
  };
};

const mapDispatch = dispatch => {
  return {
    //something here
  };
};

export default connect(mapState, mapDispatch)(Live);
