// react/next
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import axios from 'axios';
// components
import CustomerOrder from '../../../components/Orders/CustomerOrder';
import SpinningLoader from '../../../components/UI/SpinningLoader';
// context
import { useMainContext } from '../../../context/User';

// data
import logoImage from '../../../public/images/logo/logo-social.png';

function MyOrdersPage() {
  const { authState } = useMainContext();

  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (locale === 'it') router.push('/profilo/ordini');
  }, [locale]);

  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCustomerOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/orders/get-customer-orders`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        setOrders(data.orders);
      } else {
        return;
      }
      //   return;
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authState && authState.token.length > 0) getCustomerOrders();
  }, [authState]);

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

    // Embed the Helvetica font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Add a blank page to the document
    const page = pdfDoc.addPage();

    // // Get the form so we can add fields to it
    // const form = pdfDoc.getForm();

    // Load logo and background images
    const logoImageBytes = await fetchImageBytes(logoImage);

    // Embed the images
    const logoImageEmbed = await pdfDoc.embedPng(logoImageBytes);

    // Draw logo image
    page.drawImage(logoImageEmbed, {
      x: page.getWidth() / 2 - 37.5,
      y: page.getHeight() - 100,
      width: 75,
      height: 50,
    });

    // const superheroField = form.createTextField('favorite.superhero');
    // superheroField.setText('One Punch Man');
    // superheroField.addToPage(page, { x: 50, y: 640 });
    page.drawText('Invoice number:', {
      x: 50,
      y: 620,
      size: 12,
      font: timesRomanFont,
    });

    page.drawText('2342342342342', {
      x: 340,
      y: 620,
      size: 12,
      font: timesRomanFont,
    });

    page.drawText('Total Price', {
      x: 50,
      y: 560,
      size: 12,
      font: timesRomanFont,
    });
    // page.drawText('Saturn IV', {
    //   x: 50,
    //   y: 500,
    //   size: 12,
    //   font: timesRomanFont,
    // });
    page.drawText('120 EUR', {
      x: 340,
      y: 560,
      size: 12,
      font: timesRomanFont,
    });
    // page.drawText('Space Launch System', {
    //   x: 340,
    //   y: 500,
    //   size: 12,
    //   font: timesRomanFont,
    // });

    // // Add some text to the page
    // page.drawText('Hello, PDF!', {
    //   x: 50,
    //   y: 450,
    //   size: 30,
    //   font: timesRomanFont,
    //   color: rgb(0, 0.53, 0.71),
    // });

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
    <>
      {loading ? (
        <SpinningLoader />
      ) : (
        <div>
          <h1>My Orders</h1>
          <br></br>
          {orders &&
            orders.map((order) => (
              <CustomerOrder key={order._id} order={order} />
            ))}
          {/* <button onClick={generatePDF}>Generate PDF</button> */}
        </div>
      )}
    </>
  );
}

export default MyOrdersPage;
