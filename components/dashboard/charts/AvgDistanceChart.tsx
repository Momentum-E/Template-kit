import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AvgDistanceChart = () => {
  const [options] = useState({
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return value + ' km';
        },
      },
    },
  });

  const [series] = useState([
    {
      data: [30, 40, 45, 50, 49, 60, 70, 91, 88, 99, 87, 77],
    },
  ]);

  return (
    <div className="app">
      <div className="row">
        <div className="flex justify-center items-center mixed-chart">
          <Chart
            options={options}
            series={series}
            type="bar"
            width="735"
            height="180"
          />
        </div>
      </div>
    </div>
  );
};

export default AvgDistanceChart;
