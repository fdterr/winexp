import axios from 'axios';

const initialState = {
  games: [],
  stats: {
    pitchers: {},
    hitters: {}
  },
  winProbability: {}
};
/**
 * Action Types
 */
const GAMES = 'GAMES';
const GET_STATS = 'GET_STATS';
const WIN_PROBABILITY = 'WIN_PROBABILITY';

/**
 * Action Creators
 */
const getGames = games => ({type: GAMES, games});
const getStats = stats => ({type: GET_STATS, stats});
const getWP = game => {
  // console.log('inside WP', game);
  return {type: WIN_PROBABILITY, game};
};

/**
 * Thunk Creators
 */

export const games = () => async dispatch => {
  try {
    let returnGames = [];
    const games = await todayGames();

    // const linePromises = [];
    // for (let i = 0; i < games.length; i++) {
    //   const linePromise = lineScore(games[i].gamePk);
    //   linePromises.push(linePromise);
    // }

    const liveFeedPromises = [];
    for (let i = 0; i < games.length; i++) {
      const livePromise = liveFeed(games[i].gamePk);
      liveFeedPromises.push(livePromise);
    }

    // const boxScorePromises = [];
    // for (let i = 0; i < games.length; i++) {
    //   const bsPromise = boxScore(games[i].gamePk);
    //   boxScorePromises.push(bsPromise);
    // }

    // await Promise.all(linePromises);
    await Promise.all(liveFeedPromises);
    // await Promise.all(boxScorePromises);

    // const lineScores = [];
    const liveFeeds = [];
    for (let i = 0; i < liveFeedPromises.length; i++) {
      // lineScores.push(await linePromises[i]);
      liveFeeds.push(await liveFeedPromises[i]);
    }

    for (let i = 0; i < liveFeedPromises.length; i++) {
      let currentLiveFeed = liveFeeds[i];
      // let currentLineScore = lineScores[i];
      let currentLineScore = currentLiveFeed.liveData.linescore;

      let game = newGame();
      game.gamePk = games[i].gamePk;
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
      game.status = games[i].status.detailedState;
      game.teamStats = teamStats(currentLineScore);
      game.preview = {};
      game.decisions = decisions(currentLiveFeed);
      // game.allPlays = currentLiveFeed.liveData.plays.allPlays;
      // console.log(
      //   'getting games, allPlays is',
      //   descriptions(currentLiveFeed.liveData.plays.allPlays)
      // );
      game.descriptions = descriptions(currentLiveFeed.liveData.plays.allPlays);

      if (
        game.status == 'Preview' ||
        game.status == 'Pre-Game' ||
        game.status == 'Warmup' ||
        game.status == 'Scheduled'
      ) {
        const {homeProbable, awayProbable} = probablePitchers(currentLiveFeed);
        // console.log('homeProbable', homeProbable);
        game.homeProbable = homeProbable;
        game.awayProbable = awayProbable;
      }

      returnGames.push(game);
      // console.log('game is', game);
    }
    // console.log('new game is', returnGames[0]);

    returnGames.sort((a, b) => {
      if (a.status == b.status) {
        return 0;
      } else if (b.status == 'Final') {
        return -1;
      } else if (a.status == 'Final') {
        return 1;
      } else if (b.status == 'Preview' || b.status == 'Pre-Game') {
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
    console.error(err, profile);
  }
};

export const winProbability = game => async dispatch => {
  try {
    const {data} = await axios.get(
      `http://statsapi.mlb.com/api/v1/game/${game}/winProbability`
    );
    dispatch(getWP({id: game, wp: data}));
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
    case WIN_PROBABILITY:
      return {
        ...state,
        winProbability: {
          ...state.winProbability,
          [action.game.id]: action.game.wp
        }
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
    `http://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`
  );
  return data;
};

const boxScore = async gamePk => {
  const {data} = await axios.get(
    `http://statsapi.mlb.com/api/v1/game/${gamePk}/feed/live`
  );
  return data;
};

// const winProbability = async gamePk => {
//   const {data} = await axios.get(
//     `http://statsapi.mlb.com/api/v1/game/${gamePk}/feed/live`
//   );
//   return data;
// };

const todayGames = async () => {
  const {data} = await axios.get(
    // 'http://statsapi.mlb.com/api/v1/schedule?sportId=1&date=03/25/2019'
    'http://statsapi.mlb.com/api/v1/schedule?sportId=1'
  );
  return data.dates[0].games;
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

const decisions = liveFeed => {
  try {
    return liveFeed.liveData.decisions;
  } catch (err) {
    console.error(err);
  }
};

const descriptions = allPlays => {
  const plays = [];
  for (let i = 0; i < allPlays.length; i++) {
    plays.push(allPlays[i].result.description);
  }
  return plays;
};
