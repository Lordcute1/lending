"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const PrintButton: React.FC = () => {
  const handlePrint = () => {
    const tableToPrint = document.getElementById("adminsTable");

    if (tableToPrint) {
      const newWin = window.open("", "_blank");
      if (newWin) {
        newWin.document.write("<html><head><title>Print</title></head><body>");
        newWin.document.write(tableToPrint.outerHTML);
        newWin.document.write("</body></html>");
        newWin.print();
        newWin.close();
      }
    }
  };

  return (
    <div>
      <Button onClick={handlePrint}>Print Table</Button>
    </div>
  );
};

export default PrintButton;
