// utils/capitalize.js

export function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function snakeCaseToTitleCase(str) {
  if (!str) return '';
  if (str.includes('_')) {
      // If underscores are present, split and capitalize each word
      return str
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
  } else {
      // If no underscores, just capitalize the first letter
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}