import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
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

                const today = new Date();
                const currentDateString = today.toISOString().split('T')[0];

                if (reportsList.length > 0) {
                    const lastReportDate = reportsList[reportsList.length - 1].date.toDate().toISOString().split('T')[0];
                    if (lastReportDate !== currentDateString) {
                        // Limpar relatórios do dia anterior
                        for (const report of reportsList) {
                            await deleteDoc(doc(db, 'reports', report.id));
                        }
                    }
                }

                
                const updatedQuerySnapshot = await getDocs(collection(db, 'reports'));
                const updatedReportsList = updatedQuerySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setReports(updatedReportsList);
                const total = updatedReportsList.reduce((sum, report) => sum + report.total, 0);
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
        <h2>${report.date.toDate().toLocaleString()}</h2>
        ${report.products.map(product => `
          <p>${product.name}: ${product.quantity} x R$${product.price}</p>
        `).join('')}
        <p>Total: R$${report.total.toFixed(2)}</p>
      `).join('')}
      <h2>Total Vendido: R$${totalSold.toFixed(2)}</h2>
    `;

        try {
            const { uri } = await Print.printToFileAsync({ html });

            
            const fileName = `RelatorioVendas_${new Date().toISOString().split('T')[0]}.pdf`;
            const downloadsDir = `${FileSystem.documentDirectory}Downloads/`;
            const filePath = `${downloadsDir}${fileName}`;

            
            await FileSystem.makeDirectoryAsync(downloadsDir, { intermediates: true });

            await FileSystem.moveAsync({
                from: uri,
                to: filePath,
            });

            console.log('PDF gerado e salvo em:', filePath);
            Alert.alert('PDF gerado com sucesso!', `O PDF foi salvo em: ${filePath}`);

            await Sharing.shareAsync(filePath);
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            Alert.alert('Erro', 'Não foi possível gerar o PDF.');
        }
    };

    const renderReportItem = ({ item }) => (
        <View style={styles.reportItem}>
            <Text style={styles.dateText}>{item.date.toDate().toLocaleString()}</Text>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Produto</Text>
                    <Text style={styles.tableHeaderText}>Quantidade</Text>
                    <Text style={styles.tableHeaderText}>Preço</Text>
                </View>
                <FlatList
                    data={item.products}
                    renderItem={({ item }) => (
                        <View style={styles.tableRow}>
                            <Text style={styles.productText}>{item.name}</Text>
                            <Text style={styles.productText}>{item.quantity}</Text>
                            <Text style={styles.productText}>R${item.price}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
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
                <TouchableOpacity style={styles.button} onPress={generatePDF}>
                    <Text style={styles.buttonText}>Gerar PDF</Text>
                </TouchableOpacity>
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
        textAlign: 'center',
    },
    reportItem: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    table: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#e0e0e0',
        padding: 10,
    },
    tableHeaderText: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
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
    button: {
        backgroundColor: '#841584',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ReportScreen;
