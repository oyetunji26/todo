export default function getFormattedDate() {
    const date = new Date();
  
    const day = String(date.getDate()).padStart(2, '0'); // ensures 2 digits
    const month = date.toLocaleString('en-US', { month: 'short' }); // "May"
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }
  