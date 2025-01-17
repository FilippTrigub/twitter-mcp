# Twitter MCP Server

[![smithery badge](https://smithery.ai/badge/@filipptrigub/twitter-mcp)](https://smithery.ai/server/@filipptrigub/twitter-mcp)

This MCP server allows Clients to interact with Twitter, enabling posting tweets and searching Twitter.

## Quick Start

1. Create a Twitter Developer account and get your API keys from [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)

2. Add this configuration to your Claude Desktop config file:

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "twitter-mcp": {
      "command": "npx",
      "args": ["-y", "@filipptrigub/twitter-mcp"],
      "env": {
        "API_KEY": "your_api_key_here",
        "API_SECRET_KEY": "your_api_secret_key_here",
        "ACCESS_TOKEN": "your_access_token_here",
        "ACCESS_TOKEN_SECRET": "your_access_token_secret_here"
      }
    }
  }
}
```

3. Restart Claude Desktop

That's it! Claude can now interact with Twitter through two tools:

- `post_tweet`: Post a new tweet
- `post_thread`: Post a new tweet thread
- `search_tweets`: Search for tweets

## Example Usage

Try asking Claude:
- "Can you post a tweet saying 'Hello from Claude!'"
- "Can you search for tweets about Claude AI?"

## Troubleshooting

Logs can be found at:
- **Windows**: `%APPDATA%\Claude\logs\mcp-server-twitter.log`
- **macOS**: `~/Library/Logs/Claude/mcp-server-twitter.log`


## Development

If you want to contribute or run from source:

1. Clone the repository:
```bash
git clone https://github.com/FilippTrigub/twitter-mcp.git
cd twitter-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build:
```bash
npm run build
```

4. Run:
```bash
npm start
```

## License

MIT
