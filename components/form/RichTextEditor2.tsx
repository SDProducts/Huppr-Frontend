"use client";

import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Redo2,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RichTextEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export default function RichTextEditor({
  value = "",
  onChange,
  onBlur,
  placeholder = "Write something...",
  className,
  disabled = false,
}: RichTextEditorProps) {
  const onChangeRef = React.useRef(onChange);
  const onBlurRef = React.useRef(onBlur);

  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  React.useEffect(() => {
    onBlurRef.current = onBlur;
  }, [onBlur]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
          rel: "noopener noreferrer",
        },
      }),
    ],
    content: value,
    immediatelyRender: false,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChangeRef.current?.(editor.getHTML());
    },
    onBlur: () => {
      onBlurRef.current?.();
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[160px] px-4 py-3 text-sm outline-none " +
          "prose prose-sm max-w-none focus:outline-none",
        "data-placeholder": placeholder,
      },
    },
  });

  // Sync external value changes and form resets.
  React.useEffect(() => {
    if (!editor) return;

    const currentValue = editor.getHTML();

    if (currentValue !== value) {
      editor.commands.setContent(value || "");
    }
  }, [editor, value]);

  // Keep the editor's editable state synchronized.
  React.useEffect(() => {
    editor?.setEditable(!disabled);
  }, [editor, disabled]);

  const setLink = React.useCallback(() => {
    if (!editor || disabled) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl || "https://");

    if (url === null) return;

    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Allow only HTTP(S) URLs.
    try {
      const parsedUrl = new URL(trimmedUrl);

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: parsedUrl.href })
        .run();
    } catch {
      // Ignore invalid URLs.
    }
  }, [editor, disabled]);

  if (!editor) return null;

  const toolbarButtonClass = (active: boolean) =>
    cn("h-8 w-8 p-0", active && "bg-blue-50 text-blue-600");

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-input bg-background",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-1 border-b bg-muted/40 p-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={disabled}
          className={toolbarButtonClass(editor.isActive("bold"))}
          aria-label="Bold"
          aria-pressed={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={disabled}
          className={toolbarButtonClass(editor.isActive("italic"))}
          aria-label="Italic"
          aria-pressed={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={disabled}
          className={toolbarButtonClass(editor.isActive("underline"))}
          aria-label="Underline"
          aria-pressed={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="size-4" />
        </Button>

        <div className="mx-1 h-5 w-px bg-border" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={disabled}
          className={toolbarButtonClass(editor.isActive("bulletList"))}
          aria-label="Bullet list"
          aria-pressed={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={disabled}
          className={toolbarButtonClass(editor.isActive("orderedList"))}
          aria-label="Numbered list"
          aria-pressed={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="size-4" />
        </Button>

        <div className="mx-1 h-5 w-px bg-border" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={disabled}
          className={toolbarButtonClass(editor.isActive("link"))}
          aria-label="Insert link"
          onClick={setLink}
        >
          <LinkIcon className="size-4" />
        </Button>

        <div className="mx-1 h-5 w-px bg-border" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={disabled || !editor.can().undo()}
          className="h-8 w-8 p-0"
          aria-label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={disabled || !editor.can().redo()}
          className="h-8 w-8 p-0"
          aria-label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 className="size-4" />
        </Button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
