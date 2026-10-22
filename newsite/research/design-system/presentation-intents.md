# Dialogs, sheets, and toasts are intents

**Claim:** The report models presentation by intent. A toast is transient feedback, not the place for essential or critical information.

**Sources:** Metro × Apple design-system report (attachment `deep-research-report__11_.md`).

## Evidence

**Borrowed:** Fluent distinguishes modal, nonmodal, and alert cases, as the report summarizes it. Apple uses alerts, sheets, popovers, and confirmation presentations; the report says there is no single HIG toast equivalent to Fluent’s toast. Fluent, as summarized, reserves toasts for useful noncritical information.

**Prescribed:** A destructive confirmation can block (native alert or confirmation). An editing workflow can be a sheet or dialog by platform. A help panel should not block. Modal is a behavior, not a required centered box. Shared name: `feedback.transient`, not a mandatory identical toast. Transient feedback must not be the only copy of information the task needs. Critical errors need a persistent error or a blocking presentation.

## Implication for this portfolio

Contact is an invitation in the homepage notes, not a toast. This file matters only if the site adds confirmation or error UI.

## Limit

No toast or dialog appears in the newsite markup read for the library.
