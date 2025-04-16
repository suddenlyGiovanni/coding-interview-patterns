import { describe, expect, it } from 'vitest'

type Triplet<First extends number = number, Second extends number = number, Third extends number = number> = [First, Second, Third]

/**
 * Given an array of integers, return all triplets [a, b, c] such that a + b + c = 0.
 * The solution must not contain duplicate triplets (e.g. [1, 2, 3 ] and [2, 3, 1] are considered duplicate triplets).
 * if no triplet is found, return an empty array.
 *
 * Each triplet can be arranged in any order, and the output can be returned in any order.
 *
 * Example:
 * Input: nums = [0, -1, 2, -3, 1]
 * Output: [[-3, 1, 2], [-1, 0, 1]]
 *
 * @module tripletSum
 */


type TripletSumStrategy = <N extends number>(nums: readonly N[]) => Triplet<N, N, N>[]


const makeTripletSum = (tripletSumStrategy: TripletSumStrategy) => <N extends number>(nums: readonly N[]) => tripletSumStrategy(nums)


const bruteForce: TripletSumStrategy = (nums) => {
	return []
}

describe('tripletSum', () => {
	const strategies = [bruteForce] as const

	describe('test an empty array', () => {
		const nums: number[] = []
		const expectedOutput: Triplet[] = []

		it.for(strategies)('with %O strategy', (strategy) => {
			const tripletSum = makeTripletSum(strategy)
			expect(tripletSum(nums)).toEqual(expectedOutput)
		})

	})

	describe.todo('test a single element array', () => {
		const nums: number[] = [0]
		const expectedOutput: Triplet[] = []
	})

	describe.todo('test a two element array', () => {
		const nums: number[] = [1, -1]
		const expectedOutput: Triplet[] = []
	})

	describe.todo('test an array where all three of its values are the same', () => {
		const nums: number[] = [0, 0, 0]
		const expectedOutput: Triplet[] = [0, 0, 0]
	})

	describe.todo('test an with no triplets that sums to 0', () => {
		const nums: number[] = [1, 0, 1]
		const expectedOutput: Triplet[] = []
	})

	describe.todo('test an array with duplicate triplets', () => {
		const nums: number[] = [0, 0, 1, -1, 1, -1]
		const expectedOutput: Triplet[] = [-1, 0, 1]
	}

})
