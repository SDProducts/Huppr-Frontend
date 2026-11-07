import { cn } from "@/lib/utils";
import { JobStage } from "@/types/create_job_payload";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Bot, BotOff, ChevronRight, GripVertical } from "lucide-react";

export function SortableStageCard({
  stage,
  index,
  activeStage,
  onSelect,
}: {
  stage: JobStage;
  index: number;
  activeStage: string;
  onSelect: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stage.name });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : undefined,
      }}
      className="flex shrink-0 items-center gap-4"
    >
      {index > 0 && (
        <ChevronRight
          className={cn(
            "size-10 shrink-0",
            activeStage === stage.name ? "text-primary" : "text-gray-300"
          )}
          strokeWidth={4}
        />
      )}

      <div
        onClick={onSelect}
        className={cn(
          "relative w-55 cursor-pointer space-y-4 rounded-lg p-4",
          activeStage === stage.name
            ? "bg-primary/15 text-primary"
            : "bg-primary/5",
          index === 0 && "ml-4"
        )}
      >
        {activeStage === stage.name && (
          <div className="absolute -top-2 right-4 rounded-full bg-primary px-3 py-0.5 text-xs text-white">
            Configuring
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-semibold">
            {String(index + 1).padStart(2, "0")} .{" "}
            {activeStage === stage.name ? "selected" : "stage"}
          </div>

          <button
            type="button"
            {...attributes}
            {...listeners}
            onClick={(event) => event.stopPropagation()}
            aria-label={`Drag ${stage.name} to reorder`}
            className="cursor-grab touch-none rounded p-1 hover:bg-white/70 active:cursor-grabbing"
          >
            <GripVertical className="size-5" />
          </button>
        </div>

        <div>
          <div className="font-bold">{stage.name}</div>
          <div className="text-xs line-clamp-1" title={stage.description}>
            {stage.description || "..."}
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs">
          {stage.automations?.some((automation) => automation.isEnabled) ? (
            <>
              <Bot className="size-4" />
              Automated
            </>
          ) : (
            <>
              <BotOff className="size-4" />
              Not Automated
            </>
          )}
        </div>
      </div>
    </div>
  );
}
