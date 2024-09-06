import { ButtonBase, SvgIcon, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { LinkDirectionContext } from "../layout";

export default function MenuButton({ drawerOpen, setDrawerOpen }) {
  const { setLinkDirection } = useContext(LinkDirectionContext);

  const theme = useTheme();

  function toggleMenu() {
    setLinkDirection(drawerOpen ? 1 : -1);
    setDrawerOpen(!drawerOpen);
  }

  const transition = "cubic-bezier(.44,-0.52,.38,.98) .8s";

  return (
    <Typography
      variant="h4"
      sx={{
        position: "relative",
        height: "100%",
        marginLeft: "-2px",
        marginTop: "2px",
      }}
    >
      <ButtonBase
        component={motion.div}
        transition={{ duration: 0 }}
        disableRipple
        onClick={toggleMenu}
        variant="inline"
        sx={{
          display: "flex",
          py: 0.5,
          borderRadius: 1,
          marginRight: 1,
          fontSize: "inherit",
          height: "100%",
          transformOrigin: "0% 100%",
        }}
      >
        <SvgIcon
          sx={{ fontSize: "inherit", p: 0.3, width: 32, height: 32 }}
          strokeWidth="1px"
          style={{ stroke: "none" }}
          viewBox="0 0 138 100"
        >
          <title>menu</title>
          <rect
            style={{
              transition,
              ...(drawerOpen && {
                transform: "rotate(45deg) translate(10%, -15%)",
              }),
            }}
            x="1"
            width="138"
            height="12"
            rx="9"
          />
          <rect
            style={{
              transition,
              transformOrigin: "right top",
              ...(drawerOpen && {
                transform: "rotate(-45deg) translate(-8%, -65%) scaleX(1.1)",
              }),
            }}
            x="1"
            y="41"
            width="125"
            height="12"
            rx="9"
          />
          <rect
            style={{
              transition,
              ...(drawerOpen && { transform: "translate(-100%)", opacity: 0 }),
            }}
            x="1"
            y="81"
            width="92"
            height="12"
            rx="9"
          />
        </SvgIcon>
      </ButtonBase>
    </Typography>
  );
}
