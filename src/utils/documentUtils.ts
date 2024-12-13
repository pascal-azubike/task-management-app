/**
 * Updates the document title with the provided title.
 * Appends the app name as suffix.
 */
export const setDocumentTitle = (title: string) => {
  document.title = `${title} | TaskMaster`;
};

/**
 * Generates and sets a favicon from the provided image.
 * Uses the logo to create a dynamic favicon.
 */
export const setFaviconFromLogo = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 32;  // Standard favicon size
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    const img = new Image();
    img.src = '/src/assets/logo-white.png';
    
    img.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw image maintaining aspect ratio
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      
      // Convert to favicon
      const link = document.querySelector<HTMLLinkElement>("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = canvas.toDataURL();
      
      // Add to document
      document.head.appendChild(link);
    };
  }
}; 