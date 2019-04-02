import React, {PureComponent, Component} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default class Example extends PureComponent {
  render() {
    console.log('wP Props', this.props);
    return (
      <div className="graph">
        {this.props.wP && (
          <LineChart
            width={400}
            height={300}
            data={this.props.wP}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="inning"
              type="category"
              domain={[1, this.props.inning]}
              ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              margin={{left: -175}}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip payload={this.props.wP} content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              // dataKey="pv"
              dataKey={this.props.teams.away}
              stroke="#8884d8"
              activeDot={{r: 8}}
            />
            <Line
              type="monotone"
              dataKey={this.props.teams.home}
              stroke="#82ca9d"
            />
          </LineChart>
        )}
      </div>
    );
  }
}

class CustomTooltip extends Component {
  render() {
    // console.log('tooltip props', this.props);
    const {active} = this.props;

    if (active) {
      const {payload, label} = this.props;
      // console.log('tooltip label', label);
      // console.log('tooltip payload', payload);
      return (
        <div className="custom-tooltip">
          <p className="label">
            <strong>{payload[0].payload.inningText}</strong>
          </p>
          <p className="label">{payload[0].payload.play}</p>
          <p className="label">
            Home Team Win Probability:{' '}
            {payload[0].payload[payload[0].payload.home]}%
          </p>
          <p className="label">
            Away Team Win Probability:{' '}
            {payload[0].payload[payload[0].payload.away]}%
          </p>
        </div>
      );
    }

    return null;
  }
}
