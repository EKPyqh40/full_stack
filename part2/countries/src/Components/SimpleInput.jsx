const SimpleInput = ({value, onChange, text}) => {
    return <p>{text} <input value={value} onChange={onChange}/></p>
}
export default SimpleInput