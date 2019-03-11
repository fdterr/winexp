import React from 'react';

const PlayerCard = props => {
  return (
    <div className="flexCenter">
      <div>{props.player.fullName}</div>
      <img
        className="mugshot"
        src={`https://gd.mlb.com/images/gameday/mugshots/mlb/${
          props.player.id
        }.jpg`}
        onError={e => {
          e.target.onerror = null;
          e.target.src =
            'https://prod-gameday.mlbstatic.com/responsive-gameday-assets/1.2.0/images/players/player-default@2x.png';
        }}
      />
    </div>
  );
};

export default PlayerCard;
