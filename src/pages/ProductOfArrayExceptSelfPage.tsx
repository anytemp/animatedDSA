import ProblemIntroTemplate from '../components/ProblemIntroTemplate';

export default function ProductOfArrayExceptSelfPage() {
  return (
    <ProblemIntroTemplate
      problemId={4}
      title="Product of Array Except Self"
      difficulty="Medium"
      topic="Array"
      pattern="Prefix / Suffix"
      statement="Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation."
      examples={[
        {
          input: 'nums = [1, 2, 3, 4]',
          output: '[24, 12, 8, 6]',
          explanation: 'For index 0: 2 × 3 × 4 = 24. For index 1: 1 × 3 × 4 = 12. For index 2: 1 × 2 × 4 = 8. For index 3: 1 × 2 × 3 = 6.',
        },
        {
          input: 'nums = [-1, 1, 0, -3, 3]',
          output: '[0, 0, 9, 0, 0]',
          explanation: 'Since there is a zero at index 2, all products except answer[2] will be 0. answer[2] = (-1) × 1 × (-3) × 3 = 9.',
        },
      ]}
      constraints={[
        '2 ≤ nums.length ≤ 10⁵',
        '-30 ≤ nums[i] ≤ 30',
        'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.',
      ]}
    />
  );
}
