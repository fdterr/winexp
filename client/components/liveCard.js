import React from 'react';
import {Card} from 'semantic-ui-react';

const LiveCard = props => {
  return (
    <Card.Content>
      <div className="situation">
        <div className="situationPlayer">
          <strong>Pitching</strong>
          {props.game.pitcher.fullName}
          <img
            className="mugshot"
            src={`https://gd.mlb.com/images/gameday/mugshots/mlb/${
              props.game.pitcher.id
            }.jpg`}
            onError={e => {
              e.target.onerror = null;
              e.target.src =
                'https://prod-gameday.mlbstatic.com/responsive-gameday-assets/1.2.0/images/players/player-default@2x.png';
            }}
          />
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>B</strong>
              </td>
              <td>
                <strong>S</strong>
              </td>
              <td>
                <strong>O</strong>
              </td>
            </tr>
            {makeBallsStrikes(props.game)}
          </tbody>
        </table>
        <div className="situationPlayer">
          <strong>Batting</strong>
          {props.game.batter.fullName}
          <img
            className="mugshot"
            src={`https://gd.mlb.com/images/gameday/mugshots/mlb/${
              props.game.batter.id
            }.jpg`}
            onError={e => {
              e.target.onerror = null;
              e.target.src =
                'https://prod-gameday.mlbstatic.com/responsive-gameday-assets/1.2.0/images/players/player-default@2x.png';
            }}
          />
        </div>
      </div>
    </Card.Content>
  );
};

export default LiveCard;

const makeBallsStrikes = game => {
  if (game.status == 'Live') {
    console.log('inside bS', game.balls, game.strikes);
  }
  const bS = [];
  // const max = maxBSO(game);
  const max = 4;
  for (let i = 0; i < max; i++) {
    bS.push(
      <tr>
        {game.balls >= i + 1 ? (
          <td>
            <div className="pitch ball" />
          </td>
        ) : (
          <td>
            <div className="pitch notBall" />
          </td>
        )}
        {game.strikes >= i + 1 ? (
          <td>
            <div className="pitch strike" />
          </td>
        ) : i < max - 1 ? (
          <td>
            <div className="pitch notStrike" />
          </td>
        ) : (
          <td>
            <div />
          </td>
        )}
        {game.outs >= i + 1 ? (
          <td>
            <div className="pitch out" />
          </td>
        ) : i < max - 1 ? (
          <td>
            <div className="pitch notOut" />
          </td>
        ) : (
          <td>
            <div />
          </td>
        )}
      </tr>
    );
  }
  console.log('returning', bS);
  return bS;
};

const maxBSO = game => {
  return Math.max(game.balls, game.strikes, game.outs);
};
