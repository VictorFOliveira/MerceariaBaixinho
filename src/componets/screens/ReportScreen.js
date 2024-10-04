import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Button, Alert } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const ReportScreen = () => {
    const [reports, setReports] = useState([]);
    const [totalSold, setTotalSold] = useState(0);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'reports'));
                const reportsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setReports(reportsList);

                const total = reportsList.reduce((sum, report) => sum + report.total, 0);
                setTotalSold(total);
            } catch (error) {
                console.error("Erro ao buscar relatórios: ", error);
            }
        };

        fetchReports();
    }, []);

    const generatePDF = async () => {
        const html = `
      <h1>Relatório do Dia</h1>
      ${reports.map(report => `
        <h2>${report.date.toDate().toLocaleDateString()}</h2>
        ${report.products.map(product => `
          <p>${product.name}: ${product.quantity} x R$${product.price}</p>
        `).join('')}
        <p>Total: R$${report.total.toFixed(2)}</p>
      `).join('')}
      <h2>Total Vendido: R$${totalSold.toFixed(2)}</h2>
    `;

        try {
            const { uri } = await Print.printToFileAsync({ html });

            // Definindo o caminho para salvar o PDF na pasta de Downloads
            const fileName = `RelatorioVendas_${new Date().toISOString().split('T')[0]}.pdf`;
            const downloadsDir = `${FileSystem.documentDirectory}Downloads/`;
            const filePath = `${downloadsDir}${fileName}`;

            // Criando a pasta Downloads se não existir
            await FileSystem.makeDirectoryAsync(downloadsDir, { intermediates: true });

            // Copiando o PDF para a pasta de Downloads
            await FileSystem.moveAsync({
                from: uri,
                to: filePath,
            });

            console.log('PDF gerado e salvo em:', filePath);
            Alert.alert('PDF gerado com sucesso!', `O PDF foi salvo em: ${filePath}`);

            // Compartilhar o PDF
            await Sharing.shareAsync(filePath);
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            Alert.alert('Erro', 'Não foi possível gerar o PDF.');
        }
    };

    const renderReportItem = ({ item }) => (
        <View style={styles.reportItem}>
            <Text style={styles.dateText}>{item.date.toDate().toLocaleDateString()}</Text>
            <FlatList
                data={item.products}
                renderItem={({ item }) => (
                    <Text style={styles.productText}>{item.name}: {item.quantity} x R${item.price}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <Text style={styles.totalText}>Total: R${item.total.toFixed(2)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Relatório do Dia</Text>
            {reports.length === 0 ? (
                <Text style={styles.noSalesText}>Hoje não ocorreram vendas.</Text>
            ) : (
                <FlatList
                    data={reports}
                    renderItem={renderReportItem}
                    keyExtractor={(item) => item.id}
                />
            )}
            <View style={styles.footer}>
                <Text style={styles.totalSoldText}>Total Vendido do Dia: R${totalSold.toFixed(2)}</Text>
                <Button title="Gerar PDF" onPress={generatePDF} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    reportItem: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productText: {
        fontSize: 16,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    noSalesText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    totalSoldText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ReportScreen;
