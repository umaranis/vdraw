import { RectangleTool } from '$lib/viewmodel/tools/RectangleTool.js';
import type { Tool } from '$lib/viewmodel/tools/Tool.js';
import { CircleTool } from './CircleTool.js';
import { SelectionTool } from './SelectionTool.js';

export interface ToolPalette {
	currentTool: Tool;
	tools: {
		selectionTool: SelectionTool;
		rectTool: RectangleTool;
		circleTool: CircleTool;
	};
}

export function createToolPalette(): ToolPalette {
	const selectionTool = new SelectionTool();
	return {
		currentTool: selectionTool,
		tools: {
			selectionTool: selectionTool,
			rectTool: new RectangleTool(),
			circleTool: new CircleTool()
		}
	};
}
