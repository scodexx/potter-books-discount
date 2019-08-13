import React from 'react'
import { connect } from 'react-redux'
import currency from 'currency.js'

import { getBestDiscount } from '../functions'
import { clearBooks } from '../actions/books'

const Summary = ({
    addedBooks,
    clear
}) => (
    <tfoot>
        <tr>
            <td colSpan={3}><hr /></td>
        </tr>
        <tr>
            <td></td>
            <td>
                <button
                    onClick={() => clear()}>Clr</button>
            </td>
            <td>{addedBooks.length}</td>
        </tr>
        <tr>
            <td colSpan={3}><hr /></td>
        </tr>
        <tr>
            <td colSpan={2}>Total cost:</td>
            <td>{currency(getBestDiscount(addedBooks)).value}</td>
        </tr>
    </tfoot>
)

export default connect(
    state => ({
        addedBooks: state
    }),
    dispatch => ({
        clear() {
            dispatch(clearBooks())
        }
    })
)(Summary)