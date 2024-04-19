import SimpleInput from "./SimpleInput"

const SmartInput = ({value, setValue, text}) => {
    return <SimpleInput text={text} value={value} onChange={(event)=> setValue(event.target.value)}/>
}
export default SmartInput