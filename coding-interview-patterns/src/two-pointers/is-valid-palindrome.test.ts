/**
 * A Palindrome is a sequence of characters that reads the same backward as forward.
 *
 * Given a string, determine if it's a palindrome after removing all non-alphanumeric characters.
 * A character is alphanumeric if it is a letter or a number.
 *
 * Example 1:
 * Input: s = "a dog! a panic in a pagoda"
 * Output: true
 *
 * Example 2:
 * Input: s = "abc123"
 * Output: false
 *
 *
 * Constraints:
 * The string may include a combination of lowercase English letters, numbers, spaces and punctuations.
 *
 * @module isValidPalindrome
 */
/** biome-ignore-all lint/style/useConst: <explanation> */

import type { Predicate } from 'effect'
import { describe, it } from 'vitest'

/**
 * @privateRemarks
 *
 * # Intuition
 * A string is a palindrome if it remains identical when read from left or right.
 * 1. In other words, if we reverse the string, it should read the same, disregarding spaces and punctuation.
 *
 * "racecar" -reverse-> "racecar"
 *
 * 2. if it is a palindrome, it also means that the first and last characters are the same; and the same logic would apply if we progressively walk inwards if the string is of even length.
 *
 * 3. A palindrome of odd lenght is slightly different, because it has a middle character. The middle character can be ignored since it has no mirrored counterpart.
 *
 */

type IsValidPalindromeStrategy = Predicate.Predicate<string>

const makeIsValidPalindrome = (strategy: IsValidPalindromeStrategy) => strategy

const twoPointers: IsValidPalindromeStrategy = (inputString) => {
	const lastIndex = inputString.length - 1
	let leftPointer = 0
	let rightPointer = lastIndex

	const alphanumericPattern = RegExp(/[a-zA-Z0-9]/)

	while (leftPointer < rightPointer) {
		// increment any non-alpha-numeric characters using /[a-zA-Z0-9]/ regex pattern
		while (
			leftPointer < rightPointer &&
			!alphanumericPattern.test(inputString[leftPointer]!)
		) {
			// skip non-alphanumeric characters
			leftPointer += 1
		}

		while (
			leftPointer < rightPointer &&
			!alphanumericPattern.test(inputString[rightPointer]!)
		) {
			// skip non-alphanumeric characters
			rightPointer -= 1
		}
		// if the characters at the left and right do not match, the string is not a palindrome.
		if (inputString[leftPointer] !== inputString[rightPointer]) {
			return false
		}

		// walk inwards
		leftPointer += 1
		rightPointer -= 1
	}

	return true
}

const recursive: IsValidPalindromeStrategy = (inputString) => {
	/**
	 * base base case: if left and right do not match return false
	 * recursive case: if left and right match and string not exausted, recurse, else return true
	 */

	const alphanumericPattern = RegExp(/[a-zA-Z0-9]/)

	function checkPalindrome(leftPointer: number, rightPointer: number): boolean {
		// 1. Base Case: Pointers meet or cross -> Palindrome confirmed so far
		if (leftPointer >= rightPointer) {
			return true
		}

		const leftChar = inputString.at(leftPointer)!
		const rightChar = inputString.at(rightPointer)!

		// 2. Recursive Skip Left: If left char is non-alphanumeric, skip it
		if (!alphanumericPattern.test(leftChar)) {
			return checkPalindrome(leftPointer + 1, rightPointer)
		}

		// 3. Recursive Skip Right: If right char is non-alphanumeric, skip it
		if (!alphanumericPattern.test(rightChar)) {
			return checkPalindrome(leftPointer, rightPointer - 1)
		}

		// 4. Both are alphanumeric, compare them (case-insensitive)
		if (leftChar.toLowerCase() !== rightChar.toLowerCase()) {
			return false // Mismatch
		}

		// 5. Recursive Step: Check the inner substring
		return checkPalindrome(leftPointer + 1, rightPointer - 1)
	}

	// 5. Recursive Step: Check the inner substring
	return checkPalindrome(0, inputString.length - 1)
}

describe('isValidPalindrome', () => {
	const strategies: IsValidPalindromeStrategy[] = [twoPointers, recursive]

	describe.for([{ input: '', output: true }])(
		'Tests an empty string',
		({ input, output }) => {
			it.for(strategies)('with %O strategy', (strategy, { expect }) => {
				const isValidPalindrome = makeIsValidPalindrome(strategy)
				expect(isValidPalindrome(input)).toBe(output)
			})
		},
	)

	describe.for([{ input: 'a', output: true }])(
		'Tests a single-character string',
		({ input, output }) => {
			it.for(strategies)('with %O strategy', (strategy, { expect }) => {
				const isValidPalindrome = makeIsValidPalindrome(strategy)
				expect(isValidPalindrome(input)).toBe(output)
			})
		},
	)

	describe.for([{ input: 'aa', output: true }])(
		'Tests a palindrome with two characters',
		({ input, output }) => {
			it.for(strategies)('with %O strategy', (strategy, { expect }) => {
				const isValidPalindrome = makeIsValidPalindrome(strategy)
				expect(isValidPalindrome(input)).toBe(output)
			})
		},
	)
	describe.for([{ input: 'ab', output: false }])(
		'Tests a non-palindrome with two characters',
		({ input, output }) => {
			it.for(strategies)('with %O strategy', (strategy, { expect }) => {
				const isValidPalindrome = makeIsValidPalindrome(strategy)
				expect(isValidPalindrome(input)).toBe(output)
			})
		},
	)

	describe.for([{ input: '!, (?)', output: true }])(
		'Tests a string with no alphanumeric characters',
		({ input, output }) => {
			it.for(strategies)('with %O strategy', (strategy, { expect }) => {
				const isValidPalindrome = makeIsValidPalindrome(strategy)
				expect(isValidPalindrome(input)).toBe(output)
			})
		},
	)

	describe.for([{ input: '12.02.2021', output: true }])(
		'Tests a palindrome with punctuation and numbers',
		({ input, output }) => {
			it.for(strategies)('with %O strategy', (strategy, { expect }) => {
				const isValidPalindrome = makeIsValidPalindrome(strategy)
				expect(isValidPalindrome(input)).toBe(output)
			})
		},
	)

	describe.for([{ input: '21.02.2021', output: false }])(
		'Tests a non-palindrome with punctuation and numbers',
		({ input, output }) => {
			it.for(strategies)('with %O strategy', (strategy, { expect }) => {
				const isValidPalindrome = makeIsValidPalindrome(strategy)
				expect(isValidPalindrome(input)).toBe(output)
			})
		},
	)

	describe.for([
		{ input: 'hello, world!', output: false },
		{ input: 'a dog! a panic in a pagoda', output: true },
	])('Tests a non-palindrome with punctuation', ({ input, output }) => {
		it.for(strategies)('with %O strategy', (strategy, { expect }) => {
			const isValidPalindrome = makeIsValidPalindrome(strategy)
			expect(isValidPalindrome(input)).toBe(output)
		})
	})
})
