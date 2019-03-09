import React from 'react';
import {Card, Table} from 'semantic-ui-react';

const nameAbbrevMatch = {
  'Boston Red Sox': 'BOS',
  'New York Yankees': 'NYY',
  'Tampa Bay Rays': 'TB',
  'Baltimore Orioles': 'BAL',
  'Toronto Blue Jays': 'TOR',
  'Detroit Tigers': 'DET',
  'Cleveland Indians': 'CLE',
  'Kansas City Royals': 'KCA',
  'Minnesota Twins': 'MIN',
  'Chicago White Sox': 'CHA',
  'Oakland Athletics': 'OAK',
  'Texas Rangers': 'TEX',
  'Los Angeles Angels': 'LAA',
  'Seattle Mariners': 'SEA',
  'Houston Astros': 'HOU',
  'Atlanta Braves': 'ATL',
  'Washington Nationals': 'WSH',
  'Philadelphia Phillies': 'PHI',
  'New York Mets': 'NYM',
  'Miami Marlins': 'MIA',
  'Pittsburgh Pirates': 'PIT',
  'St. Louis Cardinals': 'STL',
  'Cincinnati Reds': 'CIN',
  'Chicago Cubs': 'CHC',
  'Milwaukee Brewers': 'MIL',
  'Los Angeles Dodgers': 'LAD',
  'Arizona Diamondbacks': 'ARI',
  'Colorado Rockies': 'COL',
  'San Francisco Giants': 'SFN',
  'San Diego Padres': 'SDN'
};

const GameCard = props => {
  const homeTeam = `bbclub-${nameAbbrevMatch[
    props.game.homeTeam
  ].toLowerCase()}`;
  const awayTeam = `bbclub-${nameAbbrevMatch[
    props.game.awayTeam
  ].toLowerCase()}`;

  return (
    <Card className="gameCard">
      <Card.Content>
        <Card.Header>{props.game.status}</Card.Header>
        <Table className="lineScore" basic="very" celled collapsing>
          <Table.Body>
            {/* Runs, Hits Errors (Top Row) */}
            <Table.Row>
              <Table.Cell />
              <Table.Cell className="teamStats">
                <strong>R</strong>
              </Table.Cell>
              <Table.Cell className="teamStats">
                <strong>H</strong>
              </Table.Cell>
              <Table.Cell className="teamStats">
                <strong>E</strong>
              </Table.Cell>
            </Table.Row>
            {/* Home Team */}
            <Table.Row>
              <Table.Cell>
                <div className="teamName">
                  <div className="icon">
                    <i className={homeTeam} />
                  </div>
                  {props.game.homeTeam}
                </div>
              </Table.Cell>
              <Table.Cell className="teamStats">
                {props.game.teamStats.home.runs}
              </Table.Cell>
              <Table.Cell className="teamStats">
                {props.game.teamStats.home.hits}
              </Table.Cell>
              <Table.Cell className="teamStats">
                {props.game.teamStats.home.errors}
              </Table.Cell>
            </Table.Row>
            {/* Away Team */}
            <Table.Row>
              <Table.Cell>
                <div className="teamName">
                  <div className="icon">
                    <i className={awayTeam} />{' '}
                  </div>
                  {props.game.awayTeam}
                </div>
              </Table.Cell>
              <Table.Cell className="teamStats">
                {props.game.teamStats.away.runs}
              </Table.Cell>
              <Table.Cell className="teamStats">
                {props.game.teamStats.away.hits}
              </Table.Cell>
              <Table.Cell className="teamStats">
                {props.game.teamStats.away.errors}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card.Content>
      {props.game.status == 'Preview' ? (
        <Card.Content>
          <h5>Probable Pitchers</h5>
          <div className="situation">
            <div>
              <div>{props.game.homeProbable.fullName}</div>
              <img
                className="mugshot"
                src={`https://gd.mlb.com/images/gameday/mugshots/mlb/${
                  props.game.homeProbable.id
                }.jpg`}
              />
            </div>
            <div>
              <div>{props.game.awayProbable.fullName}</div>
              <img
                className="mugshot"
                src={`https://gd.mlb.com/images/gameday/mugshots/mlb/${
                  props.game.awayProbable.id
                }.jpg`}
              />
            </div>
          </div>
        </Card.Content>
      ) : props.game.status == 'Live' ? (
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
                </tr>
                {makeBallsStrikes}
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
      ) : (
        <div />
      )}
    </Card>
  );
};

export default GameCard;

const makeBallsStrikes = game => {
  const bS = [];
  const max = maxBs(game);
  for (let i = 0; i < max; i++) {
    bS.push(
      <tr>
        {game.balls >= i + 1 ? (
          <td>
            <div className="ball" />
          </td>
        ) : (
          <td>
            <div />i
          </td>
        )}
      </tr>
    );
  }
};

const maxBs = game => {
  return Math.max(game.balls, game.strikes);
};
