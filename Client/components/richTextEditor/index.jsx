"use client";

import { useEffect, useCallback } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaCode,
  FaParagraph,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaSuperscript,
  FaSubscript,
  FaLink,
  FaUnlink,
  FaImage,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaUndo,
  FaRedo,
  FaTimesCircle,
} from "react-icons/fa";

const MenuBar = ({ editor }) => {
  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url, target: "_blank" })
      .run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("URL عکس را وارد کنید:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b-2 border-zinc-300">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="تیره"
      >
        <FaBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="کج"
      >
        <FaItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={
          editor.isActive("underline")
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="زیرخط"
      >
        <FaUnderline />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="خط‌خورده"
      >
        <FaStrikethrough />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
          editor.isActive("code")
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="کد"
      >
        <FaCode />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive("paragraph")
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="پاراگراف"
      >
        <FaParagraph />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="تیتر ۱"
      >
        <FaHeading />¹
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="تیتر ۲"
      >
        <FaHeading />²
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="تیتر ۳"
      >
        <FaHeading />³
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="لیست نامرتب"
      >
        <FaListUl />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="لیست مرتب"
      >
        <FaListOl />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote")
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="نقل قول"
      >
        <FaQuoteRight />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={
          editor.isActive("superscript")
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="بالانویس"
      >
        <FaSuperscript />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={
          editor.isActive("subscript")
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="پایین‌نویس"
      >
        <FaSubscript />
      </button>
      <button
        type="button"
        onClick={setLink}
        className={
          editor.isActive("link")
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="افزودن لینک"
      >
        <FaLink />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
        className={"px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"}
        title="حذف لینک"
      >
        <FaUnlink />
      </button>
      <button
        type="button"
        onClick={addImage}
        className="px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        title="افزودن عکس"
      >
        <FaImage />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={
          editor.isActive({ textAlign: "left" })
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="چپ‌چین"
      >
        <FaAlignLeft />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" })
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="وسط‌چین"
      >
        <FaAlignCenter />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={
          editor.isActive({ textAlign: "right" })
            ? "is-active px-3 py-1 rounded-md bg-zinc-200 cursor-pointer"
            : "px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        }
        title="راست‌چین"
      >
        <FaAlignRight />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetTextAlign().run()}
        className="px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        title="حذف تراز"
      >
        <FaTimesCircle />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        title="برگرداندن"
      >
        <FaUndo />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="px-3 py-1 rounded-md hover:bg-zinc-100 cursor-pointer"
        title="بازگشت به جلو"
      >
        <FaRedo />
      </button>
    </div>
  );
};

const TextEditor = ({ initialContent, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: true,
      }),
      Underline,
      Superscript,
      Subscript,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "right",
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "custom-tiptap-content focus:outline-none p-4 min-h-[200px] max-h-[400px] overflow-y-auto",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent, false);
    }
  }, [initialContent, editor]);

  return (
    <div className="border-2 border-zinc-300 focus-within:border-orange-400 rounded-md">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="text-editor-content" />
    </div>
  );
};

export default TextEditor;
