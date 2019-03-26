/* eslint-disable react/no-multi-comp */
import React, {PureComponent} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const data = [
  {
    name: '1st',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: '2nd',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: '3rd',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: '4th',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: '5th',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: '5th',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: '6th',
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: '1st',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: '2nd',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: '3rd',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: '4th',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: '5th',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: '5th',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: '6th',
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: '4th',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: '5th',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: '5th',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: '6th',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

class CustomizedLabel extends PureComponent {
  render() {
    const {x, y, stroke, value} = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const {x, y, stroke, payload} = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

export default class WinProbability extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/5br7g9d6/';

  componentDidMount() {
    console.log('wP mounted', this.props);
  }
  render() {
    console.log('wP rendered', this.props);

    return (
      <div>
        {this.props.wP && (
          <LineChart
            width={350}
            height={150}
            data={this.props.wP}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              hide={true}
              dataKey="name"
              // interval={9}
              tickCount={9}
              height={60}
              tick={<CustomizedAxisTick />}
            />
            <YAxis hide={true} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              // label={<CustomizedLabel />}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        )}
      </div>
    );
  }
}

/**
 * Helper Methods
 */

const makeData = data => {
  const graphData = [];
  for (let i = 0; i < data.length; i++) {
    let point = {
      inning: data[i].about.inning,
      play: data[i].playEvents.description,
      uv: data[i].homeTeamWinProbability,
      pv: data[i].awayTeamWinProbability
    };
    graphData.push(point);
  }
  return graphData;
};
