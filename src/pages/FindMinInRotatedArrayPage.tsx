import ProblemIntroTemplate from '../components/ProblemIntroTemplate';

export default function FindMinInRotatedArrayPage() {
  return (
    <ProblemIntroTemplate
      problemId={7}
      title="Find Minimum in Rotated Sorted Array"
      difficulty="Medium"
      topic="Array"
      pattern="Binary Search"
      statement="Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time."
      examples={[
        { input: 'nums = [3, 4, 5, 1, 2]', output: '1', explanation: 'The original array was [1, 2, 3, 4, 5] rotated 3 times.' },
        { input: 'nums = [4, 5, 6, 7, 0, 1, 2]', output: '0', explanation: 'The original array was [0, 1, 2, 4, 5, 6, 7] rotated 4 times.' },
        { input: 'nums = [11, 13, 15, 17]', output: '11', explanation: 'The original array was [11, 13, 15, 17] rotated 0 times (no rotation).' },
      ]}
      constraints={['n == nums.length', '1 ≤ n ≤ 5000', '-5000 ≤ nums[i] ≤ 5000', 'All integers are unique', 'nums is sorted and rotated between 1 and n times']}
    />
  );
}
