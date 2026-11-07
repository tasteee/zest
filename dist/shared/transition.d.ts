export type VisibilityPhaseT = 'closed' | 'open' | 'closing';
/** True when the reader asked for no motion; the exit phase is then skipped rather than shortened. */
export declare const prefersReducedMotion: () => boolean;
export declare const useVisibilityPhase: (isOpen: boolean, closeDurationMs?: number) => VisibilityPhaseT;
