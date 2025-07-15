declare module 'quill-delta' {
  /**
   * Delta represents a document or a change to a document.
   * It consists of an array of operations (insert, delete, or retain).
   */
  export default class Delta {
    /**
     * Creates a new Delta object with the given operations.
     * @param ops The operations to initialize the Delta with.
     */
    constructor(ops?: unknown[]);

    /**
     * The operations array of the Delta.
     */
    ops: unknown[];

    /**
     * Inserts text or an embed into the Delta.
     * @param text The text to insert or attributes of the embed.
     * @param attributes The attributes to apply to the inserted text.
     * @returns A new Delta with the inserted text.
     */
    insert(text: string | object, attributes?: object): Delta;

    /**
     * Deletes text from the Delta.
     * @param length The number of characters to delete.
     * @returns A new Delta with the deleted text.
     */
    delete(length: number): Delta;

    /**
     * Retains text in the Delta.
     * @param length The number of characters to retain.
     * @param attributes The attributes to apply to the retained text.
     * @returns A new Delta with the retained text.
     */
    retain(length: number, attributes?: object): Delta;

    /**
     * Composes this Delta with another Delta.
     * @param other The Delta to compose with.
     * @returns A new Delta that is the composition of this Delta and the other Delta.
     */
    compose(other: Delta): Delta;

    /**
     * Transforms this Delta against another Delta.
     * @param other The Delta to transform against.
     * @param priority Whether this Delta has priority over the other Delta.
     * @returns A new Delta that is this Delta transformed against the other Delta.
     */
    transform(other: Delta, priority?: boolean): Delta;

    /**
     * Transforms another Delta against this Delta.
     * @param other The Delta to transform.
     * @param priority Whether the other Delta has priority over this Delta.
     * @returns A new Delta that is the other Delta transformed against this Delta.
     */
    transformPosition(other: Delta, priority?: boolean): Delta;

    /**
     * Returns the length of the Delta.
     * @returns The length of the Delta.
     */
    length(): number;

    /**
     * Returns the number of characters deleted by the Delta.
     * @returns The number of characters deleted by the Delta.
     */
    chop(): Delta;

    /**
     * Returns a slice of the Delta.
     * @param start The start index.
     * @param end The end index.
     * @returns A new Delta containing the slice.
     */
    slice(start?: number, end?: number): Delta;

    /**
     * Returns a string representation of the Delta.
     * @returns A string representation of the Delta.
     */
    toString(): string;
  }
}
