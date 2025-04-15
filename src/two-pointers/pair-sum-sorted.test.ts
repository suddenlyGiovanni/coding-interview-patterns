import { describe, expect, it } from 'vitest'

type PairSumSortedStrategy = (nums: number[], target: number) => number[];

/**
 *
 * @param nums
 * @param target
 */
const bruteForce: PairSumSortedStrategy = (nums, target) => {
	for (let left = 0; left < nums.length; left++) {
		for (let right = left + 1; right < nums.length; right++) {
			if (nums[left] + nums[right] === target) {
				return [left, right]
			}
		}
	}

	return []
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
	const pairSumSorted = makePairSumSorted(bruteForce)

	it('should return indexes of pair that sums to target - example 1', () => {
		/**
		 * Input: nums = [-5, -2, 3, 4, 6], target = 7
		 * Output: [2, 3]
		 * Explanation: nums[2] + nums[3] = 3 + 4 = 7
		 */
		const nums = [-5, -2, 3, 4, 6]
		const target = 7
		const result = pairSumSorted(nums, target)

		// Since the order doesn't matter, we need to check if the values at these indices sum to target
		expect(result.length).toBe(2)
		expect(nums[result[0]] + nums[result[1]]).toBe(target)

		// For this specific example, we can also check for the expected indices
		const expectedPairs = [[2, 3], [3, 2]] // Order doesn't matter
		const resultPair = [result[0], result[1]].sort((a, b) => a - b)
		const foundMatch = expectedPairs.some((pair) => pair[0] === resultPair[0] && pair[1] === resultPair[1])
		expect(foundMatch).toBe(true)
	})

	it('should return indexes of pair that sums to target - example 2', () => {
		/**
		 * Input: nums = [1, 1, 1], target = 2
		 * Output: [0, 1] or other valid combinations
		 */
		const nums = [1, 1, 1]
		const target = 2
		const result = pairSumSorted(nums, target)

		expect(result.length).toBe(2);
		expect(nums[result[0]] + nums[result[1]]).toBe(target)

		// All valid pairs: [0,1], [1,0], [0,2], [2,0], [1,2], [2,1]
		// We just need to verify that the returned indices contain the value 1
		expect(nums[result[0]]).toBe(1)
		expect(nums[result[1]]).toBe(1)
	})

	it('should return empty array if no pair is found', () => {
		const nums = [1, 2, 3, 4]
		const target = 10
		const result = pairSumSorted(nums, target)

		expect(result).toEqual([])
	})

	it('should work with negative numbers and negative target', () => {
		const nums = [-8, -6, -2, 0, 1, 3]
		const target = -8
		const result = pairSumSorted(nums, target)

		expect(result.length).toBe(2)
		expect(nums[result[0]] + nums[result[1]]).toBe(target)
	})

	it.skip('should work with an array of two elements that sum to target', () => {
		const nums = [1, 9]
		const target = 10
		const result = pairSumSorted(nums, target)

		expect(result).toEqual([0, 1])
	})

	it.skip('should work with duplicate values that can form multiple valid pairs', () => {
		const nums = [1, 2, 2, 3, 3]
		const target = 5
		const result = pairSumSorted(nums, target)

		expect(result.length).toBe(2)
		expect(nums[result[0]] + nums[result[1]]).toBe(target)
	})
})
