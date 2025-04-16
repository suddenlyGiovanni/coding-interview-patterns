import { Data, MutableHashSet, pipe } from 'effect'
import { describe, expect, it } from 'vitest'

type Triplet = [number, number, number]

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

type TripletSumStrategy = (nums: readonly number[]) => Triplet[]

const makeTripletSum =
	(tripletSumStrategy: TripletSumStrategy) => (nums: readonly number[]) =>
		tripletSumStrategy(nums)

const bruteForce: TripletSumStrategy = (nums) => {
	const triplets = MutableHashSet.empty<Triplet>()

	const n = nums.length - 1

	for (let i = 0; i <= n; i++) {
		for (let j = i + 1; j <= n; j++) {
			for (let k = j + 1; k <= n; k++) {
				const a = nums[i]
				const b = nums[j]
				const c = nums[k]
				if (a !== undefined && b !== undefined && c !== undefined) {
					if (a + b + c === 0) {
						const triplet = Data.tuple(
							...(([a, b, c] as const).toSorted() as unknown as Triplet),
						)
						MutableHashSet.add(triplets, triplet)
					}
				}
			}
		}
	}

	return Array.from(triplets)
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

	describe('test a single element array', () => {
		const nums: number[] = [0]
		const expectedOutput: Triplet[] = []

		it.for(strategies)('with %O strategy', (strategy) => {
			const tripletSum = makeTripletSum(strategy)
			expect(tripletSum(nums)).toEqual(expectedOutput)
		})
	})

	describe('test a two element array', () => {
		const nums: number[] = [1, -1]
		const expectedOutput: Triplet[] = []

		it.for(strategies)('with %O strategy', (strategy) => {
			const tripletSum = makeTripletSum(strategy)
			expect(tripletSum(nums)).toEqual(expectedOutput)
		})
	})

	describe('test an array where all three of its values are the same', () => {
		const nums: number[] = [0, 0, 0]
		const expectedOutput: Triplet = [[0, 0, 0]]

		it.for(strategies)('with %O strategy', (strategy) => {
			const tripletSum = makeTripletSum(strategy)
			const tripletSumResult = tripletSum(nums)
			expect(tripletSumResult).toHaveLength(1)
			expect(tripletSumResult).toEqual(expect.arrayContaining(expectedOutput))
		})
	})

	describe('test an array with no triplets that sums to 0', () => {
		const nums: number[] = [1, 0, 1]
		const expectedOutput: Triplet[] = []

		it.for(strategies)('with %O strategy', (strategy) => {
			const tripletSum = makeTripletSum(strategy)
			const tripletSumResult = tripletSum(nums)
			expect(tripletSumResult).toHaveLength(0)
			expect(tripletSumResult).toEqual(expectedOutput)
		})
	})

	describe('test an array with duplicate triplets', () => {
		const nums: number[] = [0, 0, 1, -1, 1, -1]
		const expectedOutput: Triplet[] = [[-1, 0, 1]]

		it.for(strategies)('with %O strategy', (strategy) => {
			const tripletSum = makeTripletSum(strategy)
			const tripletSumResult = tripletSum(nums)
			expect(tripletSumResult).toHaveLength(1)
			expect(tripletSumResult).toEqual(expect.arrayContaining(expectedOutput))
		})
	})

	describe('test an array with multiple outputs', () => {
		const nums: number[] = [0, -1, 2, -3, 1]
		const expectedOutput: Triplet[] = [
			[-3, 1, 2],
			[-1, 0, 1],
		]

		it.for(strategies)('with %O strategy', (strategy) => {
			const tripletSum = makeTripletSum(strategy)
			const tripletSumResult = tripletSum(nums)
			expect(tripletSumResult).toHaveLength(2)
			expect(tripletSumResult).toEqual(expect.arrayContaining(expectedOutput))
		})
	})
})
