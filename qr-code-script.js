<script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const generateBtn = document.getElementById('generate-btn-post');
  const qrInput = document.getElementById('qr-input-post');
  const qrCodeDiv = document.getElementById('qr-code-post');
  const downloadPng = document.getElementById('download-png-post');
  const downloadSvg = document.getElementById('download-svg-post');
  const qrResultSection = document.querySelector('.qr-result-section');
  const qrColor = document.getElementById('qr-color');
  const qrSize = document.getElementById('qr-size');
  
  // Generate QR Code
  generateBtn.addEventListener('click', function() {
    const inputText = qrInput.value.trim();
    const color = qrColor.value;
    const size = parseInt(qrSize.value);
    
    if (!inputText) {
      alert('Please enter a URL or text to generate QR code');
      return;
    }
    
    // Clear previous QR code
    qrCodeDiv.innerHTML = '';
    
    // Generate new QR code
    QRCode.toCanvas(qrCodeDiv, inputText, {
      width: size,
      margin: 2,
      color: {
        dark: color,
        light: '#ffffff'
      }
    }, function(error) {
      if (error) {
        console.error(error);
        alert('Error generating QR code. Please try again.');
      } else {
        qrResultSection.style.display = 'block';
        
        // Scroll to result
        qrResultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
  
  // Download PNG
  downloadPng.addEventListener('click', function() {
    const inputText = qrInput.value.trim();
    const color = qrColor.value;
    if (!inputText) return;
    
    QRCode.toDataURL(inputText, {
      width: 800,
      margin: 2,
      color: {
        dark: color,
        light: '#ffffff'
      }
    }, function(err, url) {
      if (err) return console.error(err);
      
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
  
  // Download SVG
  downloadSvg.addEventListener('click', function() {
    const inputText = qrInput.value.trim();
    const color = qrColor.value;
    if (!inputText) return;
    
    QRCode.toString(inputText, {
      type: 'svg',
      margin: 2,
      color: {
        dark: color,
        light: '#ffffff'
      }
    }, function(err, svg) {
      if (err) return console.error(err);
      
      const blob = new Blob([svg], {type: 'image/svg+xml'});
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'qr-code.svg';
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  });
});
</script>