import './index.css'

function Button({ children, className = "", onClick }) {
    
    return (
        <button className={"Button " + className} onClick={onClick}>
            { children }
        </button>
    )
}

export default Button
