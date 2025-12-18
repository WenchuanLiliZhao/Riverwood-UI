// 首先，我们定义 clock view 的数据结构
export type NumberWithUnitType = {
  value: number; 
  unit?: string;
}

export type ClockViewDataItemType = {
  value: number;
  color?: string; // 这个可以赋予扇形不同的颜色，当然，由于我不知道到底应该是后端还是前端来决定，所以这里先留一个可选的参数
  otherValues: {
    "var to outlook": {
      value: NumberWithUnitType;
      change: number; // 图中不会给出这个，因此这个可以乱给
    }; 
    "traffic": {
      value: NumberWithUnitType;
      change: number; // 可以小于 0，表示负增长
    };
    "txn": {
      value: NumberWithUnitType;
      change: number; // 可以小于 0，表示负增长
    };
    "upt": {
      value: NumberWithUnitType;
      change: number; // 可以小于 0，表示负增长
    };
    "utilization %": {
      value: NumberWithUnitType;
      change: number; // 可以小于 0，表示负增长
    };
    "try-on cr %": {
      value: NumberWithUnitType;
      change: number; // 可以小于 0，表示负增长
    };
  }
};

export type ClockViewDataType = Record<string, ClockViewDataItemType[]>;

// 下面，我们创建一些 mockup 数据，来测试这个组件。
// 数据一共由六个时间段（keys）组成：
// 1. 10:00 ~ 12:00
// 2. 12:00 ~ 14:00
// 3. 14:00 ~ 16:00
// 4. 16:00 ~ 18:00
// 5. 18:00 ~ 20:00
// 6. 20:00 ~ 22:00
// 每个时间段对应一个 type ClockViewDataItemType 的数组

