/**
 * Mock data for FinOps Cost Analysis Dashboard
 * This data simulates the structure from the original screenshot
 */

export interface CostMetric {
  value: number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
}

export interface EnvironmentCost {
  name: string;
  value: number;
  change: number;
  percentage: number;
}

export interface ServiceCost {
  name: string;
  value: number;
  percentage: number;
}

export interface DailyCost {
  date: string;
  aliyun: number;
  azure: number;
}

export interface CategoryCost {
  category: string;
  value: number;
}

export const budgetData = {
  current: 33100000, // 33.1M
  total: 33000000,   // 33M
  percentage: 100.1,
};

export const monthCost: CostMetric = {
  value: 2400000, // 2.4M
  change: -36.8,
  changeType: 'negative',
};

export const environmentCosts: EnvironmentCost[] = [
  { name: 'Others', value: 1200000, change: -31.2, percentage: 50 },
  { name: 'Prod', value: 962000, change: -35.2, percentage: 40 },
  { name: 'Dev', value: 194100, change: -48.1, percentage: 8 },
  { name: 'Staging', value: 38400, change: -79.0, percentage: 2 },
];

export const serviceCosts: ServiceCost[] = [
  { name: 'Cloud Server ECS', value: 569500, percentage: 23.75 },
  { name: 'Compute', value: 251000, percentage: 10.46 },
  { name: 'Analytics', value: 340000, percentage: 14.18 },
  { name: 'Cloud Database RDS', value: 172000, percentage: 7.17 },
  { name: 'Storage', value: 150000, percentage: 6.25 },
  { name: 'CDN', value: 120000, percentage: 5.0 },
  { name: 'Security', value: 100000, percentage: 4.17 },
  { name: 'Network', value: 90000, percentage: 3.75 },
  { name: 'Monitoring', value: 80000, percentage: 3.33 },
  { name: 'API Gateway', value: 70000, percentage: 2.92 },
  { name: 'Message Queue', value: 60000, percentage: 2.5 },
  { name: 'Search', percentage: 3.89, value: 93300 },
  { name: 'Data Processing', value: 50000, percentage: 2.08 },
  { name: 'Others', value: 243500, percentage: 10.15 },
];

export const dailyCosts: DailyCost[] = [
  { date: '12-02', aliyun: 458700, azure: 8500 },
  { date: '12-03', aliyun: 79600, azure: 150000 },
  { date: '12-04', aliyun: 213700, azure: 9900 },
  { date: '12-05', aliyun: 96600, azure: 120000 },
  { date: '12-06', aliyun: 52400, azure: 80000 },
  { date: '12-07', aliyun: 68800, azure: 95000 },
  { date: '12-08', aliyun: 97900, azure: 110000 },
  { date: '12-09', aliyun: 183800, azure: 7100 },
  { date: '12-10', aliyun: 88100, azure: -153900 },
  { date: '12-11', aliyun: 44800, azure: 130000 },
  { date: '12-12', aliyun: 70100, azure: 140000 },
  { date: '12-13', aliyun: 123200, azure: 6100 },
  { date: '12-14', aliyun: 77400, azure: 105000 },
  { date: '12-15', aliyun: 131000, azure: 1300 },
  { date: '12-16', aliyun: 114600, azure: 98000 },
];

export const azureAppCosts: CategoryCost[] = [
  { category: 'Foundation', value: 455100 },
  { category: 'CMM', value: 116000 },
  { category: 'Sales Order', value: 60900 },
  { category: 'Shared', value: 16800 },
  { category: 'CRM', value: 15500 },
  { category: 'CDB', value: 14900 },
  { category: 'Inventory', value: 10400 },
  { category: 'Coupon', value: 7100 },
];

export const aliyunAppCosts: CategoryCost[] = [
  { category: 'other', value: 1200000 },
  { category: 'SweatHub CN', value: 101800 },
  { category: 'Customer Relation', value: 82000 },
  { category: 'share', value: 46000 },
  { category: 'E3plus', value: 39400 },
  { category: 'official website', value: 22600 },
  { category: 'Customer Data Platform', value: 16800 },
  { category: 'Helios CN', value: 13400 },
];

export const meterCategoryCosts: CategoryCost[] = [
  { category: 'Cloud Server ECS', value: 562400 },
  { category: 'Azure DataBricks', value: 267700 },
  { category: 'Virtual Machines', value: 242900 },
  { category: 'Cloud Database RDS', value: 169700 },
  { category: 'NoSQL', value: 159100 },
  { category: 'Storage', value: 92200 },
  { category: 'IDAS', value: 87200 },
  { category: 'Cloud Security', value: 84800 },
  { category: 'Power BI Embed', value: 74500 },
  { category: 'Azure Data Factory', value: 68200 },
  { category: 'CDN', value: 60800 },
  { category: 'Redis', value: 48000 },
  { category: 'API Management', value: 46900 },
  { category: 'Message Queue', value: 43000 },
  { category: 'OpenSearch', value: 30300 },
  { category: 'Analytics', value: 23100 },
  { category: 'PrivateZone', value: 21600 },
  { category: 'Log Analytics', value: 19500 },
  { category: 'Monitoring', value: 16900 },
  { category: 'Functions', value: 16000 },
  { category: 'Gateway', value: 15800 },
  { category: 'NAT', value: 14200 },
  { category: 'API', value: 14000 },
];

export const dashboardMetadata = {
  lastBillingDate: '2025/12/16',
  currentDate: 'Tue, Dec 16',
  dataSource: 'The data source for the current month is the summary of daily bills. The data sources for other months are from the summaries of monthly bills.',
};
