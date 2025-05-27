import { RectangleTool } from '$lib/viewmodel/tools/RectangleTool.js';
import type { Tool } from '$lib/viewmodel/tools/Tool.js';
import { CircleTool } from './CircleTool.js';
import { SelectionTool } from './SelectionTool.js';
import { PathTool } from './pathTool/PathTool.js';

export interface ToolPalette {
	currentTool: Tool;
	tools: {
		selectionTool: SelectionTool;
		rectTool: RectangleTool;
		circleTool: CircleTool;
		pathTool: PathTool;
	};
	switchToDefault(): void;
}

export function createToolPalette(): ToolPalette {
	const selectionTool = new SelectionTool();
	return {
		currentTool: selectionTool,
		tools: {
			selectionTool: selectionTool,
			rectTool: new RectangleTool(),
			circleTool: new CircleTool(),
			pathTool: new PathTool()
		},
		switchToDefault() {
			this.currentTool = this.tools.selectionTool;
		}
	};
}
