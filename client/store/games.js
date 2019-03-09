import axios from 'axios';

const initialState = {
  games: []
};
/**
 * Action Types
 */
const GAMES = 'GAMES';

/**
 * Action Creators
 */
const getGames = games => ({type: GAMES, games});

/**
 * Thunk Creators
 */

export const games = () => async dispatch => {
  try {
    let returnGames = [];
    const {data} = await axios.get(
      'http://statsapi.mlb.com/api/v1/schedule?sportId=1'
    );
    const games = data.dates[0].games;

    const linePromises = [];
    for (let i = 0; i < games.length; i++) {
      const linePromise = lineScore(games[i].gamePk);
      linePromises.push(linePromise);
    }

    const liveFeedPromises = [];
    for (let i = 0; i < games.length; i++) {
      const livePromise = liveFeed(games[i].gamePk);
      liveFeedPromises.push(livePromise);
    }

    await Promise.all(linePromises);
    await Promise.all(liveFeedPromises);

    console.log('linePromises', linePromises);
    console.log('liveFeedPromises', liveFeedPromises);

    const lineScores = [];
    const liveFeeds = [];
    for (let i = 0; i < linePromises.length; i++) {
      lineScores.push(await linePromises[i]);
      liveFeeds.push(await liveFeedPromises[i]);
    }

    console.log('liveFeeds are', liveFeeds);

    for (let i = 0; i < lineScores.length; i++) {
      let currentLineScore = lineScores[i];
      let currentLiveFeed = liveFeeds[i];

      let game = newGame();
      game.homeTeam = games[i].teams.home.team.name;
      game.awayTeam = games[i].teams.away.team.name;
      game.pitcher = pitcher(currentLineScore);
      game.batter = batter(currentLineScore);
      game.currentInning = currentInning(currentLineScore);
      game.runners = runners(currentLineScore);
      game.homeScore = score(currentLineScore).homeScore;
      game.awayScore = score(currentLineScore).awayScore;
      game.inningTop = topOfInning(currentLineScore);
      game.outs = situation(currentLineScore).outs;
      game.balls = situation(currentLineScore).balls;
      game.strikes = situation(currentLineScore).strikes;
      game.status = games[i].status.abstractGameState;
      game.teamStats = teamStats(currentLineScore);
      game.preview = {};

      // console.log('preview?', game.status == 'Preview');
      if (game.status == 'Preview') {
        const {homeProbable, awayProbable} = probablePitchers(currentLiveFeed);
        // console.log('homeProbable', homeProbable);
        game.homeProbable = homeProbable.fullName;
        game.awayProbable = awayProbable.fullName;
      }

      console.log('new game is', game);
      returnGames.push(game);
    }

    dispatch(getGames(returnGames));
  } catch (err) {
    console.error(err);
  }
};

/**
 * Reducer
 */

export default function(state = initialState, action) {
  switch (action.type) {
    case GAMES:
      return {...state, games: action.games};
    default:
      return {...state};
  }
}

/**
 * Helper Methods
 */

const newGame = () => {
  return {
    homeTeam: '',
    awayTeam: '',
    homeScore: 0,
    awayScore: 0,
    pitcher: '',
    batter: '',
    currentInning: 0,
    inningTop: true,
    runners: {}
  };
};

const lineScore = async gamePk => {
  const {data} = await axios.get(
    `http://statsapi.mlb.com/api/v1/game/${gamePk}/linescore`
  );
  return data;
};

const liveFeed = async gamePk => {
  const {data} = await axios.get(
    `http://statsapi.mlb.com/api/v1/game/${gamePk}/feed/live`
  );
  // console.log('live feed data is', data);
  return data;
};

const topOfInning = lineScore => {
  return lineScore.isTopInning;
};

const pitcher = lineScore => {
  return lineScore.defense.pitcher;
};

const batter = lineScore => {
  return lineScore.offense.batter;
};

const currentInning = lineScore => {
  return lineScore.currentInning;
};

const runners = lineScore => {
  return {
    first: lineScore.offense.first || false,
    second: lineScore.offense.second || false,
    third: lineScore.offense.third || false
  };
};

const score = lineScore => {
  return {
    homeScore: lineScore.teams.home.runs,
    awayScore: lineScore.teams.away.runs
  };
};

const situation = lineScore => {
  return {
    outs: lineScore.outs,
    strikes: lineScore.strikes,
    balls: lineScore.balls
  };
};

const teamStats = lineScore => {
  return {
    home: {
      hits: lineScore.teams.home.hits,
      runs: lineScore.teams.home.runs,
      errors: lineScore.teams.home.errors
    },
    away: {
      hits: lineScore.teams.away.hits,
      runs: lineScore.teams.away.runs,
      errors: lineScore.teams.away.errors
    }
  };
};

const probablePitchers = game => {
  return {
    homeProbable: game.gameData.probablePitchers.home,
    awayProbable: game.gameData.probablePitchers.away
  };
};
