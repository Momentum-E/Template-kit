import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SohChart = () => {
  const [options] = useState({
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return value + ' %';
        },
      },
    },
  });

  const [series] = useState([
    {
      name: 'SoH',
      data: [99, 98.7, 97.9, 97.7, 97.2, 96.8, 95.5, 94.7, 93.9, 94.0, 93.6, 93.4],
    },
  ]);

  return (
    <div className="app">
      <div className="row">
        <div className="flex justify-center items-centermixed-chart">
          <Chart
            options={options}
            series={series}
            type="line"
            width="735"
            height="180"
          />
        </div>
      </div>
    </div>
  );
};

export default SohChart;
