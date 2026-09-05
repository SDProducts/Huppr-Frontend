export const SelectInputSkeleton = () => {
  return (
    <div className="space-y-1.5">
      <div className="h-4 w-1/3 bg-gray-300 rounded-sm animate-pulse"></div>
      <div className="h-12.5 w-full rounded-lg bg-gray-300 animate-pulse"></div>
    </div>
  );
};

export const DepartmentsSelectSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-9 w-64 bg-gray-300 rounded-md" />
        <div className="h-4 w-full max-w-md bg-gray-200 rounded-md" />
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-md bg-gray-200 border-gray-300 flex flex-col overflow-hidden"
          >
            {/* Icon Area */}
            <div className="h-28 w-full flex justify-center items-center">
              <div className="h-12 w-12 rounded-full bg-gray-300" />
            </div>
            {/* Footer Label Area */}
            <div className="bg-white p-2 flex justify-center">
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Controls Skeleton */}
      <div className="flex justify-between items-center text-sm py-4 border-t border-gray-300">
        <div className="h-10 w-24 bg-gray-300 rounded-full" />
        <div className="h-10 w-28 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};
export const CompanyFormSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-9 w-64 bg-gray-300 rounded-md" />
        <div className="h-4 w-full max-w-md bg-gray-200 rounded-md" />
      </div>

      {/* Grid Cards Skeleton */}

      <div className="grid gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-md bg-gray-200 border-gray-300 h-15"
          />
        ))}
      </div>

      {/* Footer Controls Skeleton */}
      <div className="flex justify-between items-center text-sm py-4 border-t border-gray-300">
        <div className="h-10 w-24 bg-gray-300 rounded-full" />
        <div className="h-10 w-28 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};
