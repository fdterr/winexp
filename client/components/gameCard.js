import React from 'react';
import {Card, Table} from 'semantic-ui-react';

const GameCard = props => {
  return (
    <Card className="gameCard">
      <Card.Content>
        <Card.Header>{props.game.status}</Card.Header>
      </Card.Content>
      <Table className="lineScore" basic="very" celled collapsing>
        <Table.Body>
          <Table.Row>
            <Table.Cell />
            <Table.Cell className="teamStats">
              <strong>R</strong>
            </Table.Cell>
            <Table.Cell className="teamStats">
              <strong>H</strong>
            </Table.Cell>
            <Table.Cell className="teamStats">
              <strong>E</strong>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{props.game.homeTeam}</Table.Cell>
            <Table.Cell className="teamStats">
              {props.game.teamStats.home.runs}
            </Table.Cell>
            <Table.Cell className="teamStats">
              {props.game.teamStats.home.hits}
            </Table.Cell>
            <Table.Cell className="teamStats">
              {props.game.teamStats.home.errors}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{props.game.awayTeam}</Table.Cell>
            <Table.Cell className="teamStats">
              {props.game.teamStats.away.runs}
            </Table.Cell>
            <Table.Cell className="teamStats">
              {props.game.teamStats.away.hits}
            </Table.Cell>
            <Table.Cell className="teamStats">
              {props.game.teamStats.away.errors}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Card.Content />
    </Card>
  );
};

export default GameCard;
