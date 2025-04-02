export const useGoogleSheets = () => {
  const fetchSheetData = async () => {
    try {
      const data = await $fetch('/api/google-sheets');
      return data;
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
      throw error;
    }
  };

  return {
    fetchSheetData
  };
};