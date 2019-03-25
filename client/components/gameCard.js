import React from 'react';
import {Card, Table} from 'semantic-ui-react';
import PreviewCard from './previewCard';
import LiveCard from './LiveCard';
import FinalCard from './FinalCard';
import WinProbability from './winProbability';
import {connect} from 'react-redux';
import {winProbability} from '../store';

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
  // console.log('gameCard props', props);
  let homeTeam;
  let awayTeam;

  try {
    homeTeam = `bbclub-${nameAbbrevMatch[props.game.homeTeam].toLowerCase()}`;
  } catch (err) {
    homeTeam = '';
    console.error(err);
  }
  try {
    awayTeam = `bbclub-${nameAbbrevMatch[props.game.awayTeam].toLowerCase()}`;
  } catch (err) {
    awayTeam = '';
    console.error(err);
  }

  return (
    <Card className="gameCard">
      <Card.Content>
        <Card.Header>
          {props.game.status} -{' '}
          {props.game.status == 'Final'
            ? ''
            : props.game.inningTop ? 'Top ' : 'Bot. '}
          {props.game.inning}
        </Card.Header>
        <Table
          className="lineScore"
          basic="very"
          celled
          collapsing
          unstackable
          compact
        >
          {/* <div id="one"> */}
          {/* <div id="two"> */}
          <Table.Body className="gameTable">
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
            {/* Away Team */}
            <Table.Row>
              <Table.Cell>
                <div className="teamName">
                  <div className="icon">
                    <i className={awayTeam} />
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
          </Table.Body>
          {/* </div> */}
          {/* </div> */}
        </Table>
      </Card.Content>
      {props.game.status == 'Preview' ? (
        <PreviewCard
          preview={{
            homeProbable: props.game.homeProbable,
            awayProbable: props.game.awayProbable
          }}
        />
      ) : props.game.status == 'Live' || props.game.status == 'In Progress' ? (
        <div>
          <LiveCard game={props.game} />
          <Card.Content>
            <WinProbability />
          </Card.Content>
        </div>
      ) : props.game.status == 'Final' ? (
        <FinalCard game={props.game} />
      ) : (
        <div />
      )}
    </Card>
  );
};

const mapState = state => {
  console.log('gC state is', state);
  return {
    //something
  };
};

const mapDispatch = dispatch => {
  return {
    getWP: id => dispatch(winProbability(id))
  };
};

// export default GameCard;
export default connect(mapState, mapDispatch)(GameCard);
