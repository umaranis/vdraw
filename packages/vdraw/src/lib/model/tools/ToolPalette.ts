import {RectangleTool} from "$lib/model/tools/RectangleTool.js";
import type {Tool} from "$lib/model/tools/Tool.js";

export interface ToolPalette {
    currentTool: Tool;
    tools: Tool[];
}

export function createToolPalette(): ToolPalette {
    const rectTool = new RectangleTool();
    return {
        currentTool: rectTool,
        tools: [rectTool]
    }
}
