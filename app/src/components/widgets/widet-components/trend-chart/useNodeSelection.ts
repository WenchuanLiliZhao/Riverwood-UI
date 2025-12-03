import { useState } from 'react';
import type { ChartDataPoint, DefaultSelectedNode, SeriesConfig } from './_BaseTrendChart';

/**
 * Hook for managing node selection in TrendChart
 * Only one node can be selected at a time
 */
export const useNodeSelection = (
  data: ChartDataPoint[],
  enableSelection: boolean,
  series: SeriesConfig[],
  defaultSelectedNode?: DefaultSelectedNode
) => {
  // Initialize selected node from defaultSelectedNode if provided
  const initialSelectedNode = enableSelection && defaultSelectedNode
    ? `${defaultSelectedNode.label}-${defaultSelectedNode.seriesKey}`
    : null;

  // State for selected node: only one node can be selected at a time
  // Format: "label-seriesKey" or null if nothing is selected
  const [selectedNode, setSelectedNode] = useState<string | null>(initialSelectedNode);

  /**
   * Check if a series is selectable
   * @param seriesKey - The key of the series
   * @returns Whether the series is selectable
   */
  const isSeriesSelectable = (seriesKey: string): boolean => {
    if (!enableSelection) return false;
    const seriesConfig = series.find(s => s.key === seriesKey);
    // Default to true if selectable is not specified (backward compatibility)
    return seriesConfig?.selectable !== false;
  };

  /**
   * Select a node (only one node can be selected at a time)
   * Clicking an already selected node will not deselect it
   * Only selectable series can be selected
   * @param label - The label of the data point
   * @param seriesKey - The key of the series
   */
  const toggleNodeSelection = (label: string, seriesKey: string) => {
    if (!enableSelection) return;
    
    // Check if the series is selectable
    if (!isSeriesSelectable(seriesKey)) return;
    
    const nodeId = `${label}-${seriesKey}`;
    setSelectedNode(prev => {
      // If clicking the same node, do nothing (keep it selected)
      if (prev === nodeId) {
        return prev;
      }
      // Otherwise, select the new node (replacing any previous selection)
      return nodeId;
    });
  };

  /**
   * Get opacity for a node based on selection state
   * Selected nodes have opacity 1, unselected have opacity 0.475
   * Non-selectable nodes always have opacity 1
   * @param label - The label of the data point
   * @param seriesKey - The key of the series
   * @returns Opacity value (1 for selected, 0.475 for unselected, 1 if selection is disabled or series is not selectable)
   */
  const getNodeOpacity = (label: string, seriesKey: string): number => {
    if (!enableSelection) return 1;
    // Non-selectable series always have full opacity
    if (!isSeriesSelectable(seriesKey)) return 1;
    const nodeId = `${label}-${seriesKey}`;
    return selectedNode === nodeId ? 1 : 0.475;
  };

  /**
   * Get line opacity for a series
   * If any node in the series is selected, line opacity is 1, otherwise 0.475
   * @param seriesKey - The key of the series
   * @returns Opacity value for the line
   */
  const getLineOpacity = (seriesKey: string): number => {
    if (!enableSelection) return 1;
    if (!selectedNode) return 0.475;
    // Check if the selected node belongs to this series by checking if any data point matches
    const hasSelectedNodeInSeries = data.some(entry => 
      selectedNode === `${entry.label}-${seriesKey}`
    );
    return hasSelectedNodeInSeries ? 1 : 0.475;
  };

  return {
    selectedNode,
    toggleNodeSelection,
    getNodeOpacity,
    getLineOpacity,
    isSeriesSelectable,
  };
};

