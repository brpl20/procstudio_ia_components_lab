'use client';

import Quill from 'quill';
import { AutoFormatRule } from './AutoFormat';

/**
 * ClausulaRule
 *
 * A rule for the AutoFormat module that formats lines starting with
 * "Clausula", "Cláusula", or "Cl." to use our custom clausula blot.
 */
export const ClausulaRule: AutoFormatRule = {
  name: 'clausula',
  callback: (quill: Quill, _delta: unknown, source: string): boolean => {
    // Process both user input and API changes
    if (source !== 'user' && source !== 'api') return false;

    console.log('ClausulaRule triggered, source:', source);

    // Get the current text and split into lines
    const text = quill.getText();
    if (!text || text.trim() === '') return false;

    const lines = text.split('\n');
    let processed = false;

    // The phrases we're looking for
    const clausulaPhrases = ['Clausula', 'Cláusula', 'Cl.'];

    // Create a delta to apply all changes at once
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Delta = (quill.constructor as any).import('delta');
    let changeDelta = new Delta();

    // Track positions for delta operations
    let currentPosition = 0;

    // Process each line
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Check if the line starts with any of the target phrases
      const isClausulaLine = clausulaPhrases.some((phrase) =>
        trimmedLine.toLowerCase().startsWith(phrase.toLowerCase()),
      );

      if (isClausulaLine) {
        console.log(`Found clausula at line ${index}: "${line}"`);

        // Calculate the position of the line in the document
        let lineStart = 0;
        for (let i = 0; i < index; i++) {
          lineStart += lines[i].length + 1; // +1 for newline
        }

        try {
          // First retain text up to this line if needed
          if (lineStart > currentPosition) {
            changeDelta = changeDelta.retain(lineStart - currentPosition);
          }

          // Then retain the line length with formatting
          changeDelta = changeDelta.retain(line.length, {
            clausula: 1, // Apply our custom attribute with value 1
            color: 'red', // Also apply color for visual feedback
          });

          // Update current position
          currentPosition = lineStart + line.length;

          processed = true;
        } catch (error) {
          console.error('Error building delta for clausula format:', error);
        }
      }
    });

    // Apply the changes if we processed any lines
    if (processed) {
      try {
        // Retain any remaining text
        if (text.length > currentPosition) {
          changeDelta = changeDelta.retain(text.length - currentPosition);
        }

        console.log('Applying delta:', JSON.stringify(changeDelta));
        quill.updateContents(changeDelta, 'api');

        // Force update to ensure changes are reflected
        quill.update('api');

        // Log the delta to verify changes
        const updatedDelta = quill.getContents();
        console.log('Updated delta:', JSON.stringify(updatedDelta));
      } catch (error) {
        console.error('Error applying delta:', error);
        processed = false;
      }
    }

    return processed;
  },
};

export default ClausulaRule;
