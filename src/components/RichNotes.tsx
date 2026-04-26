"use client";

import { useEffect, useRef } from "react";

export default function RichNotes({ value, onChange }: any) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    // ✅ Load Quill only on client
    import("quill").then((QuillModule) => {
      import("quill/dist/quill.snow.css");

      const Quill = QuillModule.default;

      quillRef.current = new Quill(editorRef.current!, {
        theme: "snow",
        placeholder: "Add notes, payment instructions, or extra details...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }],

            ["bold", "italic", "underline", "strike"],

            [{ color: [] }, { background: [] }],

            [{ script: "sub" }, { script: "super" }],

            [{ list: "ordered" }, { list: "bullet" }],

            [{ indent: "-1" }, { indent: "+1" }],

            ["blockquote", "code-block"],

            [{ align: [] }],

            ["link", "image"],

            ["clean"],
          ],
        },
      });

      quillRef.current.on("text-change", () => {
        onChange(quillRef.current.root.innerHTML);
      });

      if (value) {
        quillRef.current.root.innerHTML = value;
      }
    });
  }, []);

  return (
    <div className="space-y-2">
      {/* LABEL */}
      <p className="text-xs text-[var(--subtext)]">
        Notes / Additional Information
      </p>

      {/* EDITOR CONTAINER */}
      <div className="bg-white text-black rounded-md overflow-hidden border border-white/10">
        <div
          ref={editorRef}
          className="min-h-[150px]"
        />
      </div>
    </div>
  );
}