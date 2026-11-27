"use client";

import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CalendarDays, MoreVertical, Plus, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

import AddNewCandidate from "@/app/dashboard/jobs/_components/AddNewCandidate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { useModal } from "@/context/modal.state";
import {
  useGetCandidatePipeline,
  useMoveCandidateStage,
} from "@/hooks/employer/useJobs";
import { cn, getActivityDate, getInitials } from "@/lib/utils";
import { useParams } from "next/navigation";

function getStageColor(stage: JobPipelineStageWithCandidate) {
  if (stage.accent) return stage.accent;

  const colors: Record<string, string> = {
    screening: "#64748b",
    interview: "#2563eb",
    assessment: "#9333ea",
    offer: "#10b981",
    hired: "#a855f7",
    rejected: "#ef4444",
  };

  return colors[stage.category] ?? "#64748b";
}

function CandidateCardContent({
  candidate,
  onClick,
}: {
  candidate: Candidate;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-3 shadow-sm",
        "transition-shadow hover:shadow-md",
        onClick && "cursor-pointer"
      )}
    >
      <div className="flex items-start gap-2.5">
        <Avatar className="size-7 shrink-0">
          {candidate.avatar && (
            <AvatarImage src={candidate.avatar} alt={candidate.fullName} />
          )}
          <AvatarFallback className="bg-slate-100 text-xs font-semibold text-slate-600">
            {getInitials(candidate.fullName)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-900">
            {candidate.fullName}
          </p>

          <p className="text-[10px] text-slate-400">
            {candidate.currentRole || candidate.email}
          </p>

          {candidate.currentCompany && (
            <p className="text-[10px] text-slate-400">
              at {candidate.currentCompany}
            </p>
          )}
        </div>
      </div>
      <div className="mt-1">
        <div className="flex items-center gap-1">
          {candidate.matchScore !== null && (
            <Badge
              variant="secondary"
              className={cn(
                "border-0 text-[10px]",
                candidate.matchScore >= 80
                  ? "bg-emerald-50 text-emerald-700"
                  : candidate.matchScore >= 60
                  ? "bg-blue-50 text-blue-700"
                  : "bg-slate-100 text-slate-600"
              )}
            >
              {candidate.matchScore}% match
            </Badge>
          )}
          <div className="flex-1">
            <Progress
              value={candidate.matchScore}
              indicatorClassName={cn(
                candidate.matchScore >= 80
                  ? "bg-emerald-500"
                  : candidate.matchScore >= 50
                  ? "bg-primary"
                  : "bg-orange-600"
              )}
            />
          </div>
        </div>
      </div>

      <div className="my-3 border-t border-slate-100" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <CalendarDays className="size-3.5" />
          {getActivityDate(candidate.lastActivityAt)}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className={cn("p-0!")}>
            <div
              className="size-6 shrink-0 hover:bg-slate-200 flex justify-center items-center rounded-sm focus:bg-slate-200 text-slate-400"
              onClick={(event) => event.stopPropagation()}
            >
              <MoreVertical className="size-4" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={onClick}>
              View candidate
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                if (navigator.clipboard) {
                  void navigator.clipboard.writeText(candidate.email);
                }
              }}
            >
              Copy email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function DraggableCandidateCard({
  candidate,
  stageId,
  onClick,
}: {
  candidate: Candidate;
  stageId: string;
  onClick?: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `candidate:${candidate.id}`,
    data: {
      candidateId: candidate.id,
      stageId,
    },
  });

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: `candidate-drop:${candidate.id}`,
    data: {
      stageId,
    },
  });

  const setNodeRef = (node: HTMLDivElement | null) => {
    setDraggableRef(node);
    setDroppableRef(node);
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.35 : 1,
      }}
      {...listeners}
      {...attributes}
      className="touch-none cursor-grab active:cursor-grabbing"
    >
      <CandidateCardContent candidate={candidate} onClick={onClick} />
    </div>
  );
}

function CandidateCardPreview({ candidate }: { candidate: Candidate }) {
  return (
    <div className="w-[230px] rotate-2 cursor-grabbing shadow-xl">
      <CandidateCardContent candidate={candidate} />
    </div>
  );
}

