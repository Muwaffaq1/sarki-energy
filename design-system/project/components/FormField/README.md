# FormField

Label, control, and hint or error message, wired together for screen readers.

## Use
- Wrap every Input, select or textarea. FormField generates the `id`, links the label, and points `aria-describedby` at the hint or error.
- `hint` explains format or why we ask. `error` replaces the hint and says how to fix the problem.
- Mark the few required fields with `required`, or the few optional ones with `optional`; never both in one form.

## Error copy
Say what to enter, not what went wrong: "Enter an 11-digit Nigerian number, like 0803 123 4567." Never "Invalid input".
