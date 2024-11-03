import { useEffect, useState } from 'react';

export function useThemeColor(colorName: string) {
  const [color, setColor] = useState('#1E4646'); // default color

  useEffect(() => {
    const style = window.getComputedStyle(document.documentElement);
    const themeColor = style.getPropertyValue(`--${colorName}`).trim();
    if (themeColor) {
      setColor(themeColor);
    }
  }, [colorName]);

  return color;
} 