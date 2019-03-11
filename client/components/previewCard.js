import React from 'react';
import {Card} from 'semantic-ui-react';

const PreviewCard = props => {
  console.log('previewProps', props);
  return (
    <Card.Content>
      <strong>
        <center>Probable Pitchers</center>
      </strong>

      <div className="situation">
        <div className="flexCenter">
          <div>{props.preview.awayProbable.fullName}</div>
          <img
            className="mugshot"
            src={`https://gd.mlb.com/images/gameday/mugshots/mlb/${
              props.preview.awayProbable.id
            }.jpg`}
          />
        </div>
        <div className="flexCenter">
          <div>{props.preview.homeProbable.fullName}</div>
          <img
            className="mugshot"
            src={`https://gd.mlb.com/images/gameday/mugshots/mlb/${
              props.preview.homeProbable.id
            }.jpg`}
          />
        </div>
      </div>
    </Card.Content>
  );
};

export default PreviewCard;
