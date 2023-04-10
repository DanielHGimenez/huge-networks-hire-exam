import './App.css'
import React, { useState, useCallback, useRef } from 'react'
import { findCombinations } from './services/api'
import Notification from './components/Notification'
import Input from './components/Input'
import Button from './components/Button'
import Combo from './components/Combo'
import Line from './components/Line'
import Book from './components/Book'

function App() {
    const options = useRef([ 5, 10, 20 ])
    const titles = useRef([ "Numero de rainhas", "Resultado", "Tempo gasto" ])
    const messages = useRef([])
    const [ results, setResults ] = useState([])
    const [ queensAmount, setQueensAmount ] = useState()
    const [ pageSize, setPageSize ] = useState()

    const onChangePageSize = useCallback((pageSize) => {
        setPageSize(pageSize)
    }, [setPageSize])

    const changeQueensAmount = useCallback((event) => {
        setQueensAmount(event.target.value)
    }, [setQueensAmount])

    const sendRequest = useCallback(() => {
        if (queensAmount && queensAmount > 0) {
            findCombinations(queensAmount)
                .then(response => {
                    let result = [  queensAmount, response.result, response.period.toFixed(3) ]
                    setResults([ ...results, result ])
                    messages.current.push(`O resultado com ${queensAmount} rainhas chegou!`)
                })
        }
    }, [results, queensAmount])

    return (
        <div className="App">
            <Notification messages={messages} />
            <header className="App-header">
                <h2>
                    Desafio das rainhas
                </h2>
            </header>
            <main className="App-main">
                <div className="App-action">
                    <p>Tamanho do tabuleiro e rainhas:</p>
                    <Input type="number" className="App-input" value={queensAmount} onInput={changeQueensAmount} />
                    <Button onClick={sendRequest} className="App-submit">Achar soluções</Button>
                </div>
                <div className="App-table">
                    { results != null && results.length > 0 && (
                        <>
                            <Combo options={options.current} onChange={onChangePageSize} />
                            <Line data={titles.current} isTitle={true} />
                            <Book
                                pageSize={pageSize}
                                data={results}
                                renderItem={(itemData, index) => (
                                    <Line
                                        key={index}
                                        data={itemData}
                                    />
                                )}
                            />
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App