function PipelineColumn({
  stage,
  onCandidateClick,
}: {
  stage: JobPipelineStageWithCandidate;
  onCandidateClick?: (candidate: Candidate) => void;
}) {
  const modal = useModal();
  const { setNodeRef, isOver } = useDroppable({
    id: `stage:${stage.stageId}`,
    data: {
      stageId: stage.stageId,
    },
  });

  const color = getStageColor(stage);
  function handleAddNewCandidate() {
    modal.open({
      content: <AddNewCandidate stageId={stage.stageId} />,
      size: "md:w-xl",
      bgColor: "bg-slate-100",
      headerColor: "bg-primary-heading",
      header: (
        <div className="">
          <h2 className="text-2xl font-bold text-white">Add New Candidate</h2>
          <p className="text-sm text-white">
            Add new candidates, select recruitment stage and professional info.{" "}
          </p>
        </div>
      ),
    });
  }

  return (
    <div className="flex w-[230px] shrink-0 flex-col">
      {/* Stage heading */}
      <div className="mb-3 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />

            <h3 className="truncate text-sm font-semibold text-slate-800">
              {stage.name}
            </h3>
          </div>

          <Badge
            variant="secondary"
            className="h-5 min-w-6 justify-center rounded-full bg-slate-100 px-2 text-[10px] text-slate-600"
          >
            {stage.candidates.length}
          </Badge>
        </div>

        <p className="truncate text-xs text-slate-400">
          {stage.description || "..."}
        </p>
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-[180px] flex-1 flex-col gap-2 rounded-xl transition-colors",
          isOver ? "bg-primary/10 ring-2 ring-primary/30" : "bg-slate-50/70"
        )}
      >
        <div className="flex flex-col gap-2 p-1">
          {stage.candidates.map((candidate) => (
            <DraggableCandidateCard
              key={candidate.id}
              candidate={candidate}
              stageId={stage.stageId}
              onClick={() => onCandidateClick?.(candidate)}
            />
          ))}
        </div>

        {stage.candidates.length === 0 && (
          <div className="flex flex-1 items-center justify-center p-4">
            <div
              className={cn(
                "flex min-h-[100px] w-full items-center justify-center rounded-lg border border-dashed text-center text-xs transition-colors",
                isOver
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-slate-200 text-slate-400"
              )}
            >
              Drop candidate here
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddNewCandidate}
          className="mx-1 mb-1 flex items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-2 text-xs font-medium text-slate-500 transition hover:border-primary hover:bg-white hover:text-primary"
        >
          <Plus className="size-3.5" />
          Add Candidate
        </button>
      </div>
    </div>
  );
}

export default function CandidatePipeline() {
  const { jobId } = useParams();
  const modal = useModal();
  const { data } = useGetCandidatePipeline(String(jobId));
  const initialStages = data?.stages || [];
  const [stages, setStages] = useState<JobPipelineStageWithCandidate[]>(
    [...initialStages].sort((a, b) => a.displayOrder - b.displayOrder)
  );

  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(
    null
  );
  const { mutate: moveCandidate } = useMoveCandidateStage();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStages(
      [...initialStages].sort((a, b) => a.displayOrder - b.displayOrder)
    );
  }, [initialStages]);

  function handleDragStart(event: DragStartEvent) {
    const candidateId = event.active.data.current?.candidateId;

    if (!candidateId) return;

    const candidate = stages
      .flatMap((stage) => stage.candidates)
      .find((item) => item.id === candidateId);

    setActiveCandidate(candidate ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveCandidate(null);

    const { active, over } = event;

    if (!over) return;

    const candidateId = active.data.current?.candidateId as string | undefined;

    const fromStageId = active.data.current?.stageId as string | undefined;

    const toStageId = over.data.current?.stageId as string | undefined;

    if (!candidateId || !fromStageId || !toStageId) return;
    if (fromStageId === toStageId) return;

    const candidate = stages
      .flatMap((stage) => stage.candidates)
      .find((item) => item.id === candidateId);

    if (!candidate) return;

    // Optimistically update the board.
    setStages((currentStages) =>
      currentStages.map((stage) => {
        if (stage.stageId === fromStageId) {
          const candidates = stage.candidates.filter(
            (item) => item.id !== candidateId
          );

          return {
            ...stage,
            candidates,
            candidateCount: candidates.length,
          };
        }

        if (stage.stageId === toStageId) {
          const candidates = [...stage.candidates, candidate];

          return {
            ...stage,
            candidates,
            candidateCount: candidates.length,
          };
        }

        return stage;
      })
    );

    // The Persist the move through the parent/API.
    void moveCandidate({
      stageId: toStageId,
      candidateId: candidateId,
    });
    void console.log(candidateId, fromStageId, toStageId);
  }

  function handleDragCancel() {
    setActiveCandidate(null);
  }

  return (
    <div className="w-full space-y-5">
      {/* Board header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Candidate Pipeline
          </h2>
          <p className="text-sm text-slate-500">
            Drag candidates between stages to update their progress.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <UserRound className="size-4" />
          {stages.reduce(
            (total, stage) => total + stage.candidates.length,
            0
          )}{" "}
          candidates
        </div>
      </div>

      {/* Pipeline board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="w-full overflow-x-auto pb-4">
          <div className="flex min-w-max items-start gap-3">
            {stages.map((stage) => (
              <PipelineColumn
                key={stage.stageId}
                stage={stage}
                // onAddCandidate={onAddCandidate}
                // onCandidateClick={onCandidateClick}
              />
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeCandidate ? (
            <CandidateCardPreview candidate={activeCandidate} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
