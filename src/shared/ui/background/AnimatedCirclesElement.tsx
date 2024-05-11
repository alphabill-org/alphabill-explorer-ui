import CircleElement from "./CircleElement"

const AnimatedCirclesElement = () => {
    return (
        <div className="w-[1135px] h-[1135px] rounded-full absolute items-center justify-center animate-pulsing left-[-600px] top-[350px] hidden md:flex -z-10">
            <CircleElement width="w-[20%]" height="h-[20%]" />
            <CircleElement width="w-[40%]" height="h-[40%]" />
            <CircleElement width="w-[60%]" height="h-[60%]" />
            <CircleElement width="w-[80%]" height="h-[80%]" />
            <CircleElement width="w-[100%]" height="h-[100%]" />
        </div>
    )
}
export default AnimatedCirclesElement