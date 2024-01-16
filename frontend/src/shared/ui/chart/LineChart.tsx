import { useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { TxData } from './TxData';

const LineChart = () => {
  useEffect(() => {
    const ctx = document.getElementById('activityChart') as HTMLCanvasElement; 

    const existingChart = Chart.getChart(ctx);

    if (existingChart) {
      existingChart.destroy();
    }

    if(ctx){
      new Chart(ctx,
        {
          type: 'line',
          data: TxData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: 'category',
              },
              y: {
                type: 'linear',
              }
            }
          }
        }
      )
    }
    
  }, [])
 

  return (
    <canvas id='activityChart'></canvas>
  )
}

export default LineChart