import React, { useState, useEffect } from "react";
import TableComp from "../components/TableComp";
import Navbar from "../components/Navbar";
import logo from "../assets/icons8-trading-64.png";
import "../styles/options.css";
import { Flex, Box } from "@chakra-ui/react";

const Options = () => {
  return (
    <div>
      <Flex
        bg="black"
        color="yellow"
        align="center"
        justify="space-between"
        p={4}
      >
        <Box className="logo-container">
          <a href="/home"><img src={logo} alt="Logo" width="40" height="40" /></a>
        </Box>
        <Box>
          <Navbar />
        </Box>
      </Flex>

      <div className="options-container">
        <TableComp />
      </div>
    </div>
  );
};

export default Options;
