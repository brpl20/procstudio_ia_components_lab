"use client";
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles
import AutoFormat from "./AutoFormat";
import ClausulaRule from "./ClausulaRule";
import { registerClausulaBlot } from "./ClausulaBlot";

// Define the ref type for the RichTextEditor component
export type RichTextEditorHandle = {
  getContent: () => string;
  getDelta: () => unknown; // Use unknown instead of any
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

const RichTextEditor = forwardRef<RichTextEditorHandle>((_, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (
      editorRef.current &&
      typeof window !== "undefined" &&
      !quillRef.current
    ) {
      try {
        // Create Quill instance
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
            autoFormat: {},
          },
          placeholder: "Write something...",
        });

        // Initialize AutoFormat module after a brief delay to ensure it's ready
        setTimeout(() => {
          if (quillRef.current) {
            try {
              const autoFormat = quillRef.current.getModule(
                "autoFormat",
              ) as AutoFormat;

              // Register the clausula rule if the module is available
              if (autoFormat && typeof autoFormat.registerRule === "function") {
                autoFormat.registerRule(ClausulaRule);
                console.log("ClausulaRule registered with AutoFormat module");
              } else {
                console.warn("AutoFormat module not properly initialized");
              }
            } catch (moduleError) {
              console.error(
                "Error initializing AutoFormat module:",
                moduleError,
              );
            }
          }
        }, 100);

        console.log("Quill editor initialized successfully");
      } catch (error) {
        console.error("Error initializing Quill editor:", error);
      }
    }

    // Cleanup function
    return () => {
      if (quillRef.current) {
        // Properly destroy the Quill instance
        try {
          quillRef.current.disable();
          quillRef.current = null;
        } catch (error) {
          console.error("Error during cleanup:", error);
        }
      }
    };
  }, []); // Empty dependency array since we only want this to run once

  // Expose the getContent and getDelta functions to the parent component
  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (quillRef.current) {
        return quillRef.current.root.innerHTML; // Return the HTML content
      }
      return "";
    },
    getDelta: () => {
      if (quillRef.current) {
        return quillRef.current.getContents(); // Return the Delta content
      }
      return { ops: [] }; // Return empty delta if no content
    },
  }));

  return <div ref={editorRef} style={{ height: "300px" }} />;
});

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
