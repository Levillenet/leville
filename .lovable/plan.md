

# Fix: Markers drifting when zooming out

## Root cause
The `.levi-marker-with-label` container has `position: relative; width: 32px; height: 32px` but labels are positioned with `position: absolute` which extends the element's bounding box. When Mapbox calculates the marker anchor, the varying bounding box causes drift at different zoom levels.

## Fix
1. **Set explicit `anchor: 'center'`** on every `new mapboxgl.Marker()` call — this tells Mapbox to pin the center of the element to the geo coordinate.

2. **Fix CSS**: Change `.levi-marker-with-label` to use a zero-size anchor point with `overflow: visible`, so the labels don't affect the element's dimensions:
   ```css
   .levi-marker-with-label {
     position: relative;
     width: 0;
     height: 0;
     display: flex;
     align-items: center;
     justify-content: center;
     cursor: pointer;
   }
   ```
   The dot/icon elements inside are already absolutely positioned or flex-centered, so they'll remain visible.

3. **Adjust child elements** to be centered via `position: absolute; transform: translate(-50%, -50%)` so the dot is exactly at the coordinate point regardless of zoom.

## Files changed
- `src/pages/guide/LeviInteractiveMap.tsx` — marker creation calls + CSS styles

