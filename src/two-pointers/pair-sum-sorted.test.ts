import { describe, expect, it } from 'vitest'


type PointerTuple = readonly [leftPointer: number, rightPointer: number]


type PairSumSortedStrategy = (nums: readonly number[], target: number) => PointerTuple[];

/**
 * Brute force solution that involves checking all possible pairs;
 * This is done with two nested loops:
 * - an outer loop that traverse the array for the first element of the pair,
 * - and an inner loop that traverses the rest of the array to find the second element.
 *
 * This approach has a time complexity of `O(n^2)` where n detonates the length of the array
 */
const bruteForce: PairSumSortedStrategy = (nums, target) => {
	let result: [number, number][] = []

	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			const left = nums.at(i)
			const right = nums.at(j)

			if (left === undefined || right === undefined) break


			if (left + right === target) {
				result.push([i, j])
			}
		}
	}
	return result
}

/**
 * Given an array of integers sorted in ascending order and a target value;
 * We can find the indexes of any pair of numbers in the array that sum to the target value with the two-pointer technique.
 *
 * For any pair of values, of left and right:
 * - if the sum is less than the target, increment left, aiming to increase the sum toward the target value;
 * - if the sum is greater that the target, decrement right aiming to decrease the sum toward the target value;
 * - if the sum is equal to the target, we have found a pair, so we can store the indexes and increment left;
 */
const twoPointers: PairSumSortedStrategy = (nums, target) => {
	let leftPointer = 0
	let rightPointer = nums.length - 1
	const result: PointerTuple[] = []

	while (leftPointer < rightPointer) {
		const left = nums[leftPointer]
		const right = nums[rightPointer]
		if (left === undefined || right === undefined) {
			break
		}

		const sum = left + right
		if (sum < target) {
			leftPointer++
		} else if (sum > target) {
			rightPointer--
		} else if (sum === target) {
			result.push([leftPointer, rightPointer])
			leftPointer++
		}
	}


	return result
}


const recursiveTwoPointers: PairSumSortedStrategy = (nums, target) => {
	// base case: the left pointer is greater than or equal to the right pointer; no pair found; stop recursion

	function findPairsWithTargetSum(leftPointer: number, rightPointer: number, pairs: (readonly [leftPointer: number, rightPointer: number])[]) {
		if (leftPointer >= rightPointer) return pairs

		const left = nums[leftPointer]!
		const right = nums[rightPointer]!

		const sum = left + right

		if (sum < target) {
			return findPairsWithTargetSum(leftPointer + 1, rightPointer, pairs)
		}

		if (sum > target) {
			return findPairsWithTargetSum(leftPointer, rightPointer - 1, pairs)
		}

		if (sum === target) {
			return findPairsWithTargetSum(leftPointer + 1, rightPointer, [...pairs, [leftPointer, rightPointer]])
		}

		return pairs

	}


	return findPairsWithTargetSum(0, nums.length - 1, [])
}

/**
 * Given an array of integers sorted in ascending order and a target value,
 * return the indexes of any pair of numbers in the array that sum to the target.
 * The order of the indexes in the result doesn't matter.
 *
 * If no pair is found, return an empty array.
 *
 * Input: nums = [-5, -2, 3, 4, 6], target = 7
 * Output: [2, 3]
 * Explanation: nums[2] + nums[3] = 3 + 4 = 7
 *
 * Input: nums = [1, 1, 1], target = 2
 * Output: [0, 1] or other valid combinations
 */
const makePairSumSorted = (strategy: PairSumSortedStrategy) => (nums: number[], target: number) => strategy(nums, target)

describe('pairSumSorted', () => {

	const strategies = [bruteForce, twoPointers, recursiveTwoPointers] as const
	describe('test an empty array', () => {
		const nums: number[] = []
		const target = 0
		const expectedOutput: PointerTuple[] = []

		it.for(strategies)('with %O strategy', (strategy) => {
			const pairSumSorted = makePairSumSorted(strategy)
			expect(pairSumSorted(nums, target)).toEqual(expectedOutput)
		})
	})

	describe('test an array with just one element', () => {
		const nums = [1]
		const target = 1
		const expectedOutput: PointerTuple[] = []

		it.for(strategies)('with %O strategy', (strategy) => {
			const pairSumSorted = makePairSumSorted(strategy)
			expect(pairSumSorted(nums, target)).toEqual(expectedOutput)
		})
	})

	describe('test two-element array that contains a pair that sums to the target', () => {
		const nums = [2, 4]
		const target = 5
		const expectedOutput: PointerTuple[] = []

		it.for(strategies)('with %O strategy', (strategy) => {
			const pairSumSorted = makePairSumSorted(strategy)
			expect(pairSumSorted(nums, target)).toEqual(expectedOutput)
		})

	})

	describe('test an array with duplicate values', () => {
		const nums = [2, 2, 3]
		const target = 5
		const expectedOutputs: PointerTuple[] = [[0, 2], [1, 2]]

		it.for(strategies)('with %O strategy', (strategy) => {
			const pairSumSorted = makePairSumSorted(strategy)
			const results = pairSumSorted(nums, target)
			expect(results).toEqual(expect.arrayContaining(expectedOutputs))

		})
	})

	describe('test if the algorithm works with negative number in the target pair', () => {
		const nums = [-1, 2, 3]
		const target = 2
		const expectedOutput: PointerTuple[] = [[0, 2]]

		it.for(strategies)('with %O strategy', (strategy) => {
			const pairSumSorted = makePairSumSorted(strategy)
			const results = pairSumSorted(nums, target)
			expect(results).toEqual(expect.arrayContaining(expectedOutput))
		})
	})

	describe('test if the algorithm works with both numbers of the target pair being negative', () => {
		const nums = [-3, -2, -1]
		const target = -5
		const expectedOutput: PointerTuple[] = [[0, 1]]

		it.for(strategies)('with %O strategy', (strategy) => {
			const pairSumSorted = makePairSumSorted(strategy)
			const results = pairSumSorted(nums, target)
			expect(results).toEqual(expect.arrayContaining(expectedOutput))
		})
	})

})
