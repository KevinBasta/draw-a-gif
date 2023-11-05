import { toolData, toolType } from "../shared/Formats";


export function getNewTool() {
    return {
        key: crypto.randomUUID(),
        tool: toolType.brush,
        size: "1",
    }
}

export function getUpdatedTool(toolObject: toolData, newTool: toolType) {
    return {
        key: toolObject.key,
        tool: newTool,
        size: toolObject.size,
    }
}

export function getUpdatedToolSize(toolObject: toolData, newSize: string) {
    return {
        key: toolObject.key,
        tool: toolObject.tool,
        size: newSize,
    }
}