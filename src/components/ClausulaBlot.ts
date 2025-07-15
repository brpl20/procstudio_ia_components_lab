'use client';

import Quill from 'quill';

// We need to access Quill classes for Blot creation
let Inline: unknown;
// Unused variable prefixed with underscore to avoid linter warnings
let _parchment: unknown;

// This ensures we only run this code in the browser
if (typeof window !== 'undefined') {
  try {
    Inline = Quill.import('blots/inline');
    _parchment = Quill.import('parchment');
    console.log('Successfully imported Quill dependencies');
  } catch (error) {
    console.error('Error importing Quill dependencies:', error);
  }
}

// We need to cast Inline to a constructor type to satisfy TypeScript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BlotConstructor = { new(): unknown; scope?: unknown; prototype: Record<string, unknown> };

/**
 * ClausulaBlot - Custom blot for tracking Clausula text
 *
 * This blot applies a data-clausula-index attribute to text
 * and styles it in red. The attribute can be used to track
 * and number Clausula occurrences in the document.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class ClausulaBlot extends (Inline as BlotConstructor) {
  // Define the blot name that will be used in formats
  static blotName = 'clausula';

  // Define the CSS class name for styling
  static className = 'ql-clausula';

  // Use SPAN as the HTML element
  static tagName = 'SPAN';

  // Required by Quill - fallback to undefined if Inline is not available
  static scope = Inline ? (Inline as BlotConstructor).scope : undefined;

  static create(value: unknown) {
    try {
      // Create a DOM node for this blot
      const node = super.create();

      // Apply our custom attributes - ensure it's a string value
      const indexValue = value ? String(value) : '1';
      node.setAttribute('data-clausula-index', indexValue);

      // Apply styling
      node.style.color = 'red';
      node.style.fontWeight = 'bold';

      console.log(`Created ClausulaBlot with index: ${indexValue}`);
      return node;
    } catch (error) {
      console.error('Error creating ClausulaBlot:', error);
      // Create a fallback node if super.create() fails
      const fallbackNode = document.createElement('span');
      fallbackNode.setAttribute('data-clausula-index', '1');
      fallbackNode.style.color = 'red';
      return fallbackNode;
    }
  }

  static formats(node: HTMLElement) {
    try {
      // Extract the clausula index from the DOM node
      const value = node.getAttribute('data-clausula-index') || '1';
      return value;
    } catch (error) {
      console.error('Error getting clausula format:', error);
      return '1';
    }
  }

  // Override format method to handle our custom format
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format(name: string, value: unknown) {
    try {
      if (name === 'clausula' && value) {
        this.domNode.setAttribute('data-clausula-index', String(value));
      } else {
        super.format(name, value);
      }
    } catch (error) {
      console.error('Error applying format to ClausulaBlot:', error);
    }
  }

  // Override formats method to include our custom format
  formats() {
    try {
      const formats = super.formats();
      formats.clausula = ClausulaBlot.formats(this.domNode);
      return formats;
    } catch (error) {
      console.error('Error getting formats from ClausulaBlot:', error);
      return { clausula: '1' };
    }
  }
}

/**
 * Register the ClausulaBlot with Quill
 * This must be called in the browser environment
 */
function registerClausulaBlot() {
  if (typeof window !== 'undefined') {
    try {
      if (!Inline) {
        console.warn('Inline blot not available, attempting to import again');
        Inline = Quill.import('blots/inline');
      }

      console.log('Registering ClausulaBlot with Quill');
      Quill.register(ClausulaBlot);
      console.log('ClausulaBlot successfully registered');

      // Register the format so it's recognized
      Quill.register('formats/clausula', true);

      return true;
    } catch (error) {
      console.error('Failed to register ClausulaBlot:', error);
      return false;
    }
  }
  return false;
}

export { ClausulaBlot, registerClausulaBlot };
