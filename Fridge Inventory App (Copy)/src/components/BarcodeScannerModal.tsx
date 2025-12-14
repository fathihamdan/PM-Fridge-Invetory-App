import { useState, useEffect, useRef } from 'react';
import { X, Scan, Camera, AlertCircle } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

interface BarcodeScannerModalProps {
  onClose: () => void;
  onResult: (barcode: string, productName: string) => void;
}

// Mock barcode database
const BARCODE_DATABASE: Record<string, string> = {
  '123456789': 'Organic Milk',
  '987654321': 'Free Range Eggs',
  '555555555': 'Whole Wheat Bread',
  '111111111': 'Greek Yogurt',
  '222222222': 'Cheddar Cheese',
};

export function BarcodeScannerModal({ onClose, onResult }: BarcodeScannerModalProps) {
  const [manualBarcode, setManualBarcode] = useState('');
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const [cameraStarted, setCameraStarted] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerInitialized = useRef(false);

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (scannerRef.current && cameraStarted) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [cameraStarted]);

  const handleManualEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualBarcode) return;

    const productName = BARCODE_DATABASE[manualBarcode] || 'Unknown Product';
    onResult(manualBarcode, productName);
  };

  const startCamera = async () => {
    setError('');
    setScanning(true);

    try {
      // Initialize scanner only once
      if (!scannerRef.current && !scannerInitialized.current) {
        scannerInitialized.current = true;
        scannerRef.current = new Html5Qrcode('barcode-reader');
      }

      if (!scannerRef.current) {
        throw new Error('Scanner initialization failed');
      }

      // Configure barcode formats to scan
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        formatsToSupport: [
          0,  // QR_CODE
          8,  // EAN_13
          9,  // EAN_8
          10, // UPC_A
          11, // UPC_E
          12, // CODE_39
          13, // CODE_93
          14, // CODE_128
          15, // ITF
        ],
      };

      // Start scanning
      await scannerRef.current.start(
        { facingMode: 'environment' }, // Use back camera
        config,
        (decodedText) => {
          // Success callback - barcode detected
          console.log('Barcode detected:', decodedText);
          
          // Stop scanning
          if (scannerRef.current) {
            scannerRef.current.stop().catch(console.error);
            setCameraStarted(false);
          }
          
          // Look up product name
          const productName = BARCODE_DATABASE[decodedText] || 'Unknown Product';
          onResult(decodedText, productName);
        },
        (errorMessage) => {
          // Error callback - no barcode detected (this fires frequently, so we ignore it)
        }
      );

      setCameraStarted(true);
      setScanning(false);
    } catch (err) {
      console.error('Camera error:', err);
      setError('Unable to access camera. Please ensure camera permissions are granted.');
      setScanning(false);
      setCameraStarted(false);
      scannerInitialized.current = false;
      scannerRef.current = null;
    }
  };

  const stopCamera = () => {
    if (scannerRef.current && cameraStarted) {
      scannerRef.current.stop()
        .then(() => {
          setCameraStarted(false);
          setScanning(false);
        })
        .catch(console.error);
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-gray-900 dark:text-white">Scan Barcode</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="p-6">
            {/* Camera Preview */}
            <div className="relative aspect-square bg-gray-900 rounded-lg mb-4 overflow-hidden">
              <div id="barcode-reader" className={cameraStarted ? '' : 'hidden'} />
              
              {!cameraStarted && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Camera ready to scan</p>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Camera Controls */}
            {!cameraStarted ? (
              <button
                onClick={startCamera}
                disabled={scanning}
                className="w-full py-3 bg-[#007057] hover:bg-[#005a45] disabled:bg-gray-400 text-white rounded-lg transition-colors mb-4 flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                {scanning ? 'Starting Camera...' : 'Start Camera'}
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors mb-4 flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Stop Camera
              </button>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
                  or enter manually
                </span>
              </div>
            </div>

            <form onSubmit={handleManualEntry} className="space-y-3">
              <input
                type="text"
                placeholder="Enter barcode number"
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              />
              <button
                type="submit"
                className="w-full py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
              >
                Submit
              </button>
            </form>

            <div className="mt-4 p-3 bg-[#007057]/10 dark:bg-[#007057]/20 rounded-lg">
              <p className="text-xs text-[#007057]">
                Try scanning real product barcodes or use test codes: 123456789, 987654321, 555555555
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}