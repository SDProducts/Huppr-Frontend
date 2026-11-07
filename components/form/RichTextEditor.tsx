"use client";

import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useField } from "formik";
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
  name: string;
  placeholder?: string;
  className?: string;
};

export default function RichTextEditor({
  name,
  placeholder = "Write something...",
  className,
}: RichTextEditorProps) {
  const [field, meta, helpers] = useField<string>(name);

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
    content: field.value || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      helpers.setValue(editor.getHTML());
    },
    onBlur: () => {
      helpers.setTouched(true);
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

  // Keep the editor in sync with Formik resets and external changes.
  React.useEffect(() => {
    if (!editor) return;

    const value = field.value || "";

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [editor, field.value]);

  const setLink = React.useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl || "https://");

    if (url === null) return;

    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.trim() })
      .run();
  }, [editor]);

  if (!editor) return null;

  const toolbarButtonClass = (active: boolean) =>
    cn("h-8 w-8 p-0", active && "bg-blue-50 text-blue-600");

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-gray-100",
        meta.touched && meta.error ? "border-destructive" : "border-input",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-1 bg-gray-200 p-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
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
          className="h-8 w-8 p-0"
          aria-label="Undo"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0"
          aria-label="Redo"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 className="size-4" />
        </Button>
      </div>

      <EditorContent editor={editor} />

      {meta.touched && meta.error && (
        <p className="px-4 pb-3 text-sm text-destructive">{meta.error}</p>
      )}
    </div>
  );
}
