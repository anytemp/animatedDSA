import ProblemIntroTemplate from '../components/ProblemIntroTemplate';

export default function ThreeSumPage() {
  return (
    <ProblemIntroTemplate
      problemId={9}
      title="3Sum"
      difficulty="Medium"
      topic="Array"
      pattern="Two Pointers"
      statement="Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets."
      examples={[
        { input: 'nums = [-1, 0, 1, 2, -1, -4]', output: '[[-1, -1, 2], [-1, 0, 1]]', explanation: 'The triplets [-1, -1, 2] and [-1, 0, 1] sum to 0. Duplicates are not allowed.' },
        { input: 'nums = [0, 1, 1]', output: '[]', explanation: 'No three elements sum to 0.' },
        { input: 'nums = [0, 0, 0]', output: '[[0, 0, 0]]', explanation: 'The only triplet [0, 0, 0] sums to 0.' },
      ]}
      constraints={['3 ≤ nums.length ≤ 3000', '-10⁵ ≤ nums[i] ≤ 10⁵']}
    />
  );
}
