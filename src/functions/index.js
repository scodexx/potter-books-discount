import { unitCost, discounts } from '../constants/potter-books'

/**
 * Groups books added to the book basket by their unique Id
 *  ex. {H1: ["H1","H1"], H2: ["H2","H2"]}
 * @param {array} books An array of books added to the basket
 * @returns {object}
 */
export const groupBooks = books => {
    return books.reduce((accum, book) => {
        if(!accum[book]) {
          accum[book] = []
        }
        
        accum[book].push(book)
        
        return accum
      }, {})
}
/**
 * Flattens the object gotten from grouping the books
 *  Then sorts them from the most same books the least same books
 * @param {object} allocatedBooks 
 */
export const flattenBookGroups = allocatedBooks => {
    return Object.keys(allocatedBooks).map(alloc => 
        allocatedBooks[alloc]
    ).sort((a, b) => b.length - a.length).flat()
}
/**
 * Allocates books in an array of best possible discount combinations
 * @param {number} currentSet 
 * @param {array} books 
 * @param {number} nextSetIndex 
 * @param {array} currentAllocs 
 * @returns {array}
 */
export const getAllocs = (currentSet, books, nextSetIndex = 0, currentAllocs = []) => {
    let allocs = [...currentAllocs]
    let usedIndexes = []
  
    let lastAlloc = allocs[nextSetIndex]
  
    // complexity point1 
    // At this point, every book left in the basket are the same after picking
    //  out the best possible combinations
    if(books.every(b => b === books[0])) {
        // If the last sets allocated are not yet a full set and none of the books in it
        //  are the same as the books left, we simply add one more to it
        if(lastAlloc && lastAlloc.length < currentSet && !lastAlloc.some(b => b === books[0])) {
            const book = books[0]

            if(book) {
                lastAlloc.push(books[0])
                // and update the used index so we don't use it again
                usedIndexes.push(0)
            }
        }
    
        // next, we create a set for each book left since there are no discount(s) on them
        books.forEach((book, i) => {
            if(usedIndexes.indexOf(i) !== -1) return

            nextSetIndex+=1
            allocs.push([book])
            usedIndexes.push(i)
        })
    } 
    // complexity point 2
    // in thie case, our last allocated discount set has books exactly the 
    //  same as the next set of books to be processes. Without this, we get an infinite loop
    // E.x lastAlloc = ["D", "E"], next set of books = ["E", "D"]
    else if(lastAlloc && books.every(b => lastAlloc.indexOf(b) !== -1)) {
        // we skip to the next set
        nextSetIndex += 1
    } else {
        // default operation
        books.forEach((book, i) => {
            // if this set allocation doesn't exist, we create it
            if(!allocs[nextSetIndex]) {
                allocs[nextSetIndex] = []
            }
      
            let nextSet = allocs[nextSetIndex]
            
            // we don't want a used up book in our operation
            if(usedIndexes.indexOf(i) !== -1) return
            
            // we only push a book that doesn't already exist in the current set
            if(nextSet.indexOf(book) === -1) {
                nextSet.push(book)
                // we push to usedIndexes so we dont use it again in this operation
                usedIndexes.push(i)
            }
            
            // we move to the next set. This one is full
            // our sets are based on the discount sets available
            // we can always introduce new sets from our constants
            if(nextSet.length === currentSet) {
                nextSetIndex+=1
            }
        })
    }
  
    // we filter books. We only need the ones we haven't allocated
    const filtBooks = books.filter((book, i) => usedIndexes.indexOf(i) === -1)

    // console.log(currentSet)
    // console.log(books)
    // console.log(nextSetIndex)
    // console.log(currentAllocs)
  
    return books.length > 0 
        // we apply recursion here since there are still more books to sort
        ? getAllocs(currentSet, filtBooks, nextSetIndex, allocs)
        : allocs
}
/**
 * Returns a sum of all discount combinations
 * @param {array} flattenedBooks 
 * @return {array} Possible costs from lowest to highest
 */
export const sumAllocs = flattenedBooks => {
    const sums = []
    
    discounts.forEach(d => {
        const allocs = getAllocs(d.set, flattenedBooks)
        const costs = []
        
        allocs.forEach(books => {
            // total cost per unit of all books in thie alloc
            const initialCost = books.length * unitCost
            // we get the current discount based on the number of books in each alloc
            const d2 = discounts.find(d => d.set === books.length)
            
            if(d2) {
                /* eslint-disable-next-line */
                // we apply discount here since it matches our discount set param
                costs.push(initialCost * d2.discount)
            } else {
                // no discount here.
                costs.push(initialCost)
            }
        })
        
        // console.log(allocs)
        // console.log(costs)
        
        sums.push(costs)
    })
    
    // we return an array of the sum of all possible costs
    // then sort from lowest to highest
    return sums.map(costs => 
        costs.reduce((a, b) => a + b, 0)
    ).sort()
}
/**
 * @param {array} basket 
 */
export const getBestDiscount = basket => {
    const allocatedBooks = groupBooks(basket)
    const flatAllocBooks = flattenBookGroups(allocatedBooks)

    // return the best possibl discount from the pile
    return sumAllocs(flatAllocBooks)[0]
}