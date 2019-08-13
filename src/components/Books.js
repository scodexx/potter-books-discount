import React from 'react'

import Book from './Book'
import { books } from '../constants/potter-books'

const Books = () => (
    <tbody>
        {books.map(book =>
          <Book 
            key={book.id}
            {...book} />
        )}
    </tbody>
)

export default Books