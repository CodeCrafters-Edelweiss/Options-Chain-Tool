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
  Flex,
  Text,
  Input,
  Tag
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
  chng: number;
  IV: number;
  expc: string;
  expp: string;
  Change_in_OI: number;
  Optioncall:string;
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

  const [searchPage, setSearchPage] = useState(""); // State for the search input

  const handleSearchPage = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchPage(event.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(searchPage, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      handlePageChange(pageNumber);
    }
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

  const getPaginationButtons = () => {
    const buttons = [];

    if (totalPages <= 7) {
      // If total pages are less than or equal to 7, display all buttons
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
            key={i}
            disabled={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        );
      }
    } else {
      // If total pages are more than 7, display the first three, last three, and three dots
      if (currentPage <= 4) {
        // Display buttons 1, 2, 3, ..., currentPage, currentPage + 1
        for (let i = 1; i <= currentPage + 1; i++) {
          buttons.push(
            <Button
              key={i}
              disabled={currentPage === i}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </Button>
          );
        }
        buttons.push(<Button key="dots" disabled>...</Button>);
        buttons.push(
          <Button
            key={totalPages}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>
        );
      } else if (currentPage >= totalPages - 3) {
        // Display buttons totalPages - 2, totalPages - 1, ..., currentPage - 1, currentPage
        buttons.push(
          <Button
            key={1}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            1
          </Button>
        );
        buttons.push(<Button key="dots" disabled>...</Button>);
        for (let i = currentPage - 1; i <= totalPages; i++) {
          buttons.push(
            <Button
              key={i}
              disabled={currentPage === i}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </Button>
          );
        }
      } else {
        // Display buttons 1, 2, ..., currentPage - 1, currentPage, currentPage + 1, ..., totalPages
        buttons.push(
          <Button
            key={1}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            1
          </Button>
        );
        buttons.push(<Button key="dots1" disabled>...</Button>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          buttons.push(
            <Button
              key={i}
              disabled={currentPage === i}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </Button>
          );
        }
        buttons.push(<Button key="dots2" disabled>...</Button>);
        buttons.push(
          <Button
            key={totalPages}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>
        );
      }
    }

    return buttons;
  };

  return (
    <>
    <Box mt={5}>
        <Heading as="h4" size="xl" mb={4} fontFamily="Helvetica">
        Option Chain
        </Heading>
        {/* Rest of the code... */}
      </Box>
      <div className="filter-container" style={{ paddingBottom: "20px", zIndex: "10000" }}>
      
        <SimpleGrid columns={3}>
          <Box maxW='sm'>
            <label>View Options Contracts for:

            </label>
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
          <label>Strike Price:
              
              </label>
            <Select
              placeholder="Select"
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
          <label>Expiry Date:
              
              </label>
            <Select
              placeholder="Select"
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
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.symbol}</Td>
                {/* <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.LTQ}</Td> */}
                {/* <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.openInterest}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.change}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.totalTradedVolume}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.IV}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.LTP}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.change}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.bestBidQty}</Td> */}
                {/* <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.change === "CE" ? item.expiry_date : '-'}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.change === "PE" ? item.expiry_date : '-'}</Td> */}
                {item.Optioncall === "CE" && (
  <>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.openInterest}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black", width: "5%"}}>{item.Change_in_OI}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.totalTradedVolume}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.IV}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.LTP}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color: item.chng < 0 ? "red" : "green"}}>{item.chng}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.bestBidQty}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.bestBid}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.bestAsk}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.bestAskQty}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.expiry_date}</Td>
                <Td style={{backgroundColor: "white"  , color: "black", textDecoration: "underline", fontWeight: "bold"}}>{item.strike_price}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>-</Td>
  </>
)}
{item.Optioncall === "PE" && (
  <>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>-</Td>
                <Td style={{backgroundColor: "white"  , color: "black", textDecoration: "underline", fontWeight: "bold"}}>{item.strike_price}</Td>
                {/* <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.expiry_date}</Td> */}
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.bestBidQty}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.bestBid}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.bestAsk}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.bestAskQty}</Td>
                {/* <Td style={{backgroundColor: "white"  , color: "black", textDecoration: "underline", fontWeight: "bold"}}>{item.strike_price}</Td> */}
                <Td style={{backgroundColor: "#cdefee" , color: item.chng < 0 ? "red" : "green"}}>{item.chng}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.LTP}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.IV}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.totalTradedVolume}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.Change_in_OI}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.openInterest}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.expiry_date}</Td>
  </>
)}
                {/* <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.bestAsk}</Td>
                <Td style={{backgroundColor: "#eeeee4" , color :"black"}}>{item.bestAskQty}</Td>
                <Td style={{backgroundColor: "white"  , color: "black", textDecoration: "underline", fontWeight: "bold"}}>{item.strike_price}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.bestBidQty}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.bestBid}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.bestAsk}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.bestAskQty}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.change}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.LTP}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.IV}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.totalTradedVolume}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.change}</Td>
                <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.openInterest}</Td> */}
                {/* <Td style={{backgroundColor: "#cdefee" , color :"black"}}>{item.LTQ}</Td> */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box className="pagination-container" style={{ marginTop: "20px", marginBottom: "20px" }}>
        {/* <ButtonGroup isAttached> */}
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          {getPaginationButtons()}
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        {/* </ButtonGroup> */}
        <Flex alignItems="center" marginTop="10px">
          <Text>Go to page:</Text>
          <Input
            type="number"
            value={searchPage}
            onChange={handleSearchPage}
            size="sm"
            width="70px"
            marginLeft="10px"
          />
          <Button onClick={handleGoToPage} size="sm" marginLeft="10px">
            Go
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default TableComp;