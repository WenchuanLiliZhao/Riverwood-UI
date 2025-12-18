import * as React from "react";
import {
  Layout,
  Avatar,
  NavTitle,
  FigmaBentoGrid,
  FigmaBentoItem,
  Button,
  COMPONENT_VARIANTS,
  COMPONENT_SIZES,
  COMPONENT_SEMANTICS,
  ScaledViewport,
} from "../../../components";
import { design, formatCurrency, formatPercentage, chartColorPalette } from "./design";
import styles from "./_styles.module.scss";
import {
  budgetData,
  monthCost,
  environmentCosts,
  serviceCosts,
  dailyCosts,
  azureAppCosts,
  aliyunAppCosts,
  meterCategoryCosts,
  dashboardMetadata,
} from "./mockData";

/**
 * Budget Gauge Card Component
 * Shows current spending vs budget with a semi-circle gauge
 */
const BudgetCard = () => {
  return (
    <div className={styles.budgetCard}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>Cost Of Budget</span>
        <span className={styles.cardSubtitle}>YTD</span>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.gaugeContainer}>
          {/* Placeholder for gauge chart - would be implemented with chart library */}
          <div className={styles.gaugeValue}>{formatCurrency(budgetData.current)}</div>
          <div className={styles.gaugeUnit}>YTD</div>
        </div>
        <div className={styles.budgetInfo}>
          To Budget: {budgetData.percentage}%
        </div>
      </div>
    </div>
  );
};

/**
 * Month Cost Card Component
 * Shows current month cost with trend indicator
 */
