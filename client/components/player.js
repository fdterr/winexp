import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Header, Segment, TransitionablePortal} from 'semantic-ui-react';

class Player extends Component {
  constructor() {
    super();
    this.state = {open: false};
  }
  // console.log('player', this.props.player.id);
  handleClick = () => {
    this.setState({...this.state, open: !this.state.open});
  };

  handleClose = () => {
    this.setState({...this.state, open: false});
  };
  render() {
    const {open} = this.state;
    return (
      <div className="flexCenter">
        <img
          className="mugshot"
          src={`https://gd.mlb.com/images/gameday/mugshots/mlb/${this.props
            .player.id || 0}.jpg`}
          onError={e => {
            e.target.onerror = null;
            e.target.src =
              'https://prod-gameday.mlbstatic.com/responsive-gameday-assets/1.2.0/images/players/player-default@2x.png';
          }}
        />
        <div onClick={this.handleClick} className="playerName">
          {this.props.player.fullName || 'n/a'}
        </div>
        <TransitionablePortal onClose={this.handleClose} open={open}>
          <Segment
            style={{left: '40%', position: 'fixed', top: '50%', zIndex: 1000}}
          >
            <Header>This is a controlled portal</Header>
            <p>Portals have tons of great callback functions to hook into.</p>
            <p>To close, simply click the close button or click away</p>
          </Segment>
        </TransitionablePortal>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  // console.log('ownprops', ownProps.player);
  return {
    stats: state.games.stats[ownProps.player.id]
  };
};

// const mapDispatch = dispatch => {
//   return {
//     getStats: profile => dispatch(stats(profile))
//   };
// };

export default connect(mapState, null)(Player);

/**
 * Helper Methods
 */

const makeStats = (type, stat) => {
  if (type == 'pitching') {
    return pitcherStats(stat);
  } else {
    return batterStats(stat);
  }
};

const pitcherStats = stat => {
  return (
    <div className="playerLine">
      <strong>W:</strong> {stat.wins} <strong>L:</strong> {stat.losses} <br />
      <strong>ERA:</strong> {stat.era} <br />
      <strong>IP:</strong> {stat.inningsPitched}
    </div>
    // <table>
    //   <tr>
    //     <td>W: {stat.wins}</td>
    //     <td>L: {stat.losses}</td>
    //   </tr>
    //   <tr>
    //     <td />
    //     <td>ERA: {stat.era}</td>
    //   </tr>
    // </table>
  );
};

const batterStats = stat => {
  return (
    <div className="playerLine">
      {stat.avg}/{stat.obp}/{stat.slg}, {stat.homeRuns} HR, {stat.rbi} RBI
    </div>
  );
};
