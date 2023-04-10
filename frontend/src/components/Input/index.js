import './index.css';

function Input({ type, value, onInput }) {

    return (
        <input value={value} onInput={onInput} type={type} className="Input" />
    )
}

export default Input
