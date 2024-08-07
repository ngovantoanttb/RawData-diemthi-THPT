let diemData = [];

// Hiển thị hiệu ứng tải dữ liệu khi bắt đầu tải
function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

// Ẩn hiệu ứng tải dữ liệu khi dữ liệu đã được tải
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Tải và phân tích dữ liệu CSV khi trang web tải xong
document.addEventListener('DOMContentLoaded', function() {
    showLoading(); // Hiển thị hiệu ứng tải dữ liệu

    Papa.parse('./diem_thi_thpt_2024.csv', {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            diemData = results.data;
            hideLoading(); // Ẩn hiệu ứng tải dữ liệu
        },
        error: function(error) {
            console.error('Error parsing CSV:', error);
            hideLoading(); // Ẩn hiệu ứng tải dữ liệu nếu có lỗi
        }
    });
});

// Xử lý sự kiện submit của form tra cứu
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (diemData.length === 0) {
        document.getElementById('result').innerHTML = '<p>Đang tải dữ liệu, vui lòng thử lại sau.</p>';
        return;
    }

    const soBaoDanh = document.getElementById('soBaoDanh').value;
    const result = diemData.find(row => row.SBD === soBaoDanh);

    const keys = [
        'Toán', 'Văn', 'Ngoại Ngữ', 'Vật Lý', 'Hóa Học', 'Sinh học', 
        'Lịch Sử', 'Địa Lý', 'GDCD'
    ];

    if (result) {
        const resultHTML = keys.map((key) => {
            const value = result[key] || '';
            const valueClass = value && value.trim() !== '' ? 'value' : 'no-value';
            return `
                <div class="result-item">
                    <p>${key}: <span class="${valueClass}">${value}</span></p>
                </div>
            `;
        }).join('');

        document.getElementById('result').innerHTML = resultHTML || '<p>Không có thông tin để hiển thị.</p>';
    } else {
        document.getElementById('result').innerHTML = '<p>Không tìm thấy kết quả.</p>';
    }
});

// Initialize diemData as an empty array
// let diemData = [];

// // Load and parse CSV data when the page is fully loaded
// document.addEventListener('DOMContentLoaded', () => {
//     Papa.parse('diem.csv', {
//         download: true,
//         header: true,
//         skipEmptyLines: true,
//         complete: ({ data }) => {
//             diemData = data;
//         }
//     });
// });

// // Handle form submission
// document.getElementById('searchForm').addEventListener('submit', (e) => {
//     e.preventDefault();

//     const soBaoDanh = document.getElementById('soBaoDanh').value;
//     const result = diemData.find(row => row.SBD === soBaoDanh);

//     // Define keys for checking
//     const keys = [
//         'Toán', 'Văn', 'Ngoại Ngữ', 'Vật Lý', 'Hóa Học', 'Sinh học', 
//         'TB KHTN', 'Lịch Sử', 'Địa Lý', 'GDCD', 'TB KHXH'
//     ];

//     // Generate HTML for the result
//     const resultHTML = keys.map(key => {
//         const value = result ? result[key] || '' : '';
//         const valueClass = value.trim() ? 'value' : 'no-value';
//         return `
//             <div class="result-item">
//                 <p>${key}: <span class="${valueClass}">${value}</span></p>
//             </div>
//         `;
//     }).join('');

//     // Display results
//     document.getElementById('result').innerHTML = result
//         ? resultHTML
//         : '<p>Không tìm thấy kết quả.</p>';
// });
