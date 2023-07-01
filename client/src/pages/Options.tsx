import React, { useEffect } from 'react';
import io from 'socket.io-client';
import TableComp from '../components/TableComp';

const Options = () => {


  return (
    <div>
      {<TableComp />}
    </div>
  );
};

export default Options;
