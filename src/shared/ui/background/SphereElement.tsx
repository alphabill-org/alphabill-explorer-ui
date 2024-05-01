export type SphereElementProps = {
    width: string;
    height: string;
    top: string;
    left: string;
}

const SphereElement = ({width, height, top, left} : SphereElementProps) => {
    return (
        <div
            className={`absolute ${width} ${height} layout-circle-filled`}
            style={{
                top: `${top}`,
                left: `${left}`,
                filter: 'blur(250px)',
                transform: 'translateZ(0) translate3d(0,0,0)',
            }}
        />
    )
}

export default SphereElement