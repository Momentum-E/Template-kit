import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ConditionChart = () => {
  const series = [10, 50, 102]; // Example data: Number of red, yellow, and green vehicles

  const options = {
    labels: ['Critical', 'Satisfactory', 'Good'],
    colors: ['#e74c3c', '#f1c40f', '#2ecc71'], // Colors for red, yellow, and green segments
    dataLabels: {
      enabled: true,
      position: 'center',
      formatter: function (val, opts) {
        return opts.w.config.series[opts.seriesIndex];
      },
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="pie" width="370" />
    </div>
  );
};

export default ConditionChart;