const MonthCostCard = () => {
  const trendClass = monthCost.changeType === 'positive' 
    ? styles.positive 
    : monthCost.changeType === 'negative' 
    ? styles.negative 
    : styles.neutral;

  return (
    <div className={styles.metricCard}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>Cost Of This Month</span>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.metricContainer}>
          <div className={styles.metricValue}>
            {formatCurrency(monthCost.value)}
          </div>
          <div className={`${styles.trendIndicator} ${trendClass}`}>
            <span className={styles.trendIcon}>
              {monthCost.changeType === 'negative' ? '↓' : '↑'}
            </span>
            <span>{formatPercentage(Math.abs(monthCost.change))} MoM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Environment Cost Card Component
 * Horizontal bar chart showing cost by environment
 */
const EnvironmentCostCard = () => {
  const maxValue = Math.max(...environmentCosts.map(e => e.value));
  
  return (
    <div className={styles.barChartCard}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>Cost By Environment</span>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.barChartContainer}>
          {environmentCosts.map((env, index) => (
            <div key={env.name} className={styles.barItem}>
              <div className={styles.barLabel}>{env.name}</div>
              <div className={styles.barTrack}>
                <div 
                  className={styles.barFill}
                  style={{
                    width: `${(env.value / maxValue) * 100}%`,
                    backgroundColor: chartColorPalette[index % chartColorPalette.length],
                  }}
                />
              </div>
              <div className={styles.barValue}>
                <span className={styles.value}>{formatCurrency(env.value)}</span>
                <span className={styles.percentage}>
                  {formatPercentage(env.change)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Service Cost Card Component
 * Donut chart showing cost distribution by service
 */
const ServiceCostCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>Cost By Service</span>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.chartContainer}>
          {/* Placeholder for donut chart */}
          <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            <p>Donut Chart</p>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>
              {serviceCosts.length} services tracked
            </p>
          </div>
        </div>
        <div className={styles.legend}>
          {serviceCosts.slice(0, 6).map((service, index) => (
            <div key={service.name} className={styles.legendItem}>
              <div 
                className={styles.legendColor}
                style={{ backgroundColor: chartColorPalette[index % chartColorPalette.length] }}
              />
              <span className={styles.legendLabel}>{service.name}</span>
              <span className={styles.legendValue}>{service.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Daily Cost Card Component
 * Time series bar chart showing cost by day for both providers
 */
const DailyCostCard = () => {
  const maxValue = Math.max(...dailyCosts.map(d => Math.max(Math.abs(d.aliyun), Math.abs(d.azure))));
  
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>Cost By Day</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div className={styles.legendItem}>
            <div 
              className={styles.legendColor}
              style={{ backgroundColor: design.colors.provider.aliyun }}
            />
            <span className={styles.legendLabel}>Aliyun</span>
          </div>
          <div className={styles.legendItem}>
            <div 
              className={styles.legendColor}
              style={{ backgroundColor: design.colors.provider.azure }}
            />
            <span className={styles.legendLabel}>Azure</span>
          </div>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.chartContainer}>
          {/* Placeholder for time series chart */}
          <div style={{ 
            textAlign: 'center', 
            color: 'var(--color-text-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <p>Time Series Bar Chart</p>
            <p style={{ fontSize: '12px' }}>
              {dailyCosts.length} days of data
            </p>
            <p style={{ fontSize: '12px' }}>
              Peak: {formatCurrency(maxValue)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Horizontal App Cost Card Component
 * Generic horizontal bar chart for app-specific costs
 */
const AppCostCard = ({ title, data }: { title: string; data: typeof azureAppCosts }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className={styles.barChartCard}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{title}</span>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.barChartContainer}>
          {data.slice(0, 8).map((item, index) => (
            <div key={item.category} className={styles.barItem}>
              <div className={styles.barLabel} style={{ minWidth: '140px', fontSize: '12px' }}>
                {item.category}
              </div>
              <div className={styles.barTrack}>
                <div 
                  className={styles.barFill}
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: chartColorPalette[index % chartColorPalette.length],
                  }}
                />
              </div>
              <div className={styles.barValue}>
                <span className={styles.value}>{formatCurrency(item.value)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Meter Category Cost Card Component
 * Vertical bar chart showing cost by meter category
 */
const MeterCategoryCostCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>Cost By MeterCategory</span>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.chartContainer}>
          {/* Placeholder for vertical bar chart */}
          <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            <p>Vertical Bar Chart</p>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>
              {meterCategoryCosts.length} categories
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Main Dashboard Component
 */
export const PageContent = () => {
  const [selectedProvider, setSelectedProvider] = React.useState<"Aliyun" | "Azure" | "Both">("Both");

  const width = 1680;
  const height = 1200;

  return (
    <ScaledViewport
      viewportMode={["scaled-from", width, height]}
      enableFrame={true}
    >
      <div className={styles.dashboard}>
        <Layout
          contentDesign={{ widthMode: "full", enablePadding: false }}
          elements={{
            navBar: {
              first: [
                <Avatar
                  key="avatar"
                  src="../../../vite.svg"
                  alt="FinOps"
                  size="medium"
                />,
                <NavTitle key="title" title="FinOps Cost Analysis" />,
              ],
              center: [
                <Button
                  key="month-selector"
                  content={{
                    icon: "calendar_month",
                    text: "当前月份",
                  }}
                  design={{
                    variant: COMPONENT_VARIANTS.outlined,
                    size: COMPONENT_SIZES.small,
                    semantic: COMPONENT_SEMANTICS.secondary,
                  }}
                  onClick={() => {
                    // Toggle or show dropdown
                    console.log("Month selector clicked");
                  }}
                />,
              ],
              last: [
                <Button
                  key="provider-aliyun"
                  content={{ text: "Aliyun" }}
                  design={{
                    variant: COMPONENT_VARIANTS.fill,
                    size: COMPONENT_SIZES.small,
                    semantic: selectedProvider === "Aliyun" ? COMPONENT_SEMANTICS.primary : COMPONENT_SEMANTICS.secondary,
                  }}
                  onClick={() => setSelectedProvider("Aliyun")}
                  hoverable={false}
                  style={
                    selectedProvider === "Aliyun"
                      ? {
                          backgroundColor: design.colors.provider.aliyun,
                          color: "#ffffff",
                          border: "none",
                        }
                      : undefined
                  }
                />,
                <Button
                  key="provider-azure"
                  content={{ text: "Azure" }}
                  design={{
                    variant: COMPONENT_VARIANTS.fill,
                    size: COMPONENT_SIZES.small,
                    semantic: selectedProvider === "Azure" ? COMPONENT_SEMANTICS.primary : COMPONENT_SEMANTICS.secondary,
                  }}
                  onClick={() => setSelectedProvider("Azure")}
                  hoverable={false}
                  style={
                    selectedProvider === "Azure"
                      ? {
                          backgroundColor: design.colors.provider.azure,
                          color: "#ffffff",
                          border: "none",
                        }
                      : undefined
                  }
                />,
                <div
                  key="divider"
                  style={{
                    width: "1px",
                    height: "24px",
                    backgroundColor: "var(--color-border-primary)",
                    margin: "0 8px",
                  }}
                />,
                <Button
                  key="billing-date"
                  content={{
                    icon: "event",
                    text: `Last Billing: ${dashboardMetadata.lastBillingDate}`,
                  }}
                  design={{
                    variant: COMPONENT_VARIANTS.ghost,
                    size: COMPONENT_SIZES.small,
                    semantic: COMPONENT_SEMANTICS.secondary,
                  }}
                  hoverable={false}
                />,
                <Button
                  key="current-date"
                  content={{
                    text: dashboardMetadata.currentDate,
                  }}
                  design={{
                    variant: COMPONENT_VARIANTS.ghost,
                    size: COMPONENT_SIZES.small,
                    semantic: COMPONENT_SEMANTICS.secondary,
                  }}
                  hoverable={false}
                />,
              ],
            },

            content: (
              <FigmaBentoGrid
                height={height - design.navBar.height}
                width={width}
                rowCount={24}
                colCount={12}
                padding={design.content.padding}
                gap={[design.content.gap, design.content.gap]}
              >
                {/* Row 1: Budget, Month Cost, Environment - All same height */}
                <FigmaBentoItem row={[1, 5]} col={[1, 4]}>
                  <BudgetCard />
                </FigmaBentoItem>
                
                <FigmaBentoItem row={[1, 5]} col={[5, 4]}>
                  <MonthCostCard />
                </FigmaBentoItem>
                
                <FigmaBentoItem row={[1, 5]} col={[9, 4]}>
                  <EnvironmentCostCard />
                </FigmaBentoItem>

                {/* Row 2-3: Daily Cost (large) and Service Cost (tall) */}
                <FigmaBentoItem row={[6, 7]} col={[1, 8]}>
                  <DailyCostCard />
                </FigmaBentoItem>
                
                <FigmaBentoItem row={[6, 12]} col={[9, 4]}>
                  <ServiceCostCard />
                </FigmaBentoItem>

                {/* Row 3: Meter Category */}
                <FigmaBentoItem row={[13, 5]} col={[1, 8]}>
                  <MeterCategoryCostCard />
                </FigmaBentoItem>

                {/* Row 4: Azure and Aliyun App Costs */}
                <FigmaBentoItem row={[18, 7]} col={[1, 6]}>
                  <AppCostCard title="Azure App Cost" data={azureAppCosts} />
                </FigmaBentoItem>
                
                <FigmaBentoItem row={[18, 7]} col={[7, 6]}>
                  <AppCostCard title="Aliyun App Cost" data={aliyunAppCosts} />
                </FigmaBentoItem>
              </FigmaBentoGrid>
            ),
          }}
        />
      </div>
    </ScaledViewport>
  );
};
