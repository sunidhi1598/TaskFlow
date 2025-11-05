const FilterTabs = ({ activeFilter, onFilterChange, counts }) => {
  const tabs = [
    { value: 'all', label: 'All Tasks', count: counts.total },
    { value: 'pending', label: 'Pending', count: counts.pending },
    { value: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="flex gap-2 mb-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onFilterChange(tab.value)}
          className={`px-4 py-3 font-semibold transition relative ${
            activeFilter === tab.value
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.label}
          <span
            className={`ml-2 px-2 py-1 rounded-full text-xs ${
              activeFilter === tab.value
                ? 'bg-indigo-100 text-indigo-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;