const mysql = require('mysql2');
const productTitle = require("./dummyDateList.json");

  // db연결
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test1',
});

db.connect(err => {
    if (err) {
        return console.error(err);
    }

    const products = [];
    const categories = ["디지털기기", "가구", "도서", "옷", "스포츠"];

    const getRandomInt = (min, max)=>{
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 시간은 n월 동안 들어온걸 기준으로 할게요!
    const getRandomDateWithin1Year = ()=> {
        const now = new Date();
        const past = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 365 * 1);
        return new Date(getRandomInt(past.getTime(), now.getTime()));
    }

    function getRandomUsagePeriod(type) {
        let years = 0; 
        let months = 0;
        if (type === 0) {
            years = getRandomInt(1, 3);
            return `${years}년`;
        } else if (type === 1) {
            months = getRandomInt(1, 10);
            return `${months}개월`;
        } else {
            throw new Error("type은 0 또는 1이어야 합니다.");
        }
    }

    function getPriceByCategory(categoryIdx) {
        const ranges = [
            [100, 2000],  // 디지털기기
            [300, 3000],  // 가구
            [10, 100],    // 도서
            [1, 100],     // 옷
            [10, 1000]    // 스포츠
        ];
    
        const [min, max] = ranges[categoryIdx];
        return getRandomInt(min, max);
    }

    for (let i = 0; i < 500; i++) {
        const categoryIdx = getRandomInt(0, 4);
        const categoryName = categories[categoryIdx];
        const titleList = productTitle[categoryName];
        const title = titleList[getRandomInt(0, titleList.length - 1)];
        const price = getPriceByCategory(categoryIdx) * 1000;
        const createdAt = getRandomDateWithin1Year();
        const diff = getRandomUsagePeriod(getRandomInt(0,1));

        const contents = `${diff} 정도 사용했고 ${title}는(은) ${categoryName} 카테고리의 제품으로, 상태 좋고 깔끔합니다!`;

        products.push({
            title,
            category: categoryIdx,
            price,
            contents,
            created_at: createdAt.toISOString().slice(0, 19).replace('T', ' ')
        });
    }

    const sql = "INSERT INTO items (title, category_id, price, contents, registered_at) VALUES ?";
    const values = products.map(product => [
        product.title,
        product.category,
        product.price,
        product.contents,
        product.created_at
    ]);

    db.query(sql, [values], (err, results)=>{
        if (err) console.log(err);

        db.end(err => {
            if (err) console.log(err)
        })
    })

})