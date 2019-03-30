import React, {Component} from 'react';
import {connect} from 'react-redux';
import GameCard from './gameCard';
import {Header, Image, Segment, Transition} from 'semantic-ui-react';
import Draggable from 'react-draggable'; // The default

class Live extends Component {
  constructor() {
    super();
    this.state = {animation: 'fade up', duration: 500, visible: false};
    this.handleVisibility = this.handleVisibility.bind(this);
  }
  handleChange = (e, {name, value}) =>
    this.setState({...this.state, [name]: value});

  handleVisibility() {
    // e.preventDefault();
    console.log('inside hV');
    this.setState({...this.state, visible: !this.state.visible});
  }
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
    const {animation, duration, visible} = this.state;
    this.props.games.length
      ? console.log('prop games', this.props.games)
      : console.log('no games');
    return (
      <div>
        <div className="cardTable">
          {this.props.games.length ? (
            this.props.games.map(game => {
              return (
                <GameCard
                  // popup={this.handleClick}
                  // close={this.handleClose}
                  game={game}
                  key={game.gamePk}
                  popup={this.handleVisibility}
                />
              );
            })
          ) : (
            <div>Something</div>
          )}
        </div>
        <Draggable
          // axis="x"
          handle=".handle"
          defaultPosition={{x: 0, y: 0}}
          position={null}
          grid={[25, 25]}
          scale={1}
          onStart={() => this.handleStart}
          onDrag={() => this.handleDrag}
          onStop={() => this.handleStop}
        >
          <div
            className="handle"
            style={{
              left: '40%',
              position: 'fixed',
              top: '50%',
              zIndex: 1000
            }}
          >
            <Transition.Group animation={animation} duration={duration}>
              {visible && (
                <Segment>
                  <Header>This is a controlled portal</Header>
                  <strong className="handle">
                    <div>Drag here</div>
                  </strong>
                  <p>
                    Portals have tons of great callback functions to hook into.
                  </p>
                  <p>To close, simply click the close button or click away</p>
                </Segment>
              )}
            </Transition.Group>
          </div>
        </Draggable>
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
