import React from 'react';
import {Card} from 'semantic-ui-react';
import PlayerCard from './playerCard';

const LiveCard = props => {
  return (
    <Card.Content>
      <div className="situation">
        <div className="situationPlayer">
          <strong>Pitching</strong>
          <PlayerCard
            player={{
              fullName: props.game.pitcher.fullName,
              id: props.game.pitcher.id
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
          <PlayerCard
            player={{
              fullName: props.game.batter.fullName,
              id: props.game.batter.id
            }}
          />
        </div>
      </div>
    </Card.Content>
  );
};

export default LiveCard;

const makeBallsStrikes = game => {
  // if (game.status == 'Live') {
  //   console.log('inside bS', game.balls, game.strikes);
  // }
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
  // console.log('returning', bS);
  return bS;
};

const maxBSO = game => {
  return Math.max(game.balls, game.strikes, game.outs);
};
