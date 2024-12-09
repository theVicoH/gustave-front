"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";

import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { PolarArea } from "react-chartjs-2";
import { hexToRGB, hslToHex } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

const PolarAreaCenteredPointLabel = ({ height = 350 }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  const hslPrimary = `hsla(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
    })`;
  const hslInfo = `hsla(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info
    })`;
  const hslWarning = `hsla(${theme?.cssVars[mode === "dark" ? "dark" : "light"].warning
    })`;
  const hslSuccess = `hsla(${theme?.cssVars[mode === "dark" ? "dark" : "light"].success
    })`;

  const rgbPrimay = hexToRGB(hslToHex(hslPrimary), 0.5);
  const rgbInfo = hexToRGB(hslToHex(hslInfo), 0.5);
  const rgbWarning = hexToRGB(hslToHex(hslWarning), 0.5);
  const rgbSuccess = hexToRGB(hslToHex(hslSuccess), 0.5);

  const data: any = {
    labels: ["Primary", "Info", "Warning", "Success"],
    datasets: [
      {
        label: "My First Dataset",
        data: [11, 16, 7, 3, 14],
        backgroundColor: [rgbPrimay, rgbInfo, rgbWarning, rgbSuccess],
      },
    ],
  };
  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: `hsl(${theme?.cssVars[
              mode === "dark" || mode === "system" ? "dark" : "light"
            ].chartLabel
            })`,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <PolarArea options={options} data={data} height={height} />
    </div>
  );
};

export default PolarAreaCenteredPointLabel;