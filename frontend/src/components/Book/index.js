import './index.css'
import react, { useState, useCallback } from 'react'

function Book({ pageSize, data, renderItem }) {
    const [ page, setPage ] = useState(1)

    const getPage = useCallback(() => {
        const offset = (page - 1) * pageSize
        return data.slice(offset, offset + pageSize)
    }, [page, pageSize, data])

    const getPagesAmount = useCallback(() => {
        return Math.ceil(data.length / pageSize)
    }, [pageSize, data])

    const goForNextPage = useCallback(() => setPage(page + 1), [page])

    const goForPreviousPage = useCallback(() => setPage(page - 1), [page])

    return (
        <div className="Book">
            <div className="Book-items">
                {
                    getPage().map((itemData, index) => renderItem(itemData, index))
                }
            </div>
            <div className="Book-pages">
                { page > 1 && (
                    <button className="Book-page" onClick={goForPreviousPage}>
                        { page - 1 }
                    </button>
                )}
                <div className="Book-page Book-current-page">
                    { page }
                </div>
                { page < getPagesAmount() && (
                    <button className="Book-page" onClick={goForNextPage}>
                        { page + 1 }
                    </button>
                )}
            </div>
        </div>
    )
}

export default Book
