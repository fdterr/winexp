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

    // this.props.winProbability &&
    //   console.log('wP length:', this.props.winProbability.length);
    // this.props.game.descriptions &&
    //   console.log('descriptions.length:', this.props.game.descriptions.length);
    // try {
    //   console.log(
    //     'makeData props are',
    //     this.props.game.homeTeam,
    //     this.props.game.awayTeam,
    //     this.props.winProbability,
    //     this.props.game.allPlays
    //   );
    // } catch (err) {
    //   console.error(err);
    // }
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
              {this.props.winProbability &&
                this.props.game.descriptions && (
                  <WinProbability
                    wP={makeData(
                      this.props.winProbability,
                      this.props.game.descriptions,
                      {
                        home: this.props.game.homeTeam,
                        away: this.props.game.awayTeam
                      }
                    )}
                    inning={this.props.game.inning}
                    teams={{
                      home: this.props.game.homeTeam,
                      away: this.props.game.awayTeam
                    }}
                  />
                )}
            </Card.Content>
          </div>
        ) : this.props.game.status == 'Final' ? (
          <div>
            <FinalCard game={this.props.game} />
            <Card.Content>
              {this.props.winProbability &&
                this.props.game.descriptions && (
                  <WinProbability
                    wP={makeData(
                      this.props.winProbability,
                      this.props.game.descriptions,
                      {
                        home: this.props.game.homeTeam,
                        away: this.props.game.awayTeam
                      }
                    )}
                    inning={this.props.game.inning}
                  />
                )}
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

const makeData = (data, plays, teams) => {
  console.log('making data', data, plays, teams);
  // if (data && plays && data.length !== plays.length) {
  //   console.log('lengths:', data.length, plays.length);
  //   // console.log('length mismatch', data, plays);
  // }
  if (plays[plays.length - 1] == undefined) {
    plays.pop();
    console.log(
      'popped from plays, data length:',
      data.length,
      'plays length',
      plays.length
    );
    while (data.length > plays.length) {
      data.pop();
    }
    console.log('post-balancing, data:', data.length, 'plays:', plays.length);
  }
  const graphData = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      let point = {
        inning: +data[i].about.inning,
        inningText:
          data[i].about.halfInning.charAt(0).toUpperCase() +
          data[i].about.halfInning.slice(1) +
          ' ' +
          data[i].about.inning,
        change: data[i].homeTeamWinProbabilityAdded,
        play: plays[i],
        [teams.home]: Math.round(data[i].homeTeamWinProbability * 10) / 10,
        [teams.away]: Math.round(data[i].awayTeamWinProbability * 10) / 10,
        home: teams.home,
        away: teams.away
      };
      if (point.play == undefined) {
        console.log('undefined point', data, plays);
      }
      // console.log('point is', point);
      graphData.push(point);
    }
  }
  return graphData;
};
