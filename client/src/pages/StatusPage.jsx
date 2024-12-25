import React from 'react';
import Sidebar from '../components/custom/Sidebar';
import Status from '../components/custom/Status';

const StatusPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Status />
    </div>
  );
};

export default StatusPage;