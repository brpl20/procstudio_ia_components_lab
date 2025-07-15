"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { FileText, Save, Download, RotateCcw } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import AutoFormat from "./AutoFormat";
import ClausulaRule from "./ClausulaRule";
import { registerClausulaBlot } from "./ClausulaBlot";

// Define the ref type for the RichTextEditor component
export type RichTextEditorHandle = {
  getContent: () => string;
  getDelta: () => unknown;
  setContent: (content: string) => void;
  clear: () => void;
};

// Global flag to prevent multiple registrations
let isRegistered = false;

// Register modules once when the module loads
if (typeof window !== "undefined" && !isRegistered) {
  try {
    // Register custom blot first
    registerClausulaBlot();
    // Register the AutoFormat module with Quill
    Quill.register("modules/autoFormat", AutoFormat);
    isRegistered = true;
    console.log("Quill modules registered successfully");
  } catch (error) {
    console.error("Error registering Quill modules:", error);
  }
}

interface RichTextEditorProps {
  placeholder?: string;
  minHeight?: string;
  showPreview?: boolean;
  showActions?: boolean;
  onSave?: (content: string, delta: unknown) => void;
  onExport?: (content: string) => void;
  className?: string;
}

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(
  (
    {
      placeholder = "Write something...",
      minHeight = "400px",
      showPreview = true,
      showActions = true,
      onSave,
      onExport,
      className = "",
    },
    ref,
  ) => {
    const [value, setValue] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [quillInstance, setQuillInstance] = useState<ReactQuill | null>(null);

    // Header level constants
    const HEADER_LEVEL_1 = 1;
    const HEADER_LEVEL_2 = 2;
    const HEADER_LEVEL_3 = 3;

    // Enhanced modules configuration with custom AutoFormat
    const modules = {
      toolbar: [
        [
          {
            header: [HEADER_LEVEL_1, HEADER_LEVEL_2, HEADER_LEVEL_3, false],
          },
        ],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["blockquote", "code-block"],
        ["link", "image"],
        ["clean"],
      ],
      autoFormat: {}, // Custom AutoFormat module
    };

    const formats = [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "color",
      "background",
      "list",
      "bullet",
      "indent",
      "align",
      "blockquote",
      "code-block",
      "link",
      "image",
      "clausula", // Custom format for clausula blot
    ];

    // Initialize AutoFormat module when ReactQuill is ready
    useEffect(() => {
      if (quillInstance) {
        setTimeout(() => {
          try {
            const quill = quillInstance.getEditor();
            const autoFormat = quill.getModule("autoFormat") as AutoFormat;

            if (autoFormat && typeof autoFormat.registerRule === "function") {
              autoFormat.registerRule(ClausulaRule);
              console.log("ClausulaRule registered with AutoFormat module");
            } else {
              console.warn("AutoFormat module not properly initialized");
            }
          } catch (moduleError) {
            console.error("Error initializing AutoFormat module:", moduleError);
          }
        }, 100);
      }
    }, [quillInstance]);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      getContent: () => {
        if (quillInstance) {
          return quillInstance.getEditor().root.innerHTML;
        }
        return value;
      },
      getDelta: () => {
        if (quillInstance) {
          return quillInstance.getEditor().getContents();
        }
        return { ops: [] };
      },
      setContent: (content: string) => {
        setValue(content);
      },
      clear: () => {
        setValue("");
      },
    }));

    const handleSave = async () => {
      setIsSaving(true);

      try {
        const content = quillInstance
          ? quillInstance.getEditor().root.innerHTML
          : value;
        const delta = quillInstance
          ? quillInstance.getEditor().getContents()
          : { ops: [] };

        if (onSave) {
          await onSave(content, delta);
        } else {
          // Default save behavior
          console.log("Document saved:", { content, delta });
        }
      } catch (error) {
        console.error("Error saving document:", error);
      } finally {
        // Simulate save delay
        setTimeout(() => {
          setIsSaving(false);
        }, 1000);
      }
    };

    const handleExport = () => {
      const content = quillInstance
        ? quillInstance.getEditor().root.innerHTML
        : value;

      if (onExport) {
        onExport(content);
      } else {
        // Default export behavior
        const blob = new Blob([content], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "document.html";
        a.click();
        URL.revokeObjectURL(url);
      }
    };

    const handleClear = () => {
      if (window.confirm("Are you sure you want to clear the editor?")) {
        setValue("");
      }
    };

    const getCharacterCount = () => {
      if (!value) return 0;
      return value.replace(/<[^>]*>/g, "").length;
    };

    return (
      <div className={`space-y-6 ${className}`}>
        {/* Header */}
        {showActions && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-800">
                    Rich Text Editor
                  </h3>
                  <p className="text-sm text-slate-600">
                    Create and edit documents with rich formatting and custom
                    features
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? "Saving..." : "Save"}</span>
                </button>

                <button
                  onClick={handleExport}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>

                <button
                  onClick={handleClear}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Editor */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h4 className="text-sm font-medium text-slate-700 mb-1">
              Document
            </h4>
            <p className="text-xs text-slate-500">
              {getCharacterCount() > 0
                ? `${getCharacterCount()} characters`
                : "Empty document"}
            </p>
          </div>

          <div className="quill-editor-container">
            <ReactQuill
              ref={setQuillInstance}
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
              formats={formats}
              placeholder={placeholder}
              style={{ minHeight }}
            />
          </div>
        </div>

        {/* Preview */}
        {showPreview && value && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h4 className="text-sm font-medium text-slate-700 mb-4">
              Document Preview
            </h4>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </div>
        )}
      </div>
    );
  },
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
