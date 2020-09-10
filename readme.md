# 餐廳論壇
### 目前僅開放後台測試，功能有餐廳資料的CRUD，與user的權限更改。

---
![image](https://github.com/CoreyHuang/restaurant_forum/blob/master/restaurant_page.png)
![image](https://github.com/CoreyHuang/restaurant_forum/blob/master/user_page.png)

### installation and execution(安裝與執行步驟):
#### `<安裝步驟>`
#### 1. 安裝git
#### 2. 安裝nvm (node管控工具)
#### 3. 安裝node.js與設定版本
```
nvm install 10.15.0
nvm use 10.15.0
```
#### 4. 安裝npm nodemon
```
npm install -g nodemon
```

#### `<執行步驟>`
#### 1. 使用terminal下載專案
```
git clone https://github.com/CoreyHuang/restaurant_forum.git
```
#### 2. 安裝npm套件(package.json)
```
npm install
```
#### 3. 環境變數設定
```
cp .env.example .env
```
#### 4. 載入種子資料(MySQL)
```
npm run seed
```
#### 5. 開啟本地伺服(專案資料夾中)
```
nodemon app.js or npm run dev
```
#### 6. 執行
```
URL: http://localhost:3000/
```

### Test Account
|Account|Password|
|:-----:|:------:|
|root@example.com|12345678|
|user1@example.com|12345678|
|user2@example.com|12345678|


### Prerequisites(環境建置與需求):
#### `<安裝需求>`
 1. git : v2.27.0.windows.1
 2. nvm : v1.1.7
 3. node : v10.15.0
 4. npm : v6.4.1
 5. nodemon : v2.0.4
#### `<npm套件>`
 1. express : v4.17.1
 2. express-handlebars : v5.1.0
 3. body-parser : v1.19.0
 4. method-override : v3.0.0
 5. bcryptjs : v2.4.3
 6. connect-flash : v0.1.1
 7. dotenv : v8.2.0
 8. express-session : v1.17.1
 9. passport : v0.4.1
 10. passport-local : v1.0.0
 11. faker : v5.1.0
 12. imgur-node-api : v0.1.0
 13. multer : v1.4.2
 14. mysql2 : v2.1.0
 15. pg : v8.3.3
 16. sequelize : v6.3.5
 17. sequelize-cli : v6.2.0