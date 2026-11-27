import { cn } from "@/lib/utils";

export default function ResourceTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const tabs = ["Articles", "Guides", "Templates", "Videos", "Webinars"];

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex  justify-center gap-8 px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative py-6 text-xs font-medium transition",
              activeTab === tab
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-900"
            )}
          >
            {tab}

            {activeTab === tab && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
