import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
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
import { ViewportList } from 'react-viewport-list';

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

const TableComp = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  const [selectedStrikePrice, setSelectedStrikePrice] = useState<string>("");
  const [selectedExpiryDate, setSelectedExpiryDate] = useState<string>("");
  const [symbols, setSymbols] = useState<string[]>([]);
  const [strikePrices, setStrikePrices] = useState<string[]>([]);
  const [expiryDates, setExpiryDates] = useState<string[]>([]);
  const [responseData, setResponseData] = useState<MarketData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);

  const navigate = useNavigate();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleWorkerMessage = useCallback((event: MessageEvent<any>) => {
    const data = event.data;
    console.log("Data received from web worker:", data);
    console.log(data)
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

    socket.on('market_data', (msg) => {
      worker.postMessage(JSON.parse(msg));
    });
    socket.emit('update_market_data');
  }, []);

  useEffect(() => {
    settingValues();
  }, [responseData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSymbol, selectedStrikePrice, selectedExpiryDate]);

  const settingValues = () => {
    const symbolSet = new Set<string>();
    const strikePriceSet = new Set<string>();
    const expiryDateSet = new Set<string>();

    responseData.forEach((data) => {
      symbolSet.add(data.symbol);
      strikePriceSet.add(data.strike_price);
      expiryDateSet.add(data.expiry_date);
    });

    setSymbols(Array.from(symbolSet));
    setStrikePrices(Array.from(strikePriceSet));
    setExpiryDates(Array.from(expiryDateSet));
  };

  const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSymbol(e.target.value);
  };

  const handleStrikePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStrikePrice(e.target.value);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExpiryDate(e.target.value);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Filter the market data based on selected symbol, strike price, and expiry date
  const filteredData = useMemo(() => {
    const filtered = responseData.filter((data) => {
      let returnValue = true;
      if (selectedSymbol && data.symbol !== selectedSymbol) {
        returnValue = false;
      }
      if (selectedStrikePrice && data.strike_price !== selectedStrikePrice) {
        returnValue = false;
      }
      if (selectedExpiryDate && data.expiry_date !== selectedExpiryDate) {
        returnValue = false;
      }
      return returnValue;
    });

    const sorted = [...filtered].sort((a, b) => {
      const strikePriceA = parseFloat(a.strike_price);
      const strikePriceB = parseFloat(b.strike_price);
      return strikePriceA - strikePriceB;
    });

    return sorted;
  }, [responseData, selectedSymbol, selectedStrikePrice, selectedExpiryDate]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <div className="filter-container" style={{ paddingBottom: "20px", zIndex: "10000" }}>
        <SimpleGrid columns={3}>
          <Box maxW='sm'>
            <Select
              placeholder="Select Symbol"
              value={selectedSymbol }
              onChange={handleSymbolChange}
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
              onChange={handleStrikePriceChange}
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
              onChange={handleExpiryDateChange}
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
          <TableHead />
          <Tbody ref={ref}>
            {currentData.map((item: MarketData, index: number) => (
              <Tr key={index}>
                <Td>{item.symbol}</Td>
                <Td>{item.LTQ}</Td>
                <Td>{item.openInterest}</Td>
                <Td>{item.change}</Td>
                <Td>{item.totalTradedVolume}</Td>
                <Td>{item.IV}</Td>
                <Td>{item.LTP}</Td>
                <Td>{item.change}</Td>
                <Td>{item.bestBidQty}</Td>
                <Td>{item.change === "CE" ? item.expiry_date : '-'}</Td>
                <Td>{item.change === "PE" ? item.expiry_date : '-'}</Td>
                <Td>{item.bestAsk}</Td>
                <Td>{item.bestAskQty}</Td>
                <Td style={{color: "black",backgroundColor : "#FFD700"}}>{item.strike_price}</Td>
                <Td>{item.bestBidQty}</Td>
                <Td>{item.bestBid}</Td>
                <Td>{item.bestAsk}</Td>
                <Td>{item.bestAskQty}</Td>
                <Td>{item.change}</Td>
                <Td>{item.LTP}</Td>
                <Td>{item.IV}</Td>
                <Td>{item.totalTradedVolume}</Td>
                <Td>{item.change}</Td>
                <Td>{item.openInterest}</Td>
                <Td>{item.LTQ}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <div className="pagination-container">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            disabled={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default TableComp;