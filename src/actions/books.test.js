import { expect } from 'chai'

import { addBook, clearBooks } from './books'

describe('Book actions', function() {
    it('Should add a book', function() {
        expect(addBook('H1')).to.eql({
            type: 'ADD_BOOK',
            id: 'H1'
        })
    })

    it('Should clear books', function() {
        expect(clearBooks()).to.eql({
            type: 'CLEAR_BOOKS'
        })
    })
})