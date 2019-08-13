import { expect } from 'chai'

import { 
    groupBooks,
    flattenBookGroups,
    getAllocs,
    sumAllocs,
    getBestDiscount
} from './index'

const basket = [
    'H1', 'H1',
    'H2', 'H2',
    'H3', 'H3',
    'H4',
    'H5'
]

const basket2 = [
    'H1', 'H1', 'H1', 'H1', 'H1', 'H1',
    'H2', 'H2', 'H2',
    'H3', 'H3', 'H3', 'H3',
    'H4', 'H4', 'H4',
    'H5', 'H5', 'H5', 'H5'
]

const basket3 = [
    'H1',
    'H2',
    'H3', 'H3',
    'H4', 'H4', 'H4',
    'H5', 'H5', 'H5'
]
const basket3Group = {
    H1: ['H1'],
    H2: ['H2'],
    H3: ['H3', 'H3'],
    H4: ['H4', 'H4', 'H4'],
    H5: ['H5', 'H5', 'H5']
}
const basket3ObjFlatToArray = [
    'H4', 'H4', 'H4',
    'H5', 'H5', 'H5',
    'H3', 'H3',
    'H1',
    'H2'
]

describe('Acceptance tests', function() {
    it('Case1 (8 books): Basket > 2+2+2+1+1 = 51.2', function() {
        expect(getBestDiscount(basket)).to.eql(51.2)
    })

    it('Case2 (20 books): Basket > 6+3+4+3+4 = 127.6', function() {
        expect(getBestDiscount(basket2)).to.eql(127.6)
    })

    it('Case 2 (10 books): Basket > 1+1+2+3+3 = 66.4 ', function() {
        expect(getBestDiscount(basket3)).to.eql(66.4)
    })
})

describe('Functional tests', function() {
    it('Groups array of books into an object, using their Id as key', function() {
        expect(groupBooks(basket)).to.eql({
            H1: ['H1', 'H1'],
            H2: ['H2', 'H2'],
            H3: ['H3', 'H3'],
            H4: ['H4'],
            H5: ['H5']
        })
    })

    it('Groups basket3 into an object, using their Id as key', function() {
        expect(
            groupBooks(basket3)
        ).to.eql(basket3Group)
    })

    it('Flattens basket3 group into an array sorted by most books', function() {
        expect(
            flattenBookGroups(basket3Group)
        ).to.eql(basket3ObjFlatToArray)
    })

    describe('Discount combinations', function() {
        it('SET 2: Discount combinations', function() {
            expect(
                getAllocs(2, basket)
            ).to.eql([
                ["H1", "H2"], 
                ["H2", "H3"], 
                ["H3", "H4"], 
                ["H5", "H1"]
            ])
        })
    
        it('SET 3: Discount combinations', function() {
            expect(
                getAllocs(3, basket)
            ).to.eql([
                ["H1", "H2", "H3"], 
                ["H3", "H4", "H5"], 
                ["H1", "H2"]
            ])
        })
    
        it('SET 4: Discount combinations', function() {
            expect(
                getAllocs(4, basket)
            ).to.eql([
                ["H1", "H2", "H3", "H4"], 
                ["H5", "H1", "H2", "H3"]
            ])
        })
    
        it('SET 5: Discount combinations', function() {
            expect(
                getAllocs(5, basket)
            ).to.eql([
                ["H1", "H2", "H3", "H4", "H5"], 
                ["H1", "H2", "H3"]
            ])
        })
    })

    it('Returns an array of sums of all discount combinations', function() {
        expect(
            sumAllocs(basket3ObjFlatToArray)
        ).to.eql([66.4, 66.8, 73.60000000000001, 76])
    })
})