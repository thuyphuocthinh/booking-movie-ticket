import * as React from "react";
// import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

import { Stack } from "@mui/material";
const items = [
  {
    id: "BHD Star",
    value: 20,
    label: "BDH Star",
  },
  { id: "CGV", value: 20, label: "CGV" },
  { id: "CineStar", value: 5, label: "CineStar" },
  {
    id: "Galaxy",
    value: 20,
    label: "Galaxy",
  },
  {
    id: "Lotte Cinema",
    value: 30,
    label: "Lotte Cinema",
  },
  {
    id: "MegaGS",
    value: 5,
    label: "MegaGS",
  },
];
export default function Statistics() {
  const [identifier, setIdentifier] = React.useState(null);
  const [id, setId] = React.useState(undefined);

  const handleClick = (event, itemIdentifier, item) => {
    setId(item.id);
    setIdentifier(itemIdentifier);
  };
  return (
    <div className="pb-2">
      <div className="mt-4">
        <h2 className="text-center text-xl font-bold">Thống kê người dùng</h2>
        <div className="mx-auto" style={{ maxWidth: "500px", width: "100%" }}>
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: [
                  "Tháng 1",
                  "Tháng 2",
                  "Tháng 3",
                  "Tháng 4",
                  "Tháng 5",
                  "Tháng 6",
                ],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: [1000, 1200, 1000, 1300, 1400, 1500],
              },
            ]}
            height={300}
            className="mx-auto w-full"
          />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-center text-xl font-bold my-4">
          Doanh thu hệ thống rạp
        </h2>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <PieChart
            series={[
              {
                data: items,
              },
            ]}
            onClick={handleClick}
            width={400}
            height={200}
            margin={{ right: 200 }}
          />
        </Stack>
      </div>
    </div>
  );
}
