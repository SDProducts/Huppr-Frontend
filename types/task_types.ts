export type TaskPriority = "low" | "medium" | "high" | "urgent" | string;
export type TaskStatus =
  | "todo"
  | "in_progress"
  | "in_review"
  | "completed"
  | "cancelled"
  | string;

export interface TaskAssignee {
  id: string;
  displayName: string | null;
  avatarUrl: string | null;
  email: string;
}

export interface EntityReference {
  id: string;
  name: string;
}

export interface TaskItem {
  id: string;
  organizationId: string;
  projectId: string;
  assigneeId: string | null;
  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  startDate: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  assignee: TaskAssignee | null;
  project: EntityReference;
}

export interface TaskListResponse {
  items: TaskItem[];
  total: number;
  page: number;
  limit: number;
}

export interface CommentAuthor {
  id: string;
  displayName: string | null;
  avatarUrl: string | null;
  email: string;
}

export interface TaskNote {
  id: string;
  organizationId: string;
  taskId: string;
  authorId: string;
  body: string;
  createdAt: string;
  author: CommentAuthor;
}

export interface TaskNoteListResponse {
  items: TaskNote[];
  total: number;
  page: number;
  limit: number;
}

export type TaskActivityAction =
  | "created"
  | "updated"
  | "deleted"
  | "note_added"
  | "status_changed"
  | "assignee_changed"
  | string;

export interface TaskActor {
  id: string;
  displayName: string | null;
  avatarUrl: string | null;
  email: string;
}

export type TaskChanges = Record<string, unknown>;

export interface TaskActivityItem {
  id: string;
  organizationId: string;
  taskId: string;
  actorId: string;
  action: TaskActivityAction;
  changes: TaskChanges;
  createdAt: string;
  actor: TaskActor;
}

export interface TaskActivityListResponse {
  items: TaskActivityItem[];
  total: number;
  page: number;
  limit: number;
}

export interface FileItem {
  id: string;
  fileName: string;
  contentType: string;
  fileSize: number;
  createdAt: string;
}

export interface FileListResponse {
  items: FileItem[];
}
