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

    const promises = [];
    for (let i = 0; i < games.length; i++) {
      const linePromise = lineScore(games[i].gamePk);
      promises.push(linePromise);
    }

    await Promise.all(promises);

    const lineScores = [];
    for (let i = 0; i < promises.length; i++) {
      lineScores.push(await promises[i]);
    }

    for (let i = 0; i < lineScores.length; i++) {
      let currentGame = lineScores[i];
      let game = newGame();
      game.homeTeam = games[i].teams.home.team.name;
      game.awayTeam = games[i].teams.away.team.name;
      game.pitcher = pitcher(currentGame);
      game.batter = batter(currentGame);
      game.currentInning = currentInning(currentGame);
      game.runners = runners(currentGame);
      game.homeScore = score(currentGame).homeScore;
      game.awayScore = score(currentGame).awayScore;
      game.inningTop = topOfInning(currentGame);
      game.outs = situation(currentGame).outs;
      game.balls = situation(currentGame).balls;
      game.strikes = situation(currentGame).strikes;
      game.status = games[i].status.abstractGameState;
      game.teamStats = teamStats(currentGame);

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
