let diemData = [];

// Tải và phân tích dữ liệu CSV khi trang web tải xong
document.addEventListener('DOMContentLoaded', function() {
    Papa.parse('diem.csv', {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            diemData = results.data;
        }
    });
});

// Xử lý sự kiện submit của form tra cứu
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const soBaoDanh = document.getElementById('soBaoDanh').value;
    const result = diemData.find(row => row.SBD === soBaoDanh);

    // Các khóa để kiểm tra
    const keys = [
        'Toán', 'Văn', 'Ngoại Ngữ', 'Vật Lý', 'Hóa Học', 'Sinh học', 
        'TB KHTN', 'Lịch Sử', 'Địa Lý', 'GDCD', 'TB KHXH'
    ];

    if (result) {
        // Tạo HTML cho kết quả
        const resultHTML = keys.map((key, index) => {
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
