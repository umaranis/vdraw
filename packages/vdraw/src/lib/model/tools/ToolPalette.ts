import { RectangleTool } from '$lib/model/tools/RectangleTool.js';
import type { Tool } from '$lib/model/tools/Tool.js';
import { CircleTool } from './CircleTool.js';

export interface ToolPalette {
	currentTool: Tool;
	tools: {
		rectTool: RectangleTool;
		circleTool: CircleTool;
	};
}

export function createToolPalette(): ToolPalette {
	const rectTool = new RectangleTool();
	return {
		currentTool: rectTool,
		tools: {
			rectTool: rectTool,
			circleTool: new CircleTool()
		}
	};
}
