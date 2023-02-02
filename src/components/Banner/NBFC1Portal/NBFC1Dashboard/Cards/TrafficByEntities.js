import React from "react";
import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";
import TrafficIcon from "@mui/icons-material/Traffic";

Chart.register(...registerables);
const TrafficByEntities = ({ issuedBank1, issuedBank2, issuedNBFC1 }) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [issuedBank1, issuedBank2, issuedNBFC1],
        backgroundColor: ["#ee6055", "#8ea7e9", "#4fb185"],
        borderWidth: 8,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: ["Bank1", "Bank2", "NBFC1"],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const entities = [
    {
      title: "Bank1",
      value: issuedBank1,
      icon: TabletIcon,
      color: "#ee6055",
    },
    {
      title: "Bank2",
      value: issuedBank2,
      icon: PhoneIcon,
      color: "#8ea7e9",
    },
    {
      title: "NBFC1",
      value: issuedNBFC1,
      icon: PhoneIcon,
      color: "#4fb185",
    },
  ];
  return (
    <Card
      sx={{
        marginTop: "30px",
        flex: "0.35",
        marginLeft: "2%",
        marginRight: "1%",
      }}
    >
      <CardHeader title="Available CBDC Liquidity" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {entities.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h5">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrafficByEntities;
