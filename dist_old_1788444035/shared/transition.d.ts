export type VisibilityPhaseT = 'closed' | 'open' | 'closing';
export declare const useVisibilityPhase: (isOpen: boolean, closeDurationMs?: number) => VisibilityPhaseT;
