import WorkspaceTemplate from '../components/WorkspaceTemplate';

export default function SearchInRotatedArrayWorkspace() {
  return (
    <WorkspaceTemplate
      problemId={8}
      title="Search in Rotated Sorted Array I"
      topic="Array"
      pattern="Binary Search"
      difficulty="Medium"
      approaches={{
        brute: {
          title: 'Brute Force: Linear Search',
          description: 'Scan every element and compare it with the target.',
          intuition: 'Simply iterate through the array and check if each element equals the target.',
          howItWorks: 'For each index i from 0 to n-1, if nums[i] == target, return i. If no match is found, return -1.',
          tradeoff: 'O(n) time. Does not take advantage of the sorted property.',
        },
        better: {
          title: 'Better: Sort with Index Preservation',
          description: 'Sort paired values while preserving their original indices, then search.',
          intuition: 'Create pairs of (value, original_index), sort by value, then use binary search.',
          howItWorks: 'Create an array of pairs (nums[i], i). Sort by the first element. Use binary search to find the target. Return the original index from the pair.',
          tradeoff: 'O(n log n) time and O(n) space. Sorting changes the original arrangement and takes extra time and space.',
        },
        optimal: {
          title: 'Optimal: Modified Binary Search',
          description: 'Use modified binary search that handles the rotation.',
          intuition: 'In a rotated sorted array, at least one half (left or right of mid) is always sorted. We can determine which half is sorted and whether the target lies in it.',
          howItWorks: 'Check if the left half is sorted (nums[left] <= nums[mid]). If so, check if target is in this range. If yes, search left; otherwise search right. If left half is not sorted, the right half must be sorted, so apply similar logic.',
          tradeoff: 'O(log n) time and O(1) space. Takes full advantage of the sorted property.',
        },
      }}
    >
      {(approach) => (
        <div className="p-12 text-center text-gray-500">
          <p className="text-xl mb-4">Visualization for {approach === 'brute' ? 'Brute Force' : approach === 'better' ? 'Better' : 'Optimal'} approach</p>
          <p>Coming soon. The approach explanation above shows the algorithm logic.</p>
        </div>
      )}
    </WorkspaceTemplate>
  );
}
