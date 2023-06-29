// libs
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFDownloadLink,
//   PDFViewer,
// } from '@react-pdf/renderer';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Document, Page } from 'react-pdf';
import { useState } from 'react';
// data
import logoImage from '../../../public/images/logo/logo-social.png';

function MyOrdersPage() {
  //   const showDownloadLink = () => {
  //     <PDFDownloadLink
  //       document={
  //         <Document>
  //           <Page size="A4">
  //             <View>
  //               <Text>Section #1</Text>
  //               <Text>Section #2</Text>
  //             </View>
  //           </Page>
  //         </Document>
  //       }
  //       fileName="Invoice.pdf"
  //     >
  //       Download PDF
  //     </PDFDownloadLink>;
  //   };
  //   const [pdfText, setPdfText] = useState('This is the pdf text');
  //   const [numPages, setNumPages] = useState(null);
  //   const [pageNumber, setPageNumber] = useState(1);

  //   const onDocumentLoadSuccess = ({ numPages }) => {
  //     setNumPages(numPages);
  //   };

  const generatePDF = async () => {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Load logo and background images
    const logoImageBytes = await fetchImageBytes(logoImage);

    // Embed the images
    const logoImageEmbed = await pdfDoc.embedPng(logoImageBytes);

    // Draw logo image
    page.drawImage(logoImageEmbed, {
      x: 50,
      y: page.getHeight() - 100,
      width: 100,
      height: 100,
    });

    // Add some text to the page
    page.drawText('Hello, PDF!', {
      x: 50,
      y: 450,
      size: 30,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0.53, 0.71),
    });

    // Serialize the PDF document to a Uint8Array
    const pdfBytes = await pdfDoc.save();

    // Create a Blob from the Uint8Array
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Save the PDF file using FileSaver.js
    saveAs(pdfBlob, 'example.pdf');
  };

  const fetchImageBytes = async (image) => {
    const response = await fetch(image.src);
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
  };

  return (
    <div>
      <h1>My Orders</h1>
      <br></br>
      {/* <button onClick={showDownloadLink}>Generate PDF</button> */}
      <button onClick={generatePDF}>Generate PDF</button>
      {/* {pdfText && (
        <div>
          <h2>Preview</h2>
          <Document
            file={{ url: 'data:application/pdf;base64,' + btoa(pdfText) }}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      )} */}

      {/* <div>{showDownloadLink()}</div> */}
    </div>
  );
}

export default MyOrdersPage;
