import React from 'react'
import { connect } from 'react-redux'
import { addBook } from '../actions/books'

const Book = ({
    id,
    name,
    onAddBook,
    addedBooks
}) => (
    <tr>
        <td style={{paddingRight: 15}}>
            {name}
        </td>
        
        <td style={{paddingRight: 20}}>
            <button 
                onClick={() => onAddBook(id)}>
                +
            </button>
        </td>

        <td>
            {addedBooks.filter(bid => 
                bid === id
            ).length}
        </td>
    </tr>
)

export default connect(
    state => ({
        addedBooks: state
    }),
    dispatch => ({
        onAddBook(id) {
            dispatch(addBook(id))
        }
    })
)(Book)