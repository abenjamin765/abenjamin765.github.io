# Print CSS Optimization Guide

This resume uses CSS utility classes to optimize content for print while maintaining full content on screen. This approach allows you to keep all your data in the YAML files while selectively showing/hiding content for different media.

## Utility Classes

### `.no-print`

- **Screen**: Visible
- **Print**: Hidden
- **Use case**: Elements that should only appear on screen (like the download button)

### `.print-only`

- **Screen**: Hidden
- **Print**: Visible
- **Use case**: Content that should only appear in print version

### `.print-hide`

- **Screen**: Visible
- **Print**: Hidden
- **Use case**: Content that should be hidden in print to save space

### `.print-condensed`

- **Screen**: Hidden
- **Print**: Visible
- **Use case**: Shorter versions of content specifically for print

## Current Implementation

### Work Experience

- Shows first 5 most recent positions in print (2022-2017)
- Shows all 8 positions on screen
- Positions 6-8 (2015-2011) have `.print-hide` class
- Shows first 3 accomplishments for each role in print
- Shows all accomplishments on screen
- Accomplishments 4+ have `.print-hide` class

### References

- Shows first 3 references in print
- Shows all 5 references on screen
- References 4+ have `.print-hide` class

## Print Optimizations Applied

### Layout

- Two-column layout: 65% main content, 33% sidebar
- Reduced margins: 0.5-0.6 inches instead of 1 inch
- Float-based layout for better print compatibility

### Typography

- Body text: 10pt (down from 12pt)
- List items: 9pt
- References: 8pt
- Reduced line heights and spacing throughout

### Spacing

- Minimized gaps between sections
- Tighter bullet point spacing
- Reduced margins on headings and paragraphs

## How to Use

### To hide content from print:

```pug
li.print-hide This content won't appear in print
```

### To show content only in print:

```pug
p.print-only This appears only when printing
```

### To conditionally show content:

```pug
each item, index in items
    if index < 3
        li #{item}
    else
        li.print-hide #{item}
```

## Customization Examples

### Hide entire sections for print:

```pug
section#tools.print-hide
    h2 Tools
    // This entire section won't print
```

### Show condensed version for print:

```pug
// Full version for screen
p.print-hide #{fullDescription}
// Short version for print
p.print-only #{shortDescription}
```

### Limit list items:

```pug
each skill, index in skills
    if index < 5
        li #{skill}
    else
        li.print-hide #{skill}
```

## Benefits

1. **Single source of truth**: All content stays in YAML files
2. **Flexible control**: Fine-grained control over what prints
3. **Maintainable**: Easy to adjust print vs screen content
4. **No duplication**: Avoid maintaining separate data files
5. **Dynamic**: Can use logic to determine what shows/hides

## Testing

Use your browser's print preview (Cmd/Ctrl + P) to see how the resume will look when printed. The optimized styles should fit everything on one page while maintaining readability.
