// components
// import UserRoute from '../../../components/Routes/UserRoute';
// libs
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from '@react-pdf/renderer';

function OrdiniPage() {
  const showDownloadLink = () => {
    <PDFViewer>
      <Document>
        <Page size="A4">
          <View>
            <Text>Section #1</Text>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>;
  };

  return (
    <div>
      <h1>I miei ordini</h1>
    </div>
  );
}

export default OrdiniPage;
