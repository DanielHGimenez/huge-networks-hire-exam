import './index.css'

function Line({ data, isTitle = false }) {

    return (
        <div className="Line">
        { data.map((columnValue, index) => (
            <div key={index} className={ "Line-column" + ( isTitle ? " Line-title" : "" ) }>
                { columnValue }
            </div>
        ))}
        </div>
    )
}

export default Line
