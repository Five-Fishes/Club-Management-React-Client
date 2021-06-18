import React from 'react';

export interface IDonutChartProps {
  data: ReadonlyArray<bigint> | ReadonlyArray<number>;
  labels: ReadonlyArray<string>;
}

export class DonutChart extends React.Component<IDonutChartProps> {
  render() {
    const { data, labels } = this.props;
    window.console.log(data);
    window.console.log(labels);
    const options = {
      chart: {
        type: 'donut',
      },
      labels: { labels },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    // @ts-ignore
    return <div id="chart"></div>;
  }
}
