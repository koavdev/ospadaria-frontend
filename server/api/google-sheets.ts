import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    // Get runtime config
    const config = useRuntimeConfig();
    const spreadsheetId = config.private.googleSheetId;

    if (!spreadsheetId) {
      throw new Error('Google Sheet ID not configured');
    }

    // CREDENTIALS NO LOCAL (/server/google/service-account.json)
    // const credentialsPath = path.resolve('./server/google/service-account.json');
    // const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

    // CREDENTIALS DE PRODUÇÃO (NETLIFY)
    // const credentials = JSON.parse(process.env.SERVICE_ACCOUNT_JSON || '{}')

    // const encoded = process.env.SERVICE_ACCOUNT_JSON_BASE64 || ''
    const encoded = "ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAib3NwYWRhcmlhIiwKICAicHJpdmF0ZV9rZXlfaWQiOiAiZjM1ZDc1MTZmODA3MTUzNmM5ZWY0ZDY1MmNmYzY4MTk5Y2M5N2QzNCIsCiAgInByaXZhdGVfa2V5IjogIi0tLS0tQkVHSU4gUFJJVkFURSBLRVktLS0tLVxuTUlJRXZBSUJBREFOQmdrcWhraUc5dzBCQVFFRkFBU0NCS1l3Z2dTaUFnRUFBb0lCQVFDbVBhQ0htWElZdnhzOVxuVU51dWlGdmptTGw1OHg0TTl5SFFCc1B0UGhDUFZEU3o2K2pwUGJQMEtLU2FLNVNGaVRiUmE3OEEvcW9aY1k3a1xuTjhoT3I1QTI3aDNhK2Z4S0NNUHFkWE55U2FLV1hiaForenNHdEx2UzgwRUtrbVNLZzlYdDB3cGpsSDhRWUNTSVxuYVp0Z3I0R0hUZmxwR0lhY01zTUJ2RFRQN2NucjQxTWZXNzRuU3JsbUJjbW9mbGU3ZTlTanJ4WkxpY0NyTkV4MVxuZjZnMDNGMHREdXJpaTBubzVDRGcwTzhsclZTSWpNeVI0SDNjWVl1VURqa25sZ0YrTGF4dVJLb3Fpc3FiSUEvRFxuL0k3cUMwMUtEQ2dmWXJFbVFqdHRwMWZTRHJYcnBpQlB3dDhCVzM1bzRyOExXRGk4SUc0cmRwNU9peGxsYldDRFxuS3N5MmVtZk5BZ01CQUFFQ2dnRUFHNU5IYUpiTWRVeG1BVkxEVGYweWVOdGhrTmdDR1JaNVZsOTQ2b2FNQ3FwbVxuSDU0M1FWRko0MnRHZW9oV0Y1eCtLbGpjRXhjck1oTkRKNW9WTVBBd1ZOeEV1WWtVRDFmSzM3NWh5d2hwM3RWbVxuK2c0UmFYaGJXNCtjTDF1L0w3YlVxcUdDTEtoNk4wWXJhVEZUWThOWkVnK2VHby9GN0cwREtldUZPeVJ2aFNBb1xudEhOQUNSaWlBWTYvQjBqZEpDREtnMHpHdlVqeFh0ZDk0UWhpWnZFVnRkTld0dno5TFQzclh2REVUVEl6d0FWZVxucFBtY2hUcUM5aFBmR29FZDdNT09Uc1JpTThJTFBENEI5dEo3V001VUc3czVGYUNJYXZnaTFBWFVScCtHZS9SOVxuZC9CZ1lVVWVKbkRPZDZRUjg5UWJiQS9IVFk2ejV4dUJkMHpaNmdldGhRS0JnUURWUFdNU3VIbk12czQ1cm1mcVxuRDg4SE0zS0tzenNOYzYxNFY1SlJLbEJjcDdTamtGNnBRd0pMbzVBTFNtcDZXQkFxUi9EU2RDMmhCVVZNSUlWUFxuOHBRcXZCOThiWGZXY1FaSXZSMndLWndjd3REelgrelRDVGpBVjdlSWtuYnlUaWFBS1JvVVpaQ21ma1ZVZzQydlxueVRhRG9iWkhTb0Z5ZHBhck9JVFJKbit3L3dLQmdRREhrNDM3VTN2UStvLzVoYlltaDVOKzhxUzVnNHQyM2J6dFxuVFVjWkg1eVdzYjI4aENEbGM5Q2d1b0c4N2xqeFF4WndpNkd3QUxwc1RGdDlhNmt2b1A2SG1Wc0RISnNwSkltVlxuTFljQlZwYjNOWFl6U3BpbDlnYnJNcjdBREhrTnlHM0QrM2x0VnZpRXRJQWxvNjhXSm9JSlBldE8zQ1ZQcWsxRFxuYWVud2tXRGJNd0tCZ0FuZ0JPV0tDNEh5MkNRTnNweEJUU29kTk5HOWlSK1BXdG8yMi96TVE5cDJuY1B4WEtEa1xuRElncU0vS0I2THB2dDVmdHF2WmtFUFRqQkptSTdBT096VlBKVUgvM3BkUVZlZUFHZWdoOWROQlVLVThNQXpDbVxudmEwU290bzlSaXJrZVozM3lWQm1mN05tSjVuSldkZHBMeEFiZmhDQkg4dUlPR1FIZ3djWWpGTkxBb0dBUzg3eVxudWFyR2QyVVYxMVJCRW5XaFF6RnIvTVBJOEFmZVFjMSsyajQxdnRBWklFaVlMbEJGeVNmUExETGxPZytmc0hSNVxub0Y5R2NPaTRQL1hyT0JwUlZMU2Q2NXFzSFg2eGZDYmxCMDhhM1NCRG04d1VHOFpPYm56Q0ZEVW9ybUdad0QzL1xucTliRFk3VWtrQ2VTMURrZ1g5NVRTWXM1NlA3cGhsZnU4dUJtQ0IwQ2dZQVMyaG9DQlVMM0x3Tk9hRUd4TnRMY1xuZ29jNG5yRFNyeE55b2NVOVlNNFVyN3lnelhWRGlIS3h5YW5FeWJYTjR2dkYvY0xWbGxiQzZBQWNacWtraXFVYlxuYThXVk1QeDJ6Mkh4SUdkWVBzTUloczhFcWhyV01zeU5VeDlCa1RHNGtXMlEyWHVQNmp2N3VMZXFMdHZ2L2tuYVxuZVdNMEVhdnUxaElROHNLbDZ3S2ZkUT09XG4tLS0tLUVORCBQUklWQVRFIEtFWS0tLS0tXG4iLAogICJjbGllbnRfZW1haWwiOiAib3NwYWRhcmlhQG9zcGFkYXJpYS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsCiAgImNsaWVudF9pZCI6ICIxMTUxMjM5NjI4ODg3MDM1MDQ2OTUiLAogICJhdXRoX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsCiAgInRva2VuX3VyaSI6ICJodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbiIsCiAgImF1dGhfcHJvdmlkZXJfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvY2VydHMiLAogICJjbGllbnRfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5L29zcGFkYXJpYSU0MG9zcGFkYXJpYS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsCiAgInVuaXZlcnNlX2RvbWFpbiI6ICJnb29nbGVhcGlzLmNvbSIKfQo="
    const jsonString = Buffer.from(encoded, 'base64').toString('utf-8')
    const credentials = JSON.parse(jsonString)
    
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