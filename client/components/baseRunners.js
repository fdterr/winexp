import React from 'react';

const BaseRunners = props => {
  // console.log('runners', props.runners);
  const {first, second, third} = props.runners;
  let firstBase = 'base ',
    secondBase = 'base ',
    thirdBase = 'base ',
    home = 'base home';

  if (first) {
    firstBase = firstBase + 'occupied';
  } else {
    firstBase = firstBase + 'unoccupied';
  }
  if (second) {
    secondBase = secondBase + 'occupied';
  } else {
    secondBase = secondBase + 'unoccupied';
  }
  if (third) {
    thirdBase = thirdBase + 'occupied';
  } else {
    thirdBase = thirdBase + 'unoccupied';
  }

  return (
    <div className="runners">
      <div className={secondBase} />
      <div className={firstBase} />
      <div className={thirdBase} />
      <div className={home} />
    </div>
  );
};

export default BaseRunners;
