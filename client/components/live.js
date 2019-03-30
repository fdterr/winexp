import React, {Component} from 'react';
import {connect} from 'react-redux';
import GameCard from './gameCard';

class Live extends Component {
  // constructor() {
  //   super();
  //   this.state = {open: false};
  // }

  // handleClick = () => {
  //   this.setState({...this.state, open: !this.state.open});
  // };

  // handleClose = () => {
  //   this.setState({...this.state, open: false});
  // };

  render() {
    this.props.games.length
      ? console.log('prop games', this.props.games)
      : console.log('no games');
    return (
      <div className="cardTable">
        {this.props.games.length ? (
          this.props.games.map(game => {
            return (
              <GameCard
                // popup={this.handleClick}
                // close={this.handleClose}
                game={game}
                key={game.gamePk}
              />
            );
          })
        ) : (
          <div>Something</div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    games: state.games.games
  };
};

const mapDispatch = dispatch => {
  return {
    //something here
  };
};

export default connect(mapState, mapDispatch)(Live);
