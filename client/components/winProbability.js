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
  // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    // console.log('wP rendered', this.props.wP);
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
              // allowDuplicatedCategory={true}
              // interval="preserveStartEnd"
              // tickCount={9}
              // interval={0}
              domain={[1, this.props.inning]}
              ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              margin={{left: -175}}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip payload={this.props.wP} content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{r: 8}}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
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
      console.log('tooltip payload', payload);
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].payload.play}`}</p>
          {/* <p className="intro">{this.getIntroOfPage(label)}</p> */}
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }

    return null;
  }
}
