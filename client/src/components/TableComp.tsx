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
import "../styles/options.css";

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
        <Table size='sm' variant="simple" colorScheme="green">
          <Thead>
            <Tr style={{backgroundColor:"#062d17"}}>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>CALLS</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>OI</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>CHNG IN OI</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>VOLUME</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>IV</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>LTP</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>CHNG</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>BID QTY</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>ASK</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>ASK QTY</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>STRIKE</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>BID QTY</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>BID</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>ASK</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>ASK QTY</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>CHNG</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>LTP</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>IV</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>VOLUME</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>CHNG IN OI</Th>
              <Th className="table-head" style={{color:'white', fontSize:"0.85rem"}}>OI</Th>
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
