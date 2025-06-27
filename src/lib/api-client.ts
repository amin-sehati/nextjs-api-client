export interface ApiMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ApiRequest {
  assistant_id: string;
  input: {
    messages: ApiMessage[];
  };
  stream_mode: "values";
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

const API_ENDPOINT = "https://ht-left-oleo-40-fc4247019a235621a56c8b9686a58fe1.us.langgraph.app/runs/stream";

export class LangGraphApiClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async makeRequest(input: {
    assistantId: string;
    messages: ApiMessage[];
  }): Promise<ApiResponse> {
    try {
      const requestBody: ApiRequest = {
        assistant_id: input.assistantId,
        input: {
          messages: input.messages,
        },
        stream_mode: "values",
      };

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      let result = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = new TextDecoder().decode(value);
          result += chunk;
        }
      }

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
} 