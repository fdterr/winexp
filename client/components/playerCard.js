import React from 'react';
import {connect} from 'react-redux';

const PlayerCard = props => {
  // console.log('player', props.player.id);
  return (
    <div className="flexCenter">
      <div className="imageStats">
        <div>
          <img
            className="mugshot"
            src={`https://gd.mlb.com/images/gameday/mugshots/mlb/${props.player
              .id || 0}.jpg`}
            onError={e => {
              e.target.onerror = null;
              e.target.src =
                'https://prod-gameday.mlbstatic.com/responsive-gameday-assets/1.2.0/images/players/player-default@2x.png';
            }}
          />
        </div>
        <div className="playerStats">
          <div>
            <strong>Season:</strong>
            {props.stats &&
              props.stats.stats &&
              // props.stats.stats.stat &&
              makeStats(props.stats.type, props.stats.stats.stat)}
            {!props.stats && (
              <div>
                n/a <br />
              </div>
            )}
          </div>
          {props.live && <div>{currentStats()}</div>}
        </div>
      </div>
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    stats: state.games.stats[ownProps.player.id]
  };
};

// const mapDispatch = dispatch => {
//   return {
//     getStats: profile => dispatch(stats(profile))
//   };
// };

export default connect(mapState, null)(PlayerCard);

/**
 * Helper Methods
 */

const makeStats = (type, stat) => {
  if (type == 'pitching') {
    return pitcherStats(stat);
  } else {
    return batterStats(stat);
  }
};

const pitcherStats = stat => {
  return (
    <div className="playerLine">
      <strong>W:</strong> {stat.wins} <strong>L:</strong> {stat.losses} <br />
      <strong>ERA:</strong> {stat.era} <br />
      <strong>IP:</strong> {stat.inningsPitched}
    </div>
    // <table>
    //   <tr>
    //     <td>W: {stat.wins}</td>
    //     <td>L: {stat.losses}</td>
    //   </tr>
    //   <tr>
    //     <td />
    //     <td>ERA: {stat.era}</td>
    //   </tr>
    // </table>
  );
};

const batterStats = stat => {
  return (
    <div className="playerLine">
      {stat.avg}/{stat.obp}/{stat.slg}, {stat.homeRuns} HR, {stat.rbi} RBI
    </div>
  );
};
