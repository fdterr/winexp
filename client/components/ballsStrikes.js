import React from 'react';

const BallsStrikes = props => {
  console.log('bso props', props.bso);
  const {balls, strikes, outs} = props.bso;
  return (
    <div className="ballsStrikesOuts">
      {balls}-{strikes}, {outs} outs
    </div>
  );
};

export default BallsStrikes;
