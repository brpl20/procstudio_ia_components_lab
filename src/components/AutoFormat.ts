'use client';

import Quill from 'quill';

/**
 * Type definition for formatting rule callback function
 */
export type AutoFormatRuleCallback = (
  quill: Quill,
  delta: unknown,
  source: string,
) => boolean;

/**
 * Rule interface for AutoFormat module
 */
export interface AutoFormatRule {
  name: string;
  callback: AutoFormatRuleCallback;
}

/**
 * AutoFormat Quill Module
 *
 * This module provides automatic formatting of text in Quill editor based on defined rules.
 * Inspired by autoformat.js but simplified and customized for specific use cases.
 */
export default class AutoFormat {
  quill: Quill;
  options: Record<string, unknown>;
  rules: AutoFormatRule[] = [];

  /**
   * Constructor for AutoFormat module
   * @param quill - Quill editor instance
   * @param options - Options for the module
   */
  constructor(quill: Quill, options: Record<string, unknown> = {}) {
    this.quill = quill;
    this.options = options;

    // Listen for text changes
    this.quill.on('text-change', this.onTextChange.bind(this));
  }

  /**
   * Register a new formatting rule
   * @param rule - AutoFormatRule to add
   */
  registerRule(rule: AutoFormatRule): void {
    this.rules.push(rule);
  }

  /**
   * Handle text change events
   * @param delta - The change that was made
   * @param oldContents - The editor contents before the change
   * @param source - Source of the change (user, api, etc.)
   */
  onTextChange(delta: unknown, oldContents: unknown, source: string): void {
    if (source !== 'user') return; // Only process user input

    // Process each rule
    for (const rule of this.rules) {
      try {
        const processed = rule.callback(this.quill, delta, source);
        if (processed) {
          // If a rule processed the delta, we can stop processing
          // This allows rules to be prioritized by their order in the array

          // After processing, we need to ensure the document is updated with all attributes
          // This is particularly important for custom attributes like clausulaIndex
          this.quill.update('api');
          break;
        }
      } catch (error) {
        console.error(`Error in AutoFormat rule "${rule.name}":`, error);
      }
    }
  }

  /**
   * Helper method to get the starting position of a line by its index
   * @param quill - Quill editor instance
   * @param lineIndex - The index of the line
   * @returns The position of the start of the line
   */
  static getLineStartPosition(quill: Quill, lineIndex: number): number {
    const text = quill.getText();
    const lines = text.split('\n');
    let position = 0;

    for (let i = 0; i < lineIndex; i++) {
      position += lines[i].length + 1; // +1 for the newline character
    }

    return position;
  }

  /**
   * Helper method to check if a line starts with one of the given phrases
   * @param line - The line of text to check
   * @param phrases - Array of phrases to check for
   * @param caseSensitive - Whether the check should be case sensitive
   * @returns Whether the line starts with any of the phrases
   */
  static lineStartsWith(
    line: string,
    phrases: string[],
    caseSensitive: boolean = false,
  ): boolean {
    const trimmedLine = line.trim();

    if (!caseSensitive) {
      const lowerTrimmedLine = trimmedLine.toLowerCase();
      return phrases.some((phrase) =>
        lowerTrimmedLine.startsWith(phrase.toLowerCase()),
      );
    } else {
      return phrases.some((phrase) => trimmedLine.startsWith(phrase));
    }
  }
}

// The module will be registered in RichTextEditor.tsx
