import { expect } from 'chai'
import deepFreeze from 'deep-freeze'

import books from './books'

describe('Adding a book', function() {
    it('Should add a book', function() {
        const initialState = []

        const action = {
            type: 'ADD_BOOK',
            id: 'h1'
        }

        const addedBooks = [
            'h1'
        ]

        deepFreeze(initialState)
        deepFreeze(addedBooks)

        expect(
            books(initialState, action)
        ).to.eql(addedBooks)
    })

    it('Should remove all books', function() {
        const initialState = [
            'H1', 'H2', 'H5'
        ]

        const action = {
            type: 'CLEAR_BOOKS'
        }

        deepFreeze(initialState)

        expect(
            books(initialState, action)
        ).to.eql([])
    })

    it('Should return previous state if no valid action specified', function() {
        const initialState = [
            'H1', 'H2'
        ]

        const addedBooks = [
            'H1'
        ]

        deepFreeze(initialState)
        deepFreeze(addedBooks)

        expect(
            books(initialState, {})
        ).to.eql([
            'H1', 'H2'
        ])
    })
})