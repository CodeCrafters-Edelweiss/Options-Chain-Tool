import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import React, { useEffect } from "react";
import io from "socket.io-client";

const TableComp = () => {
  useEffect(() => {
    const socket = io("http://localhost:5000"); // Replace with your server URL

    // Event listener for receiving data from the server
    socket.on("marketData", (data) => {
      console.log("Received market data:", data);
      // Process the received data
      console.log(data)
      //pass the data to table
    });

    return () => {
      socket.disconnect(); // Clean up the socket connection when component unmounts
    };
  }, []);
  
  return (
    <>
      <TableContainer>
        <Table size='sm' variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>CALLS</Th>
              <Th>OI</Th>
              <Th>CHNG IN OI</Th>
              <Th>VOLUME</Th>
              <Th>IV</Th>
              <Th>LTP</Th>
              <Th>CHNG</Th>
              <Th>BID QTY</Th>
              <Th>ASK</Th>
              <Th>ASK QTY</Th>
              <Th>STRIKE</Th>
              <Th>BID QTY</Th>
              <Th>BID</Th>
              <Th>ASK</Th>
              <Th>ASK QTY</Th>
              <Th>CHNG</Th>
              <Th>LTP</Th>
              <Th>IV</Th>
              <Th>VOLUME</Th>
              <Th>CHNG IN OI</Th>
              <Th>OI</Th>
            </Tr>
          </Thead>
          <Tbody>
            
            <Tr>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableComp;
