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
        }
      )
    }
    
  }, [])
 

  return (
    <canvas id='activityChart' style={{width: '60%', height: '60%'}}></canvas>
  )
}

export default LineChart