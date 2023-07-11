// react / next
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// components
import BtnCTA from '../../../components/UI/BtnCTA';
// libs
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
// import { Document, Page } from 'react-pdf';
// data
import logoImage from '../../../public/images/logo/logo-social.png';

function CustomerOrderIdPageEN() {
  const router = useRouter();
  const { locale } = router;

  const { id } = router.query;

  useEffect(() => {
    if (locale === 'it') router.push(`/profilo/ordini/${id}`);
  }, [locale]);

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
    page.drawText(`Invoice number: ${id}`, {
      x: 50,
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
      OrderIdPage
      <div>
        <BtnCTA label="Download Invoice" onClickAction={generatePDF} />
      </div>
    </div>
  );
}

export default CustomerOrderIdPageEN;
