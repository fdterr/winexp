import React from 'react';
import {Card, Table} from 'semantic-ui-react';

const GameCard = props => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{props.game.status}</Card.Header>
      </Card.Content>
      <Table basic="very" celled collapsing>
        <Table.Body>
          <Table.Row>
            <Table.Cell />
            <Table.Cell>R</Table.Cell>
            <Table.Cell>H</Table.Cell>
            <Table.Cell>E</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{props.game.homeTeam}</Table.Cell>
            <Table.Cell>{props.game.teamStats.home.runs}</Table.Cell>
            <Table.Cell>{props.game.teamStats.home.hits}</Table.Cell>
            <Table.Cell>{props.game.teamStats.home.errors}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{props.game.awayTeam}</Table.Cell>
            <Table.Cell>{props.game.teamStats.away.runs}</Table.Cell>
            <Table.Cell>{props.game.teamStats.away.hits}</Table.Cell>
            <Table.Cell>{props.game.teamStats.away.errors}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Card.Content />
    </Card>
  );
};

export default GameCard;
