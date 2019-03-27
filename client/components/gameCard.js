import React, {Component} from 'react';
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

class GameCard extends Component {
  // console.log('gameCard this.props', this.props);

  componentDidMount() {
    // console.log('GC mounted', this.props);
    this.props.getWP(this.props.game.gamePk);
    setInterval(() => {
      // console.log('inside interval');
      this.props.getWP(this.props.game.gamePk);
    }, 30000);
  }
  render() {
    let homeTeam;
    let awayTeam;

    // console.log('descriptions', this.props.game.descriptions);
    try {
      homeTeam = `bbclub-${nameAbbrevMatch[
        this.props.game.homeTeam
      ].toLowerCase()}`;
    } catch (err) {
      homeTeam = '';
    }
    try {
      awayTeam = `bbclub-${nameAbbrevMatch[
        this.props.game.awayTeam
      ].toLowerCase()}`;
    } catch (err) {
      awayTeam = '';
    }

    this.props.winProbability &&
      console.log('wP length:', this.props.winProbability.length);
    this.props.game.descriptions &&
      console.log('descriptions.length:', this.props.game.descriptions.length);
    return (
      <Card className="gameCard">
        <Card.Content>
          <Card.Header>
            {this.props.game.status} -{' '}
            {this.props.game.status == 'Final'
              ? ''
              : this.props.game.inningTop ? 'Top ' : 'Bot. '}
            {this.props.game.inning}
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
                    {this.props.game.awayTeam}
                  </div>
                </Table.Cell>
                <Table.Cell className="teamStats">
                  {this.props.game.teamStats.away.runs}
                </Table.Cell>
                <Table.Cell className="teamStats">
                  {this.props.game.teamStats.away.hits}
                </Table.Cell>
                <Table.Cell className="teamStats">
                  {this.props.game.teamStats.away.errors}
                </Table.Cell>
              </Table.Row>
              {/* Home Team */}
              <Table.Row>
                <Table.Cell>
                  <div className="teamName">
                    <div className="icon">
                      <i className={homeTeam} />
                    </div>
                    {this.props.game.homeTeam}
                  </div>
                </Table.Cell>
                <Table.Cell className="teamStats">
                  {this.props.game.teamStats.home.runs}
                </Table.Cell>
                <Table.Cell className="teamStats">
                  {this.props.game.teamStats.home.hits}
                </Table.Cell>
                <Table.Cell className="teamStats">
                  {this.props.game.teamStats.home.errors}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
            {/* </div> */}
            {/* </div> */}
          </Table>
        </Card.Content>
        {this.props.game.status == 'Preview' ? (
          <PreviewCard
            preview={{
              homeProbable: this.props.game.homeProbable,
              awayProbable: this.props.game.awayProbable
            }}
          />
        ) : this.props.game.status == 'Live' ||
        this.props.game.status == 'In Progress' ? (
          <div>
            <LiveCard game={this.props.game} />
            <Card.Content>
              <WinProbability
                wP={makeData(
                  this.props.winProbability,
                  this.props.game.allPlays
                )}
                inning={this.props.game.inning}
              />
            </Card.Content>
          </div>
        ) : this.props.game.status == 'Final' ? (
          <div>
            <FinalCard game={this.props.game} />
            <Card.Content>
              <WinProbability
                wP={makeData(
                  this.props.winProbability,
                  this.props.game.descriptions
                )}
                inning={this.props.game.inning}
              />
            </Card.Content>
          </div>
        ) : (
          <div />
        )}
      </Card>
    );
  }
}

const mapState = (state, ownprops) => {
  return {
    winProbability: state.games.winProbability[ownprops.game.gamePk]
  };
};

const mapDispatch = dispatch => {
  return {
    getWP: id => dispatch(winProbability(id))
  };
};

// export default GameCard;
export default connect(mapState, mapDispatch)(GameCard);

/**
 * Helper Methods
 */

const makeData = (data, plays) => {
  // const graphData = [{name: 'Home', data: []}, {name: 'Away', data: []}];
  const graphData = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      let point = {
        // inning: +data[i].about.inning + +data[i].count.outs * 0.2 * modifier,
        inning: +data[i].about.inning,
        play: plays[i],
        uv: data[i].homeTeamWinProbability,
        pv: data[i].awayTeamWinProbability
        // value: bottom
        //   ? data[i].homeTeamWinProbability
        //   : data[i].awayTeamWinProbability
      };
      graphData.push(point);
      // bottom ? graphData[0].data.push(point) : graphData[1].data.push(point);
      // graphData[0].
    }
  }
  return graphData;
};
