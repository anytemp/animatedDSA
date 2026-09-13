import WorkspaceTemplate from '../components/WorkspaceTemplate';

export default function FindMinInRotatedArrayWorkspace() {
  return (
    <WorkspaceTemplate
      problemId={7}
      title="Find Minimum in Rotated Sorted Array"
      topic="Array"
      pattern="Binary Search"
      difficulty="Medium"
      approaches={{
        brute: {
          title: 'Brute Force: Linear Scan',
          description: 'Scan the entire array and track the smallest value.',
          intuition: 'Simply iterate through all elements and keep track of the minimum.',
          howItWorks: 'Initialize min = nums[0]. For each element, if it is smaller than min, update min. Return min at the end.',
          tradeoff: 'O(n) time. Does not take advantage of the sorted property.',
        },
        better: {
          title: 'Better: Sorting',
          description: 'Sort the array and return the first element.',
          intuition: 'After sorting, the minimum will be at index 0.',
          howItWorks: 'Sort the array using any sorting algorithm, then return nums[0].',
          tradeoff: 'O(n log n) time. Sorting destroys the original ordering and is unnecessary.',
        },
        optimal: {
          title: 'Optimal: Binary Search',
          description: 'Use binary search to find the minimum in O(log n) time.',
          intuition: 'In a rotated sorted array, the minimum element is the only element that is smaller than its previous element. We can use binary search to find it.',
          howItWorks: 'Compare nums[mid] with nums[right]. If nums[mid] > nums[right], the minimum is in the right half. Otherwise, it is in the left half (including mid). Continue until left == right.',
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
