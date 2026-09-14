/**
 * Registers a custom element once.
 *
 * A page can legitimately load Zest through more than one module graph while
 * developing or composing docs. The platform throws when the same name is
 * defined twice, so every component goes through this idempotent boundary.
 * The registry guard also avoids touching the platform when it is unavailable.
 */
export declare const defineElement: (name: string, constructor: CustomElementConstructor) => void;
