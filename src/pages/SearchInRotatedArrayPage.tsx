import ProblemIntroTemplate from '../components/ProblemIntroTemplate';

export default function SearchInRotatedArrayPage() {
  return (
    <ProblemIntroTemplate
      problemId={8}
      title="Search in Rotated Sorted Array I"
      difficulty="Medium"
      topic="Array"
      pattern="Binary Search"
      statement="There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity."
      examples={[
        { input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 0', output: '4', explanation: 'The target 0 is at index 4 in the rotated array.' },
        { input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 3', output: '-1', explanation: 'The target 3 is not in the array, so return -1.' },
        { input: 'nums = [1], target = 0', output: '-1', explanation: 'The target 0 is not in the array [1], so return -1.' },
      ]}
      constraints={['1 ≤ nums.length ≤ 5000', '-10⁴ ≤ nums[i] ≤ 10⁴', 'All values are unique', '-10⁴ ≤ target ≤ 10⁴']}
    />
  );
}
