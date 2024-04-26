import { boletoBarcodeSvg } from "../components/barcode";
import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { WooviLogo } from "../components/woovi-logo";
import type { BoletoProps } from "./InputSchema";
import { QRCode } from "../components/qr-code-svg";
import React from "react";

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

const styles = StyleSheet.create({
  heading: {
    marginTop: 25,
  },
  page: {
    fontFamily: "Inter",
    padding: "32 20 52 20",
  },
  label: {
    fontSize: 12,
  },
  labelSmall: {
    fontSize: 8,
    display: "flex",
    flexWrap: "wrap",
  },
  barCode: {
    maxWidth: 344,
    marginTop: 20,
  },
  leftColumn: {
    maxWidth: 399,
    width: "100%",
    flexDirection: "column",
    gap: "4px",
    padding: "4px 6px",
  },
  rightColumn: {
    flexDirection: "column",
    gap: "4px",
    borderLeft: "1px solid black",
    padding: "4px 6px",
    height: "100%",
  },
  valueSmall: {
    fontSize: "10px",
    width: 148,
    textAlign: "right",
  },
  value: {
    fontSize: "10px",
    textTransform: "uppercase",
  },
});

const mapLogo = {
  Woovi: <WooviLogo />,
};
export const BoletoComponent = (
  args: BoletoProps) => {
  const SvgBarcode = boletoBarcodeSvg(args.barcodeData);
  const displayExpirationDay = formatDate(args.expirationDay);
  const displayDocumentDate = formatDate(args.documentDate);
  const displayProcessingDate = formatDate(args.processingDate);

  return (
    <Document
      author="woovi.com"
      creator="woovi.com"
      producer="woovi.com"
      subject={"Woovi"}
      title={"Boleto - Woovi"}
    >
      <Page style={styles.page}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            gap: 6,
          }}
        >
          <Link
            href={"https://woovi.com"}
            style={{
              width: 100,
            }}
          >
            {mapLogo.Woovi}
          </Link>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              padding: "0 6px",
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
            }}
          >
            {args.documentNumber}
          </Text>

          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            {args.scannerBarcode}
          </Text>
        </View>

        <View
          style={{
            border: "1px solid black",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <View style={{ ...styles.leftColumn }}>
            <Text style={styles.labelSmall}>Local de pagamento</Text>
            <Text style={styles.value}>{args.paymentPlace}</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.labelSmall}>Vencimento</Text>
            <Text style={styles.valueSmall}>{displayExpirationDay}</Text>
          </View>
        </View>

        <View
          style={{
            border: "1px solid black",
            borderTop: "none",
            flexDirection: "row",
            alignItems: "baseline",
            height: "108px",
          }}
        >
          <View style={{ ...styles.leftColumn }}>
            <Text style={styles.labelSmall}>Instruções</Text>
            <Text style={styles.value}>{args.instructions}</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.labelSmall}>(=) Valor Documento</Text>
            <Text style={styles.valueSmall}>{args.formattedValue}</Text>
          </View>
        </View>

        <View
          style={{
            border: "1px solid black",
            borderTop: "none",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <View style={{ ...styles.leftColumn }}>
            <Text style={styles.labelSmall}>Instruções</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.labelSmall}>(+) Impostos</Text>
            <Text style={styles.valueSmall}>{args.formattedValue}</Text>
          </View>
        </View>

        <View style={{ marginTop: "10px" }}>
           <QRCode qrcode={args.qrCodeData} />
        </View>

        <View style={styles.barCode}>{SvgBarcode}</View>
      </Page>
    </Document>
  );
};
