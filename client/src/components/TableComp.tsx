
import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
    SimpleGrid,
    Box,
    Button,
} from "@chakra-ui/react";
import { Center, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import "../styles/options.css";
import TableHead from "./TableHead";
import { io } from 'socket.io-client';
import { useNavigate } from "react-router-dom";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface MarketData {
  symbol: string;
  LTP: string;
  LTQ: string;
  totalTradedVolume: string;
  bestBid: string;
  bestAsk: string;
  bestBidQty: string;
  bestAskQty: string;
  openInterest: string;
  timestamp: string;
  sequence: string;
  prevClosePrice: string;
  prevOpenInterest: string;
  expiry_date: string;
  strike_price: string;
  change: string;
  IV: number;
  expc: string;
  expp: string;
}

const socket = io('http://localhost:5000');

const worker = new Worker(new URL('./worker.js', import.meta.url));

const TableComp = () => {// State to store market data
  const [selectedSymbol, setSelectedSymbol] = useState<string>(""); // State to store selected symbol
  const [selectedStrikePrice, setSelectedStrikePrice] = useState<string>(""); // State to store selected strike price
  const [selectedExpiryDate, setSelectedExpiryDate] = useState<string>(""); // State to store selected expiry date
  const [symbols,setSymbols] = useState<string[]>([]);
  const [strikePrices,setStrikePrices] = useState<string[]>([]);
  const [expiryDates,setExpiryDates] = useState<string[]>([]);
  const [responseData, setResponseData] = useState<MarketData[]>([]);

  const navigate = useNavigate(); 
  const [isOpen, setIsOpen] = useState(false);

  const handleWorkerMessage = useCallback((event: MessageEvent<any>) => {
    const data = event.data;
    console.log("Data received from web worker:", data);
    setResponseData(data);
  }, []);

  useEffect(() => {
    worker.addEventListener('message', handleWorkerMessage);
    return () => {
      worker.removeEventListener('message', handleWorkerMessage);
    };
  }, [handleWorkerMessage]);


  useEffect(() => {
    socket.on('from-server', (msg) => {
      console.log(msg);
    });
  
    socket.on('market_data', (msg)=>{
      worker.postMessage(JSON.parse(msg));
      // setData(JSON.parse(msg));
    })
    socket.emit('update_market_data')
  }, []);

  // Filter the market data based on selected symbol, strike price, and expiry date
  const filteredData = responseData.filter((data) => {
    let returnValue;
        (!selectedSymbol || data.symbol === selectedSymbol) &&
        (!selectedStrikePrice || data.strike_price === selectedStrikePrice) &&
        (!selectedExpiryDate || data.expiry_date === selectedExpiryDate)
          ? (returnValue = true)
          : (returnValue = false);
        return returnValue;
  });

  const settingValues = () => {
    const symbolSet = new Set(symbols);
    const strikePriceSet = new Set(strikePrices);
    const expiryDateSet = new Set(expiryDates);

    filteredData.forEach((data) => {
      symbolSet.add(data.symbol);
      strikePriceSet.add(data.strike_price);
      expiryDateSet.add(data.expiry_date);
    });

    setSymbols(Array.from(symbolSet));
    setStrikePrices(Array.from(strikePriceSet));
    setExpiryDates(Array.from(expiryDateSet));
  };

  useEffect(() => {
  filteredData && settingValues();
  }, [filteredData])

  return (
      <>
        <div className="filter-container" style={{paddingBottom:"20px",zIndex:"10000"}}>
          <SimpleGrid columns={3}>
            <Box maxW='sm'>

          <Select
              placeholder="Select Symbol"
              value={selectedSymbol === "" ? "MAINIDX" : selectedSymbol}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSymbol(e.target.value)}
          >
            {symbols.map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
            ))}
          </Select>
            </Box>
            <Box maxW='sm'>

          <Select
              placeholder="Select Strike Price"
              value={selectedStrikePrice}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStrikePrice(e.target.value)}
          >
            {strikePrices.map((strikePrice) => (
                <option key={strikePrice} value={strikePrice}>
                  {strikePrice}
                </option>
            ))}
          </Select>
            </Box>
            <Box maxW='sm'>

          <Select
              placeholder="Select Expiry Date"
              value={selectedExpiryDate}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedExpiryDate(e.target.value)}
          >
            {expiryDates.map((expiryDate) => (
                <option key={expiryDate} value={expiryDate}>
                  {expiryDate}
                </option>
            ))}
          </Select>
            </Box>
          </SimpleGrid>
        </div>
        <TableContainer>
          <Table size="sm" variant="simple" colorScheme="green">
            <TableHead/>
            <Tbody>
              {filteredData.map((data,index) => (
                  <Tr key={index}>
                    <Td>{data.symbol}</Td>
                    <Td>{data.LTQ}</Td>
                    <Td>{data.openInterest}</Td>
                    <Td>{data.change}</Td>
                    <Td>{data.totalTradedVolume}</Td>
                    <Td>{data.IV}</Td>
                    <Td>{data.LTP}</Td>
                    <Td>{data.change}</Td>
                    <Td>{data.bestBidQty}</Td>
                    <Td>{data.change == "CE" ? data.expc : '-'}</Td>
                    <Td>{data.change == "PE" ? data.expp : '-'}</Td>
                    <Td>{data.bestAsk}</Td>
                    <Td>{data.bestAskQty}</Td>
                    <Td>{data.strike_price}</Td>
                    <Td>{data.bestBidQty}</Td>
                    <Td>{data.bestBid}</Td>
                    <Td>{data.bestAsk}</Td>
                    <Td>{data.bestAskQty}</Td>
                    <Td>{data.change}</Td>
                    <Td>{data.LTP}</Td>
                    <Td>{data.IV}</Td>
                    <Td>{data.totalTradedVolume}</Td>
                    <Td>{data.change}</Td>
                    <Td>{data.openInterest}</Td>
                    <Td>{data.LTQ}</Td>
                  </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </>
  );
};

export default TableComp;