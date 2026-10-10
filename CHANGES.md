# Changes Document

## Recent Session Summary: Category Title Deduplication, Subtle Red Shadow Hovers & White Dominant Footer

### Key Accomplishments:
1. **Deduplicated Product Category Titles in "PRECISION HEATING RANGE"**:
   - Removed the duplicate red `#d81b21` category title text above each card's `h3` heading.
   - Set category titles to `#515151` (`text-primary`), turning to Red `#d81b21` (`group-hover:text-accent`) on hover, paired with a `#515151` description and a subtle red action link ("View Category →").

2. **Refactored Product Category Cards & Hover Effects**:
   - Applied thin 1px 15% opacity border lines (`border border-muted/15`).
   - Added interactive hover effect with subtle lift and soft red accent shadow: `hover:-translate-y-[2px] hover:shadow-lg hover:shadow-accent/20 hover:border-accent/40 transition-all duration-300`.

3. **White-Dominant Footer Redesign**:
   - Transformed `Footer.jsx` from solid `#515151` background to **White dominant** (`bg-white text-primary border-t-4 border-accent`).
   - Styled section headers in Red `#d81b21` (`text-accent`), description and navigation links in Grey `#515151` (`text-primary hover:text-accent`), and location icons in Red `#d81b21`.

---

## Previous Session Summary: Gilroy-Light 300, Box Hovers, Color Mix & Soft Borders
- Replaced all `Gilroy-Thin` references with `src/assets/Fonts/Fonts/Gilroy-Light.ttf` (`font-weight: 300`).
- Industries We Serve box hover: solid Red `#d81b21` background with White text on hover/active.
- Replaced `#818286` with `#515151` across all CSS tokens, Tailwind variables, and components.
- Softer 15% opacity border system (`rgba(81, 81, 81, 0.15)`).
