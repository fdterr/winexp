import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Header, Segment, TransitionablePortal} from 'semantic-ui-react';

class Player extends Component {
  constructor() {
    super();
    this.state = {open: false};
  }
  getInitialState = () => {
    return {
      activeDrags: 0,
      deltaPosition: {
        x: 0,
        y: 0
      },
      controlledPosition: {
        x: -400,
        y: 200
      }
    };
  };

  handleDrag = (e, ui) => {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });
  };

  // onStart = () => {
  //   this.setState({activeDrags: ++this.state.activeDrags});
  // };

  // onStop = () => {
  //   this.setState({activeDrags: --this.state.activeDrags});
  // };

  // For controlled component
  adjustXPos = e => {
    e.preventDefault();
    e.stopPropagation();
    const {x, y} = this.state.controlledPosition;
    this.setState({controlledPosition: {x: x - 10, y}});
  };

  adjustYPos = e => {
    e.preventDefault();
    e.stopPropagation();
    const {controlledPosition} = this.state;
    const {x, y} = controlledPosition;
    this.setState({controlledPosition: {x, y: y - 10}});
  };

  onControlledDrag = (e, position) => {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };
  // console.log('player', this.props.player.id);
  handleClick = () => {
    this.setState({...this.state, open: !this.state.open});
  };

  handleClose = () => {
    this.setState({...this.state, open: false});
  };
  render() {
    console.log('player props', this.props);
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {deltaPosition, controlledPosition} = this.state;
    const {open} = this.state;
    const handleVisibility = this.props.popup;
    console.log('hV prop', handleVisibility);
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
        <div onClick={handleVisibility} className="playerName">
          {this.props.player.fullName || 'n/a'}
        </div>
        {/* <div>

          <Draggable
            axis="x"
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={null}
            grid={[25, 25]}
            scale={1}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}
          >
            <TransitionablePortal onClose={this.handleClose} open={open}>
              <Segment
                style={{
                  left: '40%',
                  position: 'fixed',
                  top: '50%',
                  zIndex: 1000
                }}
              >
                <Header>This is a controlled portal</Header>
                <strong className="handle">
                  <div>Drag here</div>
                </strong>
                <p>
                  Portals have tons of great callback functions to hook into.
                </p>
                <p>To close, simply click the close button or click away</p>
              </Segment>
            </TransitionablePortal>
          </Draggable>
        </div> */}
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
