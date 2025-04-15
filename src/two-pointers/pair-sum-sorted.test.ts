import { describe, expect, it } from 'vitest'


type PairSumSortedStrategy = <Nums extends readonly number[], Idx extends keyof Nums>(nums: Nums, target: number) => [left: Idx, Idx][];

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
	for (let left = 0; left < nums.length; left++) {
		for (let right = left + 1; right < nums.length; right++) {
			if (nums[left] + nums[right] === target) {
				result.push([left, right])
			}
		}
	}
	return result
}

/**
 * Given an array of integers sorted in ascending order and a target value;
 * We can find the indexes of any pair of numbers in the array that sum to the target value with the two pointers technique.
 *
 * For any pair of valuse, of left and right:
 * - if the sum is less than the target, increment left, aiming to increas the sum toward the target value;
 * - if the sum is grater that the target, decrement right aiming to decreas the sum toward the target value;
 * - if the sum is equal to the target, we have found a pair, so we can store the indexes and increment left;
 */
const twoPointers: PairSumSortedStrategy = (nums, target) => {
	let leftPointer = 0
	let rightPointer = nums.length - 1
	const result: [number, number][] = []

	while (leftPointer < rightPointer) {
		const left = nums[leftPointer]
		const right = nums[rightPointer]
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


	return result //?
}

const recursiveTwoPointers: PairSumSortedStrategy = (nums, target) => {
	// base case: left pointer is greater than or equal to right pointer; no pair found; stop recursion

	function findPairsWithTargetSum<Idx extends keyof typeof nums, LeftPointer extends Idx, RightPointer extends Idx>(leftPoiner: LeftPointer, rightPointer: RightPointer, pairs: [LeftPointer, RightPointer][]): [LeftPointer, RightPointer][] {
		if (leftPoiner >= rightPointer) return pairs

		const left = nums[leftPoiner]
		const right = nums[rightPointer]
		const sum = left + right

		if (sum < target) {
			return findPairsWithTargetSum(leftPoiner + 1, rightPointer, pairs)
		}

		if (sum > target) {
			return findPairsWithTargetSum(leftPoiner, rightPointer - 1, pairs)
		}

		if (sum === target) {
			return findPairsWithTargetSum(leftPoiner + 1, rightPointer, [...pairs, [leftPoiner, rightPointer]])
		}

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
	describe('test an empty array', () => {
		const nums = []
		const target = 0
		const expectedOutput = []

		it('brute force', () => {
			const pairSumSorted = makePairSumSorted(bruteForce)
			expect(pairSumSorted(nums, target)).toEqual(expectedOutput)
		})

		it('two pointers', () => {
			const pairSumSorted = makePairSumSorted(twoPointers)
			expect(pairSumSorted(nums, target)).toEqual(expectedOutput)
		})

		it('recursive two pointers', () => {
			const pairSumSorted = makePairSumSorted(recursiveTwoPointers)
			expect(pairSumSorted(nums, target)).toEqual(expectedOutput)
		})
	})

	describe('test an array with just one element', () => {
		const nums = [1]
		const target = 1
		const expectedOutput = []

		it('brute force', () => {
			const pairSumSorted = makePairSumSorted(bruteForce)
			expect(pairSumSorted(nums, target)).toEqual(expectedOutput)
		})

		it('two pointers', () => {
			const pairSumSorted = makePairSumSorted(twoPointers)
			expect(pairSumSorted(nums, target)).toEqual(expectedOutput)
		})
		it('recursive two pointers', () => {
			const pairSumSorted = makePairSumSorted(recursiveTwoPointers)
			expect(pairSumSorted(nums, target)).toEqual(expectedOutput)
		})
	})

	describe('test two-element array that contains a pair that sums to the target', () => {
		const nums = [2, 4]
		const target = 5
		const expectedOutput = []

		it('brute force', () => {
			const pairSumSorted = makePairSumSorted(bruteForce)
			expect(pairSumSorted(nums, target)).toEqual(expectedOutput)
		})

		it('two pointers', () => {
			const pairSumSorted = makePairSumSorted(twoPointers)
			expect(pairSumSorted(nums, target)).toEqual(expectedOutput)
		})

		it('recursive two pointers', () => {
			const pairSumSorted = makePairSumSorted(recursiveTwoPointers)
			expect(pairSumSorted(nums, target)).toEqual(expectedOutput)
		})
	})

	describe('test an array with duplicate values', () => {
		const nums = [2, 2, 3]
		const target = 5
		const expectedOutputs = [[0, 2], [1, 2]] as const

		it('brute force', () => {
			const pairSumSorted = makePairSumSorted(bruteForce)
			const results = pairSumSorted(nums, target)
			expect(results).toContainEqual(expectedOutputs[0])
			expect(results).toContainEqual(expectedOutputs[1])
		})

		it('two pointers', () => {
			const pairSumSorted = makePairSumSorted(twoPointers)
			const results = pairSumSorted(nums, target)
			expect(results).toContainEqual(expectedOutputs[0])
			expect(results).toContainEqual(expectedOutputs[1])
		})

		it('recursive two pointers', () => {
			const pairSumSorted = makePairSumSorted(recursiveTwoPointers)
			const results = pairSumSorted(nums, target)
			expect(results).toContainEqual(expectedOutputs[0])
			expect(results).toContainEqual(expectedOutputs[1])
		})
	})

	describe('test if the algorithm works with negative number in the target pair', () => {
		const nums = [-1, 2, 3]
		const target = 2
		const expectedOutput = [0, 2]

		it('brute force', () => {
			const pairSumSorted = makePairSumSorted(bruteForce)
			const results = pairSumSorted(nums, target)
			expect(results).toContainEqual(expectedOutput)
		})

		it('two pointers', () => {
			const pairSumSorted = makePairSumSorted(twoPointers)
			const results = pairSumSorted(nums, target)
			expect(results).toContainEqual(expectedOutput)
		})

		it('recursive two pointers', () => {
			const pairSumSorted = makePairSumSorted(recursiveTwoPointers)
			const results = pairSumSorted(nums, target)
			expect(results).toContainEqual(expectedOutput)
		})
	})

	describe('test if the algorithm works with both numbers of the target pair being negative', () => {
		const nums = [-3, -2, -1]
		const target = -5
		const expectedOutput = [0, 1]

		it('brute force', () => {
			const pairSumSorted = makePairSumSorted(bruteForce)
			const results = pairSumSorted(nums, target)
			expect(results).toContainEqual(expectedOutput)
		})

		it('two pointers', () => {
			const pairSumSorted = makePairSumSorted(twoPointers)
			const results = pairSumSorted(nums, target)
			expect(results).toContainEqual(expectedOutput)
		})

		it('two pointers', () => {
			const pairSumSorted = makePairSumSorted(recursiveTwoPointers)
			const results = pairSumSorted(nums, target)
			expect(results).toContainEqual(expectedOutput)
		})
	})

})
