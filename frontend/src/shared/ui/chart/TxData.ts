import Data from "./Data.json";

export const TxData = {
    labels: Data.map((data) => data.date),
    datasets: [
      {
        label: "Activity history",
        data: Data.map((data) => data.txAmount),
        fill: false,
        borderColor: "rgb(9, 204, 202)",
        tension: 0.1,
      }
    ]
};
