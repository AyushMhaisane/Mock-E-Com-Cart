import React from 'react';

const ReceiptModal = ({ receipt, onClose }) => {
    if (!receipt) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 style={styles.header}>🎉 Order Successful!</h2>
                <p>Thank you for your mock purchase from Vibe Commerce.</p>
                
                <div style={styles.details}>
                    <p><strong>Receipt ID:</strong> {receipt.receiptId}</p>
                    <p><strong>Items Purchased:</strong> {receipt.itemsPurchased}</p>
                    <p><strong>Total Charged:</strong> <span style={styles.total}>${receipt.total.toFixed(2)}</span></p>
                    <p><strong>Transaction Time:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
                </div>

                <button onClick={onClose} style={styles.closeButton}>
                    Close & Continue Shopping
                </button>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modal: { backgroundColor: 'white', padding: '30px', borderRadius: '10px', maxWidth: '500px', width: '90%', textAlign: 'center' },
    header: { color: '#28a745', borderBottom: '2px solid #eee', paddingBottom: '10px' },
    details: { margin: '20px 0', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', textAlign: 'left' },
    total: { color: '#dc3545', fontWeight: 'bold', fontSize: '1.4em' },
    closeButton: { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '15px' }
};

export default ReceiptModal;