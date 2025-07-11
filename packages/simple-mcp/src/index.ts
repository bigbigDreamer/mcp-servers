#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create server instance
const server = new McpServer({
    name: "time",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});

// Register time tools
server.tool(
    "get-current-time",
    "Get Current Time",
    {
    },
    async ({ }) => {

        const time = new Date()
        return {
            content: [
                {
                    type: "text",
                    text: `current is ${time.getFullYear()}年 ${time.getMonth() + 1}月 ${time.getDate()}日`,
                },
            ],
        };
    },
);


async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
