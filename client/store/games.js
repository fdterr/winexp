import axios from 'axios';

const initialState = {
  games: [],
  stats: {
    pitchers: {},
    hitters: {}
  }
};
/**
 * Action Types
 */
const GAMES = 'GAMES';
const GET_STATS = 'GET_STATS';

/**
 * Action Creators
 */
const getGames = games => ({type: GAMES, games});
const getStats = stats => ({type: GET_STATS, stats});

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

    const lineScores = [];
    const liveFeeds = [];
    for (let i = 0; i < linePromises.length; i++) {
      lineScores.push(await linePromises[i]);
      liveFeeds.push(await liveFeedPromises[i]);
    }

    for (let i = 0; i < lineScores.length; i++) {
      let currentLineScore = lineScores[i];
      let currentLiveFeed = liveFeeds[i];

      let game = newGame();
      game.homeTeam = games[i].teams.home.team.name;
      game.awayTeam = games[i].teams.away.team.name;
      game.pitcher = pitcher(currentLineScore);
      game.batter = batter(currentLineScore);
      game.inning = currentInning(currentLineScore);
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
        game.homeProbable = homeProbable;
        game.awayProbable = awayProbable;
      }

      returnGames.push(game);
    }
    // console.log('new game is', returnGames[0]);

    returnGames.sort((a, b) => {
      if (a.status == b.status) {
        return 0;
      } else if (b.status == 'Final') {
        return -1;
      } else if (a.status == 'Final') {
        return 1;
      } else if (b.status == 'Preview') {
        return -1;
      } else {
        return 1;
      }
    });
    // console.log('store games are', returnGames);
    dispatch(getGames(returnGames));
  } catch (err) {
    console.error(err);
  }
};

export const stats = profile => async dispatch => {
  try {
    // console.log('type:', profile.type);
    const {data} = await axios.get(
      `http://statsapi.mlb.com/api/v1/people/${profile.id}/stats?stats=${
        profile.stats
      }&season=${profile.season}&group=${profile.group}`
    );
    // console.log('player stats:', data);
    dispatch(
      getStats({
        id: profile.id,
        stats: data.stats[0].splits[0],
        type: profile.group
      })
    );
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
    case GET_STATS:
      return {
        ...state,
        stats: {...state.stats, [action.stats.id]: action.stats}
      };
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
