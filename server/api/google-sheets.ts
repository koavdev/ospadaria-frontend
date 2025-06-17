import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    // Get runtime config
    const config = useRuntimeConfig();
    const spreadsheetId = config.private.googleSheetId;
    const serviceAccountJson = config.private.serviceAccountJson;

    if (!spreadsheetId) {
      throw new Error('Google Sheet ID not configured');
    }

    const credentials = JSON.parse(serviceAccountJson || '{}')
    
    // Create auth instance
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Initialize sheets API
    const sheets = google.sheets({ version: 'v4', auth });

    // Define range
    const range = 'Página1!A1:D1000';

    // Get data from sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.data;
  } catch (error) {
    console.error('Error accessing Google Sheets API:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch data from Google Sheets',
    });
  }
});