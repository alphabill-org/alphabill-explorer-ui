export type CircleElementProps = {
  width: string;
  height: string;
}

const CircleElement = ({width, height} : CircleElementProps ) => {
  
  return <div className={`${width} ${height} layout-circle`}/>
}

export default CircleElement