"use client";

import { useState } from "react";
import { LangGraphApiClient, ApiMessage } from "@/lib/api-client";

export default function Home() {
  const [messages, setMessages] = useState<ApiMessage[]>([
    {
      role: "user",
      content: "Q: Besides PowerPoint and Word, which other Microsoft tools do you find particularly challenging for users to master? A:Microsoft Access is easily the toughest. It's powerful, but most users have no background in database design or relational data. Even Power BI has a learning curve--especially with DAX formulas and data modeling. Outlook can also be tricky in enterprise settings due to calendar sharing, rules, and integration with Teams. \nQ: Are there any Microsoft applications that your team has found difficult to adopt or use effectively? A:Yammer and Viva Engage have had low adoption. People aren't sure how it fits into their workflow, especially when we already use Teams. Also, some advanced Teams features--like shared channels and webinar hosting--aren't intuitive without training."
    }
  ]);
  const [assistantId, setAssistantId] = useState("079b1acc-49e6-4d00-a763-5e27658d813c");
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_API_KEY || "");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError("API key is required");
      return;
    }

    if (!assistantId.trim()) {
      setError("Assistant ID is required");
      return;
    }

    if (messages.length === 0 || !messages[0].content.trim()) {
      setError("Message content is required");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const client = new LangGraphApiClient(apiKey);
      const result = await client.makeRequest({
        assistantId: assistantId,
        messages: messages,
      });

      if (result.success) {
        setResponse(result.data || "No response data");
      } else {
        setError(result.error || "Unknown error occurred");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const updateMessageContent = (content: string) => {
    setMessages([{ role: "user", content }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            LangGraph API Client
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* API Key Input */}
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your API key"
              />
            </div>

            {/* Assistant ID Input */}
            <div>
              <label htmlFor="assistantId" className="block text-sm font-medium text-gray-700 mb-2">
                Assistant ID
              </label>
              <input
                type="text"
                id="assistantId"
                value={assistantId}
                onChange={(e) => setAssistantId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter assistant ID"
              />
            </div>

            {/* Message Content Input */}
            <div>
              <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700 mb-2">
                Message Content
              </label>
              <textarea
                id="messageContent"
                value={messages[0]?.content || ""}
                onChange={(e) => updateMessageContent(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your message content"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending Request..." : "Send API Request"}
            </button>
          </form>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Response Display */}
          {response && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">API Response</h2>
              <div className="bg-gray-100 border border-gray-200 rounded-md p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                  {response}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
