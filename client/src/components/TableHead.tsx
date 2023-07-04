import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Select,
} from "@chakra-ui/react";

const TableHead = () => {
    return (
        <Thead>
            <Tr style={{ backgroundColor: "#062d17" }}>
                <Th colSpan={11} className="table-head" style={{ color: "white", fontSize: "0.85rem" , textAlign: "center" }}>
                    Calls
                </Th>
                <Th colSpan={14} className="table-head" style={{ color: "white", fontSize: "0.85rem" , textAlign: "center" }}>
                    Puts
                </Th>
            </Tr>
            <Tr style={{ backgroundColor: "#062d17" }}>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    SYMBOL
                </Th>
                {/* <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    LTQ
                </Th> */}
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    OI
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    CHNG IN OI
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    VOLUME
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    IV
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    LTP
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    CHNG
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    BID QTY
                </Th>
                {/* <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    EXPC
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    EXPP
                </Th> */}
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    ASK
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    ASK QTY
                </Th>
                <Th className="table-head" style={{ color: "black", fontSize: "0.85rem", backgroundColor: "#FFD700" }}>
                    STRIKE
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    BID QTY
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    BID
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    ASK
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    ASK QTY
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    CHNG
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    LTP
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    IV
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    VOLUME
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    CHNG IN OI
                </Th>
                <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    OI
                </Th>
                {/* <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                    LTQ
                </Th> */}
            </Tr>
        </Thead>
    )
}

export default TableHead;