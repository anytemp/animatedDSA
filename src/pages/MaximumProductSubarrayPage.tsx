import ProblemIntroTemplate from '../components/ProblemIntroTemplate';

export default function MaximumProductSubarrayPage() {
  return (
    <ProblemIntroTemplate
      problemId={6}
      title="Maximum Product Subarray"
      difficulty="Medium"
      topic="Array"
      pattern="Dynamic Programming"
      statement="Given an integer array nums, find a subarray that has the largest product, and return the product. The test cases are generated so that the answer will fit in a 32-bit integer."
      examples={[
        { input: 'nums = [2, 3, -2, 4]', output: '6', explanation: 'The subarray [2, 3] has the largest product 6.' },
        { input: 'nums = [-2, 0, -1]', output: '0', explanation: 'The result cannot be 2, because [-2, -1] is not a subarray as -1 is not adjacent.' },
      ]}
      constraints={['1 ≤ nums.length ≤ 2 * 10⁴', '-10 ≤ nums[i] ≤ 10']}
    />
  );
}
