function getLocation() {
    const status = document.getElementById('status');
    const coordinates = document.getElementById('coordinates');
    const mapLink = document.getElementById('mapLink');
    
    status.textContent = "در حال دریافت موقعیت...";
    
    if (!navigator.geolocation) {
        status.textContent = "مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const accuracy = position.coords.accuracy;
            
            document.getElementById('lat').textContent = `عرض جغرافیایی: ${lat.toFixed(8)}`;
            document.getElementById('lng').textContent = `طول جغرافیایی: ${lng.toFixed(8)}`;
            document.getElementById('accuracy').textContent = `دقت: ${accuracy.toFixed(1)} متر`;
            
            const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}&z=18`;
            document.getElementById('googleMapLink').href = googleMapsUrl;
            document.getElementById('googleMapLink').textContent = `مشاهده موقعیت (${lat.toFixed(6)}, ${lng.toFixed(6)})`;
            
            coordinates.style.display = 'block';
            mapLink.style.display = 'block';
            status.textContent = "موقعیت با موفقیت دریافت شد!";
            
            localStorage.setItem('lastLocation', JSON.stringify({
                lat: lat,
                lng: lng,
                time: new Date().toISOString()
            }));
        },
        (error) => {
            let errorMessage;
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "❌ کاربر اجازه دسترسی نداد";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "❌ اطلاعات موقعیت در دسترس نیست";
                    break;
                case error.TIMEOUT:
                    errorMessage = "⏰ دریافت موقعیت زمان‌بر شد";
                    break;
                default:
                    errorMessage = "❌ خطای ناشناخته";
            }
            status.textContent = errorMessage;
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );
}

function loadLastLocation() {
    const saved = localStorage.getItem('lastLocation');
    if (saved) {
        const location = JSON.parse(saved);
        document.getElementById('lat').textContent = `عرض جغرافیایی: ${location.lat.toFixed(8)}`;
        document.getElementById('lng').textContent = `طول جغرافیایی: ${location.lng.toFixed(8)}`;
        document.getElementById('coordinates').style.display = 'block';
    }
}

window.onload = loadLastLocation;