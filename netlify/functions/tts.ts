import { Handler } from "@netlify/functions";
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

interface RequestBody {
  text: string;
}

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const rawCreds = process.env.GOOGLE_CLOUD_CREDENTIALS;
  if (!rawCreds) {
    console.error('Missing GOOGLE_CLOUD_CREDENTIALS');
    return { statusCode: 500, body: "Missing GOOGLE_CLOUD_CREDENTIALS" };
  }

  let credentials: any;
  try {
    credentials = JSON.parse(rawCreds);
  } catch (parseError) {
    console.error('Failed to parse GOOGLE_CLOUD_CREDENTIALS:', parseError);
    return { statusCode: 500, body: "Invalid GOOGLE_CLOUD_CREDENTIALS JSON" };
  }

  const client = new TextToSpeechClient({ credentials });

  try {
    const { text } = JSON.parse(event.body || '{}') as RequestBody;

    const request = {
      input: { text },
      voice: { languageCode: 'en-GB', name: 'en-GB-Studio-C' as const }, 
      audioConfig: { audioEncoding: 'MP3' as const, 
        speakingRate: 1.1
       },
    };

    const [response] = await client.synthesizeSpeech(request);
    
    if (!response.audioContent) {
      console.error('Missing audioContent in Text-to-Speech response', response);
      return { statusCode: 500, body: "Text-to-Speech returned no audio" };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "audio/mp3" },
      body: response.audioContent.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error: any) {
    console.error('Error generating speech:', error);
    return {
      statusCode: 500,
      body: `Error generating speech: ${error?.message ?? String(error)}`,
    };
  }
};