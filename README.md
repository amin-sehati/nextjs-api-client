# LangGraph API Client

A Next.js application that provides a web interface for making API calls to the LangGraph streaming endpoint.

## Features

- Clean, responsive web interface built with Tailwind CSS
- Real-time API calls to LangGraph streaming endpoint
- Support for API key authentication
- Configurable assistant ID and message content
- Proper error handling and response display
- TypeScript support for type safety

## Getting Started

### Prerequisites

- Node.js 18 or later
- npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes

### Installation & Running

1. The dependencies are already installed. The development server is running on port 3000.

2. Open your browser and navigate to: `http://localhost:3000`

### Configuration

You can configure the API client in two ways:

#### Option 1: Environment Variable (Recommended)
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_API_KEY=your_actual_api_key_here
```

#### Option 2: Runtime Configuration
Enter your API key directly in the web interface form.

### Usage

1. **API Key**: Enter your LangGraph API key (either from environment or manually)
2. **Assistant ID**: Pre-filled with the default ID, but you can modify it
3. **Message Content**: Pre-filled with sample Microsoft Office content, but you can modify it
4. **Submit**: Click "Send API Request" to make the API call

The application will display:
- Loading state while processing
- Success response with the API data
- Error messages if something goes wrong

### API Endpoint Details

- **URL**: `https://ht-left-oleo-40-fc4247019a235621a56c8b9686a58fe1.us.langgraph.app/runs/stream`
- **Method**: POST
- **Authentication**: API Key header (`x-api-key`)
- **Content-Type**: `application/json`

### Sample Request Body Structure

```json
{
    "assistant_id": "079b1acc-49e6-4d00-a763-5e27658d813c",
    "input": {
        "messages": [
            {
                "role": "user",
                "content": "Your message content here..."
            }
        ]
    },
    "stream_mode": "values"
}
```

### Development

To restart the development server:
```bash
npm run dev
```

To build for production:
```bash
npm run build
npm start
```

### Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx           # Main page with API client interface
│   └── globals.css        # Global styles
└── lib/
    └── api-client.ts      # LangGraph API client utility
```

### Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React 19** - UI library

## Security Note

Remember to keep your API key secure:
- Use environment variables in production
- Never commit API keys to version control
- Consider using server-side API routes for additional security in production