export const clockViewData: ClockViewDataType = {
  "10:00 ~ 12:00": [
    {
      value: 15,
      otherValues: {
        "var to outlook": {
          value: { value: 1250, unit: "¥" },
          change: 5.2,
        },
        traffic: {
          value: { value: 320, unit: "" },
          change: 3.1,
        },
        txn: {
          value: { value: 45, unit: "" },
          change: 2.8,
        },
        upt: {
          value: { value: 1.8, unit: "" },
          change: -0.5,
        },
        "utilization %": {
          value: { value: 65, unit: "%" },
          change: 4.2,
        },
        "try-on cr %": {
          value: { value: 12.5, unit: "%" },
          change: 1.3,
        },
      },
    },
    {
      value: 18,
      color: "#FF8A80",
      otherValues: {
        "var to outlook": {
          value: { value: 2100, unit: "¥" },
          change: 8.5,
        },
        traffic: {
          value: { value: 450, unit: "" },
          change: 5.2,
        },
        txn: {
          value: { value: 62, unit: "" },
          change: 4.1,
        },
        upt: {
          value: { value: 2.1, unit: "" },
          change: 0.3,
        },
        "utilization %": {
          value: { value: 72, unit: "%" },
          change: 6.8,
        },
        "try-on cr %": {
          value: { value: 14.2, unit: "%" },
          change: 2.1,
        },
      },
    },
    {
      value: 12,
      color: "#FFCDD2",
      otherValues: {
        "var to outlook": {
          value: { value: 980, unit: "¥" },
          change: -2.3,
        },
        traffic: {
          value: { value: 280, unit: "" },
          change: 1.5,
        },
        txn: {
          value: { value: 38, unit: "" },
          change: 0.9,
        },
        upt: {
          value: { value: 1.6, unit: "" },
          change: -0.8,
        },
        "utilization %": {
          value: { value: 58, unit: "%" },
          change: -1.2,
        },
        "try-on cr %": {
          value: { value: 10.8, unit: "%" },
          change: -0.5,
        },
      },
    },
  ],
  "12:00 ~ 14:00": [
    {
      value: 22,
      otherValues: {
        "var to outlook": {
          value: { value: 3200, unit: "¥" },
          change: 12.5,
        },
        traffic: {
          value: { value: 680, unit: "" },
          change: 8.3,
        },
        txn: {
          value: { value: 95, unit: "" },
          change: 7.2,
        },
        upt: {
          value: { value: 2.5, unit: "" },
          change: 0.6,
        },
        "utilization %": {
          value: { value: 85, unit: "%" },
          change: 9.1,
        },
        "try-on cr %": {
          value: { value: 16.8, unit: "%" },
          change: 3.5,
        },
      },
    },
    {
      value: 28,
      color: "#81C784",
      otherValues: {
        "var to outlook": {
          value: { value: 4100, unit: "¥" },
          change: 15.8,
        },
        traffic: {
          value: { value: 850, unit: "" },
          change: 10.2,
        },
        txn: {
          value: { value: 120, unit: "" },
          change: 9.5,
        },
        upt: {
          value: { value: 2.8, unit: "" },
          change: 0.9,
        },
        "utilization %": {
          value: { value: 92, unit: "%" },
          change: 11.3,
        },
        "try-on cr %": {
          value: { value: 18.5, unit: "%" },
          change: 4.2,
        },
      },
    },
    {
      value: 19,
      color: "#FFD54F",
      otherValues: {
        "var to outlook": {
          value: { value: 2800, unit: "¥" },
          change: 9.2,
        },
        traffic: {
          value: { value: 520, unit: "" },
          change: 6.1,
        },
        txn: {
          value: { value: 75, unit: "" },
          change: 5.3,
        },
        upt: {
          value: { value: 2.2, unit: "" },
          change: 0.4,
        },
        "utilization %": {
          value: { value: 78, unit: "%" },
          change: 7.5,
        },
        "try-on cr %": {
          value: { value: 15.2, unit: "%" },
          change: 2.8,
        },
      },
    },
  ],
  "14:00 ~ 16:00": [
    {
      value: 25,
      otherValues: {
        "var to outlook": {
          value: { value: 3800, unit: "¥" },
          change: 14.2,
        },
        traffic: {
          value: { value: 720, unit: "" },
          change: 9.1,
        },
        txn: {
          value: { value: 105, unit: "" },
          change: 8.3,
        },
        upt: {
          value: { value: 2.6, unit: "" },
          change: 0.7,
        },
        "utilization %": {
          value: { value: 88, unit: "%" },
          change: 10.2,
        },
        "try-on cr %": {
          value: { value: 17.5, unit: "%" },
          change: 3.8,
        },
      },
    },
    {
      value: 20,
      color: "#A1887F",
      otherValues: {
        "var to outlook": {
          value: { value: 2900, unit: "¥" },
          change: 10.5,
        },
        traffic: {
          value: { value: 580, unit: "" },
          change: 7.2,
        },
        txn: {
          value: { value: 82, unit: "" },
          change: 6.1,
        },
        upt: {
          value: { value: 2.3, unit: "" },
          change: 0.5,
        },
        "utilization %": {
          value: { value: 80, unit: "%" },
          change: 8.5,
        },
        "try-on cr %": {
          value: { value: 16.2, unit: "%" },
          change: 3.1,
        },
      },
    },
    {
      value: 16,
      color: "#FF4646",
      otherValues: {
        "var to outlook": {
          value: { value: 2200, unit: "¥" },
          change: 6.8,
        },
        traffic: {
          value: { value: 450, unit: "" },
          change: 5.5,
        },
        txn: {
          value: { value: 65, unit: "" },
          change: 4.2,
        },
        upt: {
          value: { value: 2.0, unit: "" },
          change: 0.2,
        },
        "utilization %": {
          value: { value: 70, unit: "%" },
          change: 5.8,
        },
        "try-on cr %": {
          value: { value: 13.8, unit: "%" },
          change: 2.2,
        },
      },
    },
  ],
  "16:00 ~ 18:00": [
    {
      value: 30,
      otherValues: {
        "var to outlook": {
          value: { value: 4800, unit: "¥" },
          change: 18.5,
        },
        traffic: {
          value: { value: 950, unit: "" },
          change: 12.3,
        },
        txn: {
          value: { value: 135, unit: "" },
          change: 11.2,
        },
        upt: {
          value: { value: 3.0, unit: "" },
          change: 1.1,
        },
        "utilization %": {
          value: { value: 95, unit: "%" },
          change: 13.5,
        },
        "try-on cr %": {
          value: { value: 20.2, unit: "%" },
          change: 5.1,
        },
      },
    },
    {
      value: 26,
      color: "#2196F3",
      otherValues: {
        "var to outlook": {
          value: { value: 4200, unit: "¥" },
          change: 16.2,
        },
        traffic: {
          value: { value: 820, unit: "" },
          change: 10.8,
        },
        txn: {
          value: { value: 118, unit: "" },
          change: 9.8,
        },
        upt: {
          value: { value: 2.9, unit: "" },
          change: 1.0,
        },
        "utilization %": {
          value: { value: 90, unit: "%" },
          change: 12.1,
        },
        "try-on cr %": {
          value: { value: 19.5, unit: "%" },
          change: 4.8,
        },
      },
    },
    {
      value: 24,
      color: "#4CAF50",
      otherValues: {
        "var to outlook": {
          value: { value: 3900, unit: "¥" },
          change: 15.1,
        },
        traffic: {
          value: { value: 750, unit: "" },
          change: 9.5,
        },
        txn: {
          value: { value: 108, unit: "" },
          change: 8.9,
        },
        upt: {
          value: { value: 2.7, unit: "" },
          change: 0.8,
        },
        "utilization %": {
          value: { value: 87, unit: "%" },
          change: 10.8,
        },
        "try-on cr %": {
          value: { value: 18.8, unit: "%" },
          change: 4.5,
        },
      },
    },
  ],
  "18:00 ~ 20:00": [
    {
      value: 35,
      otherValues: {
        "var to outlook": {
          value: { value: 5600, unit: "¥" },
          change: 22.1,
        },
        traffic: {
          value: { value: 1100, unit: "" },
          change: 14.5,
        },
        txn: {
          value: { value: 158, unit: "" },
          change: 13.2,
        },
        upt: {
          value: { value: 3.2, unit: "" },
          change: 1.3,
        },
        "utilization %": {
          value: { value: 98, unit: "%" },
          change: 15.8,
        },
        "try-on cr %": {
          value: { value: 22.5, unit: "%" },
          change: 6.2,
        },
      },
    },
    {
      value: 32,
      color: "#9C27B0",
      otherValues: {
        "var to outlook": {
          value: { value: 5100, unit: "¥" },
          change: 20.3,
        },
        traffic: {
          value: { value: 1000, unit: "" },
          change: 13.2,
        },
        txn: {
          value: { value: 145, unit: "" },
          change: 12.1,
        },
        upt: {
          value: { value: 3.1, unit: "" },
          change: 1.2,
        },
        "utilization %": {
          value: { value: 96, unit: "%" },
          change: 14.5,
        },
        "try-on cr %": {
          value: { value: 21.8, unit: "%" },
          change: 5.9,
        },
      },
    },
    {
      value: 28,
      color: "#F44336",
      otherValues: {
        "var to outlook": {
          value: { value: 4500, unit: "¥" },
          change: 17.8,
        },
        traffic: {
          value: { value: 880, unit: "" },
          change: 11.5,
        },
        txn: {
          value: { value: 128, unit: "" },
          change: 10.8,
        },
        upt: {
          value: { value: 2.95, unit: "" },
          change: 1.0,
        },
        "utilization %": {
          value: { value: 93, unit: "%" },
          change: 13.2,
        },
        "try-on cr %": {
          value: { value: 20.5, unit: "%" },
          change: 5.3,
        },
      },
    },
  ],
  "20:00 ~ 22:00": [
    {
      value: 20,
      otherValues: {
        "var to outlook": {
          value: { value: 3200, unit: "¥" },
          change: 12.8,
        },
        traffic: {
          value: { value: 680, unit: "" },
          change: 8.5,
        },
        txn: {
          value: { value: 95, unit: "" },
          change: 7.8,
        },
        upt: {
          value: { value: 2.4, unit: "" },
          change: 0.6,
        },
        "utilization %": {
          value: { value: 82, unit: "%" },
          change: 9.5,
        },
        "try-on cr %": {
          value: { value: 16.2, unit: "%" },
          change: 3.8,
        },
      },
    },
    {
      value: 18,
      color: "#795548",
      otherValues: {
        "var to outlook": {
          value: { value: 2900, unit: "¥" },
          change: 11.2,
        },
        traffic: {
          value: { value: 620, unit: "" },
          change: 7.8,
        },
        txn: {
          value: { value: 88, unit: "" },
          change: 7.1,
        },
        upt: {
          value: { value: 2.3, unit: "" },
          change: 0.5,
        },
        "utilization %": {
          value: { value: 78, unit: "%" },
          change: 8.8,
        },
        "try-on cr %": {
          value: { value: 15.5, unit: "%" },
          change: 3.2,
        },
      },
    },
    {
      value: 15,
      color: "#607D8B",
      otherValues: {
        "var to outlook": {
          value: { value: 2400, unit: "¥" },
          change: 9.5,
        },
        traffic: {
          value: { value: 520, unit: "" },
          change: 6.8,
        },
        txn: {
          value: { value: 75, unit: "" },
          change: 6.2,
        },
        upt: {
          value: { value: 2.1, unit: "" },
          change: 0.4,
        },
        "utilization %": {
          value: { value: 72, unit: "%" },
          change: 7.5,
        },
        "try-on cr %": {
          value: { value: 14.2, unit: "%" },
          change: 2.9,
        },
      },
    },
  ],
};